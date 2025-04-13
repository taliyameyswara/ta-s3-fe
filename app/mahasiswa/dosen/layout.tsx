import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard-header";

export const metadata: Metadata = {
  title: "Dosen Pembimbing",
  description: "Dosen pembimbing mahasiswa",
};

export default async function LayoutMahasiswa({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardHeader
        breadcrumbItems={[{ name: "Dashboard", url: "/mahasiswa/dosen" }]}
        titleItems={[
          {
            title: `Dosen Pembimbing`,
            subtitle: "Berikut adalah dosen pembimbing yang diplot untuk Anda.",
          },
        ]}
      />
      <div className="flex flex-col justify-center">{children}</div>
    </div>
  );
}
