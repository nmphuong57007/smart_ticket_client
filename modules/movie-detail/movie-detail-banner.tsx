import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";

interface MovieDetailBannerProps {
  poster: string;
  title: string;
  duration: number;
  genres: { id: number; name: string }[];
  format: string;
}

export default function MovieDetailBanner(props: MovieDetailBannerProps) {
  const { poster, title, duration, genres, format } = props;

  return (
    <Card className="relative w-full border-0 overflow-hidden py-0">
      {/* Background Image */}
      <div className="relative h-80 md:h-[420px] w-full">
        <Image
          src={poster}
          alt="Backdrop"
          fill
          priority
          className="object-cover"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <CardContent className="absolute bottom-6 left-6 flex gap-6 md:left-10 md:bottom-10">
        {/* Poster */}
        <div className="relative h-40 w-28 rounded-md overflow-hidden shadow-lg md:h-56 md:w-40">
          <Image src={poster} alt={title} fill className="object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-end text-white space-y-3">

          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre.id}
                variant="outline"
                className="border-white/40 text-white"
              >
                {genre.name}
              </Badge>
            ))}
          </div>

          {/* Meta line */}
          <div className="flex items-center gap-2 text-sm opacity-90">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration} phút</span>
            </div>

            <Separator
              orientation="vertical"
              className="hidden md:block h-4 bg-white/40"
            />

            <span>{format}</span>

            <Separator
              orientation="vertical"
              className="hidden md:block h-4 bg-white/40"
            />

          </div>
        </div>
      </CardContent>
    </Card>
  );
}
