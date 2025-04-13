import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLogbookDetail } from "@/lib/api/logbook";
import DashboardHeader from "@/components/dashboard-header";
import { formatDate, getStatusColor } from "@/lib/utils";
import { LogbookRevisionModal } from "./_components/logbook-revision-modal";

interface DosenStatus {
  id: number;
  status: string;
  catatan: string | null;
  dosen: {
    id: number;
    name: string;
    email: string;
  };
  tipe: string;
  updated_at: string;
}

interface Revision {
  id: number;
  deskripsi: string;
  dokumen: string | null;
  bab: string | null;
  created_at: string;
  updated_at: string;
  statuses: DosenStatus[];
}

interface LogbookDetail {
  id: number;
  deskripsi: string;
  judul: string;
  dokumen: string;
  status: string;
  created_at: string;
  updated_at: string;
  statuses: DosenStatus[];
  mahasiswa_id?: number;
  revisions?: Revision[];
}

export default async function LogbookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let logbookData: LogbookDetail;
  const { id } = await params;
  const logbookId = parseInt(id, 10);

  try {
    const response = await getLogbookDetail(logbookId);
    logbookData = response.data;
  } catch (error) {
    console.error(`Failed to fetch logbook ID ${logbookId}:`, error);
    notFound();
  }

  const formatTipeDosen = (tipe: string) => {
    switch (tipe.toLowerCase()) {
      case "promotor":
        return "Promotor";
      case "co-promotor-1":
        return "Co-Promotor 1";
      case "co-promotor-2":
        return "Co-Promotor 2";
      default:
        return tipe.charAt(0).toUpperCase() + tipe.slice(1);
    }
  };

  // Check if the logbook status is "rejected" to show the revision button
  const canRevise = logbookData.status.toLowerCase() === "ditolak";

  return (
    <div className="">
      <DashboardHeader
        breadcrumbItems={[
          { name: "Dashboard", url: "/mahasiswa" },
          { name: "Logbook", url: "/mahasiswa/logbook" },
          {
            name: "Detail Logbook",
            url: `/mahasiswa/logbook/${logbookData.id}`,
          },
        ]}
      />
      <div className="max-w-3xl">
        <Button variant="outline" asChild>
          <Link href="/mahasiswa/logbook">
            <ArrowLeft />
            Kembali ke List Logbook
          </Link>
        </Button>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge
                variant={`${getStatusColor(logbookData.status)}`}
                className="capitalize"
              >
                {logbookData.status}
              </Badge>

              {/* Show revision button if status is "rejected" */}
              {canRevise && <LogbookRevisionModal logbookId={logbookData.id} />}
            </div>

            <div>
              <h1 className="text-lg font-medium">
                Detail Logbook {logbookData.judul}
              </h1>
              <p className="text-muted-foreground">
                {logbookData.deskripsi || "Tidak ada deskripsi tersedia"}
              </p>
            </div>

            <div className="flex justify-between items-center">
              {logbookData.dokumen ? (
                <Button
                  className="flex items-center gap-2"
                  variant={"outline"}
                  asChild
                >
                  <a
                    href={logbookData.dokumen}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link Dokumen <ExternalLink size={16} />
                  </a>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  Tidak ada dokumen
                </Button>
              )}
            </div>

            <div className="text-sm text-gray-500 flex gap-4">
              <span>Dibuat pada: {formatDate(logbookData.created_at)}</span>
              {logbookData.created_at !== logbookData.updated_at && (
                <span>
                  Diperbarui pada: {formatDate(logbookData.updated_at)}
                </span>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium text-lg mb-4">Verifikasi Dosen</h3>
            {logbookData.statuses.length > 0 ? (
              <div className="space-y-4">
                {logbookData.statuses.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.dosen.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatTipeDosen(item.tipe)} ({item.dosen.email})
                          </p>
                        </div>
                        <Badge
                          variant={`${getStatusColor(item.status)}`}
                          className="capitalize"
                        >
                          {item.status === "pending"
                            ? "Pending"
                            : `${item.status}, ${formatDate(item.updated_at)}`}
                        </Badge>
                      </div>
                      {item.catatan && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                          {item.catatan}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Belum ada verifikasi dosen.</p>
            )}
          </div>

          {/* Bagian Revisi */}
          {logbookData.revisions && logbookData.revisions.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-medium text-lg mb-4">Revisi Logbook</h3>
              <div className="space-y-6">
                {logbookData.revisions.map((revision, index) => (
                  <div key={revision.id} className="space-y-4">
                    <div>
                      <h4 className="font-medium">Revisi #{index + 1}</h4>
                      <p className="text-muted-foreground">
                        {revision.deskripsi || "Tidak ada deskripsi revisi"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {revision.dokumen ? (
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                          asChild
                        >
                          <a
                            href={revision.dokumen}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Dokumen Revisi <ExternalLink size={16} />
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" disabled>
                          Tidak ada dokumen revisi
                        </Button>
                      )}
                      <div className="text-sm text-gray-500">
                        <span>
                          Dibuat pada: {formatDate(revision.created_at)}
                        </span>
                        {revision.created_at !== revision.updated_at && (
                          <span className="ml-4">
                            Diperbarui pada: {formatDate(revision.updated_at)}
                          </span>
                        )}
                      </div>
                    </div>
                    {revision.bab && (
                      <p className="text-sm text-gray-600">
                        Bab: {revision.bab}
                      </p>
                    )}
                    <div>
                      <h5 className="font-medium text-sm mb-2">
                        Verifikasi Dosen untuk Revisi
                      </h5>
                      {revision.statuses.length > 0 ? (
                        <div className="space-y-4">
                          {revision.statuses.map((status) => (
                            <div
                              key={status.id}
                              className="flex items-start gap-3"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">
                                      {status.dosen.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {formatTipeDosen(status.tipe)} (
                                      {status.dosen.email})
                                    </p>
                                  </div>
                                  <Badge
                                    variant={`${getStatusColor(status.status)}`}
                                    className="capitalize"
                                  >
                                    {status.status === "pending"
                                      ? "Pending"
                                      : `${status.status}, ${formatDate(
                                          status.updated_at
                                        )}`}
                                  </Badge>
                                </div>
                                {status.catatan && (
                                  <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                                    {status.catatan}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          Belum ada verifikasi dosen untuk revisi ini.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
