import PageHeader from "@/components/page-header";
import AffiliateList from "@/components/pages/point-exchange/affiliate-list";
import PointExchangeHistory from "@/components/pages/point-exchange/point-exchange-history";
import { getAffiliateSettings } from "./actions";

export default async function Page() {
  const affiliates = await getAffiliateSettings({page: "1", limit: process.env.NEXT_PUBLIC_LIMIT || "20",});

  return (
    <div className="space-y-4">
      <PageHeader title={"포인트 교환"} />
      <div className="">
        <div className="text-lg font-bold mb-2">제휴카지노 포인트 교환신청</div>
        <AffiliateList data={affiliates.ok ? affiliates.data : []} />
      </div>
      <div className="">
        <div className="text-lg font-bold mb-2">제휴카지노 포인트 교환내역</div>
        <PointExchangeHistory />
      </div>
    </div>
  );
}