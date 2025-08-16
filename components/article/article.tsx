import { cn } from "@/lib/utils";
import { ArticleData } from "@/types";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Article({
  orientation = "portrait",
  titleClass = "",
  footerClass = "",
  imageAspectRatio = "aspect-video",
  noDesc = false,
  data
} : {
  orientation?: "landscape" | "portrait";
  titleClass?: string;
  footerClass?: string;
  imageAspectRatio?: string;
  noDesc?: boolean;
  data: ArticleData;
}) {
  return (
    <Link href={`/board/${data.id}`}>
      <article className={cn("flex gap-2 group", orientation === "portrait" ? "flex-col" : "flex-col md:flex-row")}>
        <div className={orientation === "portrait" ? "" : "md:w-[40%]"}>
          <Image className={cn("rounded w-full object-cover dark:opacity-50", imageAspectRatio, data.img && "dark:opacity-100")} width={400} height={300} src={data.img ? data.img : '/images/placeholder.jpg'} alt="Article 1" />
        </div>
        <div className="space-y-2">
          <div className="flex gap-2 justify-between items-center">
            <h3 className={cn("font-bold text-base group-hover:underline line-clamp-1", titleClass)}>{data.title}</h3>
            <span className="text-sm text-red-500">{data.rating && (`+${data.rating}`)}</span>
          </div>
          {!noDesc && (<p className="line-clamp-2 text-muted-foreground">{data.description}</p>)}
          <div className={cn("flex flex-col md:flex-row items-start md:items-center text-muted-foreground gap-2", footerClass)}>
            <div className="flex items-center gap-1">
              <Image width={18} height={18} className="dark:opacity-50" src={'/images/avatar.png'} alt="Avatar" />
              <span className="">
                {data.author}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <time>{data.date}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}