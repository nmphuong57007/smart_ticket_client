"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";

import {
  Ticket,
  Calendar,
  Building2,
  CreditCard,
  QrCode,
  ArrowRight,
} from "lucide-react";
import { useBookingHistory } from "@/api/hooks/use-booking-history";
import { redirectConfig } from "@/helpers/redirect-config";

export default function BookingListPage() {
  const { data, isLoading } = useBookingHistory();

  const bookings = data?.data ?? [];

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🎟️ Đơn Vé Đã Đặt
      </h1>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Danh sách đơn */}
      <div className="space-y-5">
        {!isLoading &&
          bookings.map((item) => (
            <Card
              key={item.id}
              className="shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 rounded-2xl"
            >
              <CardContent className="p-5 flex flex-col sm:flex-row justify-between gap-5">
                {/* LEFT CONTENT */}
                <div className="space-y-2 flex-1">
                  <p className="text-xl font-bold flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    {item.movie_title}
                  </p>

                  <p className="text-gray-600 dark:text-gray-400 flex gap-2 items-center text-sm">
                    <Building2 className="w-4 h-4" />
                    Rạp: <span className="font-medium">{item.cinema}</span>
                  </p>

                  <p className="text-gray-600 dark:text-gray-400 flex gap-2 items-center text-sm">
                    <QrCode className="w-4 h-4" />
                    Mã đặt vé:{" "}
                    <span className="font-semibold">{item.booking_code}</span>
                  </p>

                  <p className="text-gray-600 dark:text-gray-400 flex gap-2 items-center text-sm">
                    <Calendar className="w-4 h-4" />
                    Ngày đặt:{" "}
                    {moment(item.booking_date).format("DD/MM/YYYY HH:mm")}
                  </p>

                  <div className="flex gap-2 items-center">
                    <CreditCard className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    <span
                      className="px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {item.payment_method.toUpperCase()}
                    </span>
                  </div>

                  <p className="font-semibold text-lg mt-2">
                    {item.total_amount.toLocaleString()} đ
                  </p>
                </div>

                {/* RIGHT AREA: BUTTON */}
                <div className="flex items-center sm:items-end justify-between sm:flex-col gap-3">
                  <Link
                    href={redirectConfig.bookingHistoryDetail(item.id)}
                    className="px-5 py-2 rounded-xl bg-primary text-white font-normal flex items-center gap-2 hover:bg-primary/80 transition"
                  >
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {!isLoading && bookings.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Bạn chưa có đơn vé nào.
        </p>
      )}
    </div>
  );
}
