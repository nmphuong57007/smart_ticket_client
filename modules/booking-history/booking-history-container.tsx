"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import moment from "moment";

import {
  Calendar,
  MapPin,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import { useBookingHistory } from "@/api/hooks/use-booking-history";
import { redirectConfig } from "@/helpers/redirect-config";

export default function BookingListPage() {
  const { data, isLoading } = useBookingHistory();
  const bookings = data?.data ?? [];

  return (
    <div className="container mx-auto py-14 max-w-6xl">
      <h1 className="text-3xl font-bold mb-12 text-center">
        🎟️ Vé của tôi
      </h1>

      {/* ----------- LOADING ----------- */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-44 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {/* ----------- LIST ----------- */}
      {!isLoading && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookings.map((item) => (
            <Card
              key={item.id}
              className="
                rounded-2xl p-6
                bg-white text-gray-900
                dark:bg-[#0f172a] dark:text-gray-100
                border dark:border-gray-700
                shadow-sm hover:shadow-lg transition
                flex flex-col justify-between
              "
            >
              {/* ===== CONTENT ===== */}
              <div className="space-y-6">
                {/* MOVIE TITLE */}
                <h2 className="text-xl font-bold text-black-600 dark:text-black-400">
                  {item.movie_title}
                </h2>

                {/* INFO BLOCK */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      Rạp
                    </p>
                    <p className="font-medium">{item.cinema}</p>

                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      Ngày đặt
                    </p>
                    <p>
                      {moment(item.booking_date).format("DD/MM/YYYY HH:mm")}
                    </p>

                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CreditCard className="w-4 h-4 text-blue-500" />
                      Thanh toán
                    </p>
                    <p className="uppercase font-medium">
                      {item.payment_method}
                    </p>
                  </div>
                </div>

                {/* CODE + PRICE */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Mã vé
                    </p>
                    <p className="font-semibold text-blue-600 dark:text-blue-400">
                      {item.booking_code}
                    </p>

                    {item.transaction_code && (
                      <p className="text-xs text-gray-500 mt-1">
                        GD: <span className="font-medium">{item.transaction_code}</span>
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Tổng tiền
                    </p>
                    <p className="text-2xl font-bold text-red-500 dark:text-red-350">
                      {item.final_amount.toLocaleString()} đ
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== BUTTON (GIỮ NGUYÊN) ===== */}
              <Link
                href={redirectConfig.bookingHistoryDetail(item.id)}
                className="
                  mt-6 w-full
                  flex items-center justify-center gap-2
                  px-4 py-3 rounded-xl text-sm font-medium

                  bg-gray-100 text-gray-800 hover:bg-gray-200
                  dark:bg-white/10 dark:text-white dark:hover:bg-white/20

                  transition
                "
              >
                Xem chi tiết
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>
      )}

      {/* ----------- EMPTY ----------- */}
      {!isLoading && bookings.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-14">
          Bạn chưa có đơn vé nào.
        </p>
      )}
    </div>
  );
}
