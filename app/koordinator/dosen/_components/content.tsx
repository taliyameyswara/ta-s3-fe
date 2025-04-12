"use client";

import { useListDosen } from "@/lib/api/dosen/client";
import DosenCard from "./dosen-card";
import { Pagination } from "@/components/pagination";
import { Dosen } from "@/type/dosen";
import Loading from "../loading";

type DosenContentProps = {
  page: number;
  search?: string;
  limit: number;
};

export function DosenContent({ page, search, limit }: DosenContentProps) {
  const { data, error, isLoading, isAuthenticated } = useListDosen(
    page,
    search,
    limit
  );

  if (!isAuthenticated) {
    return <div>Please log in to view dosen data.</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const dosenData = data?.data || [];
  const meta = data?.meta || { current_page: 1, last_page: 1 };

  return (
    <>
      <DosenCard data={dosenData as Dosen[]} />
      <Pagination currentPage={meta.current_page} totalPages={meta.last_page} />
    </>
  );
}
