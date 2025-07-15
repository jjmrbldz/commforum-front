import AuthUserButtons from "@/components/auth/auth-user-button";
import SidebarTitle from "@/components/sidebar-title";
import { MessageResponse, NotifResponse } from "./notif";

export default function NotifSheet() {
  const isAuthenticated = false;
  return (
    <>
      <AuthUserButtons />
      
      {isAuthenticated ? (
        <>
          <NotifResponse />
          <MessageResponse />
        </>
      ): (
        <>
          <SidebarTitle title="RESPONSE" />
          <div className="">로그인 후 이용할 수 있습니다.</div>
        </>
      )}
    </>
  )
}