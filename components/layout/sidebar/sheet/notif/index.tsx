import SidebarTitle from "@/components/sidebar-title";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

function NotifResponse() {
  return (
    <>
      <SidebarTitle title="RESPONSE" />
      <div className="text-neutral-500 text-xs">새로운 내글반응이 없습니다.</div>
      <div className="flex flex-row items-center gap-2">
        <Checkbox id="batch-check" defaultChecked={true} />
        <Label htmlFor="batch-check" className="text-xs font-light">일괄확인/리카운트</Label>
      </div>
    </>
  )
}

function MessageResponse() {
  return (
    <>
      <SidebarTitle title="MESSAGE" />
      <div className="text-neutral-500 text-xs">새로온 쪽지가 없습니다.</div>
      <div className="flex flex-row items-center gap-2">
        <Mail size={18} className="text-neutral-500" />
        <Label htmlFor="batch-check" className="text-xs font-light">일괄확인/리카운트</Label>
      </div>
    </>
  )
}

export {
  NotifResponse,
  MessageResponse
}