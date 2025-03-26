"use client";

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteMahasiswa } from "@/lib/api/mahasiswa";
import { toast } from "sonner";
import { deleteDosen } from "@/lib/api/dosen";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entityId: string | number;
  entityName: string;
  isMahasiswa: boolean;
}

export function DeleteDialog({
  isOpen,
  onClose,
  entityId,
  entityName,
  isMahasiswa,
}: DeleteDialogProps) {
  const router = useRouter();

  const entityType = isMahasiswa ? "Mahasiswa" : "Dosen";
  const deleteFunction = isMahasiswa ? deleteMahasiswa : deleteDosen;

  const handleDelete = () => {
    const deletePromise = deleteFunction(entityId.toString()).then(() => {
      router.refresh();
      onClose();
    });

    toast.promise(deletePromise, {
      loading: `Menghapus data ${entityType.toLowerCase()}...`,
      success: `Data ${entityType.toLowerCase()} berhasil dihapus`,
      error: `Gagal menghapus data ${entityType.toLowerCase()}`,
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data {entityType}</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus data {entityType.toLowerCase()}{" "}
            <strong>{entityName}</strong>? Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
