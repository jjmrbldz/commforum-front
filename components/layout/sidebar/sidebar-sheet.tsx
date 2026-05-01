"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSheetStore } from "@/store/use-sheet-store";
import { ComponentType } from "react";
import { MenuSheet, NotifSheet, SearchSheet, UserSheet } from "./sheet";
import SidebarButton from "./sidebar-button";

const sheetMap: Record<string, { title: string; component: ComponentType }> = {
  menu: { title: "Menu", component: MenuSheet },
  user: { title: "User", component: UserSheet },
  notif: { title: "Notif", component: NotifSheet },
  search: { title: "Search", component: SearchSheet },
};

export default function SidebarSheet() {
  const { activeSheet, setSheet } = useSheetStore();

  const sheetEntry = activeSheet ? sheetMap[activeSheet] : null;
  const SheetComponent = sheetEntry?.component;
  const title = sheetEntry?.title ?? "";

  return (
    <Sheet open={!!activeSheet} onOpenChange={() => setSheet(null)}>
      
      <SheetContent side="right" className="w-[280px] sm:w-[280px] border-x-0 border-b-0 border-t-10 border-slate-800 p-3">
        <SidebarButton isInsideSheet />
        <SheetHeader className="sr-only">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            This sheet dialog is for menu, user information, notification and searching.
          </SheetDescription>
        </SheetHeader>
        {SheetComponent && <SheetComponent />}
      </SheetContent>
    </Sheet>
  );
}