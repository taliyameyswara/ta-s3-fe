import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="">
      {/* Dashboard Header Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl">
        {/* Tombol Kembali */}
        <Skeleton className="h-10 w-48 rounded-md mb-4" />

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            {/* Badge Status */}
            <Skeleton className="h-6 w-20 rounded-full" />

            {/* Judul dan Deskripsi */}
            <div className="space-y-2">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Tombol Dokumen */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>

            {/* Tanggal */}
            <div className="flex gap-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>

          {/* Verifikasi Dosen */}
          <div className="border-t pt-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-4">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Skeleton className="w-2 h-2 rounded-full mt-2" />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    {index === 0 && (
                      <Skeleton className="h-16 w-full rounded-md" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
