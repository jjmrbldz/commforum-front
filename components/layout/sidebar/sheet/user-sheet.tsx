"use client"

import MemberMenuList from "@/components/menu/member-menu-list";
import ServiceMenuList from "@/components/menu/service-menu-list";
import UserMenuList from "@/components/menu/user-menu-list";
import { useUserStore } from "@/store/use-user-store";

export default function UserSheet() {
  const user = useUserStore(state => state.user);
  return (
    <>
      {user ? (
        <UserMenuList />
      ) : (
        <MemberMenuList />
      )}
      <ServiceMenuList />
    </>
  )
}