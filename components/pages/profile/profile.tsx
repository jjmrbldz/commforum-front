"use client"

import ProfileForm from "@/components/forms/profile-form";
import { NumberFormatter } from "@/components/number-formatter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserSession } from "@/types";
import { useMemo } from "react";

export default function Profile({nextLevelExp, user}:{nextLevelExp: number; user: UserSession}) {

 const progressPercentage = useMemo(() => ((user?.exp || 0) / nextLevelExp) * 100, [nextLevelExp]);
  
 return (
  <div className="space-y-4">
    <div className="text-lg"><span className="font-bold">{user?.username}&apos;s</span> Page</div>
    <div className="border border-slate-300 p-4">
      <div className="flex gap-2">
        <div className="flex flex-col items-center">
          <Avatar className="size-14 mb-2">
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
            <AvatarFallback className="uppercase font-bold text-lg">{user?.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="">{user?.name} <span className="text-slate-500">({user?.nickname})</span></div>
          <div className="">{user?.email}</div>
        </div>
        <div className="w-[1px] bg-black/10"></div>
        <div className="flex-1 space-y-6">
          <div className="flex gap-4">
            <div className="text-sm">
              포인트: <NumberFormatter className="text-red-500 font-bold" value={user?.balance} />
            </div>
            <div className="text-sm">
              경험치: <NumberFormatter className="text-red-500 font-bold" value={user?.exp} />
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-between">
              <div className="">Level: {user?.level}</div>
              <div className="">Level: {(Number(user?.level) || 0) + 1}</div>
            </div>
            <div className="relative h-[6px] rounded-full bg-gray-300">
              <div className="h-full bg-yellow-500 rounded-full" style={{width: `${progressPercentage}%`}}></div>
            </div>
            <div className="text-center text-slate-500">
              <NumberFormatter value={user?.exp} />
              {" / "}
              <NumberFormatter value={nextLevelExp} />
              {" "}
              ({progressPercentage}%)
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="text-sm">Edit information</div>
    <ProfileForm user={user} />
  </div>
 )
}