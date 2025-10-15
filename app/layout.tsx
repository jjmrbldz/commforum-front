import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/layout/theme-provider";
import LayoutWrapper from "@/components/layout";
import { getSiteData } from "./actions";

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '500', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "타짜365-카지노커뮤니티 온라인카지노 먹튀검증 카지노사이트",
  description: "온라인 카지노,온라인 바카라,카지노 검증,카지노 사이트,카지노 먹튀검증,온카 사이트,홀덤 사이트,먹튀 사이트,카지노 노하우 정보를 공유하는 카지노 커뮤니티 입니다.",
  keywords: "온라인카지노,카지노먹튀,카지노보증,카지노검증,온라인바카라,먹튀검증,토지노,검증커뮤니티,사이트먹튀,먹튀 검증업체,온라인슬롯,카지노 노하우,먹튀 사이트,카지노사이트,홀덤 사이트,카지노먹튀검증,카지노 커뮤니티,카지노 보증업체,바카라 검증업체,카지노 검증업체,온라인 카지노 먹튀,카지노 검증 사이트,카지노 보증 사이트,카지노 먹튀 신고,바카라검증,먹튀 검증 사이트,바카라검증 사이트,먹튀검증 커뮤니티,바카라 커뮤니티,온카 사이트,아벤카지노,소울카지노,위너브라더,타짜365",
  publisher: "타짜365-카지노커뮤니티 온라인카지노 먹튀검증 카지노사이트",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteData = await getSiteData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${notoSansKR.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper siteData={siteData} user={siteData?.user}>
            {children}
          </LayoutWrapper>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
