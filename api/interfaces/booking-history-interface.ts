
export interface BookingItem {
  id: number;
  booking_code: string;
  email: string;
  movie_title: string;
  cinema: string;
  booking_date: string;
  payment_method: string;
  transaction_code: string;
  total_amount: number;
}

export interface BookingListResponse {
  success: boolean;
  data: BookingItem[];
}
