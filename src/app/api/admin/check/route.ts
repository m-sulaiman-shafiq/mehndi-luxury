import { NextResponse } from "next/server";
import { createClient } from "@/lib/backend/supabase";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: admin, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !admin) {
    return NextResponse.json({ error: "Not authorised" }, { status: 403 });
  }

  return NextResponse.json({ authorised: true });
}
