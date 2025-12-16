"use client";

import { useParams } from "next/navigation";
import { useBookingDetail } from "@/api/hooks/use-booking-detail";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
  Film,
  CreditCard,
  QrCode,
  MapPin,
  Armchair,
  Clock,
  CheckCircle,
} from "lucide-react";
import QRCode from "react-qr-code";

export default function BookingDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading } = useBookingDetail(id);
  const booking = data?.data;

  if (isLoading)
    return (
      <div className="container mx-auto py-20">
        <Skeleton className="w-full h-[420px] rounded-2xl" />
      </div>
    );

  if (!booking)
    return (
      <p className="text-center py-20 text-gray-500">
        Không tìm thấy thông tin vé.
      </p>
    );

  return (
    <div className="container mx-auto py-14 max-w-5xl">
      <Card className="rounded-3xl shadow-lg border overflow-hidden bg-white">
        {/* ===== HEADER ===== */}
        <div className="px-8 py-6 border-b bg-gray-50">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🎟️ THÔNG TIN VÉ XEM PHIM
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Mã giao dịch: <b>{booking.transaction_code}</b>
          </p>
        </div>

        {/* ===== BODY ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* ===== LEFT ===== */}
          <div className="p-8 border-r space-y-6">
            {/* POSTER */}
            <img
              src={booking.movie.poster}
              alt={booking.movie.title}
              className="w-56 mx-auto rounded-2xl shadow"
            />

            {/* QR */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white p-4 rounded-xl shadow border">
                <QRCode value={booking.qr_code} size={150} />
              </div>
              <p className="text-xs text-gray-500 text-center">
                Đưa mã QR này cho nhân viên soát vé để vào rạp
              </p>

              {booking.is_checked_in && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Đã check-in
                </span>
              )}
            </div>
          </div>

          {/* ===== RIGHT ===== */}
          <div className="lg:col-span-2 p-8 space-y-8">
            {/* MOVIE TITLE */}
            <div>
              <h2 className="text-2xl font-bold mb-3">
                {booking.movie.title}
              </h2>

              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  <Clock className="w-4 h-4" />
                  {booking.showtime.time} •{" "}
                  {moment(booking.showtime.date).format("DD/MM/YYYY")}
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                  {booking.movie.duration} phút
                </span>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <p className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                Rạp chiếu
              </p>
              <p>{booking.cinema.name}</p>

              <p className="flex items-center gap-2 text-gray-600">
                <Film className="w-4 h-4" />
                Phòng chiếu
              </p>
              <p>{booking.room.name}</p>

              <p className="flex items-center gap-2 text-gray-600">
                <Armchair className="w-4 h-4" />
                Ghế
              </p>
              <p className="font-semibold">
                {booking.seats.map(s => s.seat_code).join(", ")}
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                🍿 Đồ ăn
              </p>
              <p>
                {booking.products.length
                  ? booking.products
                      .map(p => `${p.name} x${p.quantity}`)
                      .join(", ")
                  : "Không có"}
              </p>
            </div>

            {/* PAYMENT */}
            <div className="border rounded-2xl p-6 bg-gray-50">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5" />
                Thanh toán
              </h3>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <p>Phương thức:</p>
                <p className="uppercase font-medium">
                  {booking.payment_method}
                </p>

                <p>Ngày đặt:</p>
                <p>
                  {moment(booking.created_at).format("HH:mm DD/MM/YYYY")}
                </p>

                <p className="font-semibold">Tổng tiền:</p>
                <p className="text-xl font-bold text-red-500">
                  {booking.final_amount.toLocaleString()} đ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="px-8 py-4 border-t flex justify-end bg-gray-50">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            ← Quay lại
          </button>
        </div>
      </Card>
    </div>
  );
}
