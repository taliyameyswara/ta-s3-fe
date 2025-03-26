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
import { addDosen, updateDosen } from "@/lib/api/dosen";
import { toast } from "sonner";
import { Dosen } from "@/type/dosen";
import { z } from "zod";
import PasswordInput from "../../mahasiswa/_components/password-input";

const dosenSchema = z.object({
  npp: z.string().min(1, "NPP wajib diisi"),
  name: z.string().min(1, "Nama wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .refine((email) => email.endsWith("@dsn.dinus.ac.id"), {
      message: "Harus menggunakan email universitas",
    }),
  bidang_kajian: z.string().min(1, "Bidang kajian wajib diisi"),
  scholar_link: z
    .string()
    .url("Format URL tidak valid")
    .optional()
    .or(z.literal("")),
  telepon: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]+$/.test(val),
      "Nomor telepon harus berupa angka"
    ),
  password: z.string().optional(),
});

const editDosenSchema = dosenSchema.extend({
  telepon: z.string().optional(),
});

type DosenForm = z.infer<typeof dosenSchema>;

interface AddEditDosenModalProps {
  isOpen: boolean;
  onClose: () => void;
  dosen?: Dosen;
  isEdit?: boolean;
}

const defaultDosen: DosenForm = {
  npp: "",
  name: "",
  email: "",
  bidang_kajian: "",
  scholar_link: "",
  telepon: "",
  password: "",
};

export function AddEditDosenModal({
  isOpen,
  onClose,
  dosen,
  isEdit = false,
}: AddEditDosenModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<DosenForm>(defaultDosen);
  const [errors, setErrors] = useState<
    Partial<Record<keyof DosenForm, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dosen && isEdit) {
      setFormData({
        npp: dosen.npp,
        name: dosen.name,
        email: dosen.email,
        bidang_kajian: dosen.bidang_kajian,
        scholar_link: dosen.scholar_link ?? "",
        telepon: dosen.telepon ?? "",
        password: "",
      });
    } else {
      setFormData(defaultDosen);
    }
    setErrors({});
  }, [dosen, isEdit, isOpen]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const schema = isEdit ? editDosenSchema : dosenSchema;
    const fieldSchema = schema.pick({ [name]: true });
    const result = fieldSchema.safeParse({ [name]: value });
    if (!result.success) {
      const errorMessage = result.error.errors[0].message;
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate before submit
  const validateForm = () => {
    const result = dosenSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof DosenForm, string>> = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0] as keyof DosenForm] = err.message;
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
      let response;
      if (isEdit && dosen?.id) {
        response = await updateDosen(dosen.id.toString(), formData);
      } else {
        response = await addDosen(formData);
      }

      toast.success(response.message);
      router.refresh();
      onClose();
    } catch (error) {
      console.log("Error saving dosen:", error);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const schema = isEdit ? editDosenSchema : dosenSchema;
    return schema.safeParse(formData).success;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Dosen" : "Tambah Dosen"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit data dosen di bawah ini."
              : "Isi form di bawah untuk menambahkan dosen baru."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="npp" className="text-right">
                NPP <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="npp"
                  name="npp"
                  value={formData.npp}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Masukkan NPP dosen"
                />
                {errors.npp && (
                  <p className="text-red-500 text-xs mt-1">{errors.npp}</p>
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
                  placeholder="Masukkan nama dosen"
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
                  placeholder="Masukkan email dosen"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bidang_kajian" className="text-right">
                Bidang Kajian <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="bidang_kajian"
                  name="bidang_kajian"
                  value={formData.bidang_kajian}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Masukkan bidang kajian dosen"
                />
                {errors.bidang_kajian && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bidang_kajian}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="scholar_link" className="text-right">
                Scholar Link
              </Label>
              <div className="col-span-3">
                <Input
                  id="scholar_link"
                  name="scholar_link"
                  value={formData.scholar_link}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Masukkan link Google Scholar"
                />
                {errors.scholar_link && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.scholar_link}
                  </p>
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
                  placeholder="Masukkan nomor telepon dosen"
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
                : "Tambah Dosen"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
