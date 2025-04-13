import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard-header";
import HeaderMahasiswa from "./_components/header";

export const metadata: Metadata = {
  title: "Manajemen Mahasiswa",
  description: "Manajemen data mahasiswa",
};

export default async function LayoutMahasiswa({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardHeader
        breadcrumbItems={[
          { name: "Dashboard", url: "dosen" },
          { name: "Mahasiswa", url: "dosen/mahasiswa" },
        ]}
        titleItems={[
          {
            title: "Mahasiswa Bimbingan",
            subtitle:
              "Berikut adalah data mahasiswa bimbingan dari Tugas Akhir",
          },
        ]}
      />
      <div className="flex flex-col justify-center">
        <HeaderMahasiswa />
        {children}
      </div>
    </div>
  );
}
