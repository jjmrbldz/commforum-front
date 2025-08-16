import Header from "./header";
import Sidebar from "./sidebar";
import { ScrollToTopButton } from "../scrolltop-button";
import ThemeButton from "../theme-button";
import Footer from "./footer";

export default function LayoutWrapper({ children } : { children: React.ReactNode }) {
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