"use client";

import { useState, useMemo, useEffect } from "react";
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
  /* =======================
   * TIME
   ======================= */
  const now = new Date();

  /* =======================
   * FILTER DATE + SHOWTIME
   * - Ẩn ngày đã qua
   * - Ẩn suất chiếu đã qua
   * - Ngày không còn suất => Ẩn
   ======================= */
  const validShowtimeData = useMemo(() => {
    return showtimeData
      .map((item) => {
        const validShowtimes = item.showtimes.filter((st) => {
          const showDateTime = new Date(`${item.date} ${st.show_time}`);
          return showDateTime > now;
        });

        return {
          ...item,
          showtimes: validShowtimes,
        };
      })
      .filter((item) => item.showtimes.length > 0);
  }, [showtimeData, now]);

  const dates = validShowtimeData.map((item) => item.date);

  /* =======================
   * STATE
   ======================= */
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(
    null
  );

  /* =======================
   * AUTO SELECT FIRST VALID DATE
   ======================= */
  useEffect(() => {
    if (!selectedDate && validShowtimeData.length) {
      setSelectedDate(validShowtimeData[0].date);
    }
  }, [validShowtimeData, selectedDate]);

  const selectedDateData = validShowtimeData.find(
    (item) => item.date === selectedDate
  );

  if (!validShowtimeData.length) {
    return <p>Không có lịch chiếu trong các ngày tới.</p>;
  }

  /* =======================
   * LANGUAGE LABEL
   ======================= */
  const LANGUAGE_LABEL: Record<string, string> = {
    sub: "Phụ đề",
    subtitled: "Phụ đề",
    dub: "Lồng tiếng",
    dubbing: "Lồng tiếng",
    narrated: "Thuyết minh",
  };

  /* =======================
   * GROUP BY LANGUAGE
   ======================= */
  const groupedByLanguage = (selectedDateData?.showtimes ?? []).reduce(
    (acc, st) => {
      const key = LANGUAGE_LABEL[st.language_type] || "Khác";
      if (!acc[key]) acc[key] = [];
      acc[key].push(st);
      return acc;
    },
    {} as Record<string, MovieShowtimeItem[]>
  );

  /* =======================
   * RENDER
   ======================= */
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Chọn Suất Chiếu</h2>

      {/* DATE */}
      <div className="flex gap-3 overflow-x-auto py-2">
        {dates.map((date) => (
          <Button
            key={date}
            variant={selectedDate === date ? "default" : "outline"}
            size="sm"
            className="whitespace-nowrap"
            onClick={() => {
              setSelectedDate(date);
              setSelectedShowtimeId(null);
            }}
          >
            {date}
          </Button>
        ))}
      </div>

      {/* SHOWTIME */}
      <Card className="p-4">
        {Object.entries(groupedByLanguage).map(([label, items]) => (
          <div key={label} className="mb-4">
            <div className="mb-2 font-semibold">{label}</div>

            <div className="flex flex-wrap gap-3">
              {items.map((st) => (
                <Button
                  key={st.id}
                  variant={
                    selectedShowtimeId === st.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    setSelectedShowtimeId(st.id);
                    onSelectShowtime(
                      st.id,
                      `${st.show_time} - ${selectedDate}`
                    );
                  }}
                >
                  {st.show_time}
                </Button>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(groupedByLanguage).length === 0 && (
          <p className="text-muted-foreground">
            Không còn suất chiếu phù hợp cho ngày này.
          </p>
        )}
      </Card>
    </section>
  );
}
