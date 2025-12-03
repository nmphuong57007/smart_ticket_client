export interface CinemaRoomItem {
  id: number;
  name: string;
  status: string;
  total_seats: number;
}

export interface CinemaDetailData {
  id: number;
  name: string;
  address: string;
  phone: string;
  status: string;
  image: string;
  description: string;
  rooms: CinemaRoomItem[];
}

export interface CinemaDetailRes {
  success: boolean;
  message: string;
  data: CinemaDetailData;
}
