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
import Link from "next/link";
import { AddEditDosenModal } from "./add-edit-modal";
import { DeleteDialog } from "@/components/delete-modal";

interface DropdownTableMenuProps {
  dosen: Dosen;
}

export default function DropdownTableMenu({ dosen }: DropdownTableMenuProps) {
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
          <DropdownMenuItem>
            <Link
              href={`/koordinator/dosen/${dosen.id}`}
              className="cursor-pointer flex items-center"
            >
              <Eye className="size-4 mr-2" />
              <span>Detail</span>
            </Link>
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
