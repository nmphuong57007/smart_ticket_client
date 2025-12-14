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
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  /* =======================
   * FILTER DATE >= TODAY
   ======================= */
  const validShowtimeData = useMemo(() => {
    return showtimeData.filter((item) => item.date >= todayStr);
  }, [showtimeData, todayStr]);

  const dates = validShowtimeData.map((item) => item.date);

  /* =======================
   * STATE
   ======================= */
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(
    null
  );

  /* =======================
   * AUTO SELECT FIRST DATE
   ======================= */
  useEffect(() => {
    if (!selectedDate && dates.length) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  const selectedDateData = validShowtimeData.find(
    (item) => item.date === selectedDate
  );

  if (!validShowtimeData.length) {
    return <p>Không có lịch chiếu trong các ngày tới.</p>;
  }

  /* =======================
   * FILTER SHOWTIME BY TIME (ONLY TODAY)
   ======================= */
  const filteredShowtimes =
    selectedDateData?.showtimes.filter((st) => {
      if (selectedDate !== todayStr) return true;

      const showDateTime = new Date(`${selectedDate} ${st.show_time}`);
      return showDateTime > today;
    }) ?? [];

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
  const groupedByLanguage = filteredShowtimes.reduce(
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
            <div className="font-semibold mb-2">{label}</div>

            <div className="flex flex-wrap gap-3">
              {items.map((st) => (
                <Button
                  key={st.id}
                  variant={selectedShowtimeId === st.id ? "default" : "outline"}
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
