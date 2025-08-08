import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function requireAdminAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized - Admin access required" },
      { status: 401 }
    );
  }

  const userSession = session as { user?: { role?: string } };
  
  if (!userSession.user || userSession.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized - Admin access required" },
      { status: 401 }
    );
  }
  
  return null; // Continue to the actual handler
} 