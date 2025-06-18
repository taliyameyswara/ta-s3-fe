"use client";

import Loading from "@/app/koordinator/dosen/loading";
import DosenDetail from "./content";
import DashboardHeader from "@/components/dashboard-header";
import { useDetailDosen } from "@/lib/api/dosen/client";
import { use } from "react";

export default function DosenDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const { data, error, isLoading } = useDetailDosen(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.success || !data.data) {
    return <div>Dosen tidak ditemukan</div>;
  }

  return (
    <>
      <DashboardHeader
        breadcrumbItems={[
          { name: "Dashboard", url: "/koordinator" },
          { name: "Dosen Pembimbing", url: "/koordinator/dosen" },
          { name: data.data.name, url: `koordinator/dosen/${data.data.id}` },
        ]}
      />
      <div className="flex flex-col justify-center">
        <DosenDetail dosen={data.data} />
      </div>
    </>
  );
}
