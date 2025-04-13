import { MahasiswaContent } from "./_components/content";

export default async function MahasiswaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; limit?: string }>;
}) {
  const { page = "1", search = "", limit = "10" } = await searchParams;
  const pageNum = Number(page) || 1;
  const searchQuery = search || undefined;
  const limitNum = Number(limit) || 10;

  return (
    <div>
      <MahasiswaContent page={pageNum} search={searchQuery} limit={limitNum} />
    </div>
  );
}
