"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export function Paginate({
  totalItems,
  totalPages
} : {
  totalItems: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [pages, setPages] = useState<number[]>([]);
  const router = useRouter();

  const {page, limit} = useMemo(() => {
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    return {
      page,
      limit
    }
  }, [searchParams]);

  const {prevDisabled, nextDisabled} = useMemo(() => {
    const prevDisabled = page <= 1;
    const nextDisabled = page >= totalPages;
    return {
      prevDisabled,
      nextDisabled
    }
  }, [page, totalPages]);

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(targetPage));
    params.set("limit", String(limit));
    return `${pathName}?${params.toString()}`;
  }

  const handleLimitChange = (pageSize: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("limit", pageSize);
    router.push(`${pathName}?${params.toString()}`);
  }

  useEffect(() => {
    const pgs: number[] = [];
    if (page > 1) pgs.push(page - 1);
    pgs.push(page);
    if (page < totalPages) pgs.push(page + 1);
    setPages(pgs);

  }, [page, totalPages]);


  return (
    <div className="flex items-center justify-between gap-2 flex-col md:flex-row">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst 
              href={prevDisabled ? "#" : buildHref(1)} 
              className={prevDisabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious 
              href={prevDisabled ? "#" : buildHref(page - 1)} 
              className={prevDisabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {pages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink href={buildHref(p)} isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          {!nextDisabled && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {page !== totalPages && (
            <PaginationItem>
              <PaginationLink href={buildHref(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext 
              href={nextDisabled ? "#" : buildHref(page + 1)}
              className={nextDisabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast 
              href={nextDisabled ? "#" : buildHref(totalPages)}
              className={nextDisabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Select onValueChange={handleLimitChange} defaultValue={String(limit || 20)}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Limit</SelectLabel> */}
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
