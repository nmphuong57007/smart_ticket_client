"use client";

import Image from "next/image";
import { useCinemaDetail } from "@/api/hooks/use-cinema-detail";
import { Skeleton } from "@/components/ui/skeleton";

export default function CinemaAboutPage() {
  const { cinema, isLoading } = useCinemaDetail();

  if (isLoading || !cinema) {
    return (
      <div className="container mx-auto py-10 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-3/6" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl text-[15px] leading-relaxed">
      {/* Large Image */}
      <div className="w-full h-[350px] relative rounded-md overflow-hidden shadow">
        <Image
          src={cinema.image}
          alt={cinema.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Description */}
      <div className="mt-6 space-y-4 text-gray-700">
        <p>
          Rạp chiếu phim Smart Ticket là rạp hiện đại với 5 phòng chiếu, âm thanh chuẩn Dolby Atmos và màn hình lớn chất lượng cao.

        </p>

        <p>
          Rạp được trang bị hệ thống máy chiếu, phòng chiếu hiện đại với 100% thiết bị
          nhập khẩu từ nước ngoài, với 4 phòng chất lượng chuẩn 4K và 5 phòng chiếu tiêu chuẩn.
          Hệ thống âm thanh Dolby 7.1 mang đến trải nghiệm điện ảnh sống động nhất.
        </p>

        <p>
          Mức giá xem phim tại rạp luôn cạnh tranh, phù hợp mọi lứa tuổi. Ngoài ra,
          rạp còn có các chương trình ưu đãi mỗi tuần dành riêng cho học sinh – sinh viên.
        </p>
      </div>

      {/* Contact Info */}
      <h2 className="text-xl font-semibold mt-10 mb-3">Thông tin liên hệ</h2>
      <div className="space-y-1">
        <p>
          <strong>Địa chỉ:</strong> {cinema.address}
        </p>
        <p>
          <strong>Hotline:</strong> {cinema.phone}
        </p>
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-gray-700">
        Mọi thắc mắc, quà tặng – ưu đãi – đặt phòng chiếu – hợp tác truyền thông, vui
        lòng liên hệ Hotline <strong>{cinema.phone}</strong>.
      </p>

      {/* Google Map */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Bản đồ</h2>

        <div className="w-full h-[280px] rounded-md overflow-hidden shadow">
          <iframe
            width="100%"
            height="100%"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              cinema.address
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
