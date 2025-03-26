"use client";

import { Button } from "@/components/ui/button";
import { LimitSelector } from "./limit-selector";
import { SearchInput } from "./search-input";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { AddEditMahasiswaModal } from "./add-edit-modal";
import ImportMahasiswaButton from "./import";

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
          <ImportMahasiswaButton />
        </div>
        <div className="flex gap-2">
          <SearchInput />
          <LimitSelector defaultValue={10} />
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
