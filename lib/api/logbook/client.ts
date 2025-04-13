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
