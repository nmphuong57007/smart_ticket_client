"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";
import type { Movie, MovieStatus } from "@/types/movie";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";
import { TrailerPopup } from "./detail/movie-trailer";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/site-config";
interface MovieCardProps {
  movie: Movie;
  onBooking?: (movieId: number) => void;
}

export function MovieCard({ movie, onBooking }: MovieCardProps) {
  const router = useRouter();
  const [showTrailer, setShowTrailer] = useState(false);
  const handlerRedirectDetail = (movieId: number) => {
    router.push(routes.movieDetail(movieId));
  };
  const statusLabels: Record<MovieStatus, string> = {
    coming: "Sắp chiếu",
    showing: "Đang chiếu",
    stopped: "Ngừng chiếu",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&modestbranding=1&rel=0`;
    }
    return null;
  };

  const embedUrl = movie.trailer ? getYouTubeEmbedUrl(movie.trailer) : null;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-muted"
        onMouseEnter={() => setShowTrailer(true)}
        onMouseLeave={() => setShowTrailer(false)}
      >
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className={`object-cover transition-opacity ${
            showTrailer ? "opacity-0" : "opacity-100"
          }`}
          onError={() => {
            const target = document.createElement("img");
            target.src = "https://placehold.co/600x400";
          }}
        />
        {embedUrl ? (
          <iframe
            src={showTrailer ? embedUrl : undefined}
            className={`absolute inset-0 w-full h-full transition-opacity ${
              showTrailer ? "opacity-100" : "opacity-0"
            }`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : movie.trailer ? (
          <video
            src={movie.trailer}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
              showTrailer ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            preload="metadata"
          />
        ) : null}
        <div
          className="absolute top-2 left-2"
          onClick={() => handlerRedirectDetail(movie.id)}
        >
          <Badge
            variant={
              movie.status === "coming"
                ? "default"
                : movie.status === "showing"
                ? "secondary"
                : "outline"
            }
          >
            {statusLabels[movie.status]}
          </Badge>
        </div>
        {movie.format && (
          <div
            className="absolute top-2 right-2"
            onClick={() => handlerRedirectDetail(movie.id)}
          >
            <Badge variant="secondary">{movie.format}</Badge>
          </div>
        )}
      </div>

      <CardHeader className="p-4">
        <CardTitle
          className="text-lg truncate"
          onClick={() => handlerRedirectDetail(movie.id)}
        >
          {movie.title}
        </CardTitle>
        <CardDescription
          className="truncate"
          onClick={() => handlerRedirectDetail(movie.id)}
        >
          {movie.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div
          className="space-y-2 text-sm text-muted-foreground"
          onClick={() => handlerRedirectDetail(movie.id)}
        >
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
          <TrailerPopup trailerUrl={movie.trailer} label="Trailer" />
        )}
        {movie.status === "showing" && (
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
