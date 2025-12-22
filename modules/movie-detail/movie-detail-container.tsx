"use client";

import { useMovieDetail } from "@/api/hooks/use-movie-detail";
import MovieDetailBanner from "./movie-detail-banner";
import MovieDetailDescription from "./movie-detail-description";
import MovieDetailShowtime from "./movie-detail-showtime";
import MovieSeatMap from "./movie-detail-seat";
import MovieDetailCombo from "./movie-detail-combo";

import { useMovieShowtimes } from "@/api/hooks/use-showtime";
import { useProducts } from "@/api/hooks/use-products";

import { SelectedCombo } from "@/api/interfaces/product-interface";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasToken } from "@/helpers/has-token";
import MovieDetailReviews from "./movie-detail-reviews";
import { useReviewsByMovie } from "@/api/hooks/use-review-by-movie";
import MovieDetailReviewForm from "./movie-detail-create-review";
import { useProfile } from "@/api/hooks/use-profile";

interface MovieDetailContainerProps {
  movieId: string;
}

export default function MovieDetailContainer({ movieId }: MovieDetailContainerProps) {
  const router = useRouter();

  // ============================
  // KIỂM TRA LOGIN
  // ============================
  useEffect(() => {
    if (!hasToken()) {
      router.push("/login"); // <-- chuyển tới trang login
    }
  }, [router]);

  const numericId = Number(movieId);

  const { data: movie, isLoading: movieLoading } = useMovieDetail(numericId);
  const { data: showtimes, isLoading: showtimeLoading } = useMovieShowtimes(numericId);
  const { data: products } = useProducts();
  const { data: reviewRes, isLoading: reviewLoading } =
  useReviewsByMovie(numericId);
  const { data: profile } = useProfile();

const reviews = reviewRes?.data || [];


  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(null);
  const [selectedShowtimeText, setSelectedShowtimeText] = useState<string>("");
  const [selectedCombos, setSelectedCombos] = useState<SelectedCombo[]>([]);

  if (!hasToken()) {
    return <div className="p-6 text-center">Đang chuyển hướng đến trang đăng nhập...</div>;
  }

  if (movieLoading) return <div className="p-4">Đang tải...</div>;
  if (!movie) return <div className="p-4 text-red-500">Không tìm thấy phim</div>;

  return (
    <div>
      <MovieDetailBanner
        poster={movie.poster}
        title={movie.title}
        duration={movie.duration}
        genres={movie.genres}
        format={movie.format}
      />

      <div className="mt-6 flex flex-col gap-6 px-4 lg:flex-row">
        <div className="flex w-full flex-col gap-6 lg:w-[66%]">
          <MovieDetailDescription description={movie.description} />

          {/* Lịch chiếu */}
          {showtimeLoading ? (
            <p>Đang tải lịch chiếu...</p>
          ) : (
            <MovieDetailShowtime
              showtimeData={showtimes ?? []}
              onSelectShowtime={(id, text) => {
                setSelectedShowtimeId(id);
                setSelectedShowtimeText(text);
              }}
            />
          )}

          {/* Combo */}
          <MovieDetailCombo
            combos={products ?? []}
            onComboChange={(list) => setSelectedCombos(list)}
          />
        </div>

        {/* Sơ đồ ghế + thanh toán */}
        {selectedShowtimeId && (
          <MovieSeatMap
            showtimeId={selectedShowtimeId}
            showtimeText={selectedShowtimeText}
            combos={selectedCombos}
          />
        )}
      </div>
      {/* ===== ĐÁNH GIÁ PHIM (CUỐI TRANG) ===== */}
      <div className="mt-20  py-12">
        <div className="mx-auto max-full px-4">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex-1 border-t" />
              <h3 className="text-lg font-semibold text-gray-700">
                Đánh giá & bình luận
              </h3>
            <div className="flex-1 border-t" />
          </div>
          
          {/* FORM GỬI REVIEW */}
          <MovieDetailReviewForm movieId={numericId} />

          <MovieDetailReviews
            reviews={reviews}
            isLoading={reviewLoading}
            profile={profile?.data?.user}
            movieId={movie?.id}
          />
        </div>
      </div>
    </div>
  );
}