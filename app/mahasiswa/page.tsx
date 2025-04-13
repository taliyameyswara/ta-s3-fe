import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardHeader from "@/components/dashboard-header";

export const metadata: Metadata = {
  title: "Dashboard Mahasiswa",
  description: "Dashboard untuk mahasiswa Tugas Akhir",
};

export default async function MahasiswaDashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <DashboardHeader
        breadcrumbItems={[{ name: "Dashboard", url: "koordinator" }]}
        titleItems={[
          {
            title: `Selamat Datang, ${session?.user.name}`,
            subtitle: "Berikut adalah data-data yang dapat Anda akses.",
          },
        ]}
      />
      <div className="flex flex-col justify-center"></div>
    </>
  );
}
