"use client";

import { useSeatMap } from "@/api/hooks/use-seat-map";
import { usePromotionApply } from "@/api/hooks/use-promotion-apply";
import { useBooking } from "@/api/hooks/use-booking";

import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { SeatItem } from "@/api/interfaces/seat-map-interface";
import type { SelectedCombo } from "@/api/interfaces/product-interface";
import type { PromotionItem } from "@/api/interfaces/discount-interface";

import { redirectConfig } from "@/helpers/redirect-config";
import { useRouter } from "next/navigation";
import { usePromotions } from "@/api/hooks/use-promotions.ts";

interface MovieSeatMapProps {
  showtimeId: number;
  showtimeText: string;
  combos: SelectedCombo[];
}

export default function MovieSeatMap({
  showtimeId,
  showtimeText,
  combos,
}: MovieSeatMapProps) {
  const router = useRouter();

  /* ======================
        FETCH SEAT MAP
  ======================= */
  const { data, isLoading } = useSeatMap(showtimeId);
  const seatMap: SeatItem[][] = useMemo(() => data?.seat_map ?? [], [data]);
  const flatSeats = seatMap.flat();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  
const getSeatId = (code: string): number | null => {
  const seat = flatSeats.find((s) => s.code === code);
  return seat ? seat.id : null;
};
const seatIds = selectedSeats
  .map((code) => getSeatId(code))
  .filter((id): id is number => id !== null); // TS type predicate

const getSeatIdByCode = (code: string): number | null => {
  const seat = flatSeats.find(s => s.code === code);
  return seat ? seat.id : null;
};




  const seatNum = (code: string) => parseInt(code.replace(/\D/g, ""));

  const getSeatStatus = (code: string) =>
    flatSeats.find((s) => s.code === code);

  /* ======================================================
      RULE 1: Giới hạn tối đa 8 ghế
  ====================================================== */
  const violatesMaxSeatLimit = (next: string[]) => next.length > 8;

  /* ======================================================
      RULE 2: Không để ghế trống cạnh ghế đã bán
  ====================================================== */
const violatesOneGapFromBooked = (next: string[]) => {
  for (const row of seatMap) {
    const rowCodes = row.map((s) => s.code);

    for (let i = 0; i < row.length; i++) {
      if (row[i].status !== "booked") continue;

      const bookedIndex = i;

      for (const code of next) {
        const selectedIndex = rowCodes.indexOf(code);
        if (selectedIndex === -1) continue;

        const distance = Math.abs(selectedIndex - bookedIndex);

        // ❌ chỉ cấm khi cách đúng 1 ghế
        if (distance === 2) {
          const middleIndex =
            selectedIndex < bookedIndex
              ? selectedIndex + 1
              : selectedIndex - 1;

          const middleSeat = row[middleIndex];

          // ❗ GHẾ GIỮA chỉ bị coi là trống nếu:
          // - middleSeat.available
          // - middleSeat KHÔNG nằm trong danh sách ghế đang chọn
          const middleIsEmpty =
            middleSeat.status === "available" &&
            !next.includes(middleSeat.code);

          if (middleIsEmpty) return true;
        }
      }
    }
  }
  return false;
};


  /* ======================================================
      RULE 3: Không để ghế trống cô lập giữa 2 ghế đã chọn
         Ví dụ chọn 7 và 9 thì không được bỏ ghế 8
  ====================================================== */
  const violatesSingleGapBetweenSelected = (next: string[]) => {
    const sortedNums = next.map(seatNum).sort((a, b) => a - b);

    for (let i = 0; i < sortedNums.length - 1; i++) {
      if (sortedNums[i + 1] - sortedNums[i] === 2) {
        const missing = sortedNums[i] + 1;

        if (!sortedNums.includes(missing)) return true;
      }
    }
    return false;
  };

  /* ======================================================
      TOGGLE SEAT
  ====================================================== */
  const toggleSeat = (seat: SeatItem) => {
    if (seat.status === "booked" || seat.physical_status === "broken") return;

    const exists = selectedSeats.includes(seat.code);
    const next = exists
      ? selectedSeats.filter((s) => s !== seat.code)
      : [...selectedSeats, seat.code];

    if (violatesMaxSeatLimit(next)) {
      setWarningMsg("❌ Bạn chỉ được chọn tối đa 8 ghế.");
      return;
    }

    if (violatesOneGapFromBooked(next)) {
      setWarningMsg("❌ Không được chọn ghế cách ghế đã bán đúng 1 ghế.");
      return;
    }


    if (violatesSingleGapBetweenSelected(next)) {
      setWarningMsg("❌ Không được để ghế trống cô lập giữa hai ghế.");
      return;
    }

    setWarningMsg(null);
    setSelectedSeats(next);
  };

  /* ======================
      STYLE GHẾ THEO THEME
  ======================= */
  const getSeatStyle = (seat: SeatItem, isSelected: boolean) => {
    if (seat.status === "booked") {
      return `
        bg-gray-300 text-gray-600 border border-gray-400 cursor-not-allowed
        dark:bg-[#4A4A4A] dark:text-[#BBBBBB] dark:border-[#4A4A4A]
      `;
    }

    if (seat.physical_status === "broken") {
      return `
        bg-transparent border border-red-400 cursor-not-allowed
        dark:border-red-500
      `;
    }

    if (isSelected) {
      return `
        bg-black text-white border border-black font-semibold
        dark:bg-[#F2C94C] dark:text-black dark:border-[#F2C94C]
      `;
    }

    if (seat.type === "vip") {
      return `
        bg-white border border-red-400 text-black
        dark:bg-[#F2F2F2] dark:border-white dark:text-black
      `;
    }

    return `
      bg-white border border-gray-300 text-black hover:bg-gray-100
      dark:bg-[#2D2A28] dark:border-[#3A3735] dark:text-white dark:hover:bg-[#3A3735]
    `;
  };

  /* ======================
      DISCOUNT
  ======================= */
  const { data: promoData } = usePromotions();
  const promotionApply = usePromotionApply();
  const booking = useBooking();

  const activePromotions: PromotionItem[] =
    promoData?.data.filter((p) => p.is_valid && !p.is_expired) ?? [];

  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleDiscountInput = (value: string) => {
    setDiscountCode(value);

    const match = activePromotions.find(
      (p) => p.code.toUpperCase() === value.trim().toUpperCase()
    );

    setDiscountPercent(match ? match.discount_percent : 0);
  };

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      setDiscountPercent(0);
      return;
    }

    promotionApply.mutate(
      { code: discountCode.trim() },
      {
        onSuccess: (res) =>
          setDiscountPercent(res.valid ? res.discount_percent : 0),
      }
    );
  };

  /* ======================
      TOTAL PRICE
  ======================= */
  const seatTotal = useMemo(() => {
    return flatSeats
      .filter((s) => selectedSeats.includes(s.code))
      .reduce((sum, s) => sum + s.price, 0);
  }, [selectedSeats]);

  const comboTotal = useMemo(
    () => combos.reduce((sum, c) => sum + c.price * c.qty, 0),
    [combos]
  );

  const discountValue = (seatTotal + comboTotal) * (discountPercent / 100);
  const finalTotal = seatTotal + comboTotal - discountValue;

  if (isLoading) return <p>Đang tải sơ đồ ghế...</p>;

  /* ======================
          UI
  ======================= */

  return (
    <Card className="w-full max-w-md sticky top-20 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-center text-lg">Sơ Đồ Ghế Ngồi</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ===== SEAT MAP ===== */}
        <div className="flex flex-col items-center gap-2">
          {seatMap.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((seat) => {
                const isSelected = selectedSeats.includes(seat.code);

                return (
                  <button
                    key={seat.code}
                    onClick={() => toggleSeat(seat)}
                    disabled={seat.status === "booked"}
                    className={`w-8 h-8 flex items-center justify-center rounded text-xs transition-all ${getSeatStyle(
                      seat,
                      isSelected
                    )}`}
                  >
                    {seat.physical_status === "broken" ? "✕" : seat.code}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* ==== LEGEND ==== */}
          <div className="flex justify-center flex-wrap gap-4 text-xs mt-2">

            {/* Ghế trống */}
            <div className="flex items-center gap-1">
              <div className="
                w-4 h-4 rounded 
                bg-white border border-gray-300 
                dark:bg-[#2D2A28] dark:border-[#3A3735]
              "></div>
              Trống
            </div>

            {/* Ghế đang chọn */}
            <div className="flex items-center gap-1">
              <div className="
                w-4 h-4 rounded bg-black 
                dark:bg-[#F2C94C]
              "></div>
              Đang chọn
            </div>

            {/* Ghế đã đặt */}
            <div className="flex items-center gap-1">
              <div className="
                w-4 h-4 rounded
                bg-gray-300 
                dark:bg-[#4A4A4A]
              "></div>
              Đã đặt
            </div>

            {/* Ghế VIP */}
            <div className="flex items-center gap-1">
              <div className="
                w-4 h-4 rounded 
                bg-white border border-red-400 
                dark:bg-[#F2F2F2] dark:border-white
              "></div>
              VIP
            </div>

          </div>


        {/* ===== WARNING ===== */}
        {warningMsg && (
          <div className="p-2 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
            {warningMsg}
          </div>
        )}

        <Separator />

        {/* ===== ORDER PREVIEW ===== */}
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Suất chiếu:</span>
            <span className="font-medium">{showtimeText}</span>
          </div>

          <div className="flex justify-between">
            <span>Ghế đã chọn:</span>
            <span className="font-medium">
              {selectedSeats.length
                ? `${selectedSeats.join(", ")} (${selectedSeats.length})`
                : "---"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Combo:</span>
            <span className="font-medium">
              {combos.length
                ? combos.map((c) => `${c.name} (x${c.qty})`).join(", ")
                : "---"}
            </span>
          </div>
        </div>

        <Separator />

        {/* ===== DISCOUNT UI ===== */}
        <div className="space-y-2">
          <span className="text-sm font-medium">Mã giảm giá</span>

          <div className="flex gap-2">
            <Input
              placeholder="Nhập mã…"
              value={discountCode}
              onChange={(e) => handleDiscountInput(e.target.value)}
            />

            <Button variant="secondary" onClick={handleApplyDiscount}>
              Áp dụng
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Chọn mã</Button>
              </PopoverTrigger>

              <PopoverContent className="w-60 p-3 rounded-xl shadow-lg border border-gray-200 dark:border-[#3A3735] bg-white dark:bg-[#1F1D1B]">
                <p className="text-sm font-semibold mb-2 dark:text-white">
                  Mã đang hoạt động
                </p>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {activePromotions.map((p) => {
                    const isSelected =
                      discountCode.toUpperCase() === p.code.toUpperCase();

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          setDiscountCode(p.code);
                          setDiscountPercent(p.discount_percent);
                        }}
                        className={`p-3 rounded-lg cursor-pointer border transition-all select-none ${
                          isSelected
                            ? "bg-gray-100 dark:bg-[#2C2A28] border-gray-300 dark:border-[#4A4745]"
                            : "bg-white dark:bg-[#1F1D1B] border-gray-200 dark:border-[#3A3735] hover:bg-gray-100 dark:hover:bg-[#2C2A28]"
                        }`}
                      >
                        <p className="font-semibold dark:text-white">
                          {p.code}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Giảm {p.discount_percent}%
                        </p>
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {discountPercent > 0 && (
            <p className="text-green-600 text-sm">
              ✔ Giảm {discountPercent}% đã được áp dụng
            </p>
          )}
        </div>

        {/* ===== TOTAL ===== */}
        <div className="flex justify-between text-base font-semibold mt-4">
          <span>Tổng tiền:</span>
          <span>{finalTotal.toLocaleString("vi-VN")}đ</span>
        </div>
      </CardContent>

      <CardFooter>
       <Button
  disabled={selectedSeats.length === 0}
  className="w-full text-base py-6 mt-4"
  onClick={() =>
    booking.mutate(
      {
        showtime_id: showtimeId,

        // GHẾ: convert seat_code → seat_id (number)
        seats: selectedSeats
          .map(code => getSeatIdByCode(code))
          .filter((id): id is number => id !== null),


        // COMBO: phải dùng qty (không phải quantity)
        products:
          combos.length > 0
            ? combos.map((c) => ({
                product_id: c.id,
                qty: c.qty, // 🔥 FIX: backend yêu cầu "qty"
              }))
            : undefined,

        discount_code: discountCode || undefined,
      },
      {
        onSuccess: (res) => {
            const bookingId = res.data.id;   // hoặc res.data.booking.id tùy backend
            const total = finalTotal;        // total bạn đã tính trước đó

            router.push(`${redirectConfig.payment}?booking_id=${bookingId}&total=${total}`);
          }
          ,
        onError: (err) => {
          console.error(err);
        },
      }
    )
  }
>
  Thanh Toán
</Button>

      </CardFooter>
    </Card>
  );
}
