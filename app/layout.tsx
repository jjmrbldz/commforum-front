import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { Toaster } from "sonner";
import Sidebar from "@/components/layout/sidebar";
import { ThemeProvider } from "next-themes";
import { ScrollToTopButton } from "@/components/scrolltop-button";
import Footer from "@/components/layout/footer";
// import { ThemeProvider } from "@/components/layout/theme-provider";

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '500', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "위너브로-카지노커뮤니티 온라인카지노 먹튀검증 카지노사이트",
  description: "온라인 카지노,온라인 바카라,카지노 검증,카지노 사이트,카지노 먹튀검증,온카 사이트,홀덤 사이트,먹튀 사이트,카지노 노하우 정보를 공유하는 카지노 커뮤니티 입니다.",
  keywords: "온라인카지노,카지노먹튀,카지노보증,카지노검증,온라인바카라,먹튀검증,토지노,검증커뮤니티,사이트먹튀,먹튀 검증업체,온라인슬롯,카지노 노하우,먹튀 사이트,카지노사이트,홀덤 사이트,카지노먹튀검증,카지노 커뮤니티,카지노 보증업체,바카라 검증업체,카지노 검증업체,온라인 카지노 먹튀,카지노 검증 사이트,카지노 보증 사이트,카지노 먹튀 신고,바카라검증,먹튀 검증 사이트,바카라검증 사이트,먹튀검증 커뮤니티,바카라 커뮤니티,온카 사이트,아벤카지노,소울카지노,위너브라더,위너브로",
  publisher: "위너브로-카지노커뮤니티 온라인카지노 먹튀검증 카지노사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${notoSansKR.className} antialiased`}
      >
        <ThemeProvider attribute="class">
          <Header />
          <div className="max-w-7xl m-auto">
            {children}
          </div>
          <Sidebar />
          <ScrollToTopButton />
          <Footer />
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
