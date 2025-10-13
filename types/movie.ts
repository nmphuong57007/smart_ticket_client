export interface Movie {
  id: number;
  title: string;
  poster: string;
  trailer: string;
  description: string;
  genre: string;
  duration: number;
  format: string;
  release_date: string;
  status: "coming" | "now-showing" | "special";
}

export interface MoviePagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface MoviesResponse {
  success: boolean;
  message: string;
  data: {
    movies: Movie[];
    pagination: MoviePagination;
  };
}

export interface MoviesParams {
  page?: number;
  search?: string;
  status?: "coming" | "now-showing" | "special";
  genre?: string;
  sort_by?: "title" | "release_date" | "duration";
  sort_order?: "asc" | "desc";
  per_page?: number;
}
