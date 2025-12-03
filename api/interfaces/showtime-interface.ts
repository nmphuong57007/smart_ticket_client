export interface MovieShowtimeItem {
  id: number;
  show_time: string; // giờ chiếu
  room: {
    id: number;
    name: string;
  };
  price: string;
  format: string;
  language_type: string;
}

export interface MovieShowtimeByDate {
  date: string; // "2025-12-02"
  showtimes: MovieShowtimeItem[];
}

export interface MovieShowtimeRes {
  success: boolean;
  message: string;
  data: MovieShowtimeByDate[];
}
