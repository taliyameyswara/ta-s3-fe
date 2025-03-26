import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Dosen } from "@/type/dosen";
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

interface DosenDetailProps {
  dosen: Dosen;
}

export default function DosenDetail({ dosen }: DosenDetailProps) {
  const getStatusBadge = (status: string) => {
    if (status.toLowerCase().includes("belum dimulai")) {
      return (
        <Badge variant="secondary" className="text-muted-foreground border">
          Belum Dimulai
        </Badge>
      );
    } else if (status.toLowerCase().includes("bimbingan")) {
      return <Badge variant="primary">{status}</Badge>;
    } else if (status.toLowerCase().includes("lulus")) {
      return <Badge variant="success">Lulus</Badge>;
    }
    return <Badge>{status}</Badge>;
  };

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dosen">
              <ArrowLeft className="size-4" />
              <span className="sr-only">Kembali</span>
            </Link>
          </Button>
          <div className="flex flex-col">
            <div className="text-muted-foreground flex gap-1 items-center">
              <Users className="size-3" />
              <span className="text-xs">Detail Dosen</span>
            </div>
            <h1 className="font-medium">{dosen.name}</h1>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/dosen/edit/${dosen.id}`}>Edit</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-none col-span-2">
          <CardHeader>
            <CardTitle className="flex items-end gap-2">
              <User className="size-5 text-primary" />
              Data Pribadi
            </CardTitle>
            <CardDescription>Informasi detail dosen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">NPP</span>
                    <span className="font-medium">{dosen.npp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Email</span>
                    <span className="font-medium">{dosen.email}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Telepon
                    </span>
                    <span className="font-medium">{dosen.telepon}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Bidang Kajian
                    </span>
                    <span className="font-medium">{dosen.bidang_kajian}</span>
                  </div>
                </div>
              </div>
              {dosen.scholar_link && (
                <div className="sm:col-span-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href={dosen.scholar_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span>Lihat Profil Google Scholar</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Statistik Bimbingan
            </CardTitle>
            <CardDescription>
              Jumlah mahasiswa bimbingan saat ini
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[calc(100%-88px)]">
            <div className="text-5xl font-semibold my-2">0</div>
            <p className="text-muted-foreground mb-4">Mahasiswa Bimbingan</p>
            <div className="mt-2">
              <Badge variant="success" className="w-full justify-center py-1">
                0 mahasiswa lulus
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Foto</TableHead>
                <TableHead>NIM</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Prosiding</TableHead>
                <TableHead>Jurnal</TableHead>
                <TableHead>Disertasi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dosen.mahasiswa_bimbingan &&
              dosen.mahasiswa_bimbingan.length > 0 ? (
                dosen.mahasiswa_bimbingan?.map((mahasiswa, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar className="size-10">
                        <AvatarImage
                          className="object-cover"
                          src={
                            mahasiswa.foto ||
                            "/placeholder.svg?height=40&width=40"
                          }
                          alt={mahasiswa.name}
                        />
                        <AvatarFallback>
                          {mahasiswa.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{mahasiswa.nim}</TableCell>
                    <TableCell className="font-medium">
                      {mahasiswa.name}
                    </TableCell>
                    <TableCell>{getStatusBadge(mahasiswa.prosiding)}</TableCell>
                    <TableCell>{getStatusBadge(mahasiswa.jurnal)}</TableCell>
                    <TableCell>{getStatusBadge(mahasiswa.disertasi)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-4 text-center text-muted-foreground"
                  >
                    Tidak ada mahasiswa bimbingan saat ini.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
