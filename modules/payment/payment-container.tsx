"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import PaymentMethod from "./payment-method";
import PaymentTicketInfo from "./payment-ticket-info";
import { PaymentSuccessDialog } from "./payment-success-dialog";

export default function PaymentContainer() {
  const params = useSearchParams();

  // Lấy dữ liệu truyền từ trang trước
  const bookingId = Number(params.get("booking_id"));
  const total = Number(params.get("total"));

  const [successOpen, setSuccessOpen] = useState(false);

  // Thông tin mẫu (bạn có thể thay sau)
  const movieTitle = "Avengers: Endgame";
  const cinema = "CGV Vincom Landmark 81";
  const showtime = "19:30 - 20/11/2025";
  const seats = ["A1", "A2"];

  // const handlePaymentSuccess = () => {
  //   setSuccessOpen(true);
  // };

  return (
    <>
      <section className="space-y-6">
        {/* Header + Timer */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Hoàn Tất Đặt Vé</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Vui lòng hoàn tất thanh toán trong thời gian quy định để giữ vé.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-center">
              <div className="rounded-md border px-4 py-2 text-lg font-semibold">09</div>
              <p className="mt-1 text-xs text-muted-foreground">Phút</p>
            </div>

            <span className="text-lg font-semibold">:</span>

            <div className="text-center">
              <div className="rounded-md border px-4 py-2 text-lg font-semibold">45</div>
              <p className="mt-1 text-xs text-muted-foreground">Giây</p>
            </div>
          </div>
        </div>

        {/* Layout 2:1 */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Cột trái */}
          <div className="flex-1 md:flex-2">
            <PaymentMethod 
              total={total}
              bookingId={bookingId}
             
          />

          </div>

          {/* Cột phải */}
          <div className="flex-1 md:flex-1">
            <PaymentTicketInfo total={total} />
          </div>
        </div>
      </section>

      {/* Dialog thanh toán thành công */}
      <PaymentSuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        movieTitle={movieTitle}
        cinema={cinema}
        showtime={showtime}
        seats={seats}
        total={total}
      />
    </>
  );
}
