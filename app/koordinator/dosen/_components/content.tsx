kexport async function DosenContent({
  page,
  search,
  limit,
}: {
  page: number;
  search?: string;
  limit: number;
}) {
  const dosenData = await getListDosen(page, search, limit);

  return (
    <>
      <DosenCard data={dosenData?.data || []} />
      <DosenPagination
        currentPage={dosenData?.meta?.current_page ?? 1}
        totalPages={dosenData?.meta?.last_page ?? 1}
      />
    </>
  );
}
