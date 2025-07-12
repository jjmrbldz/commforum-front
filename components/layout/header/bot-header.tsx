import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import logo from "@/assets/images/logo.jpg"
import Image from "next/image"
import { SearchButton } from "@/components/search-button"

export default function BotHeader() {
  return (
    <div className="-mt-2">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:!bg-blue-500">
              <Link href={'/board/notice'}>
                위너브라더
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[170px] !border-t-3 border-blue-500">
              <NavigationMenuLink href="/board/notice?subcategory=winner" className="hover:!bg-blue-500 hover:!text-white hover:!font-bold">위너공지사항</NavigationMenuLink>
              <NavigationMenuLink href="/inquiry" className="hover:!bg-blue-500 hover:!text-white hover:!font-bold">1:1문의</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:!bg-red-500">
              <Link href={'/board/warranty1'}>
                보증 사이트
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[170px] border-t-3 border-red-500">
              <NavigationMenuLink href="/board/warranty1" className="hover:!bg-red-500 hover:!text-white hover:!font-bold">보증 바카라 카지노</NavigationMenuLink>
              <NavigationMenuLink href="/board/warranty2" className="hover:!bg-red-500 hover:!text-white hover:!font-bold">보증 슬롯 카지노</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:!bg-indigo-500">
              <Link href={'/board/free'}>
                커뮤니티
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[170px] border-t-3 border-indigo-500">
              <NavigationMenuLink href="/board/free" className="hover:!bg-indigo-500 hover:!text-white hover:!font-bold">자유게시판</NavigationMenuLink>
              <NavigationMenuLink href="/board/onca" className="hover:!bg-indigo-500 hover:!text-white hover:!font-bold">온카 후기 게시판</NavigationMenuLink>
              <NavigationMenuLink href="/board/slot" className="hover:!bg-indigo-500 hover:!text-white hover:!font-bold">슬롯 후기 게시판</NavigationMenuLink>
              <NavigationMenuLink href="/board/signup" className="hover:!bg-indigo-500 hover:!text-white hover:!font-bold">가입인사</NavigationMenuLink>
              <NavigationMenuLink href="/board/attendance" className="hover:!bg-indigo-500 hover:!text-white hover:!font-bold">출석체크</NavigationMenuLink>
              <NavigationMenuLink href="/board/gambling-tip" className="hover:!bg-indigo-500 hover:!text-white hover:!font-bold">카지노 노하우</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

           <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:!bg-teal-500">
              <Link href={'/baccarat'}>
                위너바카라
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[170px] border-t-3 border-teal-500">
              <NavigationMenuLink href="/baccarat" className="hover:!bg-teal-500 hover:!text-white hover:!font-bold">위너 바카라</NavigationMenuLink>
              <NavigationMenuLink href="/baccarat-money" className="hover:!bg-teal-500 hover:!text-white hover:!font-bold">꽁머니 바카라</NavigationMenuLink>
              <NavigationMenuLink href="/board/winner" className="hover:!bg-teal-500 hover:!text-white hover:!font-bold">명예의전당</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <Link href={'/'} className="min-w-[125px]">
            <Image width={125} height={105} src={logo} alt="Winner Bro Logo" />
          </Link>         

          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:!bg-slate-500">
              <Link href={'/event/winner'}>
                이벤트
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[170px] border-t-3 border-slate-500">
              <NavigationMenuLink href="/event/winner" className="hover:!bg-slate-500 hover:!text-white hover:!font-bold">위너 이벤트</NavigationMenuLink>
              <NavigationMenuLink href="/event/user" className="hover:!bg-slate-500 hover:!text-white hover:!font-bold">회원 이벤트</NavigationMenuLink>
              <NavigationMenuLink href="/event/warrant" className="hover:!bg-slate-500 hover:!text-white hover:!font-bold">보증 이벤트</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:!bg-stone-500">
              <Link href={'/point'}>
                포인트교환
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[170px] border-t-3 border-stone-500">
              <NavigationMenuLink href="/event/winner" className="hover:!bg-stone-500 hover:!text-white hover:!font-bold">위브 포인트 교환</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:!bg-zinc-500">
              <Link href={'/board/casino'}>
                먹튀카지노
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[170px] border-t-3 border-zinc-500">
              <NavigationMenuLink href="/board/casino" className="hover:!bg-zinc-500 hover:!text-white hover:!font-bold">먹튀 카지노</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <div className="min-w-[100px] mt-6 text-center">
            <SearchButton />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}