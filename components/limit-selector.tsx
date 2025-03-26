"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LimitSelectorProps {
  defaultValue?: number;
}

export function LimitSelector({ defaultValue = 10 }: LimitSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      if (name === "limit") {
        params.set("page", "1");
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleLimitChange = (value: string) => {
    const query = createQueryString("limit", value);
    router.push(`?${query}`);
  };

  // Get current limit from URL or use default
  const currentLimit = searchParams.get("limit") || defaultValue.toString();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Show:</span>
      <Select value={currentLimit} onValueChange={handleLimitChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={currentLimit} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
