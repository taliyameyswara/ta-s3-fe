"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { NavMain } from "@/components/nav-main";
import { NavMenu } from "@/components/nav-menu";
import { SidebarProvider } from "@/components/ui/sidebar";

import { BookText, Home, User } from "lucide-react";

const sidebarData = {
  menus: [
    { name: "Dashboard", url: "/koordinator", icon: Home },
    {
      name: "Mahasiswa Bimbingan",
      url: "/koordinator/mahasiswa",
      icon: User,
    },
    {
      name: "Dosen Pembimbing",
      url: "/koordinator/dosen",
      icon: BookText,
    },
  ],
  navMain: [
    // {
    //   title: "Monitoring Sidang",
    //   url: "#",
    //   icon: MonitorCheck,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Tugas Akhir 1",
    //       url: "/tugas-akhir/sidang-ta1",
    //       icon: FolderOpen,
    //     },
    //     {
    //       title: "Tugas Akhir 2",
    //       url: "/tugas-akhir/sidang-ta2",
    //       icon: FolderOpen,
    //     },
    //   ],
    // },
  ],
};

export default function KoordinatorLayout({
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
            <NavMain items={sidebarData.navMain} />
          </>
        }
      />
      <main className="hidden lg:flex flex-col w-full p-4 my-4 ml-4 mr-4 bg-white border lg:ml-0 rounded-xl">
        <div className="">{children}</div>
      </main>
    </SidebarProvider>
  );
}
