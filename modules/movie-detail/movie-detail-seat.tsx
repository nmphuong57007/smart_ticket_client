"use client";

import { useSeatMap } from "@/api/hooks/use-seat-map";
import { usePromotionApply } from "@/api/hooks/use-promotion-apply";

import { useMemo, useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardFooter,
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
import { usePromotions } from "@/api/hooks/use-promotions.ts";
import { PromotionItem } from "@/api/interfaces/discount-interface";
import { useShowtimeDetail } from "@/api/hooks/use-showtime-detail";

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
  /* ====================== FETCH SEAT MAP ====================== */
  const { data, isLoading } = useSeatMap(showtimeId);
  const seatMap: SeatItem[][] = useMemo(() => data?.seat_map ?? [], [data]);
  const { data: showtime } = useShowtimeDetail(showtimeId);

const movieId = showtime?.movie_id ?? null;


  const flatSeats = seatMap.flat();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  const getSeatIdByCode = (code: string): number | null => {
    const seat = flatSeats.find((s) => s.code === code);
    return seat ? seat.id : null;
  };

  const seatNum = (code: string) => parseInt(code.replace(/\D/g, ""));

  /* ====================== SELECT RULES ====================== */

  const violatesMaxSeatLimit = (next: string[]) => next.length > 8;

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

          if (distance === 2) {
            const middleIndex =
              selectedIndex < bookedIndex
                ? selectedIndex + 1
                : selectedIndex - 1;

            const middleSeat = row[middleIndex];

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

  const toggleSeat = (seat: SeatItem) => {
    if (seat.status === "booked" || seat.physical_status === "broken" || seat.status === "pending_payment") return;

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
      setWarningMsg("❌ Không được để ghế trống ở giữa hai ghế.");
      return;
    }

    setWarningMsg(null);
    setSelectedSeats(next);
  };

  /* ====================== SEAT STYLE ====================== */

  const getSeatStyle = (seat: SeatItem, isSelected: boolean) => {
    if (seat.status === "booked") {
      return "bg-gray-300 text-gray-600 border border-gray-400 cursor-not-allowed dark:bg-[#4A4A4A] dark:text-[#BBBBBB] dark:border-[#4A4A4A] ;";
    }

    if (seat.physical_status === "broken") {
      return "bg-transparent border border-red-400 cursor-not-allowed dark:border-red-500";
    }

    if (isSelected) {
      return "bg-black text-white border border-black font-semibold dark:bg-[#F2C94C] dark:text-black dark:border-[#F2C94C]";
    }

    if (seat.status === "pending_payment") {
      return "bg-blue-200 text-blue-900 border border-blue-600 cursor-not-allowed dark:bg-blue-600 dark:text-white dark:border-blue-700";
    }


    if (seat.type === "vip") {
      return "bg-red-200 border border-red-400 text-black dark:bg-[#F2F2F2] dark:border-white dark:text-black ;";
    }

    return "bg-white border border-gray-300 text-black hover:bg-gray-100 dark:bg-[#2D2A28] dark:border-[#3A3735] dark:text-white dark:hover:bg-[#3A3735]";
  };

  /* ====================== PROMOTIONS ====================== */

  const { data: promoData } = usePromotions();
  const promotionApply = usePromotionApply();

  // Lọc mã hợp lệ theo phim
const applicablePromotions = useMemo(() => {
  if (!promoData?.data || !movieId) return [];

  return promoData.data.filter(
    (p) =>
      p.is_valid &&
      !p.is_expired &&
      (p.apply_for_all_movies || p.movie_id === movieId)
  );
}, [promoData, movieId]);


  const [discountCode, setDiscountCode] = useState("");
  const [selectedPromotion, setSelectedPromotion] =
    useState<PromotionItem | null>(null);

  // Auto apply mã riêng theo phim
  useEffect(() => {
    const auto = applicablePromotions.find(
      (p) => p.movie_id === movieId && !p.apply_for_all_movies
    );

    if (auto) {
      setDiscountCode(auto.code);
      setSelectedPromotion(auto);
    }
  }, [applicablePromotions, movieId]);

  // Nhập mã thủ công
  const handleDiscountInput = (value: string) => {
    setDiscountCode(value);

    const promo = applicablePromotions.find(
      (p) => p.code.toUpperCase() === value.trim().toUpperCase()
    );

    setSelectedPromotion(promo ?? null);
  };

  // Áp mã
  const handleApplyDiscount = () => {
    const promo = applicablePromotions.find(
      (p) => p.code.toUpperCase() === discountCode.trim().toUpperCase()
    );

    if (!promo) {
      setSelectedPromotion(null);
      return;
    }

    promotionApply.mutate(
      {
        code: promo.code,
        movie_id: movieId!,
        total_amount: seatTotal + comboTotal,
      },
      {
        onSuccess: (res) => {
          if (res.valid) {
            setSelectedPromotion(promo);
          } else {
            setSelectedPromotion(null);
          }
        },
      }
    );
  };

  /* ====================== TOTAL PRICE ====================== */

  const seatTotal = useMemo(() => {
    return flatSeats
      .filter((s) => selectedSeats.includes(s.code))
      .reduce((sum, s) => sum + s.price, 0);
  }, [selectedSeats, flatSeats]);

  const comboTotal = useMemo(
    () => combos.reduce((sum, c) => sum + c.price * c.qty, 0),
    [combos]
  );

  const discountValue = useMemo(() => {
    if (!selectedPromotion) return 0;

    const total = seatTotal + comboTotal;

    if (total < selectedPromotion.min_order_amount) return 0;

    if (selectedPromotion.type === "percent") {
      const raw = (total * selectedPromotion.discount_percent) / 100;
      return selectedPromotion.max_discount_amount
        ? Math.min(raw, selectedPromotion.max_discount_amount)
        : raw;
    }

    if (selectedPromotion.type === "money") {
      return selectedPromotion.discount_amount;
    }

    return 0;
  }, [selectedPromotion, seatTotal, comboTotal]);

  const finalTotal = Math.max(0, seatTotal + comboTotal - discountValue);

  if (isLoading) return <p>Đang tải sơ đồ ghế...</p>;

  /* ====================== UI RENDER ====================== */

  return (
    <Card className="w-full max-w-md sticky top-20 shadow-lg rounded-xl">
   

      <CardContent className="space-y-4">
        {/* --- MÀN HÌNH CHIẾU --- */}
      <div className="flex flex-col items-center justify-center ">
        {/* Container màn hình */}
        <div
          className="relative flex justify-center items-start pt-3"
          style={{
            width: '320px',    // Độ rộng màn hình
            height: '50px',    // Chiều cao vùng gradient
            
            // TẠO HÌNH DÁNG CONG (Magic CSS):
            // Radius ngang 50% (để cong đều 2 bên)
            // Radius dọc 100% (để tạo độ vòm cao)
            borderTopLeftRadius: '50% 50%',
            borderTopRightRadius: '50% 50%',
            
            // Viền xanh đậm ở trên cùng
            borderTop: '5px solid #1d4ed8', // blue-700
            
            // Gradient từ xanh cyan nhạt xuống trong suốt
            background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
            
            // // Thêm chút bóng mờ phía trên để tạo cảm giác màn hình phát sáng (tùy chọn)
            // boxShadow: '0 -5px 15px rgba(34, 211, 238, 0.3)'
          }}
        >
          {/* Text */}
          <span className="text-gray-600 font-bold tracking-[0.2em] text-sm uppercase">
            Màn hình
          </span>
        </div>
      </div>

        {/* Seat Map */}
        <div className="flex flex-col items-center gap-2 mt-10">
          {seatMap.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((seat) => {
                const isSelected = selectedSeats.includes(seat.code);
                return (
                  <button
                    key={seat.code}
                    onClick={() => toggleSeat(seat)}
                    disabled={seat.status === "booked" || seat.status === "pending_payment"}
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs ${getSeatStyle(
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
            <div className=" w-4 h-4 rounded bg-white border border-gray-300 dark:bg-[#2D2A28] dark:border-[#3A3735] ">
              </div> Trống </div> 

          {/* Ghế đang chọn */} 
          <div className="flex items-center gap-1"> 
            <div className=" w-4 h-4 rounded bg-black dark:bg-[#F2C94C] ">
              </div> Đang chọn </div> 

          {/* Ghế đã đặt */} 
          <div className="flex items-center gap-1"> 
            <div className=" w-4 h-4 rounded bg-gray-300 dark:bg-[#4A4A4A] "></div>
               Đã đặt 
          </div> 

          {/* Ghế VIP */} 
          <div className="flex items-center gap-1"> 
            <div className=" w-4 h-4 rounded bg-red-200 border border-red-400 text-black dark:bg-[#F2F2F2] dark:border-white dark:text-black  ">
              </div> VIP </div> 

          {/* Ghế chờ thanh toán */} 
          <div className="flex items-center gap-1"> 
            <div className=" w-4 h-4 rounded bg-blue-200 text-blue-900 border border-blue-600 cursor-not-allowed dark:bg-blue-600 dark:text-white dark:border-blue-700"></div>
               Đang giữ 
          </div> 
        </div>

        {/* Warning */}
        {warningMsg && (
          <div className="p-2 text-sm bg-red-100 border border-red-300 text-red-700 rounded">
            {warningMsg}
          </div>
        )}

        <Separator />
        
        {/* Order Summary */}
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

        {/* Promotion */}
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
                  Mã áp dụng được
                </p>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {applicablePromotions.map((p) => {
                    const isSelected =
                      p.code.toUpperCase() === discountCode.toUpperCase();
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          setDiscountCode(p.code);
                          setSelectedPromotion(p);
                        }}
                        className={`p-3 rounded-lg cursor-pointer border transition-all select-none ${
                          isSelected
                            ? "bg-gray-100 dark:bg-[#2C2A28] border-gray-300 dark:border-[#4A4745]"
                            : "bg-white dark:bg-[#1F1D1B] border-gray-200 dark:border-[#3A3735] hover:bg-gray-100 dark:hover:bg-[#2C2A28]"
                        }`}
                      >
                        <p className="font-semibold dark:text-white">{p.code}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.type === "percent"
                            ? `Giảm ${p.discount_percent}%`
                            : `Giảm ${p.discount_amount.toLocaleString(
                                "vi-VN"
                              )}đ`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                           {typeof p.min_order_amount === "number" && (
                            <p>
                              Đơn tối thiểu: {p.min_order_amount.toLocaleString("vi-VN")}đ
                            </p>
                          )}
                        </p>

                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {selectedPromotion && (
            <p className="text-green-600 text-sm">
              ✔ Đã áp dụng: {selectedPromotion.code}
            </p>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between font-semibold text-base mt-4 text-red-500">
          <span>Tổng tiền:</span>
          <span>{finalTotal.toLocaleString("vi-VN")}đ</span>
        </div>
      </CardContent>

      <CardFooter>


    <Button
      disabled={selectedSeats.length === 0}
      className="w-full py-6 text-base"
      onClick={() => {
        const seatIds = selectedSeats
          .map((code) => getSeatIdByCode(code))
          .filter((id): id is number => id !== null);

        const combosSelected = combos.filter(c => c.qty > 0);

        const params = new URLSearchParams();

        params.set("showtime_id", String(showtimeId));
        params.set("seat_ids", seatIds.join(",")); 

        // ✔ CHỈ GỬI combo_ids KHI THỰC SỰ CÓ COMBO
        if (combosSelected.length > 0) {
      params.set("combo_ids", combosSelected.map(c => c.id).join(","));

      combosSelected.forEach(c => {
        params.set(`combo_qty_${c.id}`, String(c.qty));  // 🔥 BẮT BUỘC
      });
    }

        // ✔ CHỈ GỬI discount_code KHI NGƯỜI DÙNG THỰC SỰ NHẬP
        if (discountCode && discountCode.trim() !== "") {
          params.set("discount_code", discountCode.trim());
        }

        params.set("total", String(finalTotal));

        window.location.href = `/ticketreview?${params.toString()}`;
      }}
    >
      Xem Thông Tin Vé
    </Button>

</CardFooter>

    </Card>
  );
}