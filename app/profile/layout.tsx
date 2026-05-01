import PageLayout from "@/components/layout/page-layout";
import ProfileTab from "@/components/pages/profile/profile-tabs";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {

  return (
    <PageLayout>
      <ProfileTab />
      {children}
    </PageLayout>
  )
}