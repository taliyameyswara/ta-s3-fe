"use client";

import { useState } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track the currently open section

  const handleToggle = (index: number) => {
    // If the clicked section is already open, close it; otherwise, open it and close others
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SidebarGroup className="-mt-5">
      <SidebarMenu>
        {items.map((item, index) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const isSectionActive = item.items?.some(
            (subItem) =>
              pathname === subItem.url ||
              (pathname.startsWith(subItem.url + "/") &&
                !["/koordinator", "/dosen", "/mahasiswa"].includes(subItem.url))
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              open={openIndex === index} // Controlled state
              onOpenChange={() => handleToggle(index)} // Toggle on click
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="p-5" tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <SidebarMenuSub className="ml-[1.6rem] p-0">
                    {item.items?.map((subItem) => {
                      const excludedPaths = [
                        "/tugas-akhir",
                        "/alumni",
                        "/kerja-praktek",
                        "/bimbingan-karir",
                      ];

                      const isActive =
                        pathname === subItem.url ||
                        (pathname.startsWith(subItem.url + "/") &&
                          !excludedPaths.includes(subItem.url));

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`!rounded-lg p-5 pl-4 ml-4 ${
                              isActive
                                ? "bg-primary-400/10 text-primary [&_icon]:text-primary hover:bg-primary-400/10 hover:text-primary before:absolute before:top-2 before:bottom-2 before:left-0 before:w-1 before:bg-primary before:rounded-r-md"
                                : ""
                            }`}
                          >
                            <Link href={subItem.url}>
                              {subItem.icon && (
                                <subItem.icon
                                  className={`${
                                    isActive ? "!text-primary" : ""
                                  }`}
                                />
                              )}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
