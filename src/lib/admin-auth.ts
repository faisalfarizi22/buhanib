import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAILS = new Set(
  (process.env.ADMIN_EMAILS || "admin@binahub.id")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
);

export async function requireAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return { error: "Token tidak ditemukan", status: 401 as const };
  }

  const { data, error } = await supabase.auth.getUser(token);
  const email = data.user?.email?.toLowerCase();

  if (error || !email || !ADMIN_EMAILS.has(email)) {
    return { error: "Akses admin tidak valid", status: 403 as const };
  }

  return { email };
}
