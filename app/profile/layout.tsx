import LeftPanel from "@/components/pages/board/left-panel";
import ProfileTab from "@/components/pages/profile/profile-tabs";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="max-w-7xl m-auto">
      <div className="grid md:grid-cols-12 p-4 md:p-0 gap-4">
        <LeftPanel />
        <div className="col-span-12 md:col-span-9 py-4 space-y-4">
          <ProfileTab />
          {children}
        </div>
      </div>
    </div>
  )
}