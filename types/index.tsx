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
}

export type WidgetCarouselProps = Omit<WidgetProps, "title" | "rootClassname">;
export type WidgetListProps = Pick<WidgetCarouselProps, "data" | "path" | "hasItemPrefix" | "dataLimitPerList">;
export type WidgetItemPrefixProps = Pick<WidgetCarouselProps, "data" | "path">;

export interface WidgetItemProps {
  id: string | number;
  rank: number;
  title: string;
  date: string;
}

export interface ItemWithId {
  id: number;
  [key: string]: any;
}