import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";


export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (pathname === "/dashboard") {
    if (!req.auth) {
      const newUrl = new URL("/auth/signin", req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }
  }

  if (pathname === "/auth/signin") {
    if (req.auth) {
      const newUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }
  }

  if (pathname === "/banks") {
    if (!req.auth) {
      const newUrl = new URL("/auth/signin", req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    const hasManagerRole = req.auth.roles?.includes("manager");

    if (!hasManagerRole) {
      return new Response("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
});

