"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Calendar, Play } from "lucide-react";
import type { Movie } from "@/types/movie";
import { Badge } from "../../components/ui/badge";

interface MovieCardProps {
  movie: Movie;
  onBooking?: (movieId: number) => void;
  onTrailer?: (trailerUrl: string) => void;
}

export function MovieCard({ movie, onBooking, onTrailer }: MovieCardProps) {
  const statusLabels = {
    coming: "Sắp chiếu",
    "now-showing": "Đang chiếu",
    special: "Đặc biệt",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400";
          }}
        />
        <div className="absolute top-2 left-2">
          <Badge
            variant={
              movie.status === "coming"
                ? "default"
                : movie.status === "now-showing"
                ? "secondary"
                : "outline"
            }
          >
            {statusLabels[movie.status]}
          </Badge>
        </div>
        {movie.format && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">{movie.format}</Badge>
          </div>
        )}
      </div>

      <CardHeader className="p-4">
        <CardTitle className="text-lg truncate">{movie.title}</CardTitle>
        <CardDescription className="truncate">
          {movie.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(movie.release_date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{movie.duration} phút</span>
          </div>
          <div>
            <span className="font-medium">Thể loại: </span>
            {movie.genre}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        {movie.trailer && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onTrailer?.(movie.trailer)}
          >
            <Play className="h-4 w-4 mr-2" />
            Trailer
          </Button>
        )}
        {movie.status === "now-showing" && (
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onBooking?.(movie.id)}
          >
            Đặt vé
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
