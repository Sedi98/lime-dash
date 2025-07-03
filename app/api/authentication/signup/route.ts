// signup route
// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

//  signup a new user
export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const data = await req.json();
  console.log(data);

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ message: "Success", authData }, { status: 200 });
}
