import { cn } from "@/lib/utils";
import { ArticleData } from "@/types";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Article({
  orientation = "portrait",
  data
} : {
  orientation?: "landscape" | "portrait";
  data: ArticleData;
}) {
  return (
    <Link href={`/board/${data.id}`}>
      <article className={cn("flex gap-2 group", orientation === "portrait" ? "flex-col" : "flex-col md:flex-row")}>
        <div className={orientation === "portrait" ? "" : "md:w-[40%]"}>
          <Image className="rounded w-full aspect-video object-cover dark:opacity-50" width={400} height={300} src={'/images/placeholder.jpg'} alt="Article 1" />
        </div>
        <div className="space-y-2">
          <div className="flex gap-2 justify-between items-center">
            <h3 className="font-bold text-base group-hover:underline">{data.title}</h3>
            <span className="text-sm text-red-500">{data.rating && (`+${data.rating}`)}</span>
          </div>
          <p className="line-clamp-2 text-muted-foreground">{data.description}</p>
          <div className="flex flex-col md:flex-row items-start md:items-center text-muted-foreground gap-2">
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