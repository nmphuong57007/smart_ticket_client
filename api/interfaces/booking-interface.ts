export interface CreateBookingProduct {
  product_id: number;
  qty: number;
}

export interface CreateBookingPayload {
  showtime_id: number;
  seats: number[];
  products?: CreateBookingProduct[];
  discount_code?: string;
}

export interface BookingSeat {
  id: number;
  seat_code: string;
  type: string;
  price: number;
  qr_code: string | null;
}

export interface BookingProduct {
  name: string;
  quantity: number;
  price: number;
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    booking_code: string;
    payment_status: string;
    booking_status: string;
    transaction_code: string | null;
    payment_method: string | null;
    final_amount: number;
    created_at: string;

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
  };
}
