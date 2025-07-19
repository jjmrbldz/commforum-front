import { loginFormSchema, searchFormSchema } from "@/lib/schema/form";
import { ImageProps } from "next/image";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { UrlObject } from "url";
import z from "zod";

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type SearchFormSchema = z.infer<typeof searchFormSchema>;

export type LayoutType = "default" | "gallery";

export type WidgetProps = {
  layout?: LayoutType;
  title: ReactNode;
  dataLimitPerList?: number;
  carouselSize?: 1 | 2;
  data: any[];
  hasItemPrefix?: boolean;
  path: string;
  rootClassname?: string;
  isReviews?: boolean;
  addCategory?: boolean;
  showRank?: boolean;
}

export type WidgetCarouselProps = Omit<WidgetProps, "title" | "rootClassname">;
export type WidgetListProps = Pick<WidgetCarouselProps, "data" | "path" | "hasItemPrefix" | "dataLimitPerList" | "isReviews" | "addCategory" | "showRank">;
export type WidgetItemPrefixProps = Pick<WidgetCarouselProps, "data" | "path" | "isReviews" | "showRank">;

export interface WidgetItemProps extends Pick<WidgetCarouselProps, "path" | "isReviews" | "addCategory" | "showRank"> {
  item: {
    id: string | number;
    rank: number;
    title: string;
    date: string;
    reviews: number;
    category: string;
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