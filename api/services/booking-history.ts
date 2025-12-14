import instance from "@/lib/instance";
import { BookingListResponse } from "../interfaces/booking-history-interface";
import { BookingDetailResponse } from "../interfaces/booking-detail-interface";


export const getBookingHistory = async (

): Promise<BookingListResponse> => {
  try {
    const res = await instance.get<BookingListResponse>(`/api/bookings/my`, {
      params: {},
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};


export const getBookingHistoryDetail = async (
  bh_id: number
): Promise<BookingDetailResponse> => {
  try {
    const res = await instance.get<BookingDetailResponse>(
      `/api/bookings/${bh_id}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};