import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PaymentTicketInfoProps {
  total: number;
}

export default function PaymentTicketInfo({ total }: PaymentTicketInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin vé của bạn</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Poster + thông tin phim */}
        <div className="flex items-start gap-4">
          <div className="relative h-28 w-20 overflow-hidden rounded-md">
            <Image
              src="https://placehold.co/200x300?text=Oppenheimer"
              alt="Oppenheimer"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-1 text-sm">
            <p className="font-semibold">Oppenheimer</p>
            <p className="text-muted-foreground">CGV Crescent Mall</p>
            <p className="text-muted-foreground">Thứ Hai, 29/07/2024 - 19:30</p>
            <p className="text-muted-foreground">Ghế: G7, G8</p>
          </div>
        </div>

        <Separator />

        {/* Chi tiết giá */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Giá vé (2 x 100.000đ)</span>
            <span>200.000đ</span>
          </div>
          <div className="flex justify-between">
            <span>Combo Bắp Nước</span>
            <span>50.000đ</span>
          </div>
          <div className="flex justify-between">
            <span>Phí tiện ích</span>
            <span>5.000đ</span>
          </div>
        </div>

        <Separator />

        {/* Tổng cộng */}
        <div className="flex justify-between text-base font-semibold">
          <span>TỔNG CỘNG</span>
          <span>{total.toLocaleString("vi-VN")}đ</span>
        </div>
      </CardContent>
    </Card>
  );
}
