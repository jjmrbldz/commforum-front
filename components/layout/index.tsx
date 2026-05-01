"use client"

import Header from "./header";
import Sidebar from "./sidebar";
import { ScrollToTopButton } from "../scrolltop-button";
import ThemeButton from "../theme-button";
import Footer from "./footer";
import { SiteDataState, useSiteDataStore } from "@/store/use-sitedata-store";
import { useEffect } from "react";
import { UserSession } from "@/types";
import { useUserStore } from "@/store/use-user-store";

interface Props {
  children: React.ReactNode;
  siteData: SiteDataState["siteData"];
  user?: UserSession;
}

export default function LayoutWrapper({ children, siteData, user }: Props) {
  const setSiteData = useSiteDataStore(state => state.setSiteData);
  const setUserSession = useUserStore(state => state.setUserSession);

  useEffect(() => {
    setSiteData(siteData);
    setUserSession(user);
  }, [siteData, user])

  return (
    <>
      <Header />
      {children}
      <Sidebar />
      <ScrollToTopButton />
      <ThemeButton />
      <Footer />
    </>
  )
}