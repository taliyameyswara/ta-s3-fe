"use client";

import * as React from "react";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function AppSidebar({
  sidebarContent,
  ...props
}: { sidebarContent: React.ReactNode } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <Image
          src={
            "https://sti.dinus.ac.id/_next/image?url=%2Flogo%2Flogo-ti.png&w=384&q=75"
          }
          alt="Logo STI"
          className="mb-4 mr-auto ml-2 object-contain"
          width={150}
          height={33}
        />
      </SidebarHeader>

      <SidebarContent>{sidebarContent}</SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
