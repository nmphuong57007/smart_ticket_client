"use client";

import { useSeatMap } from "@/api/hooks/use-seat-map";
import { usePromotionApply } from "@/api/hooks/use-promotion-apply";
import { usePromotions } from "@/api/hooks/use-promotions.ts";

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { SeatItem } from "@/api/interfaces/seat-map-interface";
import type { SelectedCombo } from "@/api/interfaces/product-interface";
import type { PromotionItem } from "@/api/interfaces/discount-interface";

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
  /* ================================
      FETCH SEAT MAP
  ================================== */
  const { data, isLoading } = useSeatMap(showtimeId);
  const seatMap: SeatItem[][] = useMemo(() => data?.seat_map ?? [], [data]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  /* ================================
      HELPER FUNCTION
  ================================== */
  const seatNum = (code: string) => parseInt(code.replace(/\D/g, ""));
  const seatRow = (code: string) => code.match(/[A-Z]/i)?.[0] ?? "";

  const flatSeats = seatMap.flat();

  const getSeatStatus = (code: string) => {
    return flatSeats.find((s) => s.code === code);
  };

  /* ======================================================
      RULE CHECK 1: KHÔNG ĐƯỢC CHỌN > 8 GHẾ
  ======================================================== */
  const violatesMaxSeatLimit = (next: string[]) => next.length > 8;

  /* ======================================================
      RULE CHECK 2: KHÔNG ĐỂ GHẾ TRỐNG BÊN CẠNH GHẾ ĐÃ BÁN
  ======================================================== */
  const violatesIsolatedGapWithSoldSeat = (next: string[]) => {
    for (const row of seatMap) {
      const rowSeats = row.map((s) => s.code);

      for (let i = 0; i < rowSeats.length - 1; i++) {
        const left = getSeatStatus(rowSeats[i]);
        const right = getSeatStatus(rowSeats[i + 1]);

        if (!left || !right) continue;

        // Nếu một ghế đã bán và ghế còn lại KHÔNG được chọn → tạo ghế trống cạnh ghế đã bán
        if (
          left.status === "booked" &&
          !next.includes(right.code)
        ) {
          return true;
        }
        if (
          right.status === "booked" &&
          !next.includes(left.code)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  /* ======================================================
      RULE CHECK 3: KHÔNG TẠO GHẾ TRỐNG CÔ LẬP GIỮA 2 GHẾ ĐÃ CHỌN
      (GHẾ 7,9 → bỏ 8)
  ======================================================== */
  const violatesSingleGapBetweenSelected = (next: string[]) => {
    const sorted = next
      .map((c) => seatNum(c))
      .sort((a, b) => a - b);

    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i + 1] - sorted[i] === 2) {
        const missing = sorted[i] + 1;

        // Nếu ghế giữa không được chọn → lỗi
        if (!sorted.includes(missing)) {
          return true;
        }
      }
    }

    return false;
  };

  /* ======================================================
      TOGGLE SEAT
  ======================================================== */
  const toggleSeat = (seat: SeatItem) => {
    if (seat.status === "booked" || seat.physical_status === "broken") return;

    const exists = selectedSeats.includes(seat.code);
    const next = exists
      ? selectedSeats.filter((s) => s !== seat.code)
      : [...selectedSeats, seat.code];

    // RULE 1: quá 8 ghế
    if (violatesMaxSeatLimit(next)) {
      setWarningMsg("❌ Bạn chỉ được chọn tối đa 8 ghế cho mỗi giao dịch.");
      return;
    }

    // RULE 2: ghế trống cạnh ghế đã bán
    if (violatesIsolatedGapWithSoldSeat(next)) {
      setWarningMsg("❌ Không được để lại 1 ghế trống cạnh ghế đã bán.");
      return;
    }

    // RULE 3: ghế bị cô lập giữa hai ghế đã chọn
    if (violatesSingleGapBetweenSelected(next)) {
      setWarningMsg("❌ Không được tạo ghế trống cô lập giữa hai ghế đã chọn.");
      return;
    }

    setWarningMsg(null);
    setSelectedSeats(next);
  };

  /* ================================
      STYLE GHẾ
  ================================== */
  const getSeatStyle = (seat: SeatItem, isSelected: boolean) => {
    if (seat.status === "booked")
      return "bg-gray-300 text-gray-600 cursor-not-allowed";

    if (seat.physical_status === "broken")
      return "bg-transparent border border-transparent cursor-not-allowed";

    if (isSelected) return "bg-black text-white font-semibold";

    if (seat.type === "vip") return "border border-red-400 text-black";

    return "bg-white border border-gray-300";
  };

  /* ================================
      DISCOUNT
  ================================== */
  const { data: promoData } = usePromotions();
  const promotionApply = usePromotionApply();

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
        onSuccess: (res) => {
          setDiscountPercent(res.valid ? res.discount_percent : 0);
        },
      }
    );
  };

  /* ================================
      TOTAL PRICE
  ================================== */
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
  if (!data) return <p>Không tìm thấy sơ đồ ghế</p>;

  /* ================================
      UI
  ================================== */
  return (
    <Card className="w-full max-w-md sticky top-20 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-center text-lg">Sơ Đồ Ghế Ngồi</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* ==== SEAT MAP ==== */}
        <div className="flex flex-col items-center gap-2">
          {seatMap.map((row, idx) => (
            <div key={idx} className="flex gap-2">
              {row.map((seat) => {
                const isSelected = selectedSeats.includes(seat.code);

                return (
                  <button
                    key={seat.code}
                    onClick={() => toggleSeat(seat)}
                    disabled={seat.status === "booked"}
                    className={`w-8 h-8 rounded-md text-xs flex items-center justify-center transition-all ${getSeatStyle(
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

        <Separator />

        {/* ==== WARNING MESSAGE ==== */}
        {warningMsg && (
          <div className="p-2 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
            {warningMsg}
          </div>
        )}

        <Separator />

        {/* ==== ORDER PREVIEW ==== */}
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

        {/* ==== DISCOUNT UI ==== */}
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

              <PopoverContent className="w-56 p-2 space-y-2">
                <p className="text-sm font-medium">Mã đang hoạt động</p>

                {activePromotions.length === 0 && (
                  <p className="text-xs text-muted-foreground">Không có mã nào</p>
                )}

                {activePromotions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setDiscountCode(p.code);
                      setDiscountPercent(p.discount_percent);
                    }}
                    className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                  >
                    <p className="font-semibold">{p.code}</p>
                    <p className="text-xs text-muted-foreground">
                      Giảm {p.discount_percent}%
                    </p>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {discountPercent > 0 && (
            <p className="text-green-600 text-sm">
              ✔ Giảm {discountPercent}% đã được áp dụng
            </p>
          )}
        </div>

        {/* ==== TOTAL ==== */}
        <div className="flex justify-between text-base font-semibold mt-4">
          <span>Tổng tiền:</span>
          <span>{finalTotal.toLocaleString("vi-VN")}đ</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          disabled={selectedSeats.length === 0}
          className="w-full text-base py-6 mt-4"
        >
          Thanh Toán
        </Button>
      </CardFooter>
    </Card>
  );
}
