"use client"

import { useSheetStore } from "@/store/use-sheet-store";
import { useUserStore } from "@/store/use-user-store";
import { PlusCircle, Unlock, User, UserPlus2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopHeader() {
  const { setSheet } = useSheetStore();
  const user = useUserStore(state => state.user);
  const router = useRouter();

  return (
    <div className="border-b border-gray-700">
      <div className="hidden lg:flex items-center max-w-7xl m-auto text-xs py-4 gap-4 text-white font-light">
        <Link href={'/online-users'}>
          <div className="flex items-center gap-1">
            <User className="opacity-60" size={16} />
            <span>
              접속자 1
            </span>
          </div>
        </Link>
        <div className="ml-auto flex items-center gap-4">

          {!user && (
            <>
              <Link href={'/register'}>
                <div className="flex items-center gap-1">
                  <UserPlus2 className="opacity-60" size={16} />
                  <span>
                    회원가입
                  </span>
                </div>
              </Link>
              <div className="cursor-pointer" onClick={() => router.push("/login")}>
                <div className="flex items-center gap-1">
                  <Unlock className="opacity-60" size={16} />
                  <span>
                    로그인
                  </span>
                </div>
              </div>
            </>
          )}
          <div className="cursor-pointer" onClick={() => setSheet("menu")}>
            <div className="flex items-center gap-1">
              <PlusCircle className="opacity-60" size={16} />
              <span>
                추가메뉴
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}