"use server";

import { Mahasiswa } from "@/type/mahasiswa";
import { get, post, put, del } from "../base";
import { PlottingData } from "@/type/plotting";

export default async function getListMahasiswa(
  page = 1,
  search?: string,
  limit = 10
) {
  try {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (search) {
      queryParams.append("search", search);
    }

    const url = `/mahasiswa?${queryParams.toString()}`;
    const response = await get(url);

    return response;
  } catch (error) {
    console.error("Error fetching mahasiswa data:", error);
    return {
      data: [],
      meta: { current_page: 1, last_page: 1, total: 0 },
    };
  }
}

export async function getMahasiswaById(id: string) {
  try {
    const response = await get(`/mahasiswa/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching mahasiswa with ID ${id}:`, error);
    throw error;
  }
}

export async function addMahasiswa(data: Mahasiswa) {
  try {
    const response = await post("/mahasiswa", data);
    return response;
  } catch (error) {
    console.error("Error adding mahasiswa:", error);
    throw error;
  }
}

export async function updateMahasiswa(id: string, data: Mahasiswa) {
  try {
    const response = await put(`/mahasiswa/${id}`, data);
    return response;
  } catch (error) {
    console.error(`Error updating mahasiswa with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteMahasiswa(id: string) {
  try {
    const response = await del(`/mahasiswa/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting mahasiswa with ID ${id}:`, error);
    throw error;
  }
}

export async function getExcelTemplate(): Promise<Blob> {
  try {
    const response = await get("/mahasiswa/example-import", {
      responseType: "blob",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function importExcelData(data: FormData) {
  try {
    const response = await post("/mahasiswa/import", data);
    return response;
  } catch (error) {
    console.error(`Error:`, error);
    throw error;
  }
}

export async function getDosen() {
  try {
    const response = await get("/dosen");
    return response;
  } catch (error) {
    console.error("Error fetching dosen data:", error);
    throw error;
  }
}

export async function getPlottingByMahasiswaId(id: string) {
  try {
    const response = await get(`/plotting/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching plotting data:", error);
    throw error;
  }
}

export async function plottingAction(data: PlottingData) {
  try {
    const response = await post("/plotting", data);
    return response;
  } catch (error) {
    console.error("Error fetching plotting data:", error);
    throw error;
  }
}
