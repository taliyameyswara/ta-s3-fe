"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mahasiswa } from "@/type/mahasiswa";
import { EyeIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface DropdownTableMenuProps {
  mahasiswa: Mahasiswa;
}

export default function DropdownTableMenu({
  mahasiswa,
}: DropdownTableMenuProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              href={`/dosen/mahasiswa/${mahasiswa.id}`}
              className="flex items-center"
            >
              <EyeIcon className="mr-2 size-4" />
              Detail Bimbingan
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
