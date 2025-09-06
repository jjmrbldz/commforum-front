import type {
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  NodeKey,
  SerializedLexicalNode,
} from 'lexical';
import { DecoratorNode } from 'lexical';

import type { Spread as _Spread2 } from 'lexical';

export type YouTubePayload = {
  url: string; // Any YouTube URL; we'll normalize to embed URL
  title?: string; // optional title for accessibility
  width?: number; // content width in px (exportDOM uses wrapper div)
  height?: number; // content height in px
  startSeconds?: number; // start time offset
};

export type SerializedYouTubeNode = _Spread2<
  {
    type: 'youtube';
    version: 1;
    url: string;
    title: string;
    width: number;
    height: number;
    startSeconds: number;
  },
  SerializedLexicalNode
>;

export class YouTubeNode extends DecoratorNode<null> {
  __url: string;
  __title: string;
  __width: number;
  __height: number;
  __startSeconds: number;

  static getType(): string {
    return 'youtube';
  }

  static clone(node: YouTubeNode): YouTubeNode {
    return new YouTubeNode(
      {
        url: node.__url,
        title: node.__title,
        width: node.__width,
        height: node.__height,
        startSeconds: node.__startSeconds,
      },
      node.__key,
    );
  }

  static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode {
    const { url, title, width, height, startSeconds } = serializedNode;
    return $createYouTubeNode({ url, title, width, height, startSeconds });
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      type: 'youtube',
      version: 1,
      url: this.__url,
      title: this.__title,
      width: this.__width,
      height: this.__height,
      startSeconds: this.__startSeconds,
    };
  }

  constructor(payload: YouTubePayload, key?: NodeKey) {
    super(key);
    this.__url = payload.url;
    this.__title = payload.title ?? 'YouTube video';
    this.__width = payload.width ?? 560;
    this.__height = payload.height ?? 315;
    this.__startSeconds = payload.startSeconds ?? 0;
  }

  exportDOM(): DOMExportOutput {
    const { embedSrc } = parseYouTubeURL(this.__url, this.__startSeconds);

    // Wrapper for responsive friendliness in HTML exports
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-lexical-type', 'youtube');
    wrapper.style.position = 'relative';
    wrapper.style.width = `${this.__width}px`;
    wrapper.style.maxWidth = '100%';
    wrapper.style.aspectRatio = `${this.__width} / ${this.__height}`;

    const iframe = document.createElement('iframe');
    iframe.src = embedSrc;
    iframe.title = this.__title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.frameBorder = '0';
    iframe.width = String(this.__width);
    iframe.height = String(this.__height);
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    wrapper.appendChild(iframe);
    return { element: wrapper };
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    span.setAttribute('data-lexical-decorator', 'youtube');
    return span;
  }
  updateDOM(): boolean { return false; }
  decorate(_editor: LexicalEditor): null { return null; }
}

export function $createYouTubeNode(payload: YouTubePayload): YouTubeNode {
  return new YouTubeNode(payload);
}
export function $isYouTubeNode(node: unknown): node is YouTubeNode {
  return node instanceof YouTubeNode;
}

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function isValidYouTubeId(s: string): boolean {
  if (s.length !== 11) return false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const ok = (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c === '_' || c === '-';
    if (!ok) return false;
  }
  return true;
}

function parseYouTubeURL(rawInput: unknown, startSeconds = 0): { videoId: string; embedSrc: string } {
  const raw = typeof rawInput === 'string' ? rawInput.trim() : '';
  if (!raw) {
    return { videoId: '', embedSrc: 'about:blank' };
  }

  let id = '';

  try {
    const base = raw.startsWith('http') ? undefined : 'https://youtube.com';
    const url = new URL(raw, base);
    const host = url.hostname;
    const path = url.pathname;

    if (host.includes('youtu.be')) {
      id = path.replace('/', '');
    } else if (path.startsWith('/watch')) {
      id = url.searchParams.get('v') || '';
    } else if (path.startsWith('/shorts/')) {
      const parts = path.split('/');
      id = parts[parts.length - 1] || '';
    } else if (path.startsWith('/embed/')) {
      const parts = path.split('/');
      id = parts[parts.length - 1] || '';
    }
  } catch {
    // ignore, will use fallbacks below
  }

  if (!isValidYouTubeId(id)) {
    // Light-weight scan for a token that looks like an id
    const tokens = raw.split(/[\/?#&=]/g).filter(Boolean);
    const found = tokens.find(isValidYouTubeId);
    id = found || '';
  }

  const start = startSeconds > 0 ? `?start=${Math.floor(startSeconds)}` : '';
  const embedSrc = id ? `https://www.youtube.com/embed/${id}${start}` : 'about:blank';
  return { videoId: id, embedSrc };
}

// ===============================================================
// Registration example
// ===============================================================
// import { LexicalComposer } from '@lexical/react/LexicalComposer';
// const nodes = [ImageNode, YouTubeNode];
// <LexicalComposer initialConfig={{namespace:'Editor', nodes, onError:console.error}}>...
// In headless: createHeadlessEditor({ namespace: 'Editor', nodes: [ImageNode, YouTubeNode], onError: () => {} })
