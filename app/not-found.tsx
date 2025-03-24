import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen mx-auto flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-500 mb-8">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link href="/">
        <Button variant="default" size="lg">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}
