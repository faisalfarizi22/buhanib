import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin-auth";

const allowedStatuses = new Set(["active", "inactive", "prospect", "archived"]);

function cleanCoachPayload(body: Record<string, unknown>) {
  const status = String(body.status || "active").toLowerCase();

  return {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim() || null,
    phone: String(body.phone || "").trim() || null,
    expertise: String(body.expertise || "").trim() || null,
    field: String(body.field || "").trim() || null,
    category: String(body.category || "").trim() || null,
    rate: String(body.rate || "").trim() || null,
    availability: String(body.availability || "").trim() || null,
    cv_url: String(body.cvUrl || body.cv_url || "").trim() || null,
    linkedin_url: String(body.linkedinUrl || body.linkedin_url || "").trim() || null,
    linkedin_summary: String(body.linkedinSummary || body.linkedin_summary || "").trim() || null,
    bio: String(body.bio || "").trim() || null,
    notes: String(body.notes || "").trim() || null,
    status: allowedStatuses.has(status) ? status : "active",
  };
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if ("error" in admin) {
    return NextResponse.json({ success: false, error: admin.error }, { status: admin.status });
  }

  const payload = cleanCoachPayload(await req.json());
  if (!payload.name) {
    return NextResponse.json({ success: false, error: "Nama coach wajib diisi." }, { status: 400 });
  }

  const { data, error } = await createServerSupabase()
    .from("coaches")
    .insert(payload)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, coach: data });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req);
  if ("error" in admin) {
    return NextResponse.json({ success: false, error: admin.error }, { status: admin.status });
  }

  const body = await req.json();
  const id = String(body.id || "");
  if (!id) {
    return NextResponse.json({ success: false, error: "ID coach tidak ditemukan." }, { status: 400 });
  }

  const payload = cleanCoachPayload(body);
  const { data, error } = await createServerSupabase()
    .from("coaches")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, coach: data });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin(req);
  if ("error" in admin) {
    return NextResponse.json({ success: false, error: admin.error }, { status: admin.status });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, error: "ID coach tidak ditemukan." }, { status: 400 });
  }

  const { error } = await createServerSupabase().from("coaches").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
