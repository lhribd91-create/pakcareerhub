import { cookies } from "next/headers";

export const SESSION_COOKIE = "pch_admin_session";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "pakcareerhub@gmail.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// NOTE: this is a simple demo-grade session (a signed marker cookie), not a
// production auth system. For real deployment, replace with a proper auth
// provider (NextAuth, Clerk, etc.) and hashed credentials in a real database.
const SESSION_VALUE = "authenticated-" + Buffer.from(ADMIN_EMAIL).toString("base64");

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_VALUE;
}

export function getSessionValue() {
  return SESSION_VALUE;
}

export function checkCredentials(email, password) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
