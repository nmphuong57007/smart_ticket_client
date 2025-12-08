export interface BookingSeat {
  seat_code: string;
  qr_code: string;
}

export interface BookingProduct {
  name: string;
  quantity: number;
}

export interface BookingDetailData {
  id: number;
  booking_code: string;
  payment_status: string;
  transaction_code: string | null;
  payment_method: string | null;
  final_amount: number;
  created_at: string;

  user: {
    fullname: string;
    email: string;
    phone: string;
  };

  movie: {
    id: number;
    title: string;
    duration: number;
    poster: string;
  };

  showtime: {
    id: number;
    time: string;
    date: string;
    type: string | null;
  };

  cinema: {
    id: number;
    name: string;
  };

  room: {
    id: number;
    name: string;
  };

  seats: BookingSeat[];

  products: BookingProduct[];
}

export interface BookingDetailResponse {
  success: boolean;
  data: BookingDetailData;
}
