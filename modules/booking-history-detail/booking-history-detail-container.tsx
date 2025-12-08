"use client";

import { useParams } from "next/navigation";
import { useBookingDetail } from "@/api/hooks/use-booking-detail";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
  Film,
  Clock,
  MapPin,
  CreditCard,
  Ticket,
  Popcorn,
} from "lucide-react";

export default function BookingDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading } = useBookingDetail(id);
  const booking = data?.data;

  if (isLoading)
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="w-full h-80 rounded-xl" />
      </div>
    );

  if (!booking)
    return (
      <p className="text-center py-10 text-gray-500">
        Không tìm thấy thông tin vé.
      </p>
    );

  return (
    <div className="container mx-auto py-10 max-w-4xl">

      <h1 className="text-2xl font-bold mb-8">Chi tiết đơn vé </h1>

      {/* =================== ONE MAIN BOX =================== */}
      <Card className="p-6 border dark:border-gray-700 shadow-md rounded-xl space-y-8">

        {/* ------ THÔNG TIN PHIM ------ */}
        <div>
          <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
            <Film className="w-6 h-6 text-primary" />
            Thông tin vé xem phim
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <p><span className="font-medium">Phim:</span> {booking.movie.title}</p>
              <p><span className="font-medium">Ngày chiếu:</span> {moment(booking.showtime.date).format("DD/MM/YYYY")}</p>
              <p><span className="font-medium">Giờ chiếu:</span> {booking.showtime.time}</p>
              <p><span className="font-medium">Ngày đặt:</span> {moment(booking.created_at).format("DD/MM/YYYY HH:mm")}</p>
              <p><span className="font-medium">Thời lượng:</span> {booking.movie.duration} phút</p>
            </div>

            <div className="space-y-2">
              <p><span className="font-medium">Rạp:</span> {booking.cinema.name}</p>
              <p><span className="font-medium">Phòng chiếu:</span> {booking.room.name}</p>
              <p>
                <span className="font-medium">Ghế đã đặt:</span>{" "}
                {booking.seats.map((s) => s.seat_code).join(", ")}
              </p>
              <p>
                <span className="font-medium">Đồ ăn:</span>{" "}
                {booking.products.length > 0
                  ? booking.products.map((p) => `${p.name} x${p.quantity}`).join(", ")
                  : "Không có"}
              </p>
            </div>
          </div>
        </div>

        {/* ------ THÔNG TIN THANH TOÁN (Đưa xuống dưới) ------ */}
        <div>
          <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            Thông tin thanh toán
          </h3>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Phương thức:</span>{" "}
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {booking.payment_method?.toUpperCase()}
              </span>
            </p>

            <p>
              <span className="font-medium">Mã giao dịch:</span>{" "}
              {booking.transaction_code}
            </p>

            <p className="text-xl font-bold text-primary pt-2">
              Tổng tiền: {booking.final_amount.toLocaleString()} đ
            </p>
          </div>
        </div>

        {/* ------ BUTTONS ------ */}
        <div className="flex gap-4 pt-2">
          {/* <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80">
            In đơn vé
          </button> */}

          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Quay lại
          </button>
        </div>
      </Card>
    </div>
  );
}
