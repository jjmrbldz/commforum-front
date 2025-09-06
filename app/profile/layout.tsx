import PageLayout from "@/components/layout/page-layout";
import ProfileTab from "@/components/pages/profile/profile-tabs";
import { requireUserSession } from "@/lib/session";
import { ReactNode } from "react";

export default async function Layout({children}: {children: ReactNode}) {
  await requireUserSession();
  return (
    <PageLayout>
      <ProfileTab />
      {children}
    </PageLayout>
  )
}