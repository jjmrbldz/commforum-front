"use client"

import DateToday from "@/components/date-today";
import Link from "next/link";
import { toast } from "sonner";

export default function TopHeader() {
  const handleFaveClick = () => {
    toast("Ctrl+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.", { position: "top-center" })
  }
  return (
    <div className="hidden lg:flex items-center text-xs pt-2 gap-3 text-neutral-900 font-light">
      <div 
        className="cursor-pointer"
        onClick={handleFaveClick}
      >
        즐겨찾기
      </div>
      <span>|</span>
      <Link href={'/rss'}>RSS 구독</Link>
      <span>|</span>
      <DateToday />
      <Link href={'/login'} className="ml-auto">로그인</Link>
      <span>|</span>
      <Link href={'/register'} className="">회원가입</Link>
      <span>|</span>
      <Link href={'/forgot-password'} className="">정보찾기</Link>
      <span>|</span>
      <div className="cursor-pointer">검색하기</div> {/* Search */}
      <span>|</span>
      <Link href={'/online-users'} className="">
       <span>접속자 </span>
       <span>{455} </span>
       <span className="text-orange-700">({22})</span>
      </Link>
    </div>
  )
}