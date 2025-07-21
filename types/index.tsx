import { loginFormSchema, searchFormSchema } from "@/lib/schema/form";
import { ImageProps } from "next/image";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { UrlObject } from "url";
import z from "zod";

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type SearchFormSchema = z.infer<typeof searchFormSchema>;

export type LayoutType = "default" | "gallery" | "basic-gallery";

export type WidgetProps = {
  /** Widget's layout: `"default"` | `"gallery"` | `"basic-gallery"` */
  layout?: LayoutType;
  /** Widget's header title */
  title: ReactNode;
  /** Number of data entries to show inside a carousel item.
   * Default is 5, will automatically prepend 2 entries if `hasItemPrefix` prop is true 
   */
  dataLimitPerList?: number;
  /** Number of carousel items to show. */ 
  carouselSize?: 1 | 2 | 3;
  /** Data to map in a widget */
  data: any[];
  /** Add two random data items inside a carousel item. */
  hasItemPrefix?: boolean;
  /** Base path to be used an item's link */
  path: string;
  /** Classname for widget parent container */
  rootClassname?: string;
  /** Whether to show review count of data entry */
  isReviews?: boolean;
  /** Whether to prepend the data category before the title */
  addCategory?: boolean;
  /** Whether to show rank of data entry */
  showRank?: boolean;
  /** Whether to show author name of data entry */
  showAuthor?: boolean;
  /** Whether to show title of data entry */
  hasContentTitle?: boolean;
  /** Whether to use `chunkWithRandomPrefixes` function 
   * to split the data and map it inside a carousel item */
  chunkData?: boolean;
  /** Whether to loop the carousel */
  loop?: boolean;
}

export type WidgetCarouselProps = Omit<WidgetProps, "title" | "rootClassname" | "loop">;
export type WidgetListProps = Pick<WidgetCarouselProps, "data" | "path" | "hasItemPrefix" | "dataLimitPerList" | "isReviews" | "addCategory" | "showRank" | "showAuthor">;
export type WidgetItemPrefixProps = Pick<WidgetCarouselProps, "data" | "path" | "isReviews" | "showRank">;

export interface WidgetItemProps extends Pick<WidgetCarouselProps, "path" | "isReviews" | "addCategory" | "showRank" | "showAuthor"> {
  item: {
    id: string | number;
    rank: number;
    title: string;
    date: string;
    reviews: number;
    category: string;
    author: string;
  }
}

export interface ItemWithId {
  id: number;
  [key: string]: any;
}

export interface AdBoxImageProps
  extends Pick<ImageProps, "src" | "alt"> {
  href: string | UrlObject;
  target?: HTMLAttributeAnchorTarget | undefined; 
  className?: string;
  rootClassName?: string;
}

export interface WidgetBasicGalleryProps extends WidgetProps {}

export interface WidgetCarouselGalleryProps extends Pick<WidgetProps, "path" | "hasContentTitle"> {
  item: {
    id: number;
    title: string;
    img: string;
    content: string;
  }
}