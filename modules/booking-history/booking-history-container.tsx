"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import moment from "moment";

import {
  Calendar,
  MapPin,
  QrCode,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import { useBookingHistory } from "@/api/hooks/use-booking-history";
import { redirectConfig } from "@/helpers/redirect-config";

export default function BookingListPage() {
  const { data, isLoading } = useBookingHistory();
  const bookings = data?.data ?? [];

  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <h1 className="text-3xl font-bold mb-10 text-center">
        🎟️ Vé của tôi
      </h1>

      {/* ----------- LOADING ----------- */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* ----------- LIST ----------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {!isLoading &&
          bookings.map((item) => (
            <Card
                key={item.id}
                className="
                  rounded-2xl p-6 border shadow-sm 
                  bg-white text-gray-800 
                  dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700
                  hover:shadow-lg transition-all

                  flex flex-col justify-between h-full
                "
              >
                <div className="space-y-3 flex-1">
                  <p className="text-xl font-semibold leading-tight">{item.movie_title}</p>

                  <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-neutral-400">
                    <MapPin className="w-4 h-4" />
                    Rạp: <span className="font-medium">{item.cinema}</span>
                  </p>

                  <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-neutral-400">
                    <QrCode className="w-4 h-4" />
                    Mã đặt vé:{" "}
                    <span className="font-semibold text-primary dark:text-primary">
                      {item.booking_code}
                    </span>
                  </p>

                  <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-neutral-400">
                    <Calendar className="w-4 h-4" />
                    Ngày đặt: {moment(item.booking_date).format("DD/MM/YYYY HH:mm")}
                  </p>

                  <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-neutral-400">
                    <CreditCard className="w-4 h-4" />
                    Thanh toán:{" "}
                    <span className="font-medium uppercase">
                      {item.payment_method}
                    </span>
                  </p>

                  {item.transaction_code && (
                    <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-neutral-400">
                      <QrCode className="w-4 h-4" />
                      Mã giao dịch:{" "}
                      <span className="font-semibold">{item.transaction_code}</span>
                    </p>
                  )}

                  <p className="font-bold text-lg pt-1">
                    {item.final_amount.toLocaleString()} đ
                  </p>
                </div>

                {/* BUTTON FIXED BOTTOM */}
                <Link
                  href={redirectConfig.bookingHistoryDetail(item.id)}
                  className="
                    w-full mt-4 px-4 py-2 rounded-xl
                    flex items-center justify-center gap-2 text-sm font-medium

                    bg-gray-100 text-gray-800 hover:bg-gray-200
                    dark:bg-white/10 dark:text-white dark:hover:bg-white/20

                    border border-transparent dark:border-white/10

                    transition
                  "
                >
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4" />
                </Link>
            </Card>

          ))}
      </div>

      {/* ----------- EMPTY STATE ----------- */}
      {!isLoading && bookings.length === 0 && (
        <p className="text-center text-gray-500 dark:text-neutral-400 mt-10">
          Bạn chưa có đơn vé nào.
        </p>
      )}
    </div>
  );
}
