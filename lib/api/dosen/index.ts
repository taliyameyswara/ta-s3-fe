import { get } from "../base";

export default async function getListDosen(
  page = 1,
  search?: string,
  limit = 10
) {
  try {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (search) {
      queryParams.append("search", search);
    }

    const url = `/dosen?${queryParams.toString()}`;
    const response = await get(url);

    return response;
  } catch (error) {
    console.error("Error fetching dosen data:", error);
    return {
      data: [],
      meta: { current_page: 1, last_page: 1, total: 0 },
    };
  }
}
