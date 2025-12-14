
// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// import { useBooking } from "@/api/hooks/use-booking";
// import { useCreatePayment } from "@/api/hooks/use-payment";
// import type { CreateBookingPayload } from "@/api/interfaces/booking-interface";
// import type { TicketPreviewData } from "@/api/interfaces/ticket-preview-interface";
// import { useTicketPreview } from "@/api/hooks/use-ticket-preview.ts";


// export default function ReviewPage() {
//   const params = useSearchParams();
//   const router = useRouter();
//     const booking = useBooking();
//   const createPayment = useCreatePayment();

//   const showtimeId = Number(params.get("showtime_id"));
//   const totalFromSeatPage = Number(params.get("total") || 0);

//   // ===== DISCOUNT CODE =====
//   const discountRaw = params.get("discount_code");
//   const discountCode =
//     discountRaw && discountRaw.trim() !== "" ? discountRaw.trim() : null;

//   // ===== SEATS =====
//   const seatIds: number[] = (params.get("seat_ids") || "")
//     .split(",")
//     .map(s => Number(s))
//     .filter(n => Number.isInteger(n) && n > 0);

//   // ===== COMBOS =====
//   const comboString = params.get("combo_ids");
//   const comboIds = comboString
//     ? comboString
//         .split(",")
//         .map(id => Number(id))
//         .filter(id => id > 0)
//     : [];

//   // combo qty
//   const combos = comboIds
//     .map(id => ({
//       id,
//       qty: Number(params.get(`combo_qty_${id}`) || 0),
//     }))
//     .filter(c => c.qty > 0); // ✔ loại bỏ combo số lượng 0

//   // ===== CALL PREVIEW API =====
//   const { data, isLoading } = useTicketPreview(
//      showtimeId,
//   seatIds,
//   combos.map(c => c.id),   // chỉ combo qty > 0
//   discountCode
//   );

//   if (isLoading) return <p>Đang tải...</p>;
//   if (!data?.data) return <p>Không có dữ liệu xem trước vé</p>;

//   const preview: TicketPreviewData = data.data;

//   // ===== PAYLOAD BOOKING =====
//   const payload: CreateBookingPayload = {
//     showtime_id: showtimeId,
//     seats: seatIds,
//   };

//   if (combos.length > 0) {
//     payload.products = combos.map(c => ({
//       product_id: c.id,
//       qty: c.qty,
//     }));
//   }

//   // ưu tiên mã người dùng → nếu không có → dùng mã backend auto apply
//   const promoToApply = discountCode ?? preview.promotion?.code ?? null;
//   if (promoToApply) payload.discount_code = promoToApply;



//   const handlePayment = () => {
//     booking.mutate(payload, {
//       onSuccess: res => {
//         createPayment.mutate(
//           { booking_id: res.data.id },
//           {
//             onSuccess: url => {
//               if (url) window.location.href = url;
//             },
//           }
//         );
//       }
//     });
//   };

//   return (
//     <div className="container mx-auto max-w-xl p-6 space-y-6">
//       <h1 className="text-2xl font-bold text-center">Xác Nhận Thông Tin Vé</h1>

//       <div className="p-4 rounded-xl border shadow bg-white space-y-3">
//         <p><b>Phim:</b> {preview.movie.title}</p>
//         <p><b>Phòng:</b> {preview.room.name}</p>
//         <p><b>Ngày chiếu:</b> {preview.showtime.date}</p>
//         <p><b>Giờ chiếu:</b> {preview.showtime.time}</p>

//         <div>
//           <b>Ghế:</b>
//           {preview.seats.map(s => (
//             <p key={s.id}>- {s.seat_code} ({s.price.toLocaleString("vi-VN")}đ)</p>
//           ))}
//         </div>

//         {combos.length > 0 && (
//           <div>
//             <b>Combo:</b>
//             {combos.map(c => {
//               const info = preview.combos.find(x => x.id === c.id);
//               return (
//                 <p key={c.id}>
//                   - {info?.name} x {c.qty} (
//                   {(info!.price * c.qty).toLocaleString("vi-VN")}đ)
//                 </p>
//               );
//             })}
//           </div>
//         )}

//         {preview.promotion && (
//           <div className="text-green-600">
//             <b>Mã giảm giá:</b> {preview.promotion.code}
//             <br />
//             Giảm: -{preview.pricing.discount.toLocaleString("vi-VN")}đ
//           </div>
//         )}

//         <div className="font-bold text-lg mt-3">
//           Tổng tiền: {totalFromSeatPage.toLocaleString("vi-VN")}đ
//         </div>
//       </div>

//       <div className="flex gap-3">
//         <Button className="w-1/2" variant="outline" onClick={() => router.back()}>
//            Quay lại
//         </Button>

//         <Button className="w-1/2" onClick={handlePayment}>
//           Thanh Toán VNPay
//         </Button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useBooking } from "@/api/hooks/use-booking";
import { useCreatePayment } from "@/api/hooks/use-payment";
import type { CreateBookingPayload } from "@/api/interfaces/booking-interface";
import type { TicketPreviewData } from "@/api/interfaces/ticket-preview-interface";
import { useTicketPreview } from "@/api/hooks/use-ticket-preview.ts";

export default function ReviewPage() {
  const params = useSearchParams();
  const router = useRouter();
  const booking = useBooking();
  const createPayment = useCreatePayment();

  const showtimeId = Number(params.get("showtime_id"));
  const totalFromSeatPage = Number(params.get("total") || 0);

  const discountRaw = params.get("discount_code");
  const discountCode =
    discountRaw && discountRaw.trim() !== "" ? discountRaw.trim() : null;

  const seatIds: number[] = (params.get("seat_ids") || "")
    .split(",")
    .map(s => Number(s))
    .filter(n => Number.isInteger(n) && n > 0);

  const comboString = params.get("combo_ids");
  const comboIds = comboString
    ? comboString.split(",").map(Number).filter(id => id > 0)
    : [];

  const combos = comboIds
    .map(id => ({ id, qty: Number(params.get(`combo_qty_${id}`) || 0) }))
    .filter(c => c.qty > 0);

  const { data, isLoading } = useTicketPreview(
    showtimeId,
    seatIds,
    combos.map(c => c.id),
    discountCode
  );

  if (isLoading) return <p>Đang tải...</p>;
  if (!data?.data) return <p>Không có dữ liệu xem trước vé</p>;

  const preview: TicketPreviewData = data.data;

  const payload: CreateBookingPayload = {
    showtime_id: showtimeId,
    seats: seatIds,
  };

  if (combos.length > 0) {
    payload.products = combos.map(c => ({
      product_id: c.id,
      qty: c.qty,
    }));
  }

  const promoToApply = discountCode ?? preview.promotion?.code ?? null;
  if (promoToApply) payload.discount_code = promoToApply;

  const handlePayment = () => {
    booking.mutate(payload, {
      onSuccess: res => {
        createPayment.mutate(
          { booking_id: res.data.id },
          { onSuccess: url => url && (window.location.href = url) }
        );
      }
    });
  };

  // ===================================================================
  // ===================== UI GIAO DIỆN MỚI =============================
  // ===================================================================

return (
  <div className="min-h-screen  flex items-center justify-center p-4 md:p-8 font-sans">

    <div className=" w-full max-w-5xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row">

      {/* LEFT SIDE – BACKGROUND + MOVIE */}
      <div className="md:w-5/12 relative h-64 md:h-auto bg-gray-100">
        <img
          src={
            preview.movie.poster_url ||
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80"
          }
          alt={preview.movie.title}
          className="w-full h-full object-cover opacity-90"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent flex flex-col justify-end p-8">
          <span className="text-cyan-600 font-bold tracking-wider text-xs mb-2 uppercase flex items-center gap-2">
            🎬 PHIM ĐANG CHỌN
          </span>

          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">
            {preview.movie.title}
          </h2>

          <div className="flex gap-2">
            <span className="px-2 py-0.5 border border-gray-400 rounded text-xs text-gray-700">
              2D
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – FORM */}
      <div className="md:w-7/12 p-6 md:p-10 flex flex-col ">
        
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          🎟️ Xác Nhận Đặt Vé
        </h3>

        <div className="space-y-6 flex-1 overflow-y-auto max-h-[60vh] md:max-h-none pr-2">

          {/* DATE – TIME – ROOM */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border  shadow-sm text-center">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                NGÀY
              </p>
              <p className="font-bold text-gray-700">{preview.showtime.date}</p>
            </div>

            <div className="p-3 rounded-xl border bg-cyan-50 border-cyan-300 shadow-sm text-center">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                GIỜ
              </p>
              <p className="font-bold text-cyan-700 text-lg">
                {preview.showtime.time}
              </p>
            </div>

            <div className="p-3 rounded-xl border shadow-sm text-center">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
                PHÒNG
              </p>
              <p className="font-bold text-gray-700">{preview.room.name}</p>
            </div>
          </div>

          {/* SEATS */}
          <div className=" rounded-2xl p-5 border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-sm mb-2">Ghế đã chọn:</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {preview.seats.map((s) => (
                <span
                  key={s.id}
                  className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded border border-cyan-300"
                >
                  {s.seat_code}
                </span>
              ))}
            </div>

            <p className="text-right font-medium text-gray-700">
              {totalFromSeatPage.toLocaleString("vi-VN")}đ
            </p>
          </div>

          {/* PAYMENT METHOD */}
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase font-bold tracking-wider">
              Thanh toán qua
            </p>

            <div className="flex items-center gap-3 p-3 border border-cyan-400/40 bg-cyan-50 rounded-xl">
              <div className="bg-white p-1 rounded w-10 h-6 flex items-center justify-center border">
                <span className="text-[10px] font-black text-blue-600">VNPAY</span>
              </div>
              <span className="text-cyan-800 text-sm font-medium">
                Cổng thanh toán VNPAY QR
              </span>
              <div className="ml-auto w-4 h-4 rounded-full bg-cyan-500 shadow"></div>
            </div>
          </div>

        </div>

        {/* TOTAL */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-end mb-6">
            <span className="text-gray-500 text-sm mb-1">Tổng thanh toán</span>
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              {totalFromSeatPage.toLocaleString("vi-VN")}đ
            </span>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <Button
              variant="outline"
              className="col-span-4 border-gray-300 text-gray-700 hover:bg-gray-100 h-12 rounded-xl"
              onClick={() => router.back()}
            >
              ◀ Quay lại
            </Button>

            <Button
              className="col-span-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold h-12 rounded-xl shadow-md"
              onClick={handlePayment}
            >
              Thanh Toán Ngay
            </Button>
          </div>
        </div>

      </div>
    </div>
    </div>
  
);
}

