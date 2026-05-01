import { cn } from "@/lib/utils";
import SidebarTitle from "../sidebar-title";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Link from "next/link";
import { serviceMenuList } from "@/lib/constants";

export default function ServiceMenuList() {
  return (
    <>
      <SidebarTitle title="SERVICE" />
      <Accordion
        type="single"
        className="w-full text-xs"
      >
        {serviceMenuList.map((item, index) => (
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