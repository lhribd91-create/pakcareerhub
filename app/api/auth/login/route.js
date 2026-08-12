import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkCredentials, getSessionValue, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request) {
  const { email, password } = await request.json();

  if (!checkCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, getSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ success: true });
}
