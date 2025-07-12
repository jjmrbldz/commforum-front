"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSheetStore } from "@/store/use-sheet-store";
import { ComponentType } from "react";
import { MenuSheet, NotifSheet, SearchSheet, UserSheet } from "./sheet";

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
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {SheetComponent && <SheetComponent />}
      </SheetContent>
    </Sheet>
  );
}