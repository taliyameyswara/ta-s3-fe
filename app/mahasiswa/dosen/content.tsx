import Link from "next/link";
import { Mail, Phone, BookOpen, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Dosen {
  id: number;
  user_id: number;
  npp: string;
  bidang_kajian: string;
  scholar_link: string;
  telepon: string;
  name: string;
  email: string;
}

interface DosenPembimbingProps {
  promotor: Dosen;
  co_promotor_1: Dosen;
  co_promotor_2: Dosen;
}

export default function DosenPembimbing({
  promotor,
  co_promotor_1,
  co_promotor_2,
}: DosenPembimbingProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <DosenCard dosen={promotor} role="Promotor" badgeVariant="primary" />
        <DosenCard
          dosen={co_promotor_1}
          role="Co-Promotor 1"
          badgeVariant="primary"
        />

        <DosenCard
          dosen={co_promotor_2}
          role="Co-Promotor 2"
          badgeVariant="primary"
        />
      </div>
    </div>
  );
}

interface DosenCardProps {
  dosen: Dosen;
  role: string;
  badgeVariant: "primary";
}

function DosenCard({ dosen, role, badgeVariant }: DosenCardProps) {
  return (
    <Card className="shadow-none hover:shadow transition-shadow duration-200 p-6">
      <CardHeader className="p-0">
        <div className="flex justify-between items-start">
          <Badge variant={badgeVariant} className="mb-2">
            {role}
          </Badge>

          {dosen.scholar_link && (
            <Button variant="outline" size="sm">
              <Link
                href={dosen.scholar_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" />
                <span className="sr-only">Buka Google Scholar</span>
              </Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              {dosen.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{dosen.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{dosen.npp}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-3 mt-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate">{dosen.email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{dosen.telepon}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{dosen.bidang_kajian}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
