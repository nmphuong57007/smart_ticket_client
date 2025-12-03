"use client";

import HomeBanner from "./home-banner";
import { useMovies } from "@/api/hooks/use-movie";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import type { MovieResInterface } from "@/api/interfaces/movie-interface";

type MovieType = MovieResInterface["data"]["movies"][number];

export default function HomeContainer() {
  const { data: nowShowing, isLoading: loadingNow } = useMovies(
    10,
    1,
    "now_showing",
    "created_at",
    ""
  );

  const nowShowingMovies: MovieType[] = nowShowing?.data?.movies ?? [];

  const { data: comingSoon, isLoading: loadingSoon } = useMovies(
    10,
    1,
    "coming_soon",
    "created_at",
    ""
  );

  const comingSoonMovies: MovieType[] = comingSoon?.data?.movies ?? [];

  const getPoster = (poster?: string | null): string =>
    !poster || poster.trim() === "" ? "/images/3.jpg" : poster;

  // ====================== CARD COMPONENT ======================
  const MovieCard = (movie: MovieType, index: number) => (
    <div
      key={movie.id ?? index}
      className="
        bg-white 
        border border-gray-200 
        text-black

        dark:bg-[#1A1818]
        dark:border-[#2A2727]
        dark:text-white
        
        rounded-2xl shadow-sm 
        overflow-hidden 
        hover:scale-[1.02] transition-all 
        flex flex-col
      "
    >
      <Link href={`/movie/${movie.id}/detail`}>
        <Image
          src={getPoster(movie.poster)}
          alt={movie.title || 'Movie poster'}
          width={400}
          height={600}
          className="object-cover w-full h-[260px]"
          unoptimized
        />
      </Link>

      {/* CONTENT */}
      <div className="p-5 flex flex-col space-y-3 flex-grow">
        {/* Title */}
        <h3 className="font-semibold text-[18px] leading-tight text-black dark:text-white">
          {movie.title}
        </h3>

        {/* Genres */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {movie.genres?.map((g) => g.name).join(", ") ?? ""}
        </p>

        {/* Duration */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {movie.duration} phút
        </p>

        <div className="flex-grow" />

        {/* BUTTON */}
        <Link
          href={`/movie/${movie.id}/detail`}
          className="
            block w-full text-center 
            bg-black text-white 
            dark:bg-white dark:text-black
            font-bold
            py-2.5 rounded-xl 
            hover:bg-gray-900 dark:hover:bg-gray-200 
            transition
          "
        >
          Mua vé
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto pb-20">

      <HomeBanner />

      {/* ====================== PHIM ĐANG CHIẾU ====================== */}
      <div className="flex justify-between items-center mt-12 mb-4">
        <h2 className="text-2xl font-bold">🎬 Phim đang chiếu</h2>
        <Link href="/movie/movie-showing" className="text-black dark:text-white font-semibold hover:opacity-70 transition">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {loadingNow
          ? Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-[340px] rounded-xl" />
          ))
          : nowShowingMovies.slice(0, 8).map(MovieCard)}
      </div>

      {/* ====================== PHIM SẮP CHIẾU ====================== */}
      <div className="flex justify-between items-center mt-14 mb-4">
        <h2 className="text-2xl font-bold">⏳ Phim sắp chiếu</h2>
        <Link href="/movie/upcoming-movies" className="text-black dark:text-white font-semibold hover:opacity-70 transition">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {loadingSoon
          ? Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-[340px] rounded-xl" />
          ))
          : comingSoonMovies.slice(0, 8).map(MovieCard)}
      </div>

    </div>
  );
}
