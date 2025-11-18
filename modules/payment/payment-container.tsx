"use client";

import { useState } from "react";
import PaymentMethod from "./payment-method";
import PaymentTicketInfo from "./payment-ticket-info";
import { PaymentSuccessDialog } from "./payment-success-dialog";

const total = 255000;

export default function PaymentContainer() {
  const [successOpen, setSuccessOpen] = useState(false);

  const movieTitle = "Avengers: Endgame";
  const cinema = "CGV Vincom Landmark 81";
  const showtime = "19:30 - 20/11/2025";
  const seats = ["A1", "A2"];

  const handlePaymentSuccess = () => {
    setSuccessOpen(true);
  };

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
              <div className="rounded-md border px-4 py-2 text-lg font-semibold">
                09
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Phút</p>
            </div>

            <span className="text-lg font-semibold">:</span>

            <div className="text-center">
              <div className="rounded-md border px-4 py-2 text-lg font-semibold">
                45
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Giây</p>
            </div>
          </div>
        </div>

        {/* FLEX LAYOUT 2:1 giống UI mẫu */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Cột trái 2 phần */}
          <div className="flex-1 md:flex-2">
            {/* Truyền callback vào đây */}
            <PaymentMethod
              total={total}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>

          {/* Cột phải 1 phần */}
          <div className="flex-1 md:flex-1">
            <PaymentTicketInfo total={total} />
          </div>
        </div>
      </section>

      {/* Dialog thành công */}
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
