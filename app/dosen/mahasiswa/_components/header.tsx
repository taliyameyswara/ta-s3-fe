import { Suspense } from "react";
import { SearchInput } from "@/components/search-input";
import { LimitSelector } from "@/components/limit-selector";

export default function HeaderMahasiswa() {
  return (
    <>
      <Suspense>
        <div className="flex justify-between items-center mb-4">
          <SearchInput placeholder="Cari mahasiswa..." />
          <LimitSelector defaultValue={10} />
        </div>
      </Suspense>
    </>
  );
}
