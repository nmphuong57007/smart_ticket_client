"use client";

import { useState, useMemo, useEffect } from "react";
import { useMovieShowtimeDetail } from "@/hooks/use-movie-detail";
import { useMovieDetail } from "@/hooks/use-movie-detail";

export default function MovieShowtimeDetail({ movieId }: { movieId: number }) {
  const { data: movieData, isLoading: movieLoading, isError: movieError } = useMovieDetail(movieId);
  const { data: showtimeData, isLoading, isError } = useMovieShowtimeDetail(movieId);
  console.log("Showtime Data:", showtimeData);


  // Lấy ngày đầu tiên có lịch chiếu
  const firstDate = useMemo(() => showtimeData?.full_showtimes?.[0]?.date, [showtimeData]);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(firstDate);

  // Khi có data mà selectedDate chưa có → set ngay, tránh nhấp nháy
  useEffect(() => {
    if (!selectedDate && firstDate) setSelectedDate(firstDate);
  }, [firstDate, selectedDate]);

  if (movieLoading || isLoading) return <p>Đang tải lịch chiếu...</p>;
  if (movieError || isError) return <p>Không thể tải dữ liệu lịch chiếu</p>;
  if (!movieData) return <p>Không có dữ liệu lịch chiếu</p>;

  const selectedDay = showtimeData?.full_showtimes?.find((d) => d.date === selectedDate);

  // Kiểm tra trạng thái phim
  if (movieData.status === "coming") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">{movieData.title}</h2>
        <p className="text-gray-500 italic mb-3">
          Phim dự kiến khởi chiếu vào {movieData.release_date}
        </p>
        <p>Hiện tại chưa có lịch chiếu cho phim này.</p>
      </div>
    );
  }

  if (movieData.status === "stopped") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">{movieData.title}</h2>
        <p className="text-gray-500 italic">Phim đã ngừng chiếu.</p>
      </div>
    );
  }

  // Nếu không có lịch chiếu
  if (!showtimeData?.full_showtimes?.length) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">{movieData.title}</h2>
        <p>Hiện tại chưa có lịch chiếu.</p>
      </div>
    );
  }

  // Gom nhóm theo loại ngôn ngữ
  const groupedShowtimes = selectedDay
    ? selectedDay.showtimes.reduce((groups: any, show) => {
        const lang = show.language_type?.toLowerCase() || "other";
        if (!groups[lang]) groups[lang] = [];
        groups[lang].push(show);
        return groups;
      }, {})
    : {};

  // Thứ tự cố định: sub → dub → narrated
  const fixedOrder = ["sub", "dub", "narrated"];

  // Dịch tên hiển thị
  const translateLanguage = (lang: string) => {
    switch (lang) {
      case "sub":
        return "Phụ đề";
      case "dub":
        return "Lồng tiếng";
      case "narrated":
        return "Thuyết minh";
      default:
        return "Khác";
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-3xl mb-4">Lịch chiếu</h3>

      {/* Danh sách ngày */}
      <div className="flex gap-4 mb-4 border-b pb-2">
        {showtimeData.full_showtimes.map((day) => (
          <button
            key={day.date}
            onClick={() => setSelectedDate(day.date)}
            className={`px-6 py-2 rounded-md text-lg font-medium ${
              selectedDate === day.date
                ? "bg-yellow-600 text-white"
                : "text-black hover:text-yellow-700"
            }`}
          >
            {day.date}
          </button>
        ))}
      </div>

      {/* Suất chiếu */}
      {selectedDay && (
        <div className="space-y-6">
          {fixedOrder.map((langKey) => {
            const shows = groupedShowtimes[langKey];
            if (!shows || shows.length === 0) return null;

            return (
              <div key={langKey}>
                <h4 className="font-bold text-lg mb-2">{translateLanguage(langKey)}</h4>
                <div className="flex flex-wrap gap-4">
                  {shows.map((show: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-gray-200 px-6 py-3 rounded-md text-center min-w-[100px]"
                    >
                      <p className="text-lg font-medium">{show.time}</p>
                      <p className="text-sm text-gray-600">
                        {show.available_seats} ghế trống
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
