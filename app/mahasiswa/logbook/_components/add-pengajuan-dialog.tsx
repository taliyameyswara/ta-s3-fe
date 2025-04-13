/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  createJurnal,
  createDisertasi,
  createProsiding,
  updateJurnal,
  updateDisertasi,
  updateProsiding,
} from "@/lib/api/logbook";
import { useSWRConfig } from "swr";

interface PengajuanItem {
  id: string | number;
  judul: string;
  deskripsi: string;
  link?: string;
  status: string;
  tipe?: string;
  created_at: string;
}

interface PengajuanDialogProps {
  type: "prociding" | "jurnal" | "disertasi";
  pengajuan?: PengajuanItem;
}

const baseSchema = z.object({
  judul: z.string().min(5, "Judul minimal 5 karakter"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  link: z.string().url("Link dokumen harus berupa URL yang valid"),
  status: z.enum(["draft", "submitted", "publish"], {
    required_error: "Pilih status pengajuan",
  }),
});

const jurnalSchema = baseSchema.extend({
  tipe: z.enum(["jurnal1", "jurnal2"], {
    required_error: "Pilih tipe jurnal",
  }),
});

type FormValues = z.infer<typeof jurnalSchema>;

export default function PengajuanDialog({
  type,
  pengajuan,
}: PengajuanDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!pengajuan;
  const { mutate } = useSWRConfig();

  const schema = type === "jurnal" ? jurnalSchema : baseSchema;

  const form = useForm<FormValues | z.infer<typeof baseSchema>>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      judul: pengajuan?.judul || "",
      deskripsi: pengajuan?.deskripsi || "",
      link: pengajuan?.link || "",
      status:
        (pengajuan?.status as "draft" | "submitted" | "publish") || "draft",
      tipe:
        type === "jurnal"
          ? (pengajuan?.tipe as "jurnal1" | "jurnal2") || "jurnal1"
          : undefined,
    },
  });

  async function onSubmit(values: FormValues | z.infer<typeof baseSchema>) {
    setIsSubmitting(true);

    try {
      let response;
      if (isEditMode) {
        if (type === "jurnal") {
          response = await updateJurnal(pengajuan!.id, values);
        } else if (type === "disertasi") {
          response = await updateDisertasi(pengajuan!.id, values);
        } else {
          response = await updateProsiding(pengajuan!.id, values);
        }
        toast.success(`Pengajuan ${type} berhasil diperbarui`);
      } else {
        if (type === "jurnal") {
          response = await createJurnal(values);
        } else if (type === "disertasi") {
          response = await createDisertasi(values);
        } else {
          response = await createProsiding(values);
        }
        toast.success(`Pengajuan ${type} berhasil dibuat`);
      }

      mutate(
        (key: (string | string[])[]) =>
          key && typeof key === "object" && key[0]?.includes(`/${type}`)
      );

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(
        `Terjadi kesalahan saat ${
          isEditMode ? "memperbarui" : "membuat"
        } pengajuan ${type}`,
        {
          description: "Gagal",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            isEditMode
              ? "gap-2 border-primary-700 text-primary-700 hover:bg-primary-100"
              : "bg-primary-700 text-white hover:bg-primary-600"
          }
          variant={isEditMode ? "outline" : "default"}
          size={isEditMode ? "sm" : "default"}
        >
          {isEditMode ? (
            <>
              <Pencil className="h-4 w-4" />
              Edit
            </>
          ) : (
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Tambah Pengajuan
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit" : "Tambah"} Pengajuan{" "}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Ubah detail pengajuan di bawah ini"
              : "Isi form berikut untuk menambahkan pengajuan baru"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              onSubmit(values as FormValues)
            )}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              {type === "jurnal" && (
                <FormField
                  control={form.control}
                  name="tipe"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Tipe Jurnal</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe jurnal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jurnal1">Jurnal 1</SelectItem>
                          <SelectItem value="jurnal2">Jurnal 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status pengajuan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="publish">Publish</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan deskripsi"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Dokumen</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
                className="bg-gray-100 hover:bg-gray-200"
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
