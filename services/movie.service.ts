import { api } from "@/lib/axios-intance";
import type { Movie, MoviesResponse, MoviesParams, MoviesDetailResponse } from "@/types/movie";

export const movieApi = {
  // Lấy danh sách phim với phân trang
  getMovies: async (params?: MoviesParams): Promise<MoviesResponse> => {
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

    const response: MoviesResponse = await api.get(endpoint);
    return response;
  },

  // Lấy chi tiết phim
  getMovieById: async (
    id: number
  ): Promise<{ success: boolean; message: string; data: Movie }> => {
    const response: { success: boolean; message: string; data: Movie } =
      await api.get(`/movies/${id}`);
    return response;
  },
};

//lấy chi tiết (dành cho trang chi tiết)
export const getMovieDetail = async (id: number) => {
  const res = await api.get<MoviesDetailResponse>(`/movies/${id}`);
  return res.data;
};