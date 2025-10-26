"use client";
import { Movie } from "@/types/movie";

interface MoviePosterProps {
  data?: Movie;
}

export default function MoviePoster({ data }: MoviePosterProps) {
  const posterUrl = data?.poster;

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg">
      {posterUrl ? (
        <img src={posterUrl} className="w-full h-auto object-cover" />
      ) : (
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-500"></div>
      )}
    </div>
  );
}
