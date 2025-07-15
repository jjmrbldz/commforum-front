import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import logo from "@/assets/images/logo.jpg"
import Image from "next/image"
import { SearchButton } from "@/components/search-button"
import { menuList } from "@/lib/constants"

export default function BotHeader() {
  return (
    <div className="-mt-2">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>

          {menuList.slice(0, 4).map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger className={item.triggerClassName}>
                <Link href={item.href}>
                  {item.title}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent className={item.contentClassname}>
                {item.children && item.children.map((subLink, subIndex) => (
                  <NavigationMenuLink key={subIndex} href={subLink.href} className={item.linkClassName}>{subLink.title}</NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

          <Link href={'/'} className="min-w-[125px]">
            <Image width={125} height={105} src={logo} alt="Winner Bro Logo" priority={true} style={{ width: "auto", height: "auto" }} />
          </Link>         

          {menuList.slice(4).map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger className={item.triggerClassName}>
                <Link href={item.href}>
                  {item.title}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent className={item.contentClassname}>
                {item.children && item.children.map((subLink, subIndex) => (
                  <NavigationMenuLink key={subIndex} href={subLink.href} className={item.linkClassName}>{subLink.title}</NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

          <div className="min-w-[120px] mt-6 text-center">
            <SearchButton />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}