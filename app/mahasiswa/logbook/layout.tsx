import type { Metadata } from "next";
import DashboardHeader from "@/components/dashboard-header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Logbook Bimbingan",
  description: "Logbook bimbingan mahasiswa",
};

export default async function LayoutMahasiswa({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <DashboardHeader
        breadcrumbItems={[{ name: "Dashboard", url: "/mahasiswa/logbook" }]}
        titleItems={[
          {
            title: `Data Dokumen dan Logbook ${
              session?.user.name.split(" ")[0]
            }`,
            subtitle: "Berikut adalah dokumen pengajuan dan logbook Anda.",
          },
        ]}
      />
      <div className="flex flex-col justify-center">{children}</div>
    </div>
  );
}
