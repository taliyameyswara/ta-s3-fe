"use client";

import { useState } from "react";
import { CustomTabs } from "@/components/custom-tabs";
import PengajuanList from "./_components/pengajuan-list";
import AddLogbookDialog from "./_components/add-logbook-dialog";
import LogbookList from "./_components/logbook-list";
import { FileText, Book, FileCheck } from "lucide-react";

export default function Home() {
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
      // count: 3,
    },
    {
      status: "disertasi",
      label: "Disertasi",
      icon: FileCheck,
      // count: 1,
    },
  ];

  return (
    <div className="">
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(status) =>
          setActiveTab(status as "prociding" | "jurnal" | "disertasi")
        }
        className="mb-4"
      />

      <PengajuanSection type={activeTab} />
    </div>
  );
}

function PengajuanSection({
  type,
}: {
  type: "prociding" | "jurnal" | "disertasi";
}) {
  return (
    <div>
      <PengajuanList type={type} />

      <div className="px-2">
        <div className="flex justify-between items-center ">
          <h1 className="text-xl font-medium my-4">
            Data Pengajuan Penelitian
          </h1>
          <AddLogbookDialog type={type} />
        </div>

        <LogbookList type={type} />
      </div>
    </div>
  );
}
