import { number, string } from "zod";

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
  status: "coming" | "showing" | "stopped";
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
  per_page?: number;
  search?: string;
  status?: "coming" | "showing" | "stopped";
  genre?: string;
  sort_by?:
    | "id"
    | "title"
    | "release_date"
    | "duration"
    | "created_at"
    | "status"
    | "genre"
    | "format";
  sort_order?: "asc" | "desc";
}

export interface MoviesDetailResponse {
  success: boolean;
  message: string;
  data: {
      id: number;
      title: string;
      poster: string;
      trailer: string;
      description: string;
      genre: string;
      duration: number;
      format: string;
      release_date: string;
      status: string;
      created_at: string;
  };
}
export interface MoviesShowtimeDetailResponse {
  success: boolean;
  message: string;
  data: {
    movie_id: number;
    movie_title: string;
    poster: string;
    full_showtimes: {   //mảng chứa các ngày chiếu
      date: string;
      showtimes: {     //danh sách các suất chiếu trong ngày,
        time: string;
        format: string;
        language_type: string;
        room: string;
        available_seats: number;
        total_seats: number;
      };
    };
  };
}





