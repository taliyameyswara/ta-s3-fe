"use server";

import { get, post, put } from "../base";

export interface PengajuanData {
  judul: string;
  deskripsi: string;
  link: string;
  tipe?: "jurnal1" | "jurnal2";
  status?: string;
}

export interface LogbookData {
  deskripsi: string;
  dokumen: string;
}

export interface DosenStatus {
  id: number;
  status: string;
  catatan: string | null;
  dosen: {
    id: number;
    name: string;
    email: string;
  };
  tipe: string;
  updated_at: string;
}

export interface LogbookDetail {
  id: number;
  deskripsi: string;
  dokumen: string;
  status: string;
  created_at: string;
  updated_at: string;
  statuses: DosenStatus[];
}

export async function createJurnal(data: PengajuanData) {
  try {
    const response = await post("/jurnal", data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error("Error creating jurnal:", error);
    throw error;
  }
}

// Fungsi untuk membuat pengajuan disertasi
export async function createDisertasi(data: PengajuanData) {
  try {
    const response = await post("/disertasi", data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error("Error creating disertasi:", error);
    throw error;
  }
}

export async function createProsiding(data: PengajuanData) {
  try {
    const response = await post("/prociding", data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error("Error creating prosiding:", error);
    throw error;
  }
}

export async function updateJurnal(id: string | number, data: PengajuanData) {
  try {
    const response = await put(`/jurnal/${id}`, data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error(`Error updating jurnal with ID ${id}:`, error);
    throw error;
  }
}

export async function updateDisertasi(
  id: string | number,
  data: PengajuanData
) {
  try {
    const response = await put(`/disertasi/${id}`, data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error(`Error updating disertasi with ID ${id}:`, error);
    throw error;
  }
}

export async function updateProsiding(
  id: string | number,
  data: PengajuanData
) {
  try {
    const response = await put(`/prociding/${id}`, data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error(`Error updating prociding with ID ${id}:`, error);
    throw error;
  }
}

export async function createLogbook(type: string, data: LogbookData) {
  try {
    const response = await post(`/logbook/${type}`, data);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error(`Error creating ${type} logbook:`, error);
    throw error;
  }
}

export async function getLogbookDetail(id: number) {
  try {
    const response = await get(`/logbook/${id}`);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    console.error(`Error fetching logbook detail with ID ${id}:`, error);
    throw error;
  }
}
