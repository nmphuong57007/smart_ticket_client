"use client";

import { useParams } from "next/navigation";
import { useBookingDetail } from "@/api/hooks/use-booking-detail";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Film, CreditCard, QrCode } from "lucide-react";
import QRCode from "react-qr-code";

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
      <h1 className="text-2xl font-bold mb-8">Chi tiết đơn vé</h1>

      <Card className="p-6 border dark:border-gray-700 shadow-md rounded-xl space-y-8">

        {/* ===== THÔNG TIN PHIM ===== */}
        <div>
          <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
            <Film className="w-6 h-6 text-primary" />
            Thông tin vé xem phim
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <p><b>Phim:</b> {booking.movie.title}</p>
              <p><b>Ngày chiếu:</b> {moment(booking.showtime.date).format("DD/MM/YYYY")}</p>
              <p><b>Giờ chiếu:</b> {booking.showtime.time}</p>
              <p><b>Ngày đặt:</b> {moment(booking.created_at).format("DD/MM/YYYY HH:mm")}</p>
              <p><b>Thời lượng:</b> {booking.movie.duration} phút</p>
            </div>

            <div className="space-y-2">
              <p><b>Rạp:</b> {booking.cinema.name}</p>
              <p><b>Phòng chiếu:</b> {booking.room.name}</p>
              <p>
                <b>Ghế:</b>{" "}
                {booking.seats.map(s => s.seat_code).join(", ")}
              </p>
              <p>
                <b>Đồ ăn:</b>{" "}
                {booking.products.length
                  ? booking.products.map(p => `${p.name} x${p.quantity}`).join(", ")
                  : "Không có"}
              </p>
            </div>
          </div>
        </div>

        {/* ===== THANH TOÁN + QR ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* ---- THANH TOÁN ---- */}
          <div>
            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-primary" />
              Thông tin thanh toán
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <b>Phương thức:</b>{" "}
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
                  {booking.payment_method?.toUpperCase()}
                </span>
              </p>

              <p><b>Mã giao dịch:</b> {booking.transaction_code}</p>

              <p className="text-xl font-bold text-primary pt-2">
                Tổng tiền: {booking.final_amount.toLocaleString()} đ
              </p>

              {booking.is_checked_in && (
                <p className="text-green-600 font-medium">
                  ✔ Đã check-in lúc {moment(booking.checked_in_at).format("HH:mm DD/MM/YYYY")}
                </p>
              )}
            </div>
          </div>

          {/* ---- QR BOOKING ---- */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-primary" />
              Mã QR Check-in
            </h3>

            <div className="p-4 bg-white rounded-xl shadow">
              <QRCode value={booking.qr_code} size={160} />
            </div>

            <p className="text-xs text-gray-500 mt-3 ">
              Dùng mã này để check-in tại rạp
            </p>
          </div>
        </div>

        {/* ===== BUTTON ===== */}
        <div className="pt-4">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Quay lại
          </button>
        </div>

      </Card>
    </div>
  );
}
