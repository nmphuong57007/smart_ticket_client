"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type {
  MovieShowtimeByDate,
  MovieShowtimeItem,
} from "@/api/interfaces/showtime-interface";

interface MovieDetailShowtimeProps {
  showtimeData: MovieShowtimeByDate[];
  onSelectShowtime: (id: number, text: string) => void;
}

export default function MovieDetailShowtime({
  showtimeData,
  onSelectShowtime,
}: MovieDetailShowtimeProps) {
  const dates = showtimeData.map((item) => item.date);
  const [selectedDate, setSelectedDate] = useState<string>(dates[0] ?? "");
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(
    null
  );

  const selectedDateData = showtimeData.find(
    (item) => item.date === selectedDate
  );

  if (!showtimeData.length) return <p>Không có lịch chiếu.</p>;

  // ⭐ Language mapping
  const LANGUAGE_LABEL: Record<string, string> = {
    sub: "Phụ đề",
    subtitled: "Phụ đề",
    dub: "Lồng tiếng",
    dubbing: "Lồng tiếng",
    narrated: "Thuyết minh",
  };

  // ⭐ Group showtime by language type
  const groupedByLanguage = selectedDateData
    ? selectedDateData.showtimes.reduce((acc, st) => {
        const key = LANGUAGE_LABEL[st.language_type] || "Khác";
        if (!acc[key]) acc[key] = [];
        acc[key].push(st);
        return acc;
      }, {} as Record<string, MovieShowtimeItem[]>)
    : {};

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Chọn Suất Chiếu</h2>

      {/* ⭐ NGÀY CHIẾU — hiển thị ngang */}
      <div className="flex gap-3 overflow-x-auto py-2">
        {dates.map((date) => {
          const isActive = selectedDate === date;

          return (
            <Button
              key={date}
              variant={isActive ? "default" : "outline"}
              onClick={() => {
                setSelectedDate(date);
                setSelectedShowtimeId(null); // reset giờ chiếu
              }}
              size="sm"
              className="whitespace-nowrap"
            >
              {date}
            </Button>
          );
        })}
      </div>

      {/* ⭐ DANH SÁCH SUẤT CHIẾU */}
      <Card className="p-4">
        {Object.entries(groupedByLanguage).map(([label, items]) => (
          <div key={label} className="mb-4">
            <div className="text-base font-semibold mb-2">{label}</div>

            <div className="flex flex-wrap gap-3">
              {items.map((st) => {
                const isSelected = st.id === selectedShowtimeId;

                return (
                  <Button
                    key={st.id}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => {
                      setSelectedShowtimeId(st.id);

                      // ⭐ Gửi text showtime lên container
                      const text = `${st.show_time} - ${selectedDate}`;
                      onSelectShowtime(st.id, text);
                    }}
                    size="sm"
                  >
                    {st.show_time}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}

        {Object.keys(groupedByLanguage).length === 0 && (
          <p className="text-muted-foreground">
            Không có suất chiếu cho ngày này.
          </p>
        )}
      </Card>
    </section>
  );
}
