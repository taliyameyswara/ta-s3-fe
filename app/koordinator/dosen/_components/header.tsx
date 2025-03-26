"use client";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { LimitSelector } from "@/components/limit-selector";
import { SearchInput } from "@/components/search-input";
import ImportDataButton from "@/components/import";
import { AddEditDosenModal } from "./add-edit-modal";

export default function HeaderDosen() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button onClick={handleAddClick}>
            <PlusCircleIcon className="size-4" /> Tambah Dosen
          </Button>
          <ImportDataButton isMahasiswa={false} />
        </div>
        <div className="flex gap-2">
          <SearchInput placeholder="Cari dosen..." />
          <LimitSelector defaultValue={10} />
        </div>
      </div>

      <AddEditDosenModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        isEdit={false}
      />
    </>
  );
}
