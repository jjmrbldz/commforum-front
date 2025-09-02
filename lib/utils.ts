import { ItemWithId, WidgetCarouselProps } from "@/types";
import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { twMerge } from "tailwind-merge"

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


export function parseImage(str: string, isSingle = false) {
  if (isValidJSON(str)) {
    return JSON.parse(str)[0]
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