"use client"

import { useUserStore } from "@/store/use-user-store";
import LoginForm from "../forms/login-form";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { NumberFormatter } from "../number-formatter";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import LogoutButton from "./logout-button";

export default function ProfileBox() {
  const user = useUserStore(state => state.user);

  return !user ? (
    <LoginForm />
  ) : (
    <div className="mb-4">
      <div className="flex gap-2">
        <div className="relative">
          <Avatar className="size-12">
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
            <AvatarFallback className="uppercase font-bold text-lg">{user.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <Badge className="absolute bottom-0 -right-1 rounded-full text-[10px] font-bold px-[6px] py-[4px] leading-none">{user.level}</Badge>
        </div>
        <div className="">
          <div className="font-bold text-sm">{user.username}</div>
          <div className="text-xs">포인트: <NumberFormatter value={user.point} /></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Link href="/profile">
          <Button size={"sm"} variant="default" className="text-xs w-full">내정보</Button>
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}