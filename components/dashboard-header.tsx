"use client";

import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";

interface DashboardHeader {
  breadcrumbItems: { name: string; url: string }[];
  titleItems?: { title?: string; subtitle?: string }[];
}

const DashboardHeader = ({ breadcrumbItems, titleItems }: DashboardHeader) => {
  return (
    <>
      <header className="flex items-center">
        <SidebarTrigger className="" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="bg-sidebar border p-1 px-2 rounded-lg flex items-center gap-1">
                        {/* {item.icon && <item.icon className="size-4" />} */}
                        {item.name}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.url}>
                        {item.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <Separator className="w-[calc(100%+2rem)] -mx-4 mt-4" />
      <header className="my-4">
        {titleItems?.map((item, index) => (
          <div key={index}>
            <h2 className="text-xl">{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          </div>
        ))}
      </header>
    </>
  );
};

export default DashboardHeader;
