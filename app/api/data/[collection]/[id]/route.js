import { NextResponse } from "next/server";
import { getById, update, remove, COLLECTIONS } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET(request, { params }) {
  const { collection, id } = await params;
  if (!COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  const item = getById(collection, id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request, { params }) {
  const { collection, id } = await params;
  if (!COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const item = update(collection, id, body);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function DELETE(request, { params }) {
  const { collection, id } = await params;
  if (!COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ok = remove(collection, id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
