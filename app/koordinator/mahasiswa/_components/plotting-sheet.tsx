"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { plottingAction } from "@/lib/api/mahasiswa";
import { Dosen } from "@/type/dosen";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useListDosen } from "@/lib/api/dosen/client";
import { useGetPlotting } from "@/lib/api/mahasiswa/client";

interface PlottingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  mahasiswaId: number;
  mahasiswaName: string;
}

export function PlottingSheet({
  isOpen,
  onClose,
  mahasiswaId,
  mahasiswaName,
}: PlottingSheetProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [promotorId, setPromotorId] = useState<string>("");
  const [coPromotor1Id, setCoPromotor1Id] = useState<string>("");
  const [coPromotor2Id, setCoPromotor2Id] = useState<string>("");
  const [openPromotor, setOpenPromotor] = useState(false);
  const [openCoPromotor1, setOpenCoPromotor1] = useState(false);
  const [openCoPromotor2, setOpenCoPromotor2] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: dosenResult, isLoading: dosenLoading } = useListDosen(
    isOpen ? 1 : 0,
    "",
    isOpen ? 100 : 0
  );
  const { data: plottingResult, isLoading: plottingLoading } = useGetPlotting(
    isOpen ? mahasiswaId : 0
  );

  useEffect(() => {
    if (
      isOpen &&
      plottingResult?.success &&
      plottingResult.data &&
      !isInitialized
    ) {
      const { promotor, co_promotor_1, co_promotor_2 } = plottingResult.data;
      setPromotorId(promotor?.id?.toString() || "");
      setCoPromotor1Id(co_promotor_1?.id?.toString() || "");
      setCoPromotor2Id(co_promotor_2?.id?.toString() || "");
      setIsInitialized(true);
    } else if (
      isOpen &&
      !plottingResult?.success &&
      !isInitialized &&
      !plottingLoading
    ) {
      setPromotorId("");
      setCoPromotor1Id("");
      setCoPromotor2Id("");
      setIsInitialized(true);
    }
  }, [isOpen, plottingResult, isInitialized, plottingLoading]);

  // Reset initialization when sheet closes
  useEffect(() => {
    if (!isOpen) {
      setIsInitialized(false);
      setPromotorId("");
      setCoPromotor1Id("");
      setCoPromotor2Id("");
    }
  }, [isOpen]);

  const dosenList = dosenResult?.data || [];
  const isEditMode = Boolean(plottingResult?.success && plottingResult.data);
  const isDataLoading = dosenLoading || plottingLoading;

  const handleSubmit = async () => {
    if (!promotorId || !coPromotor1Id || !coPromotor2Id) {
      toast.warning("Silakan pilih semua dosen untuk plotting");
      return;
    }

    setIsLoading(true);
    try {
      const plottingData = {
        mahasiswa_id: mahasiswaId,
        promotor_id: Number.parseInt(promotorId),
        co_promotor1_id: Number.parseInt(coPromotor1Id),
        co_promotor2_id: Number.parseInt(coPromotor2Id),
      };

      const result = await plottingAction(plottingData);

      if (result.success) {
        toast.success("Plotting mahasiswa berhasil disimpan");
        router.refresh();
        onClose();
      } else {
        throw new Error(result.message || "Failed to save plotting");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Gagal menyimpan plotting mahasiswa"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const SkeletonLoader = () => (
    <div className="grid gap-4 px-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24 " />{" "}
          <Skeleton className="h-10 w-full " />{" "}
        </div>
      ))}
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {isEditMode
              ? "Edit Plotting Dosen Pembimbing"
              : "Plotting Dosen Pembimbing"}
          </SheetTitle>
          <SheetDescription>
            {isEditMode
              ? `Edit dosen pembimbing untuk mahasiswa ${mahasiswaName}`
              : `Pilih dosen pembimbing untuk mahasiswa ${mahasiswaName}`}
          </SheetDescription>
        </SheetHeader>

        {isDataLoading && <SkeletonLoader />}

        {!isDataLoading && (
          <div className="grid gap-4 px-4">
            {/* Promotor Select */}
            <div className="space-y-2">
              <Label className="text-sm">Promotor</Label>
              <Popover open={openPromotor} onOpenChange={setOpenPromotor}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPromotor}
                    className="w-full justify-between"
                    disabled={isLoading}
                  >
                    {promotorId
                      ? dosenList.find(
                          (dosen: Dosen) => dosen.id?.toString() === promotorId
                        )?.name
                      : "Pilih Promotor..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Cari dosen..." />
                    <CommandList>
                      <CommandEmpty>Dosen tidak ditemukan.</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-auto">
                        {dosenList.map((dosen: Dosen) => (
                          <CommandItem
                            key={dosen.id}
                            value={dosen.name}
                            onSelect={() => {
                              setPromotorId(dosen.id?.toString() || "");
                              setOpenPromotor(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                promotorId === dosen.id?.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span>{dosen.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {dosen.npp}
                              </span>
                            </div>
                            <Badge variant="outline" className="ml-auto">
                              {dosen.bidang_kajian}
                            </Badge>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Co-Promotor 1 Select */}
            <div className="space-y-2">
              <Label className="text-sm">Co-Promotor 1</Label>
              <Popover open={openCoPromotor1} onOpenChange={setOpenCoPromotor1}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCoPromotor1}
                    className="w-full justify-between"
                    disabled={isLoading}
                  >
                    {coPromotor1Id
                      ? dosenList.find(
                          (dosen: Dosen) =>
                            dosen.id?.toString() === coPromotor1Id
                        )?.name
                      : "Pilih Co-Promotor 1..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Cari dosen..." />
                    <CommandList>
                      <CommandEmpty>Dosen tidak ditemukan.</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-auto">
                        {dosenList.map((dosen: Dosen) => (
                          <CommandItem
                            key={dosen.id}
                            value={dosen.name}
                            onSelect={() => {
                              setCoPromotor1Id(dosen.id?.toString() || "");
                              setOpenCoPromotor1(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                coPromotor1Id === dosen.id?.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span>{dosen.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {dosen.npp}
                              </span>
                            </div>
                            <Badge variant="outline" className="ml-auto">
                              {dosen.bidang_kajian}
                            </Badge>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Co-Promotor 2 Select */}
            <div className="space-y-2">
              <Label className="text-sm">Co-Promotor 2</Label>
              <Popover open={openCoPromotor2} onOpenChange={setOpenCoPromotor2}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCoPromotor2}
                    className="w-full justify-between"
                    disabled={isLoading}
                  >
                    {coPromotor2Id
                      ? dosenList.find(
                          (dosen: Dosen) =>
                            dosen.id?.toString() === coPromotor2Id
                        )?.name
                      : "Pilih Co-Promotor 2..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Cari dosen..." />
                    <CommandList>
                      <CommandEmpty>Dosen tidak ditemukan.</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-auto">
                        {dosenList.map((dosen: Dosen) => (
                          <CommandItem
                            key={dosen.id}
                            value={dosen.name}
                            onSelect={() => {
                              setCoPromotor2Id(dosen.id?.toString() || "");
                              setOpenCoPromotor2(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                coPromotor2Id === dosen.id?.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span>{dosen.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {dosen.npp}
                              </span>
                            </div>
                            <Badge variant="outline" className="ml-auto">
                              {dosen.bidang_kajian}
                            </Badge>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        <SheetFooter className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading
              ? "Menyimpan..."
              : isEditMode
              ? "Simpan Perubahan"
              : "Simpan Plotting"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
