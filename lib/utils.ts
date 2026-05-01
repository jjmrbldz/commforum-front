import { ItemWithId, UserCommentData, WidgetCarouselProps } from "@/types";
import { clsx, type ClassValue } from "clsx"
import dayjs from "./dayjs"
import DOMPurify from "dompurify";
import { twMerge } from "tailwind-merge"
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState,
  ParagraphNode,
  TextNode,
} from "lexical";
import { createHeadlessEditor } from "@lexical/headless";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function carouselItemClass(size: WidgetCarouselProps['carouselSize']) {
  
  let className: string = "";
  switch (size) {
    case 1:
      className = "";
      break;
    case 2:
      className = "!basis-1/2";
      break;
    case 3:
      className = "!basis-1/2 !md:!basis-1/3";
      break;
  
    default:
      break;
  }
  
  return className
}

/**
 * Splits an array of objects into chunks and adds random prefix items to each chunk.
 *
 * @param arr - The input array of objects.
 * @param chunkSize - Number of items per chunk (default: 5).
 * @param prefixCount - Number of random prefix items to add before each chunk (default: 2).
 * @returns Array of chunks with prefixed items.
 */
export function chunkWithRandomPrefixes<T extends ItemWithId>(
  arr: T[],
  chunkSize: number = 5,
  prefixCount: number = 2
): T[][] {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);

    // Pick N random prefix items (with possible duplicates)
    const prefixes: T[] = [];
    for (let j = 0; j < prefixCount; j++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      prefixes.push(arr[randomIndex]);
    }

    result.push([...prefixes, ...chunk]);
  }

  return result;
}

export function formatDate(date: Date | string, format: string = "YYYY-MM-DD HH:mm:ss") {
  if (!date) return '-';
  
  const newDate = dayjs(date);

  if (!newDate.isValid()) return '-';

  return newDate.format(format)
}

export function isValidJSON(str: string): boolean {
  try {
      JSON.parse(str);
      return true;
  } catch {
      return false;
  }
}


export function parseImage(str: string, isSingle = true) {
  if (isValidJSON(str)) {
    if (isSingle) {
      return JSON.parse(str)?.[0] || null
    } else {
      return JSON.parse(str)
    }
  } else {
    return null;
  }
}

export function isValidUrl(url: string | null): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch (_) {
    return false;
  }
}

export function sanitizeHTML(html: string) {
  return DOMPurify.sanitize(html);
}

export function buildCommentTree(
  rows: UserCommentData[]
): UserCommentData[] {
  // Keep top-level order as given (DESC by your query)
  // Only children will be sorted ASC by regDatetime.

  // Clone nodes and ensure children arrays exist (avoid mutating input)
  const byId = new Map<number, UserCommentData>();
  const roots: UserCommentData[] = [];

  for (const r of rows) {
    byId.set(r.id, { ...r, children: [] });
  }

  for (const r of rows) {
    const node = byId.get(r.id)!;
    if (r.commentId == null) {
      roots.push(node);
    } else {
      const parent = byId.get(r.commentId);
      (parent ? parent.children! : roots).push(node);
    }
  }

  // Helper to convert Date|null to millis; nulls sort last
  const toMillis = (d: Date | null) => (d instanceof Date ? d.getTime() : Number.POSITIVE_INFINITY);

  // Sort children ASC by regDatetime (nulls last), recursively
  const sortChildrenAsc = (nodes: UserCommentData[]) => {
    for (const n of nodes) {
      if (n.children && n.children.length > 1) {
        n.children.sort((a, b) => toMillis(a.regDatetime) - toMillis(b.regDatetime));
      }
      if (n.children && n.children.length) sortChildrenAsc(n.children);
    }
  };
  sortChildrenAsc(roots);
  // return roots.sort((a, b) => toMillis(a.regDatetime) - toMillis(b.regDatetime));
  return roots;
}

/**
 * Convert a Lexical JSON string to plain text.
 * - Works without a DOM (uses @lexical/headless).
 * - Safely handles invalid JSON.
 * - Ensures a paragraph exists if the editor state is empty.
 * - Trims and slices to `max` characters.
 */
export function lexicalToPlainText(content: string, max = 160): string {
  const editor = createHeadlessEditor({
    namespace: "Editor",
    nodes: [HeadingNode, ParagraphNode, TextNode, QuoteNode],
    onError: () => {},
  });

  let parsed: EditorState | null = null;

  try {
    parsed = editor.parseEditorState(content);
  } catch {
    parsed = null;
  }

  if (parsed) {
    const isEmpty = parsed.read(() => $getRoot().getChildrenSize() === 0);

    if (isEmpty) {
      editor.update(() => {
        const root = $getRoot();
        const p = $createParagraphNode();
        root.append(p);
      });
    } else {
      editor.setEditorState(parsed);
    }
  } else {
    // Fallback to an empty paragraph
    editor.update(() => {
      const root = $getRoot();
      root.clear();
      const p = $createParagraphNode();
      p.append($createTextNode(""));
      root.append(p);
    });
  }

  const text = editor.read(() => $getRoot().getTextContent());
  // Normalize whitespace and clamp length
  return text.replace(/\s+/g, " ").trim().slice(0, max);
}


export function isSameDay(date?: string | null | Date) {
  return dayjs(date).isSame(dayjs(), "day");
}