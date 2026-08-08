import { type NextRequest, NextResponse } from "next/server"

// Matches common mobile device user agents (phones + tablets).
const MOBILE_UA_REGEX = /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile/i

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || ""
  const isMobile = MOBILE_UA_REGEX.test(userAgent)

  if (isMobile) {
    const url = request.nextUrl.clone()
    url.pathname = "/products"
    url.search = "?home=1"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Only intercept the marketing landing page itself.
  matcher: "/",
}
