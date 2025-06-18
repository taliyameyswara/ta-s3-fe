"use client";

import { MahasiswaTable } from "./table";
import { Pagination } from "@/components/pagination";

import { Mahasiswa } from "@/type/mahasiswa";
import Loading from "../loading";
import { useListMahasiswa } from "@/lib/api/mahasiswa/client";
import { Suspense } from "react";

type MahasiswaContentProps = {
  page: number;
  search?: string;
  limit: number;
};

export function MahasiswaContent({
  page,
  search,
  limit,
}: MahasiswaContentProps) {
  const { data, error, isLoading } = useListMahasiswa(page, search, limit);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const mahasiswaData = data?.data || [];
  const meta = data?.meta || { current_page: 1, last_page: 1 };

  return (
    <>
      <MahasiswaTable data={mahasiswaData as Mahasiswa[]} />
      <Suspense>
        <Pagination
          currentPage={meta.current_page}
          totalPages={meta.last_page}
        />
      </Suspense>
    </>
  );
}
