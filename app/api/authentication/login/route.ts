// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { email, password } = await req.json();

    // Input validation (basic, you can extend it more)
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email və şifrə tələb olunur" },
        { status: 400 }
      );
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error.code);

      // Custom error mapping
      const translatedError = error.code?.includes("invalid_credentials")
        ? "Yanlış email və ya şifrə daxil edilib"
        : error.code?.includes("email_not_confirmed")
        ? "Email Təsdiqlənməyib"
        : error.code?.includes("user_banned")
        ? "Sizin hesabınız banlandı. Xahiş edirik qaydalara riayət edin"
        : "Giriş zamanı xəta baş verdi";

      return NextResponse.json({ error: translatedError }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Giriş uğurla tamamlandı", user: authData.user },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Serverdə gözlənilməz xəta baş verdi" },
      { status: 500 }
    );
  }
}
