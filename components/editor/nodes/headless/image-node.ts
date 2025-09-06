import type {
  DOMConversionMap,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { DecoratorNode } from 'lexical';

export type ImagePayload = {
  src: string;
  altText?: string;
  width?: number | 'auto';
  height?: number | 'auto';
  maxWidth?: number; // used for layout constraints
  caption?: string; // plain-text caption for headless simplicity
  showCaption?: boolean;
};

export type SerializedImageNode = Spread<
  {
    type: 'image';
    version: 1;
    src: string;
    altText: string;
    width: number | 'auto';
    height: number | 'auto';
    maxWidth: number;
    caption: string;
    showCaption: boolean;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<null> {
  __src: string;
  __altText: string;
  __width: number | 'auto';
  __height: number | 'auto';
  __maxWidth: number;
  __caption: string;
  __showCaption: boolean;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      {
        src: node.__src,
        altText: node.__altText,
        width: node.__width,
        height: node.__height,
        maxWidth: node.__maxWidth,
        caption: node.__caption,
        showCaption: node.__showCaption,
      },
      node.__key,
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const {
      src,
      altText,
      width,
      height,
      maxWidth,
      caption,
      showCaption,
    } = serializedNode;
    return $createImageNode({
      src,
      altText,
      width,
      height,
      maxWidth,
      caption,
      showCaption,
    });
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
      maxWidth: this.__maxWidth,
      caption: this.__caption,
      showCaption: this.__showCaption,
    };
  }

  constructor(payload: ImagePayload, key?: NodeKey) {
    super(key);
    this.__src = payload.src;
    this.__altText = payload.altText ?? '';
    this.__width = payload.width ?? 'auto';
    this.__height = payload.height ?? 'auto';
    this.__maxWidth = payload.maxWidth ?? 800;
    this.__caption = payload.caption ?? '';
    this.__showCaption = payload.showCaption ?? Boolean(payload.caption);
  }

  // Headless export to DOM for $generateHtmlFromNodes
  exportDOM(): DOMExportOutput {
    const figure = document.createElement('figure');
    figure.setAttribute('data-lexical-type', 'image');

    const img = document.createElement('img');
    img.src = this.__src;
    if (this.__altText) img.alt = this.__altText;

    // inline size styles (safe, deterministic for headless)
    if (this.__width !== 'auto') img.style.width = `${this.__width}px`;
    if (this.__height !== 'auto') img.style.height = `${this.__height}px`;
    if (this.__maxWidth) img.style.maxWidth = `${this.__maxWidth}px`;
    img.loading = 'lazy';

    figure.appendChild(img);

    if (this.__showCaption && this.__caption) {
      const fc = document.createElement('figcaption');
      fc.textContent = this.__caption;
      figure.appendChild(fc);
    }

    return { element: figure };
  }

  // No DOM rendering in headless (we return `null` for Decorator)
  createDOM(_config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    span.setAttribute('data-lexical-decorator', 'image');
    return span;
  }
  updateDOM(): boolean {
    return false; // never re-render in headless
  }
  decorate(_editor: LexicalEditor): null {
    return null;
  }

  // Convenience getters/setters
  setSrc(src: string) { const self = this.getWritable(); self.__src = src; }
  setAltText(alt: string) { const self = this.getWritable(); self.__altText = alt; }
  setCaption(caption: string) { const self = this.getWritable(); self.__caption = caption; }
  setShowCaption(v: boolean) { const self = this.getWritable(); self.__showCaption = v; }
}

export function $createImageNode(payload: ImagePayload): ImageNode {
  return new ImageNode(payload);
}
export function $isImageNode(node: unknown): node is ImageNode {
  return node instanceof ImageNode;
}

// Optional: allow pasting <img> to convert into ImageNode
export const IMAGE_DOM_CONVERTERS: DOMConversionMap = {
  img: (domNode: HTMLElement) => {
    const node = domNode as HTMLImageElement;
    return {
      conversion: () => ({
        node: $createImageNode({
          src: node.src,
          altText: node.alt || '',
          width: node.width || undefined,
          height: node.height || undefined,
        }),
      }),
      priority: 0,
    };
  },
};

