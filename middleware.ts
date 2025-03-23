import { NextResponse } from "next/server";

export function middleware(req: any) {
  const url = req.nextUrl;

  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}
