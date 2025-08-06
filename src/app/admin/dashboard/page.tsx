import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminPanel from "./AdminPanel"; // we’ll create this file

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user && session.user.role !== "admin") {
    redirect("/dashboard"); // or home
  }

  // If admin, render the admin panel (client component)
  return <AdminPanel />;
}
