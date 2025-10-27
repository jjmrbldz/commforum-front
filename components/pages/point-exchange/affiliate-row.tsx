"use client"

import { NumberFormatter } from "@/components/number-formatter";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useUserStore } from "@/store/use-user-store";
import { AffiliateData } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  item: AffiliateData;
  setAffilliate: Dispatch<SetStateAction<AffiliateData | undefined>>;
}

export default function AffiliateRow({item, setAffilliate}: Props) {
  const user = useUserStore(state => state.user);
  

  return (
    <TableRow className="text-xs">
      <TableCell className="text-center">
        {item.id}
      </TableCell>
      <TableCell className="text-center">
        {item.companyName}
      </TableCell>
      <TableCell className="text-center">
        <NumberFormatter value={item.minExchangeAmount} suffix=" 원" />
      </TableCell>
      <TableCell className="text-center">
        <NumberFormatter value={item.maxExchangeAmount} suffix=" 원" />
      </TableCell>
      <TableCell className="text-center">
        {user ? (
          <Button size={"xs"} onClick={() => setAffilliate(item)}>Exchange</Button>
        ) : "로그인 후 이용해주세요"}
      </TableCell>
    </TableRow>
  )
}