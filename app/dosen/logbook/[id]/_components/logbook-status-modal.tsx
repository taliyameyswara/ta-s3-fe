"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";
import { updateLogbookStatus } from "@/lib/api/logbook";
import { toast } from "sonner";

interface LogbookStatusModalProps {
  logbookId: number;
  action: "terima" | "tolak";
  onSuccess?: () => void;
}

export function LogbookStatusModal({
  logbookId,
  action,
  onSuccess,
}: LogbookStatusModalProps) {
  const [open, setOpen] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const status = action === "terima" ? "approved" : "rejected";
      const catatanValue = catatan.trim() || null;

      const response = await updateLogbookStatus(logbookId, {
        status,
        catatan: catatanValue,
      });

      if (!response.success) {
        throw new Error(response.message || "Gagal memperbarui status logbook");
      }

      toast.success(
        `Logbook berhasil ${action === "terima" ? "disetujui" : "ditolak"}`
      );

      setOpen(false);
      setCatatan("");

      // Refresh the page or update the UI
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating logbook status:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat memperbarui status logbook"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={action === "terima" ? "successOutline" : "destructiveOutline"}
        className="flex items-center gap-2"
      >
        {action === "terima" ? (
          <>
            <CheckCircle size={16} />
            Terima Logbook
          </>
        ) : (
          <>
            <XCircle size={16} />
            Tolak Logbook
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {action === "terima" ? "Setujui Logbook" : "Tolak Logbook"}
            </DialogTitle>
            <DialogDescription>
              {action === "terima"
                ? "Berikan catatan atau komentar untuk logbook yang disetujui (opsional)."
                : "Berikan alasan penolakan atau catatan untuk revisi (disarankan)."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Masukkan catatan atau komentar..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <DialogFooter className="flex sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant={action === "terima" ? "default" : "destructive"}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Memproses..."
                : action === "terima"
                ? "Terima"
                : "Tolak"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
