"use server";

import { del, get, post, put } from "../base";
import { DosenForm } from "@/app/koordinator/dosen/_components/add-edit-modal";

export default async function getListDosen(
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

    const url = `/dosen?${queryParams.toString()}`;
    const response = await get(url);

    return response;
  } catch (error) {
    console.error("Error fetching dosen data:", error);
    return {
      data: [],
      meta: { current_page: 1, last_page: 1, total: 0 },
    };
  }
}

export async function getDosenById(id: number) {
  const response = await get(`/dosen/${id}`);

  if (!response.success) {
    console.log(`Error updating dosen with ID ${id}:`, response.message);
    throw new Error(response.message);
  }

  return response;
}

export async function addDosen(data: DosenForm) {
  const response = await post(`/dosen`, data);

  if (!response.success) {
    console.log(`Error add dosen`, response.message);
    throw new Error(response.message);
  }

  return response;
}

export async function updateDosen(id: number, data: DosenForm) {
  const response = await put(`/dosen/${id}`, data);

  if (!response.success) {
    console.log(`Error updating dosen with ID ${id}:`, response.message);
    throw new Error(response.message);
  }

  return response;
}

export async function getDosenExcelTemplate(): Promise<Blob> {
  try {
    const response = await get("/dosen/example-import", "blob");
    return response as Blob;
  } catch (error) {
    throw error;
  }
}

export async function importDosenExcelData(data: FormData) {
  const response = await post("/dosen/import", data);

  if (!response.success) {
    console.log(`Error importing data dosen: `, response.message);
    throw new Error(response.message);
  }

  return response;
}

export async function deleteDosen(id: string) {
  const response = await del(`/dosen/${id}`);

  if (!response.success) {
    console.log(`Error deleting dosen with ID ${id}:`, response.message);
    throw new Error(response.message);
  }

  return response;
}
