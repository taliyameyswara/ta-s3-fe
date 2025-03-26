interface MahasiswaBimbingan {
  foto?: string;
  nim: string;
  name: string;
  prosiding: string;
  jurnal: string;
  disertasi: string;
}

export type Dosen = {
  id: number;
  user_id?: number;
  npp: string;
  name: string;
  email: string;
  bidang_kajian: string;
  scholar_link: string;
  telepon: string;
  total_mahasiswa_bimbingan?: number;
  total_mahasiswa_lulus?: number;
  mahasiswa_bimbingan?: MahasiswaBimbingan[];
};
