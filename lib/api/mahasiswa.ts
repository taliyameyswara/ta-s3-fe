import { get, post, put, del } from "./index";

export const mahasiswaApi = {
  // Get all dosen with pagination
  getAll: (page = 1) => get(`/mahasiswa?page=${page}`),

  // Get a single mahasiswa by ID
  getById: (id: number) => get(`/mahasiswa/${id}`),

  // Create a new mahasiswa
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (data: any) => post("/mahasiswa", data),

  // Update a mahasiswa
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: (id: number, data: any) => put(`/mahasiswa${id}`, data),

  // Delete a mahasiswa
  delete: (id: number) => del(`/mahasiswa${id}`),
};
