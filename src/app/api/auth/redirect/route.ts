import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Type assertion to handle the session type
    const userSession = session as { user?: { role?: string } };

    if (userSession.user?.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/dash", request.url));
    }
  } catch (error) {
    console.error("Auth redirect error:", error);
    return NextResponse.redirect(new URL("/dash", request.url));
  }
}
