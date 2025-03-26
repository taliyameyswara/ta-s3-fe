import { Pagination } from "@/components/pagination";
import { MahasiswaTable } from "./table";

import getListMahasiswa from "@/lib/api/mahasiswa";

export async function MahasiswaContent({
  page,
  search,
  limit,
}: {
  page: number;
  search?: string;
  limit: number;
}) {
  const mahasiswaData = await getListMahasiswa(page, search, limit);

  return (
    <>
      <MahasiswaTable data={mahasiswaData?.data || []} />
      <Pagination
        currentPage={mahasiswaData?.meta?.current_page ?? 1}
        totalPages={mahasiswaData?.meta?.last_page ?? 1}
      />
    </>
  );
}
