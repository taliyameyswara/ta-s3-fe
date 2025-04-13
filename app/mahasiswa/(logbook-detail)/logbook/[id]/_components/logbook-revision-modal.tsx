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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileEdit } from "lucide-react";
import { revisiLogbook } from "@/lib/api/logbook";
import { toast } from "sonner";

interface LogbookRevisionModalProps {
  logbookId: number;
  onSuccess?: () => void;
}

interface LogbookData {
  logbook_id: number;
  deskripsi: string;
  dokumen: string;
}

export function LogbookRevisionModal({
  logbookId,
  onSuccess,
}: LogbookRevisionModalProps) {
  const [open, setOpen] = useState(false);
  const [deskripsi, setDeskripsi] = useState("");
  const [dokumen, setDokumen] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Validate form
    if (!deskripsi.trim()) {
      toast.info("Deskripsi diperlukan", {
        description: "Silakan masukkan deskripsi revisi logbook",
      });
      return;
    }

    if (!dokumen.trim()) {
      toast.info("Link dokumen diperlukan", {
        description: "Silakan masukkan link dokumen baru untuk logbook",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Create the payload
      const data: LogbookData = {
        logbook_id: logbookId,
        deskripsi: deskripsi.trim(),
        dokumen: dokumen.trim(),
      };

      const response = await revisiLogbook("revision", data);

      if (!response.success) {
        throw new Error(response.message || "Gagal mengirim revisi logbook");
      }

      toast.success("Revisi berhasil dikirim", {
        description: "Revisi logbook telah berhasil dikirim",
      });

      setOpen(false);
      setDeskripsi("");
      setDokumen("");

      // Refresh the page or update the UI
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting logbook revision:", error);
      toast("Gagal mengirim revisi", {
        description:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat mengirim revisi logbook",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <FileEdit size={16} />
        Revisi Logbook
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Revisi Logbook</DialogTitle>
            <DialogDescription>
              Masukkan deskripsi revisi dan link dokumen baru untuk logbook ini.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 ">
            <div className="space-y-2">
              <label htmlFor="deskripsi" className="text-sm font-medium">
                Deskripsi Revisi
              </label>
              <Textarea
                id="deskripsi"
                placeholder="Masukkan deskripsi revisi..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dokumen" className="text-sm font-medium">
                Link Dokumen
              </label>
              <Input
                id="dokumen"
                type="url"
                placeholder="https://..."
                value={dokumen}
                onChange={(e) => setDokumen(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex">
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
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Revisi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
