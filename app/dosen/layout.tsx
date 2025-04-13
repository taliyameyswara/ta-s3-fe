"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { NavMenu } from "@/components/nav-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Home, User } from "lucide-react";

const sidebarData = {
  menus: [
    { name: "Dashboard", url: "/dosen", icon: Home },
    {
      name: "Mahasiswa Bimbingan",
      url: "/dosen/mahasiswa",
      icon: User,
    },
  ],
};

export default function DosenLayout({
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
