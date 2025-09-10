"use client"

import Article from "@/components/article/article";
import ContentPlainText from "@/components/content-plaintext";
import GridSkeleton from "@/components/skeletons/grid-skeleton";
import { getPostsByCategory } from "@/db/query/posts";
import { PostCategory } from "@/db/schema/posts";
import { formatDate, parseImage } from "@/lib/utils";
import { PostData } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";

interface Props {
  data: PostData[];
  totalItems?: number;
  totalPages?: number
}

export default function PostGrid({data, totalItems = 0, totalPages = 0}: Props) {
  const { category } = useParams();
  const [list, setList] = useState<Props['data']>(data);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);

  const loadingRef = useRef(false);
  const lastRequestedPageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const limit = useMemo(
    () => Number(process.env.NEXT_PUBLIC_LIMIT ?? 20),
    []
  );

  useEffect(() => {
    if (page === 1) return;
    if (loadingRef.current) return;
    if (totalPages && page > totalPages) return;

    loadingRef.current = true;
    lastRequestedPageRef.current = page;

    startTransition(async () => {
      try {
        const res = await getPostsByCategory({
          category: category as PostCategory,
          page: String(page),
          limit: String(limit),
        });

        if (res?.ok && Array.isArray(res.data) && res.data.length > 0) {
          
          setList((prev) => {
            const seen = new Set(prev.map((p) => p.id));
            const merged = [...prev];
            for (const item of res.data) {
              if (!seen.has(item.id)) merged.push(item);
            }
            return merged;
          });
        }
      } finally {
        loadingRef.current = false;
      }
    });
  }, [page, category, limit, totalPages, startTransition]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        if (loadingRef.current) return;

        if (totalPages && page >= totalPages) return;

        if (lastRequestedPageRef.current !== page) return;

        setPage((p) => p + 1);
      },
      {
        root: null,
        rootMargin: "800px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [page, totalPages]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
        {list && list.length > 0 && list.map((item, index) => (
          <Article 
            key={item.id}
            data={{
              id: item.id,
              title: item.title,
              img: parseImage(item.thumbnail || "", true),
              category: item.category,
              description: <ContentPlainText content={item.content} />,
              author: item.authorName,
              date: formatDate(item.regDatetime || ""),
              rating: 0
            }}
          />
        ))}
        
      </div>
      {isPending && <GridSkeleton />}
      <div ref={sentinelRef} aria-hidden className="h-4" />
      {totalPages > 0 && page >= totalPages && (
        <p className="text-center text-sm text-muted-foreground my-6">
          목록의 끝입니다.
        </p>
      )}
    </>
  )
}