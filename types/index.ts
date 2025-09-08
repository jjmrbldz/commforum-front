import { User } from "@/db/schema/user";
import { LoginData } from "@/db/validations/login";
import { loginFormSchema, searchFormSchema } from "@/lib/schema/form";
import { ImageProps } from "next/image";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import { UrlObject } from "url";
import z from "zod";

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type SearchFormSchema = z.infer<typeof searchFormSchema>;

export type LayoutType = "default" | "gallery" | "basic-gallery" | "tab" | "article";

export type CommonWidgetProps = {
  /** Widget's layout: `"default"` | `"gallery"` | `"basic-gallery"` | `"tab"` */
  layout?: LayoutType;
  /** Number of data entries to show inside a carousel item.
   * Default is 5, will automatically prepend 2 entries if `hasItemPrefix` prop is true 
   */
  dataLimitPerList?: number;
  /** Number of carousel items to show. */ 
  carouselSize?: 1 | 2 | 3;
  // /** Data to map in a widget */
  // data: any[];
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
  /** Rank background color */
  rankColor?: string;
  /** Whether to show author name of data entry */
  showAuthor?: boolean;
  /** Whether to show title of data entry */
  hasContentTitle?: boolean;
  /** Whether to show header title */
  showTitle?: boolean;
  /** Whether to use `chunkWithRandomPrefixes` function 
   * to split the data and map it inside a carousel item */
  chunkData?: boolean;
  /** Whether to loop the carousel */
  loop?: boolean;
  /** Whether to show points of data entry */
  showPoints?: boolean;
}

export type NonWidgetTabProps = CommonWidgetProps & {
  /** Widget's header title */
  title: ReactNode;
  layout?: Exclude<LayoutType, "tab">;
  tabNames?: undefined;
  /** Data to map in a widget */
  data: any[];
};

/** tabNames and tabContents is required  */
export type WidgetTabProps = CommonWidgetProps & {
  title?: undefined;
  layout: "tab";
  /** Tab name */
  tabNames: {label: string, value: string}[];
  /** Tab contents per name */
  data: Record<string, any[]>;
}

export type WidgetProps = NonWidgetTabProps  | WidgetTabProps;

export type WidgetCarouselProps = Omit<WidgetProps, "title" | "rootClassname" | "loop"> & { data: any[] };
export type WidgetListProps = Pick<WidgetCarouselProps, "data" | "path" | "hasItemPrefix" | "dataLimitPerList" | "isReviews" | "addCategory" | "showRank" | "showAuthor" | "rankColor" | "showPoints">;
export type WidgetItemPrefixProps = Pick<WidgetCarouselProps, "data" | "path" | "isReviews" | "showRank">;

export interface WidgetItemProps extends Pick<WidgetCarouselProps, "path" | "isReviews" | "addCategory" | "showRank" | "showAuthor" | "rankColor" | "showPoints"> {
  item: {
    id: string | number;
    rank: number;
    points: number;
    title: string;
    date: string;
    reviews: number;
    category: string;
    author: string;
    name: string;
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

export interface WidgetBasicGalleryProps extends NonWidgetTabProps {}

export interface WidgetCarouselGalleryProps extends Pick<WidgetProps, "path" | "hasContentTitle"> {
  item: {
    id: number;
    title: string;
    img: string;
    content: string;
    category: string;
  }
}

export type ArticleData = {
  id: number;
  title: string;
  description?: string;
  author: string;
  date: string;
  rating?: number;
  img?: string;
}

export type MySQLError = Error & {
  code: string;
  errno: number;
  sqlState?: string;
  sqlMessage?: string;
};

export type UserSession = Pick<User,
"id" |
"username" |
"email" |
"phone" |
"level" |
"group" |
"balance" |
"status" |
"name" |
"nickname" |
"point" |
"exp"
> | undefined;


export type LoginFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof LoginData, string[]>>;
};

export interface PagePanelProps {
  isPanelLeft?: boolean;
  children?: React.ReactNode;
}

type FieldErrors<F> =
  [F] extends [undefined] ? never : Partial<Record<keyof F, string[]>>;

export type ServerActionResponse<T = undefined, F = undefined> = Promise<
  | {
      ok: true;
      message: string;
      data: T;                    // required on success
      fieldErrors?: undefined;
      totalItems?: number;
      totalPages?: number;
    }
  | {
      ok: false;
      message: string;
      data?: undefined;           // not required on failure
      fieldErrors?: FieldErrors<F>;
    }
>;

export type PostData = {
  id: number;
  title: string;
  content: string;
  thumbnail: string | null;
  media: string | null;
  likeCount: number | null;
  dislikeCount: number | null;
  commentCount: number | null;
  viewCount: number;
  categoryId: number | null;
  category: "casino" | "freeboard" | "minigames" | "reviewboard" | "slot" | "sports";
  allowedViewLevel: number | null;
  allowedCommentLevel: number | null;
  allowedUserLevel: number | null;
  authorUsername: string;
  authorId: number;
  authorName: string;
  authorGroup: string | null;
  likeDislikeType?: string | null;
  status?: number | null;
  regDatetime: Date | null;
  updateDateTime: Date | null;
}

export type UserCommentData = {
  id: number;
  commentId: number | null;
  postId: string | null;
  content: string;
  level: number | null;
  replyCount: number | null;
  regDatetime: Date | null;
  userId: number;
  like: number | null;
  dislike: number | null;
  username: string;
  name: string;
  likeDislikeType?: string | null;
  children?: UserCommentData[];
}