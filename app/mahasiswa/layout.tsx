"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { NavMenu } from "@/components/nav-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BookText, Home, User } from "lucide-react";

const sidebarData = {
  menus: [
    { name: "Dashboard", url: "/mahasiswa", icon: Home },
    {
      name: "Dosen Pembimbing",
      url: "/mahasiswa/dosen",
      icon: User,
    },
    {
      name: "Logbook Bimbingan",
      url: "/mahasiswa/logbook",
      icon: BookText,
    },
  ],
};

export default function MahasiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar
        sidebarContent={
          <>
            <NavMenu menu={sidebarData.menus} />
          </>
        }
      />
      <main className="hidden lg:flex flex-col w-full p-4 my-4 ml-4 mr-4 bg-white border lg:ml-0 rounded-xl">
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
