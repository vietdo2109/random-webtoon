import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // ①  Ignore the refresh endpoint (and anything else you don’t want guarded)
  if (req.nextUrl.pathname.startsWith("/api/refresh-token")) {
    return NextResponse.next();
  }

  if (req.method === "POST") return NextResponse.next();
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;
  if (!token) return NextResponse.next();

  const { exp } = decodeJwt(token);
  const willExpireSoon = exp && (exp - 300) * 1000 < Date.now();

  if (willExpireSoon) {
    const url = new URL(
      `/api/refresh-token?redirect=${encodeURIComponent(req.nextUrl.pathname)}`,
      req.url
    );
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
