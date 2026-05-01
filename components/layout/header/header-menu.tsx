import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeaderMenu({
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
    <NavigationMenuItem className="hidden md:block">
      <NavigationMenuTrigger className={cn("bg-transparent")} hasChildren={!!sublinks}>
        <Link href={path}>
          {title}
        </Link>
      </NavigationMenuTrigger>
      {sublinks && (
        <NavigationMenuContent className={"min-w-[170px]"}>
          {sublinks.map((subLink, subIndex) => (
            <NavigationMenuLink key={subIndex} href={subLink.href}>{subLink.title}</NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      )}
    </NavigationMenuItem>
  )
}