import AuthUserButtons from "@/components/auth/auth-user-button";
import SearchForm from "@/components/forms/search-form";
import SidebarTitle from "@/components/sidebar-title";


export default function SearchSheet() {
  return (
    <>
      <AuthUserButtons />
      <SidebarTitle title="SEARCH" />
      <SearchForm />
    </>
  )
}