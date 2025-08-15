import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { SearchButton } from "@/components/search-button"
import { menuList } from "@/lib/constants"
import { MenuButton } from "@/components/menu-button"

export default function BotHeader() {
  return (
    <div className="max-w-7xl py-2 px-2 md:px-0 m-auto">
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex-0 md:flex-1">
          <div className="text-center">
            <MenuButton />
          </div>
          {menuList.map((item, index) => (
            <NavigationMenuItem className="hidden md:block" key={index}>
              <NavigationMenuTrigger className={item.triggerClassName} hasChildren={!!item.children}>
                <Link href={item.href}>
                  {item.title}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent className={"min-w-[170px]"}>
                {item.children && item.children.map((subLink, subIndex) => (
                  <NavigationMenuLink key={subIndex} href={subLink.href} className={item.linkClassName}>{subLink.title}</NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

          <div className="ml-auto text-center">
            <SearchButton />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}