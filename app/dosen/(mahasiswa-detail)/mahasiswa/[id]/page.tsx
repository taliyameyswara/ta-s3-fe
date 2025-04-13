"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CustomTabs } from "@/components/custom-tabs";
import { FileText, Book, FileCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import PengajuanList from "./_component/pengajuan-list";
import LogbookList from "./_component/logbook-list";

export default function MahasiswaLogbookPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id ? Number(params.id) : NaN;
  const [activeTab, setActiveTab] = useState<
    "prociding" | "jurnal" | "disertasi"
  >("prociding");

  const tabs = [
    {
      status: "prociding",
      label: "Prosiding",
      icon: FileText,
    },
    {
      status: "jurnal",
      label: "Jurnal",
      icon: Book,
    },
    {
      status: "disertasi",
      label: "Disertasi",
      icon: FileCheck,
    },
  ];

  useEffect(() => {
    if (isNaN(id)) {
      toast.error("ID mahasiswa tidak valid", {
        description: "Kembali ke daftar mahasiswa",
      });
      router.push("/logbook/mahasiswa");
    }
  }, [id, router]);

  if (isNaN(id)) {
    return null;
  }

  return (
    <div className="">
      <Button variant="outline" asChild className="mb-2">
        <Link href="/dosen/mahasiswa">
          <ArrowLeft className="size-4" />
          Kembali ke Daftar Mahasiswa
        </Link>
      </Button>

      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(status) =>
          setActiveTab(status as "prociding" | "jurnal" | "disertasi")
        }
        className="mb-6"
      />

      <PengajuanSection id={id} type={activeTab} />
    </div>
  );
}

function PengajuanSection({
  id,
  type,
}: {
  id: number;
  type: "prociding" | "jurnal" | "disertasi";
}) {
  return (
    <div>
      <div className="px-2">
        <h1 className="text-xl font-medium mb-4">Data Pengajuan Penelitian</h1>
        <PengajuanList id={id} type={type} />
      </div>
      <div className="px-2">
        <div className="flex justify-between items-center ">
          <h1 className="text-xl font-medium my-4">Data Logbook Bimbingan</h1>
        </div>
        <LogbookList id={id} type={type} />
      </div>
    </div>
  );
}
