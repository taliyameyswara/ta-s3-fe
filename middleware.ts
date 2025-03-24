import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NEXTAUTH_SECRET } from "./lib/constant";

const PUBLIC_ROUTES = ["/", "/login", "/unauthorized"];
const ROLE_REDIRECTS: Record<string, string> = {
  koordinator: "/koordinator",
  dosen: "/dosen",
  mahasiswa: "/mahasiswa",
};
const PROTECTED_ROUTES = ["koordinator", "dosen", "mahasiswa"];

const redirectTo = (path: string, request: NextRequest) =>
  NextResponse.redirect(new URL(path, request.url));

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request, secret: NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (
    !token ||
    (typeof token.exp === "number" && Date.now() >= token.exp * 1000)
  ) {
    return redirectTo("/login", request);
  }

  // redirect authenticated user from protected route to dashboard based on role
  if (isAuthenticated && (pathname === "/" || pathname === "/login")) {
    const role = token.role;
    const redirectPath = ROLE_REDIRECTS[role];
    if (redirectPath) {
      return redirectTo(redirectPath, request);
    }
  }

  // redirect unauthenticated user to login page
  if (!isPublicRoute && !isAuthenticated) {
    return redirectTo("/login", request);
  }

  // the requested protected route
  if (isAuthenticated) {
    const role = token.role;
    const requestedRole = PROTECTED_ROUTES.find((r) =>
      pathname.startsWith(`/${r}`)
    );

    if (requestedRole && role !== requestedRole) {
      return redirectTo("/unauthorized", request);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
