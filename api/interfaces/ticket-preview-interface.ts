export interface TicketPreviewSeat {
  id: number;
  seat_code: string;
  type: string;
  status: string;
  price: number;
}

export interface TicketPreviewCombo {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

export interface TicketPreviewMovie {
  id: number;
  title: string;
}

export interface TicketPreviewShowtime {
  id: number;
  date: string;
  time: string;
}

export interface TicketPreviewRoom {
  id: number;
  name: string;
}

export interface TicketPreviewPromotion {
  code: string;
  discount: number;
}

export interface TicketPreviewPricing {
  seat_total: number;
  combo_total: number;
  discount: number;
  final_amount: number;
}

export interface TicketPreviewData {
  movie: TicketPreviewMovie;
  showtime: TicketPreviewShowtime;
  room: TicketPreviewRoom;
  seats: TicketPreviewSeat[];
  combos: TicketPreviewCombo[];
  pricing: TicketPreviewPricing;
  promotion: TicketPreviewPromotion | null;
}

export interface TicketPreviewResponse {
  success: boolean;
  message: string;
  data: TicketPreviewData;
}
