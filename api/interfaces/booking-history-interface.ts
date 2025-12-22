
export interface BookingItem {
  id: number;
  booking_code: string;
  email: string;
  movie_title: string;
  cinema: string;
  booking_date: string;
  payment_method: string;
  transaction_code: string;
  final_amount: number;
  payment_status: string;           
}

export interface BookingListResponse {
  success: boolean;
  data: BookingItem[];
}
