import { cn } from "@/lib/utils";
import SidebarTitle from "../sidebar-title";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Link from "next/link";
import { NumberFormatter } from "../number-formatter";
import { userMenuList } from "@/lib/constants";

export default function UserMenuList() {
  return (
    <>
      <SidebarTitle title="MY MENU" />
      <Accordion
        type="single"
        className="w-full text-xs"
      >
        <AccordionItem
          value={'/points'}
        >
          <AccordionTrigger
            className={cn("data-[state=open]:text-red-500")}
            onClick={(e) => e.preventDefault()}
            isDefaultOpen
            isIconHidden
          >
            <Link href={'/points'} className="text-xs font-light w-full flex justify-between">
              <span>MP</span>
              <NumberFormatter value={31876} suffix=" 점" />
            </Link>
          </AccordionTrigger>
        </AccordionItem>
        {userMenuList.map((item, index) => (
          <AccordionItem
            key={index}
            value={item.href}
          >
            <AccordionTrigger
              className={cn("data-[state=open]:text-red-500")}
              onClick={(e) => e.preventDefault()}
              isDefaultOpen
            >
              <Link href={item.href} className="text-xs font-light w-full">
                {item.title}
              </Link>
            </AccordionTrigger>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}