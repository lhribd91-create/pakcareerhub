import { NextResponse } from "next/server";
import { getAll, create, COLLECTIONS } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET(request, { params }) {
  const { collection } = await params;
  if (!COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  const items = getAll(collection);
  return NextResponse.json({ items });
}

export async function POST(request, { params }) {
  const { collection } = await params;
  if (!COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const item = create(collection, body);
  return NextResponse.json({ item }, { status: 201 });
}
