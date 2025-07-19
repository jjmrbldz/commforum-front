import { loginFormSchema, searchFormSchema } from "@/lib/schema/form";
import { ReactNode } from "react";
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
}

export type WidgetCarouselProps = Omit<WidgetProps, "title" | "rootClassname">;
export type WidgetListProps = Pick<WidgetCarouselProps, "data" | "path" | "hasItemPrefix" | "dataLimitPerList" | "isReviews">;
export type WidgetItemPrefixProps = Pick<WidgetCarouselProps, "data" | "path" | "isReviews">;

export interface WidgetItemProps extends Pick<WidgetCarouselProps, "path" | "isReviews"> {
  item: {
    id: string | number;
    rank: number;
    title: string;
    date: string;
    reviews: number;
  }
}

export interface ItemWithId {
  id: number;
  [key: string]: any;
}