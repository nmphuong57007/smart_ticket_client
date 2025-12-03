import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreatePayment } from "@/api/hooks/use-payment";
import { useState } from "react";

interface PaymentMethodProps {
  total: number;
  bookingId: number;
}

export default function PaymentMethod({ total, bookingId }: PaymentMethodProps) {
  const createPayment = useCreatePayment();

  const [bankCode, setBankCode] = useState<string>(""); // mặc định dùng cổng VNPay

  const handlePay = () => {
    if (!bookingId) {
      console.error("Missing bookingId");
      return;
    }

    createPayment.mutate(
      {
        booking_id: bookingId,
      },
      {
        onSuccess: (res) => {
          if (res.success && res.payment_url) {
            window.location.href = res.payment_url; // chuyển sang VNPay
          }
        },
        onError: (err) => {
          console.error("Payment error:", err);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chọn phương thức thanh toán</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 justify-center">
        <div className="space-y-3">
          {/* <h4 className="font-semibold">Chọn phương thức thanh toán</h4> */}

          {/* VNPAYQR */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="bankCode"
              value="VNPAYQR"
              checked={bankCode === "VNPAYQR"}
              onChange={(e) => setBankCode(e.target.value)}
            />
            Thanh toán bằng ứng dụng hỗ trợ VNPAYQR
          </label>

          {/* ATM / Banking */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="bankCode"
              value="VNBANK"
              checked={bankCode === "VNBANK"}
              onChange={(e) => setBankCode(e.target.value)}
            />
            Thanh toán qua thẻ ATM / Tài khoản nội địa
          </label>

          {/* Thẻ quốc tế */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="bankCode"
              value="INTCARD"
              checked={bankCode === "INTCARD"}
              onChange={(e) => setBankCode(e.target.value)}
            />
            Thanh toán qua thẻ quốc tế (Visa/Master/JCB)
          </label>
        </div>

        {/* Button thanh toán */}
        <Button
          className="w-full mt-2"
          onClick={handlePay}
          disabled={createPayment.isPending}
        >
          {createPayment.isPending ? "Đang chuyển hướng..." : "Thanh toán"}
        </Button>
      </CardContent>
    </Card>
  );
}
