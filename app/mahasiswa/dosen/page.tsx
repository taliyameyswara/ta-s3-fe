import DosenPembimbing from "./content";
import { notFound } from "next/navigation";
import { getPlottingDetail } from "@/lib/api/mahasiswa";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DosenPage() {
  const data = await getPlottingDetail();

  if (!data || !data.success) {
    notFound();
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DosenPembimbing
          promotor={data.data.promotor}
          co_promotor_1={data.data.co_promotor_1}
          co_promotor_2={data.data.co_promotor_2}
        />
      </Suspense>
    </>
  );
}
