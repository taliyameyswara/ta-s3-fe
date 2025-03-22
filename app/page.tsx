import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = session.user.role;
  if (role === "koordinator") {
    redirect("/koordinator");
  } else if (role === "dosen") {
    redirect("/dosen");
  } else if (role === "mahasiswa") {
    redirect("/mahasiswa");
  }

  return null;
}
