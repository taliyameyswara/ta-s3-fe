import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard-header";
import { getMahasiswaById } from "@/lib/api/mahasiswa";

export const metadata: Metadata = {
  title: "Logbook Bimbingan",
  description: "Logbook bimbingan mahasiswa",
};

export default async function LayoutMahasiswa({
  params,
  children,
}: {
  params: Promise<{ id: number }>;
  children: React.ReactNode;
}) {
  const { id } = await params;
  let mahasiswaName = "Mahasiswa";

  try {
    const response = await getMahasiswaById(id);
    mahasiswaName = response.data.name || "Mahasiswa";
  } catch (error) {
    console.error(`Error fetching mahasiswa ${id}:`, error);
  }

  return (
    <div>
      <DashboardHeader
        breadcrumbItems={[{ name: "Dashboard", url: "/mahasiswa/dosen" }]}
        titleItems={[
          {
            title: `Data Dokumen dan Logbook Mahasiswa`,
            subtitle: `Dokumen pengajuan dan logbook mahasiswa ${mahasiswaName}`,
          },
        ]}
      />
      <div className="flex flex-col justify-center">{children}</div>
    </div>
  );
}
