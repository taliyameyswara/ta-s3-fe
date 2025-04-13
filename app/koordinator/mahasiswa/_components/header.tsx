"use client";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { AddEditMahasiswaModal } from "./add-edit-modal";
import { SearchInput } from "@/components/search-input";
import { LimitSelector } from "@/components/limit-selector";
import ImportDataButton from "@/components/import";

export default function HeaderMahasiswa() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button onClick={handleAddClick}>
            <PlusCircleIcon className="size-4" /> Tambah Mahasiswa
          </Button>
          <ImportDataButton isMahasiswa={true} />
        </div>
        <div className="flex gap-2">
          <Suspense>
            <SearchInput placeholder="Cari mahasiswa..." />
            <LimitSelector defaultValue={10} />
          </Suspense>
        </div>
      </div>

      <AddEditMahasiswaModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        isEdit={false}
      />
    </>
  );
}
