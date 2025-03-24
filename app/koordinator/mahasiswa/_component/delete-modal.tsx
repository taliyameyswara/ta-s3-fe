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
import { deleteMahasiswa } from "@/lib/api/koordinator/mahasiswa";
import { toast } from "sonner";

interface DeleteMahasiswaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mahasiswaId: string | number;
  mahasiswaName: string;
}

export function DeleteMahasiswaDialog({
  isOpen,
  onClose,
  mahasiswaId,
  mahasiswaName,
}: DeleteMahasiswaDialogProps) {
  const router = useRouter();

  const handleDelete = () => {
    const deletePromise = deleteMahasiswa(mahasiswaId.toString()).then(() => {
      router.refresh();
      onClose();
    });

    toast.promise(deletePromise, {
      loading: "Menghapus data mahasiswa...",
      success: "Data mahasiswa berhasil dihapus!",
      error: "Gagal menghapus data mahasiswa!",
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data Mahasiswa</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus data mahasiswa{" "}
            <strong>{mahasiswaName}</strong>? Tindakan ini tidak dapat
            dibatalkan.
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
