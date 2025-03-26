import { Mail, Phone, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dosen } from "@/type/dosen";
import DropdownTableMenu from "./dropdown-table-menu";

interface DosenCardProps {
  data: Dosen[];
  onDelete?: (id: number) => void;
}

export default function DosenCard({ data }: DosenCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((dosen) => (
        <Card key={dosen.id} className="overflow-hidden shadow-none p-4.5">
          <CardHeader className="flex flex-row  justify-between space-y-0 p-0">
            <div className="">
              <h3 className="font-medium text-lg">{dosen.name}</h3>
              <p className="text-muted-foreground">{dosen.npp}</p>
            </div>

            <DropdownTableMenu dosen={dosen} />
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid gap-2">
              <div className="flex items-center text-sm">
                <Mail className="mr-2 size-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-1 font-medium">{dosen.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="mr-2 size-4 text-muted-foreground" />
                <span className="text-muted-foreground">Telepon:</span>
                <span className="ml-1 font-medium">{dosen.telepon}</span>
              </div>
              <div className="flex items-center text-sm">
                <BookOpen className="mr-2 size-4 text-muted-foreground" />
                <span className="text-muted-foreground">Bidang Kajian:</span>
                <span className="ml-1 font-medium">{dosen.bidang_kajian}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
