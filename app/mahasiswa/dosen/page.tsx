import DosenPembimbing from "./content";
import { getPlottingDetail } from "@/lib/api/mahasiswa";

export default async function DosenPage() {
  let data;

  try {
    data = await getPlottingDetail();
  } catch (error) {
    console.error("Error fetching plotting detail:", error);
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Anda belum di plotting</p>
      </div>
    );
  }

  // Check if data is valid and successful
  if (!data || !data.success || !data.data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Anda belum di plotting</p>
      </div>
    );
  }

  const { promotor, co_promotor_1, co_promotor_2 } = {
    promotor: data.data.promotor || null,
    co_promotor_1: data.data.co_promotor_1 || null,
    co_promotor_2: data.data.co_promotor_2 || null,
  };

  return (
    <DosenPembimbing
      promotor={promotor}
      co_promotor_1={co_promotor_1}
      co_promotor_2={co_promotor_2}
    />
  );
}
