import { createApiService } from "../base-client";

const api = createApiService("");

export function useListDosen(page = 1, search = "", limit = 10) {
  const params = {
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
  };

  return api.get("/dosen", params);
}
