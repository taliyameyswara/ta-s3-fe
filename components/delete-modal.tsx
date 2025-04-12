/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSWRConfig } from "swr";
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
import { deleteDosen } from "@/lib/api/dosen";
import { toast } from "sonner";

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
  const { mutate } = useSWRConfig();
  const entityType = isMahasiswa ? "Mahasiswa" : "Dosen";
  const deleteFunction = isMahasiswa ? deleteMahasiswa : deleteDosen;
  const cachePrefix = isMahasiswa ? "/mahasiswa?" : "/dosen?";

  const handleDelete = () => {
    // Optimistic update: remove item from cache
    mutate(
      (key: any) => typeof key === "object" && key[0].startsWith(cachePrefix),
      (currentData: any) => {
        if (!currentData?.success) return currentData;
        const newData = { ...currentData };
        newData.data = newData.data.filter(
          (item: any) => item.id !== entityId.toString()
        );
        return newData;
      },
      { revalidate: false }
    );

    // Create promise for toast
    const deletePromise = new Promise<void>((resolve, reject) => {
      deleteFunction(entityId.toString())
        .then((response) => {
          if (!response.success) {
            throw new Error(
              response.message || `Failed to delete ${entityType.toLowerCase()}`
            );
          }
          // Trigger full refetch to sync with server
          mutate(
            (key: any) =>
              typeof key === "object" && key[0]?.startsWith(cachePrefix)
          );
          resolve();
        })
        .catch((error) => {
          // Revert optimistic update on error
          mutate(
            (key: any) =>
              typeof key === "object" && key[0].startsWith(cachePrefix)
          );
          reject(error);
        });
    });

    // Show toast with loading, success, and error states
    toast.promise(deletePromise, {
      loading: `Menghapus data ${entityType.toLowerCase()}...`,
      success: `Data ${entityType.toLowerCase()} berhasil dihapus`,
      error: (error) =>
        `Gagal menghapus data ${entityType.toLowerCase()}: ${error.message}`,
    });

    // Close dialog after initiating deletion
    onClose();
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
