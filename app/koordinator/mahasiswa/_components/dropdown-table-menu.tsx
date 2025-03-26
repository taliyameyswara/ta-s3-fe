"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mahasiswa } from "@/type/mahasiswa";
import { MoreHorizontal, Pencil, Trash2, UserCog } from "lucide-react";
import { AddEditMahasiswaModal } from "./add-edit-modal";
import { DeleteMahasiswaDialog } from "./delete-modal";
import { PlottingSheet } from "./plotting-sheet";

interface DropdownTableMenuProps {
  mahasiswa: Mahasiswa;
}

export default function DropdownTableMenu({
  mahasiswa,
}: DropdownTableMenuProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState<Mahasiswa | null>(
    null
  );
  const [plottingSheetOpen, setPlottingSheetOpen] = useState(false);

  const handleEditClick = () => {
    setSelectedMahasiswa(mahasiswa);
    setEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setSelectedMahasiswa(mahasiswa);
    setDeleteDialogOpen(true);
  };

  const handlePlottingClick = () => {
    setPlottingSheetOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEditClick}>
            <Pencil className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePlottingClick}>
            <UserCog className="mr-2 size-4" />
            Plotting
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 size-4 text-destructive" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Modal */}
      {selectedMahasiswa && (
        <AddEditMahasiswaModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          mahasiswa={selectedMahasiswa}
          isEdit={true}
        />
      )}

      {/* Delete Dialog */}
      {selectedMahasiswa && (
        <DeleteMahasiswaDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          mahasiswaId={selectedMahasiswa.id ?? 1}
          mahasiswaName={selectedMahasiswa.name}
        />
      )}

      {/* Plotting sheet */}
      <PlottingSheet
        isOpen={plottingSheetOpen}
        onClose={() => setPlottingSheetOpen(false)}
        mahasiswaId={mahasiswa.id || 0}
        mahasiswaName={mahasiswa.name}
      />
    </>
  );
}
