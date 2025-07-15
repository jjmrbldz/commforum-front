import LoginForm from "@/components/forms/login-form";
import MemberMenuList from "@/components/menu/member-menu-list";
import ServiceMenuList from "@/components/menu/service-menu-list";
import UserMenuList from "@/components/menu/user-menu-list";

export default function UserSheet() {
  const isAuthenticated = false;
  return (
    <>
      <LoginForm />
      {isAuthenticated ? (
        <UserMenuList />
      ) : (
        <MemberMenuList />
      )}
      <ServiceMenuList />
    </>
  )
}