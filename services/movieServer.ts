import { api } from "@/lib/axios-intance";

export const movieApi = {
  getMovies: async (params?: any): Promise<any> => {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.search) searchParams.append("search", params.search);
    if (params?.status) searchParams.append("status", params.status);
    if (params?.genre) searchParams.append("genre", params.genre);
    if (params?.sort_by) searchParams.append("sort_by", params.sort_by);
    if (params?.sort_order) searchParams.append("sort_order", params.sort_order);
    if (params?.per_page) searchParams.append("per_page", params.per_page.toString());

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/movies/list?${queryString}` : "/movies/list";

    const response = await api.get(endpoint);

    // ✅ Chuẩn hóa dữ liệu trả về
    return {
      data: {
        data: response.data.movies,
        pagination: response.data.pagination,
      },
    };
  },

  getMovieById: async (id: any): Promise<any> => {
    const response = await api.get(`/movies/${id}`);
    return response;
  },
};
