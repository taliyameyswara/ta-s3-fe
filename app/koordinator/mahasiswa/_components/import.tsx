"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getExcelTemplate, importExcelData } from "@/lib/api/mahasiswa";
import { Download, FileUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ImportMahasiswaButton() {
  const [file, setFile] = useState<File | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  async function handleDownloadTemplate() {
    setIsDownloading(true);
    try {
      const blob = await getExcelTemplate();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "mahasiswa-template.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("Template berhasil diunduh");
    } catch (error) {
      console.error("Error downloading template:", error);
      toast.error((error as Error).message);
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleImport() {
    if (!file) return;

    setIsImporting(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await importExcelData(formData);
      console.log("Import response:", response);
      toast.success(response.message);
    } catch (error) {
      console.error("Error importing file:", error);
      toast.error((error as Error).message);
    } finally {
      setIsImporting(false);
      setFile(null);
      setOpen(false);
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <FileUp className="size-4" />
          Import Data Mahasiswa
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Import Data Mahasiswa</DialogTitle>
          <DialogDescription>
            Unggah berkas yang berisi data mahasiswa. Pastikan untuk menggunakan
            format template yang benar (.xlsx).
          </DialogDescription>

          <Button
            variant="outline"
            onClick={handleDownloadTemplate}
            className="w-fit"
            size="sm"
            disabled={isDownloading}
          >
            <Download className="size-4 mr-2" />
            {isDownloading
              ? "Mendownload Template..."
              : "Download Contoh Template"}
          </Button>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="file">File</Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleImport}
            disabled={!file || isImporting}
          >
            {isImporting ? "Mengimpor..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
