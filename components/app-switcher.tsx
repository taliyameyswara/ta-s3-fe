"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { usePathname } from "next/navigation"; // Import usePathname dari next/navigation
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    role: string;
    color: string;
    textcolor: string;
    url: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  const activeTeam =
    teams.find((team) => pathname.startsWith(team.url)) || teams[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-gray-400/5 data-[state=open]:text-sidebar-accent-foreground border bg-white"
            >
              <div
                className={`flex aspect-square size-8 items-center justify-center rounded-lg ${activeTeam.color} text-sidebar-primary-foreground`}
              >
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.role}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Layanan Aplikasi
            </DropdownMenuLabel>

            {teams.map((team) => {
              const isActive = pathname.startsWith(team.url);

              return (
                <DropdownMenuItem key={team.name} asChild>
                  <Link
                    href={team.url}
                    className={`flex items-center gap-2 p-2 w-full rounded-md ${
                      isActive ? "font-bold" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <team.logo
                        className={`size-4 shrink-0 ${team.textcolor}`}
                      />
                    </div>
                    {team.name}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
