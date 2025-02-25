import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/...[nextauth]";
import { redirect } from "next/navigation";

export default async function SessionControl() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return session;
}
