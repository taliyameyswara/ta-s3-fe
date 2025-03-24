export interface Mahasiswa {
  id?: number;
  user_id?: number;
  nim: string;
  name: string;
  email: string;
  telepon?: string;
  password?: string;
  foto?: string;
}

export interface MahasiswaResponse {
  success: boolean;
  message: string;
  data: Mahasiswa[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}
