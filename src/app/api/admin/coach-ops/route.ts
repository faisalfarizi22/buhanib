import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin-auth";

const resources = {
  assignments: {
    table: "coach_assignments",
    fields: ["coach_id", "client_name", "program_name", "service", "status", "start_date", "end_date", "notes"],
  },
  sessions: {
    table: "coach_sessions",
    fields: ["coach_id", "assignment_id", "session_date", "duration_minutes", "topic", "rating", "evaluation", "notes"],
  },
  availability: {
    table: "coach_availability",
    fields: ["coach_id", "day_of_week", "time_window", "mode", "status", "notes"],
  },
  documents: {
    table: "coach_documents",
    fields: ["coach_id", "title", "document_type", "document_url", "status", "expiry_date", "notes"],
  },
} as const;

type ResourceKey = keyof typeof resources;

function getResource(req: NextRequest): ResourceKey | null {
  const resource = req.nextUrl.searchParams.get("resource") as ResourceKey | null;
  return resource && resource in resources ? resource : null;
}

function cleanPayload(resource: ResourceKey, body: Record<string, unknown>) {
  const config = resources[resource];
  return Object.fromEntries(
    config.fields.map((field) => {
      const value = body[field];
      if (field === "duration_minutes" || field === "rating") {
        const numberValue = Number(value);
        return [field, Number.isFinite(numberValue) ? numberValue : null];
      }
      return [field, typeof value === "string" ? value.trim() || null : value || null];
    })
  );
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if ("error" in admin) {
    return NextResponse.json({ success: false, error: admin.error }, { status: admin.status });
  }

  const resource = getResource(req);
  if (!resource) {
    return NextResponse.json({ success: false, error: "Resource HRM tidak valid." }, { status: 400 });
  }

  const body = await req.json();
  const payload = cleanPayload(resource, body);
  const { data, error } = await createServerSupabase()
    .from(resources[resource].table)
    .insert(payload)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req);
  if ("error" in admin) {
    return NextResponse.json({ success: false, error: admin.error }, { status: admin.status });
  }

  const resource = getResource(req);
  if (!resource) {
    return NextResponse.json({ success: false, error: "Resource HRM tidak valid." }, { status: 400 });
  }

  const body = await req.json();
  const id = String(body.id || "");
  if (!id) {
    return NextResponse.json({ success: false, error: "ID data HRM tidak ditemukan." }, { status: 400 });
  }

  const payload = cleanPayload(resource, body);
  const { data, error } = await createServerSupabase()
    .from(resources[resource].table)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin(req);
  if ("error" in admin) {
    return NextResponse.json({ success: false, error: admin.error }, { status: admin.status });
  }

  const resource = getResource(req);
  const id = req.nextUrl.searchParams.get("id");
  if (!resource || !id) {
    return NextResponse.json({ success: false, error: "Resource atau ID tidak valid." }, { status: 400 });
  }

  const { error } = await createServerSupabase().from(resources[resource].table).delete().eq("id", id);
  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
