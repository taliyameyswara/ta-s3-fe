"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { addMahasiswa, updateMahasiswa } from "@/lib/api/koordinator/mahasiswa";
import { toast } from "sonner";
import { Mahasiswa } from "@/type/mahasiswa";
import PasswordInput from "./password-input";
import { z } from "zod";

// schema validation
const mahasiswaSchema = z.object({
  nim: z.string().min(1, "NIM wajib diisi"),
  name: z.string().min(1, "Nama wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .refine((email) => email.endsWith("@mhs.dinus.ac.id"), {
      message: "Harus menggunakan email mahasiswa",
    }),
  telepon: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]+$/.test(val),
      "Nomor telepon harus berupa angka"
    ),
  password: z.string().optional(),
});

const editMahasiswaSchema = mahasiswaSchema.extend({
  telepon: z.string().optional(),
});

type MahasiswaForm = z.infer<typeof mahasiswaSchema>;

interface AddEditMahasiswaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mahasiswa?: Mahasiswa;
  isEdit?: boolean;
}

// default for add
const defaultMahasiswa: MahasiswaForm = {
  name: "",
  nim: "",
  email: "",
  telepon: "",
};

export function AddEditMahasiswaModal({
  isOpen,
  onClose,
  mahasiswa,
  isEdit = false,
}: AddEditMahasiswaModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<MahasiswaForm>(defaultMahasiswa);
  const [errors, setErrors] = useState<
    Partial<Record<keyof MahasiswaForm, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mahasiswa && isEdit) {
      setFormData({
        nim: mahasiswa.nim,
        name: mahasiswa.name,
        email: mahasiswa.email,
        telepon: mahasiswa.telepon ?? "",
        password: mahasiswa.password ?? "",
      });
    } else {
      setFormData(defaultMahasiswa);
    }
    setErrors({});
  }, [mahasiswa, isEdit, isOpen]);

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const schema = isEdit ? editMahasiswaSchema : mahasiswaSchema;
    const fieldSchema = schema.pick({ [name]: true });
    const result = fieldSchema.safeParse({ [name]: value });
    if (!result.success) {
      const errorMessage = result.error.errors[0].message;
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // validate before submit
  const validateForm = () => {
    const result = mahasiswaSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof MahasiswaForm, string>> = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0] as keyof MahasiswaForm] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Validasi gagal", {
        description: "Harap periksa kembali data yang Anda masukkan",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isEdit && mahasiswa?.id) {
        await updateMahasiswa(mahasiswa.id.toString(), formData);
        toast.success("Data mahasiswa berhasil diperbarui");
      } else {
        await addMahasiswa(formData);
        toast.success("Data mahasiswa berhasil ditambahkan");
      }

      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error saving mahasiswa:", error);
      toast.error("Gagal menyimpan data mahasiswa");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const schema = isEdit ? editMahasiswaSchema : mahasiswaSchema;
    return schema.safeParse(formData).success;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit data mahasiswa di bawah ini."
              : "Isi form di bawah untuk menambahkan mahasiswa baru."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nim" className="text-right">
                NIM <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="nim"
                  name="nim"
                  value={formData.nim}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Masukkan NIM mahasiswa"
                />
                {errors.nim && (
                  <p className="text-red-500 text-xs mt-1">{errors.nim}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Masukkan nama mahasiswa"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Masukkan email mahasiswa"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telepon" className="text-right">
                No. Telp
              </Label>
              <div className="col-span-3">
                <Input
                  id="telepon"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Masukkan nomor telepon mahasiswa"
                />
                {errors.telepon && (
                  <p className="text-red-500 text-xs mt-1">{errors.telepon}</p>
                )}
              </div>
            </div>
            {isEdit && (
              <div className="grid grid-cols-4 items-center gap-4">
                <PasswordInput
                  formData={formData}
                  handleChange={handleChange}
                  isEdit={isEdit}
                  errors={errors}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading || !isFormValid()}>
              {isLoading
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Tambah Mahasiswa"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
