"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dosen } from "@/type/dosen";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { AddEditDosenModal } from "./add-edit-modal";
import { DeleteDialog } from "@/components/delete-modal";
import { useRouter } from "next/navigation";

interface DropdownTableMenuProps {
  dosen: Dosen;
}

export default function DropdownTableMenu({ dosen }: DropdownTableMenuProps) {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState<Dosen | null>(null);

  const handleEditClick = () => {
    setSelectedDosen(dosen);
    setEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setSelectedDosen(dosen);
    setDeleteDialogOpen(true);
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
          <DropdownMenuItem
            onClick={() => router.push(`/koordinator/dosen/${dosen.id}`)}
          >
            <Eye className="size-4" />
            <span>Detail</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditClick}>
            <Pencil className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="size-4 text-destructive" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Modal */}
      {selectedDosen && (
        <AddEditDosenModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          dosen={selectedDosen}
          isEdit={true}
        />
      )}

      {/* Delete Dialog */}
      {selectedDosen && (
        <DeleteDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          entityName={selectedDosen.name}
          entityId={selectedDosen.id || 0}
          isMahasiswa={false}
        />
      )}
    </>
  );
}
