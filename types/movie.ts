export type MovieStatus = 'coming' | 'showing' | 'stopped';

export interface Movie {
  id: number;
  title: string;
  poster: string;
  trailer: string | null;
  description: string;
  genre: string;
  duration: number;
  format: string | null;
  release_date: string;
  status: MovieStatus;
}

export interface MoviePagination {
  current_page: any;
  last_page: any;
  per_page: any;
  total: any;
  from: any;
  to: any;
}

export interface MoviesResponse {
  success: any;
  message: any;
  data: any;
}

export interface MoviesParams {
  page?: any;
  per_page?: any;
  search?: any;
  status?: any;
  genre?: any;
  sort_by?: any;
  sort_order?: any;
}

export interface MoviesDetailResponse {
  success: any;
  message: any;
  data: any;
}

export interface Showtime {
  time: any;
  format: any;
  language_type: any;
  room: any;
  available_seats: any;
  total_seats: any;
}

export interface ShowtimeDay {
  date: any;
  showtimes: any;
}

export interface MoviesShowtimeDetailResponse {
  success: any;
  message: any;
  data: any;
}





