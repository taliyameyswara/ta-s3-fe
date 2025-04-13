"use server";

import { revalidatePath } from "next/cache";
import {
  createJurnal,
  updateJurnal,
  createDisertasi,
  updateDisertasi,
  createProsiding,
  updateProsiding,
} from "./index";

interface PengajuanData {
  judul: string;
  deskripsi: string;
  link: string;
  status: "draft" | "submitted" | "publish";
  tipe?: "jurnal1" | "jurnal2";
}

export async function submitPengajuan(
  type: "prociding" | "jurnal" | "disertasi",
  data: PengajuanData,
  id?: string | number
) {
  try {
    let response;
    if (id) {
      // Mode edit
      if (type === "jurnal") {
        response = await updateJurnal(id, data);
      } else if (type === "disertasi") {
        response = await updateDisertasi(id, data);
      } else if (type === "prociding") {
        response = await updateProsiding(id, data);
      }
    } else {
      // Mode tambah
      if (type === "jurnal") {
        response = await createJurnal(data);
      } else if (type === "disertasi") {
        response = await createDisertasi(data);
      } else if (type === "prociding") {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        response = await createProsiding(data);
      }
    }

    // Revalidate cache untuk memperbarui data di UI
    revalidatePath("/mahasiswa/logbook");

    return {
      success: true,
      message: `Pengajuan ${type} berhasil ${id ? "diperbarui" : "dibuat"}`,
    };
  } catch (error) {
    console.error(`Error submitting pengajuan ${type}:`, error);
    return {
      success: false,
      message: `Gagal ${id ? "memperbarui" : "membuat"} pengajuan ${type}`,
    };
  }
}
