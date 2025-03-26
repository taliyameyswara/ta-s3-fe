"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mahasiswa } from "@/type/mahasiswa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropdownTableMenu from "./dropdown-table-menu";

interface MahasiswaTableProps {
  data: Mahasiswa[];
}

export function MahasiswaTable({ data }: MahasiswaTableProps) {
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Tidak ada data mahasiswa
                </TableCell>
              </TableRow>
            ) : (
              data.map((mahasiswa) => (
                <TableRow key={mahasiswa.id}>
                  <TableCell>
                    <div className="flex gap-2">
                      <Avatar className="size-10">
                        <AvatarImage
                          className="object-cover"
                          src={mahasiswa.foto}
                          alt={mahasiswa.name}
                        />
                        <AvatarFallback>
                          {mahasiswa.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-gray-500">{mahasiswa.nim}</span>
                        <span>{mahasiswa.name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{mahasiswa.email}</TableCell>
                  <TableCell>{mahasiswa.telepon || "-"}</TableCell>
                  <TableCell>
                    <DropdownTableMenu mahasiswa={mahasiswa} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
