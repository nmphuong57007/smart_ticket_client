import { api } from "@/lib/axios-intance";

export const movieApi = {
  // ✅ Lấy danh sách phim
  getMovies: async (params?: any): Promise<any> => {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.search) searchParams.append("search", params.search);
    if (params?.status) searchParams.append("status", params.status);
    if (params?.genre) searchParams.append("genre", params.genre);
    if (params?.sort_by) searchParams.append("sort_by", params.sort_by);
    if (params?.sort_order)
      searchParams.append("sort_order", params.sort_order);
    if (params?.per_page)
      searchParams.append("per_page", params.per_page.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString
      ? `/movies/list?${queryString}`
      : "/movies/list";

    const res = await api.get(endpoint);

    // ✅ Chuẩn hóa response: chỉ trả về phần cần dùng
    return {
      movies: res?.data?.movies ?? [],
      pagination: res?.data?.pagination ?? {},
    };
  },

  // ✅ Lấy chi tiết phim
  getMovieById: async (id: number): Promise<any> => {
    const res = await api.get(`/movies/${id}`);
    return res;
  },
};
