import DosenDetail from "./content";
import { getDosenById } from "@/lib/api/dosen";
import DashboardHeader from "@/components/dashboard-header";

export default async function DosenDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const dosen = await getDosenById(id);

  return (
    <>
      <DashboardHeader
        breadcrumbItems={[
          { name: "Dashboard", url: "/koordinator" },
          { name: "Dosen Pembimbing", url: "/koordinator/dosen" },
          { name: dosen.data.name, url: `koordinator/dosen/${dosen.data.id}` },
        ]}
      />
      <div className="flex flex-col justify-center">
        <DosenDetail dosen={dosen.data} />
      </div>
    </>
  );
}
