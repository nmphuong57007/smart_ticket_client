import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Showtime {
  id: string;
  time: string;
}

interface Cinema {
  id: string;
  name: string;
  format: string;
  showtimes: Showtime[];
}

interface MovieDetailShowtimeProps {
  cinemas: Cinema[];
  dates: string[];
}

export default function MovieDetailShowtime({
  cinemas,
  dates,
}: MovieDetailShowtimeProps) {
  const [selectedCinemaId, setSelectedCinemaId] = useState<string | undefined>(
    cinemas[0]?.id
  );
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    dates[0]
  );
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(
    null
  );

  const selectedCinema = cinemas.find((c) => c.id === selectedCinemaId);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Chọn Suất Chiếu</h2>

      {/* Selects */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="w-full">
          <Select
            value={selectedCinemaId}
            onValueChange={(value) => {
              setSelectedCinemaId(value);
              setSelectedShowtimeId(null);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn Rạp" />
            </SelectTrigger>
            <SelectContent>
              {cinemas.map((cinema) => (
                <SelectItem key={cinema.id} value={cinema.id}>
                  {cinema.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Select */}
        <div className="w-full">
          <Select
            value={selectedDate}
            onValueChange={(value) => {
              setSelectedDate(value);
              setSelectedShowtimeId(null);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn Ngày" />
            </SelectTrigger>
            <SelectContent>
              {dates.map((date) => (
                <SelectItem key={date} value={date}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Showtime card */}
      {selectedCinema && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedCinema.name}</CardTitle>
            <CardDescription>{selectedCinema.format}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {selectedCinema.showtimes.map((showtime) => {
              const isActive = showtime.id === selectedShowtimeId;
              return (
                <Button
                  key={showtime.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setSelectedShowtimeId(showtime.id)}
                  size="sm"
                >
                  {showtime.time}
                </Button>
              );
            })}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
