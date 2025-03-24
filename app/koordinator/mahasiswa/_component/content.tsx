import { MahasiswaTable } from "./table";
import { MahasiswaPagination } from "./pagination";
import getListMahasiswa from "@/lib/api/koordinator/mahasiswa";

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
      <MahasiswaPagination
        currentPage={mahasiswaData?.meta?.current_page ?? 1}
        totalPages={mahasiswaData?.meta?.last_page ?? 1}
      />
    </>
  );
}
