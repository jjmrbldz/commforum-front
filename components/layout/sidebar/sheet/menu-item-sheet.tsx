import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";


export default function MenuItemSheet({
  path, 
  title, 
  sublinks,
}: {
  path: string,
  title: string,
  sublinks?: {
      title: string;
      href: string;
  }[];
}) {

  return (
    <AccordionItem
      value={path}
    >
      <AccordionTrigger
        className={cn("data-[state=open]:text-red-500")}
      >
        <Link href={path} className="text-xs font-light">
          {title}
        </Link>
      </AccordionTrigger>
      <AccordionContent 
        className="flex flex-col text-balance"
      >
        {sublinks && sublinks.map((subLink, subIndex) => (
          <Link 
            key={subIndex}
            href={subLink.href}
            className="text-xs font-light py-2 pl-3 bg-slate-50 border-b border-slate-200 last:border-b-0 hover:text-red-500"
          >
            {subLink.title}
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  )

}