
export default function middleware() {}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|uploads/).*)',
  ],
}