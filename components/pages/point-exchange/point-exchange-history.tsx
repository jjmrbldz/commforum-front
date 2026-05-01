import { getUserWithdrawalLogs } from "@/app/point-exchange/actions";
import ExchangeHistoryList from "./exchange-history-list";
import NotOkMessage from "@/components/not-ok-message";


export default async function PointExchangeHistory() {
  const result = await getUserWithdrawalLogs({page: "1", limit: process.env.NEXT_PUBLIC_LIMIT || "20",});

  if (!result.ok) return <NotOkMessage title="" message={result.message} />;

  return <ExchangeHistoryList data={result.data} totalItems={result.totalItems} totalPages={result.totalPages} />
}