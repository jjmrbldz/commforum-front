import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";


export default function FooterTop() {
  return (
    <div className="col-span-12 py-8 mb-8 border-b border-white/30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-4 text-footer-foreground/60">
          <Link href={'/terms'}>서비스이용약관</Link>
          <Link href={'/policy'}>개인정보처리방침</Link>
        </div>
        <div className="">
          <Select>
            <SelectTrigger size="lg" className="w-full h-20 min-w-40 outline-none border-none bg-[#424244] !text-white text-sm">
              <SelectValue placeholder="관련 사이트" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"Site 1"}>Site 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}