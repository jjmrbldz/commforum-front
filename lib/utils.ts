import { ItemWithId, WidgetCarouselProps } from "@/types";
import { clsx, type ClassValue } from "clsx"
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