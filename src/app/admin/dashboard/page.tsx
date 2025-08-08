import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminPanel from "./AdminPanel"; // we’ll create this file

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Type assertion to handle the session type
  const userSession = session as { user?: { role?: string } };
  
  if (!userSession.user || userSession.user.role !== "admin") {
    redirect("/dashboard"); // or home
  }

  // If admin, render the admin panel (client component)
  return <AdminPanel />;
}
