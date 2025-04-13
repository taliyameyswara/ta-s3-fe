import { createApiService } from "../base-client";

const api = createApiService("");

// Fungsi untuk mendapatkan daftar logbook berdasarkan tipe
export function useLogbookList(type: string) {
  return api.get(`/logbook`, { tipe: type });
}

// Fungsi untuk mendapatkan daftar pengajuan berdasarkan tipe
export function usePengajuanList(type: string) {
  return api.get(`/${type}`);
}

// Fungsi untuk mendapatkan daftar pengajuan berdasarkan tipe dan mahasiswa
export function useLogbookMahasiswa(id: number, type: string) {
  return api.get(`/logbook/mahasiswa/${id}/${type}`);
}

// Fungsi untuk mendapatkan detail pengajuan berdasarkan id dan tipe
export function usePengajuanMahasiswa(id: number, type: string) {
  return api.get(`/${type}/mahasiswa/${id}`);
}
