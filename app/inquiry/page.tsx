import InquiryForm from "@/components/forms/inquiry-form";
import { getInquiries } from "./actions";
import InquiryList from "@/components/pages/inquiry/inquiry-list";
import NotOkMessage from "@/components/not-ok-message";
import PageHeader from "@/components/page-header";


export default async function InquiryPage() {

  const res = await getInquiries();

  if (!res.ok) return <NotOkMessage message={res.message} />  
  
  return (
    <div className="space-y-4">
      <PageHeader title={decodeURIComponent("1:1 문의")} />
      <InquiryList data={res.data}  />
      <InquiryForm list={res.data} />
    </div>
  )
}