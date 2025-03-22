import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard-header";

export const metadata: Metadata = {
  title: "Manajemen Mahasiswa",
  description: "Manajemen data mahasiswa",
};

export default function MahasiswaPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbItems={[
          { name: "Dashboard", url: "koordinator" },
          { name: "Mahasiswa", url: "koordinator/mahasiswa" },
        ]}
        titleItems={[
          {
            title: `Mahasiswa Bimbingan`,
            subtitle:
              "Berikut adalah data mahasiswa bimbingan dari Tugas Akhir",
          },
        ]}
      />

      <div className="flex flex-col justify-center">test isi</div>
    </div>
  );
}
