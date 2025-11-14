import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Movie {
  id: number;
  title: string;
  poster: string;
  trailer: string;
  description: string;
  genres: { id: number; name: string }[];
  duration: number;
  format: string;
  language: string;
  release_date: string;
  end_date: null | string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface MovieListData {
  movies: Movie[];
}

interface MovieListProps {
  data?: MovieListData;
  totalItems?: number;
}

function formatLanguage(lang: string) {
  switch (lang) {
    case "sub":
      return "Phụ đề";
    case "dub":
      return "Lồng tiếng";
    default:
      return lang;
  }
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export default function MovieShowingList({ data, totalItems }: MovieListProps) {
  const movies = data?.movies ?? [];

  if (!movies.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Danh sách phim đang chiếu</CardTitle>
          <CardDescription>Không có phim để hiển thị.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Vui lòng thử lại sau hoặc thay đổi bộ lọc.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold">Danh sách phim đang chiếu</h2>
          <p className="text-sm text-muted-foreground">
            Tổng cộng {totalItems} phim
          </p>
        </div>
      </div>

      <Separator />

      {/* Grid phim */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((m) => (
          <Card key={m.id} className="flex flex-col pt-0">
            <CardContent className="p-0">
              <AspectRatio ratio={4 / 4}>
                <Image
                  src={m.poster}
                  alt={m.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width:1200px) 33vw, 25vw"
                  className="object-cover rounded-t-md"
                  priority={false}
                />
              </AspectRatio>
            </CardContent>

            <CardHeader className="space-y-2">
              <CardTitle className="line-clamp-2">{m.title}</CardTitle>
              <CardDescription className="flex flex-wrap gap-2">
                {Array.isArray(m.genres) && m.genres.length > 0 ? (
                  m.genres.map((g) => (
                    <Badge key={g.id} variant="secondary">
                      {g.name}
                    </Badge>
                  ))
                ) : null}
                <Badge variant="outline">{m.duration} phút</Badge>
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{m.format}</Badge>
                <Badge variant="outline">{formatLanguage(m.language)}</Badge>
                <Badge>
                  {m.status === "showing" ? "Đang chiếu" : m.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Khởi chiếu: {formatDate(m.release_date)}
              </p>
            </CardHeader>

            <CardContent>
              <p className="text-sm line-clamp-3">{m.description}</p>
            </CardContent>

            <CardFooter className="mt-auto flex gap-2">
              <Button asChild className="flex-1">
                <Link href={`/movies/${m.id}`}>Mua vé</Link>
              </Button>
              <Button asChild variant="secondary" className="flex-1">
                <Link href={m.trailer} target="_blank" rel="noreferrer">
                  Trailer
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
