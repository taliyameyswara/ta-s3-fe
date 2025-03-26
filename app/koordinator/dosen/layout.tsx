import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard-header";
import HeaderDosen from "./_components/header";

export const metadata: Metadata = {
  title: "Manajemen Dosen",
  description: "Manajemen data dosen",
};

export default async function LayoutDosen({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardHeader
        breadcrumbItems={[
          { name: "Dashboard", url: "koordinator" },
          { name: "Dosen", url: "koordinator/dosen" },
        ]}
        titleItems={[
          {
            title: "Dosen Pembimbing",
            subtitle: "Berikut adalah data dosen pembimbing dari Tugas Akhir",
          },
        ]}
      />
      <div className="flex flex-col justify-center">
        <HeaderDosen />
        {children}
      </div>
    </div>
  );
}
