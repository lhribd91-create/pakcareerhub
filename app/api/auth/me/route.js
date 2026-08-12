import { NextResponse } from "next/server";
import { isAdminAuthenticated, ADMIN_EMAIL } from "@/lib/auth";

export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({ authenticated: true, email: ADMIN_EMAIL });
}
