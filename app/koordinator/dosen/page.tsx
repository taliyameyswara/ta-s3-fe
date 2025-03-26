import { Suspense } from "react";
import Loading from "./loading";
import { DosenContent } from "./_components/content";

export default async function MahasiswaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; search?: string; limit?: number }>;
}) {
  const { page = "1", search = "", limit = "10" } = await searchParams;
  const pageNum = Number(page) || 1;
  const searchQuery = search || undefined;
  const limitNum = Number(limit) || 10;
  const suspenseKey = `page=${pageNum}${
    searchQuery ? `&search=${searchQuery}` : ""
  }&limit=${limitNum}`;

  return (
    <div>
      <Suspense key={suspenseKey} fallback={<Loading />}>
        <DosenContent page={pageNum} search={searchQuery} limit={limitNum} />
      </Suspense>
    </div>
  );
}
