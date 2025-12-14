export interface BookingSeat {
  id: number;
  seat_code: string;
  type: string;
  price: number;
}

export interface BookingProduct {
  name: string;
  quantity: number;
  price: string;
}

export interface BookingDetailData {
  id: number;
  booking_code: string;
  payment_status: string;
  booking_status: string;
  transaction_code: string | null;
  payment_method: string | null;
  final_amount: number;
  created_at: string;

  qr_code: string;
  is_checked_in: boolean;
  checked_in_at: string | null;
  checked_in_by: number | null;

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
    date: string;
    time: string;
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
