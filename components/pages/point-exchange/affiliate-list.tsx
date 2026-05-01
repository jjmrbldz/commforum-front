"use client"

import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AffiliateData } from "@/types";
import { Paginate } from "@/components/paginate";
import AffiliateRow from "./affiliate-row";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PointExchangeForm from "@/components/forms/point-exchange-form";

interface Props {
  data: AffiliateData[];
}

export default function AffiliateList({data}: Props) {
  const [affiliate, setAffilliate] = useState<AffiliateData | undefined>(undefined);
  return (
    <>
      <div className="space-y-2">
        <div className="overflow-x-auto max-w-[calc(100vw-1rem)]">
          <Table>
            <TableHeader className="text-sm">
              <TableRow>
                <TableHead className="text-center font-bold">번호</TableHead>
                <TableHead className="text-center font-bold">업체명</TableHead>
                <TableHead className="text-center font-bold">최소 교환금액</TableHead>
                <TableHead className="text-center font-bold">최대 교환금액</TableHead>
                <TableHead className="text-center font-bold">교환신청</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <AffiliateRow key={index} item={item} setAffilliate={setAffilliate} />
              ))}
            </TableBody>
            {data.length === 0 && (
              <TableCaption>No result found.</TableCaption>
            )}
          </Table>
        </div>
      </div>
      <Dialog open={!!affiliate} onOpenChange={() => setAffilliate(undefined)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Point Exchange</DialogTitle>
          </DialogHeader>
          <PointExchangeForm affiliate={affiliate!} setAffilliate={setAffilliate} />
        </DialogContent>
      </Dialog>
    </>
  )
}