"use client";

import { useLogbookMahasiswa } from "@/lib/api/logbook/client";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LogbookItem {
  id: number;
  deskripsi: string;
  dokumen: string;
  status: string;
  created_at: string;
}

function LogbookSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="shadow-none">
          <CardContent>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-3/4 mt-4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
            <Skeleton className="h-4 w-32 mt-2" />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Skeleton className="h-10 w-32 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function LogbookList({
  id,
  type,
}: {
  id: number;
  type: "prociding" | "jurnal" | "disertasi";
}) {
  const { data, error, isLoading } = useLogbookMahasiswa(id, type);

  if (isLoading) {
    return <LogbookSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const logbooks = data?.data;

  if (!logbooks || logbooks.length === 0) {
    return (
      <div className="text-gray-500 py-8 text-center">
        Belum ada logbook {type}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {logbooks.map((logbook: LogbookItem, index: number) => (
        <Card key={logbook.id} className="shadow-none">
          <CardContent>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium">Bimbingan {index + 1}</h1>
              <Badge
                className="capitalize"
                variant={getStatusColor(logbook.status)}
              >
                {logbook.status}
              </Badge>
            </div>
            <p className="text-gray-600">{logbook.deskripsi}</p>
            <p className="text-sm text-gray-500 mt-2">
              Dibuat pada: {formatDate(logbook.created_at)}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center ">
            <Link href={`/dosen/logbook/${logbook.id}`} className="bg-red-50 ">
              <Button variant={"outline"}>
                Lihat detail
                <ArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "secondary";
    case "diterima":
      return "success";
    case "ditolak":
      return "destructiveOutline";
    case "direvisi":
      return "primary";
    default:
      return "default";
  }
}
