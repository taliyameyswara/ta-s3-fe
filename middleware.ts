import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NEXTAUTH_SECRET } from "./lib/constant";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: NEXTAUTH_SECRET,
  });

  console.log(`Middleware running for path: ${pathname}`);

  const isAuthenticated = !!token;

  const isPublicRoute =
    pathname === "/" || pathname === "/login" || pathname === "/unauthorized";

  // redirect to role dashboard if authenticated
  if ((pathname === "/" || pathname === "/login") && isAuthenticated) {
    const role = token.role;

    if (role === "koordinator") {
      return NextResponse.redirect(new URL("/koordinator", request.url));
    } else if (role === "dosen") {
      return NextResponse.redirect(new URL("/dosen", request.url));
    } else if (role === "mahasiswa") {
      return NextResponse.redirect(new URL("/mahasiswa", request.url));
    }
  }

  // redirect to login if the route is not public and user is not authenticated
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated) {
    const role = token.role;

    if (pathname.startsWith("/koordinator") && role !== "koordinator") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    } else if (pathname.startsWith("/dosen") && role !== "dosen") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    } else if (pathname.startsWith("/mahasiswa") && role !== "mahasiswa") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
