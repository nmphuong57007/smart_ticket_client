import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type SeatStatus = "available" | "booked" | "vip" | "selected";

export interface Seat {
  code: string;
  status: SeatStatus;
}

export type SeatRow = Seat[];

export interface OrderPreview {
  cinema: string;
  showtime: string;
  seats: string[];
  combo: string[];
  totalPrice: number;
}

export interface MovieSeatMapProps {
  seatMap: SeatRow[];
  orderPreview: OrderPreview;
}

export default function MovieSeatMap({
  seatMap,
  orderPreview,
}: MovieSeatMapProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>(() => {
    const selectedFromStatus = seatMap
      .flat()
      .filter((seat) => seat.status === "selected")
      .map((seat) => seat.code);

    const fromOrder = orderPreview.seats ?? [];

    return Array.from(new Set([...selectedFromStatus, ...fromOrder]));
  });

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked") return;

    setSelectedSeats((prev) =>
      prev.includes(seat.code)
        ? prev.filter((s) => s !== seat.code)
        : [...prev, seat.code]
    );
  };

  const formattedTotal = orderPreview.totalPrice.toLocaleString("vi-VN") + "đ";

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Sơ Đồ Ghế Ngồi</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* seat grid */}
        <div className="flex flex-col items-center gap-2">
          {seatMap.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((seat) => {
                const isBooked = seat.status === "booked";
                const isVip = seat.status === "vip";
                const isSelected = selectedSeats.includes(seat.code);

                let variant: "default" | "outline" | "secondary" = "secondary";

                if (isBooked) variant = "outline";
                else if (isSelected) variant = "default";
                else if (isVip) variant = "default";
                // available giữ "secondary"

                return (
                  <Button
                    key={seat.code}
                    size="icon"
                    variant={variant}
                    disabled={isBooked}
                    className="h-7 w-7 p-0 text-[10px] flex items-center justify-center"
                    onClick={() => toggleSeat(seat)}
                    aria-label={`Ghế ${seat.code} - ${seat.status}`}
                  >
                    <span
                      className={
                        `text-[10px] leading-none ${
                          isBooked ? "line-through opacity-60" : ""
                        } ${isVip ? "text-yellow-400 font-semibold" : ""}`
                      }
                    >
                      {isBooked ? "×" : seat.code}
                    </span>
                  </Button>
                );
              })}
            </div>
          ))}
        </div>

        {/* dãy VIP */}
        <div className="flex justify-center gap-2">
          <Button size="sm">VIP</Button>
          <Button size="sm">VIP</Button>
          <Button size="sm">VIP</Button>
        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              disabled
              variant="secondary"
              className="h-4 w-4 p-0"
            />
            <span>Trống</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              disabled
              variant="default"
              className="h-4 w-4 p-0"
            />
            <span>Đang Chọn</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              disabled
              variant="outline"
              className="h-4 w-4 p-0"
            />
            <span>Đã Đặt</span>
          </div>
        </div>

        <Separator />

        {/* thông tin đơn */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Rạp:</span>
            <span className="font-medium">{orderPreview.cinema}</span>
          </div>

          <div className="flex justify-between">
            <span>Suất chiếu:</span>
            <span className="font-medium">{orderPreview.showtime}</span>
          </div>

          <div className="flex justify-between">
            <span>{`Ghế đã chọn (${selectedSeats.length}):`}</span>
            <span className="font-medium">
              {selectedSeats.length ? selectedSeats.join(", ") : "---"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>{`Combo (${orderPreview.combo.length}):`}</span>
            <span className="font-medium">
              {orderPreview.combo.join(", ") || "---"}
            </span>
          </div>
        </div>

        <Separator />

        {/* tổng tiền */}
        <div className="flex items-center justify-between text-sm">
          <span>Tổng Tiền</span>
          <span className="text-lg font-semibold">{formattedTotal}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg">
          Thanh Toán
        </Button>
      </CardFooter>
    </Card>
  );
}
