import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { SearchButton } from "@/components/search-button"
import { menuList } from "@/lib/constants"
import { MenuButton } from "@/components/menu-button"
import Image from "next/image"
import logo from "@/assets/images/eyoom-logo.png"
import { useSiteDataStore } from "@/store/use-sitedata-store"
import HeaderMenu from "./header-menu"

export default function BotHeader() {
  const categories = useSiteDataStore(state => state.siteData?.categories);

  return (
    <div className="sticky top-0 z-2 bg-header md:bg-white/70 dark:bg-header/70 backdrop-blur-md">
      <div className="max-w-7xl py-4 px-2 md:px-0 m-auto">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex-0 md:flex-1">
            <div className="text-center">
              <MenuButton className="text-white md:text-black dark:text-white"/>
            </div>
            <div className="md:hidden ml-3">
              <Link href={'/'}>
                <Image width={78} height={40} src={logo} alt="Logo" />
              </Link>
            </div>
            {menuList.slice(0, 2).map((item, index) => <HeaderMenu key={index} path={item.href} title={item.title || ""} sublinks={item.children} />)}
            {categories?.map((item, index) => <HeaderMenu key={index} path={`/posts/${item.value}`} title={item.titleKr || ""} />)}
            {menuList.slice(2, 3).map((item, index) => <HeaderMenu key={index} path={item.href} title={item.title || ""} sublinks={item.children} />)}
            <div className="ml-auto mr-10 md:mr-0 text-center">
              <SearchButton className="text-white md:text-black dark:text-white" />
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}