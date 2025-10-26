import { api } from "@/lib/axios-intance";

export const movieApi = {
  // Lấy danh sách phim với phân trang
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

    const response = await api.get(endpoint);

    return response;
  },

  // Lấy chi tiết phim
  getMovieById: async (id: any): Promise<any> => {
    const response = await api.get(`/movies/${id}`);
    return response;
  },
};

//lấy chi tiết (dành cho trang chi tiết)
export const getMovieDetail = async (id: any) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

//lấy chi tiết lịch chiếu (dành cho trang chi tiết)
export const getMovieShowtimeDetail = async (
  id: any,
  date?: any,
  cinemaId?: any
) => {
  const params: Record<string, any> = {};

  if (date) params.date = date;
  if (cinemaId) params.cinema_id = cinemaId;

  const res = await api.get(
    `/showtimes/movie/${id}/full`,
    { params }
  );

  return res.data;
};
