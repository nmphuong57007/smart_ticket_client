export interface SeatItem {
   id: number; 
  code: string;
  type: "normal" | "vip";
  physical_status: "active" | "broken";
  status: "available" | "booked";
  price: number;
}

export type SeatMapRow = SeatItem[];

export interface SeatMapResponse {
  success: boolean;
  message: string;
  data: {
    showtime_id: number;
    room_id: number;
    seat_map: SeatMapRow[];
  };
}



