"use client";

import { usePengajuanList } from "@/lib/api/logbook/client";
import { formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Clipboard, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import PengajuanDialog from "./add-pengajuan-dialog";

interface PengajuanItem {
  id: string | number;
  judul: string;
  deskripsi: string;
  link?: string;
  status: string;
  tipe?: string;
  created_at: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "draft":
      return "secondary";
    case "submitted":
      return "primary";
    case "publish":
      return "success";
    default:
      return "outline";
  }
};

function PengajuanSkeleton() {
  return (
    <Card className="shadow-none">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-4 w-64" />
      </CardContent>
    </Card>
  );
}

function PengajuanItemCard({
  item,
  type,
}: {
  item: PengajuanItem;
  type: "prociding" | "jurnal" | "disertasi";
}) {
  return (
    <Card className="shadow-none border">
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="size-4 shrink-0" />
              <span className="truncate">Tanggal Pengajuan</span>
              <Badge
                className="capitalize"
                variant={`${getStatusColor(item.status)}`}
              >
                {item.status}
              </Badge>
            </div>
            <p>{formatDate(item.created_at)}</p>
          </div>
          <div className="flex items-center gap-2">
            <PengajuanDialog type={type} pengajuan={item} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="col-span-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="size-4 shrink-0" />
              <span className="truncate">Judul Penelitian</span>
            </div>
            <h1 className="font-medium">{item.judul}</h1>
          </div>
          {item.tipe && (
            <div className="col-span-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="size-4 shrink-0" />
                <span className="truncate">Tipe Pengajuan</span>
              </div>
              <p className="text-gray-600 capitalize">{item.tipe}</p>
            </div>
          )}
          <div className="col-span-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ExternalLink className="size-4 shrink-0" />
              <span className="truncate">Dokumen Penelitian</span>
            </div>
            {item.link ? (
              <Link href={item.link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  Link Dokumen
                  <ExternalLink className="size-4" />
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                disabled
                title="Link dokumen tidak tersedia"
              >
                Link Dokumen
                <ExternalLink className="size-4" />
              </Button>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clipboard className="size-4 shrink-0" />
            <span className="truncate">Deskripsi Pengajuan</span>
          </div>
          <p>{item.deskripsi}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PengajuanList({
  type,
}: {
  type: "prociding" | "jurnal" | "disertasi";
}) {
  const { data, error, isLoading } = usePengajuanList(type);

  if (isLoading) {
    return <PengajuanSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const pengajuan = data?.data;
  console.log("🚀 ~ pengajuan:", pengajuan);

  if (
    !pengajuan ||
    (type === "jurnal" && Array.isArray(pengajuan) && pengajuan.length === 0)
  ) {
    return (
      <div className="px-2">
        <h1 className="text-xl font-medium mb-4">Data Pengajuan Penelitian</h1>
        <Card className="shadow-none border">
          <div className="text-gray-500  text-center">
            Belum ada pengajuan {type}
          </div>
          <div className="flex justify-center">
            <PengajuanDialog type={type} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-2">
      <h1 className="text-xl font-medium mb-4">Data Pengajuan Penelitian</h1>
      {type === "jurnal" && Array.isArray(pengajuan) ? (
        <div className="space-y-4">
          {pengajuan.map((item) => (
            <PengajuanItemCard key={item.id} item={item} type={type} />
          ))}
        </div>
      ) : (
        !Array.isArray(pengajuan) && (
          <PengajuanItemCard item={pengajuan} type={type} />
        )
      )}
    </div>
  );
}
