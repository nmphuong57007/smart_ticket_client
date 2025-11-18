"use client";

import MovieDetailBanner from "./movie-detail-banner";
import MovieDetailCombo from "./movie-detail-combo";
import MovieDetailDescription from "./movie-detail-description";
import MovieSeatMap from "./movie-detail-seat";
import type { SeatRow } from "./movie-detail-seat";
import MovieDetailShowtime from "./movie-detail-showtime";

interface MovieDetailContainerProps {
  movieId: string;
}

const movieData = {
  id: 1,
  title: "Tên Phim Siêu Anh Hùng",
  year: 2024,
  poster: "https://placehold.co/400x600?text=Superhero+Movie",
  duration: 148,
  ageRating: "C18",
  genres: [
    { id: 1, name: "Hành động" },
    { id: 2, name: "Viễn tưởng" },
  ],
  format: "2D - Phụ đề Tiếng Việt",
  summary:
    "Một đặc vụ CIA vô tình phát hiện ra những bí mật đen tối của cơ quan và bị cuốn vào một cuộc săn lùng toàn cầu. Anh phải chạy trốn để cứu lấy mạng sống của mình và những người yêu thương.",
  description:
    "Bộ phim là một hành trình nghẹt thở với những pha hành động mãn nhãn, twist bất ngờ và câu chuyện về lòng trung thành, sự phản bội và cái giá của sự thật.",
  directors: [
    { id: 1, name: "John Carter" },
    { id: 2, name: "Emily Dawson" },
  ],
  cast: [
    { id: 1, name: "Actor A" },
    { id: 2, name: "Actor B" },
    { id: 3, name: "Actor C" },
  ],
};

const cinemas = [
  {
    id: "cgv-vincom",
    name: "CGV Vincom Center",
    format: "2D - Phụ đề Tiếng Việt",
    showtimes: [
      { id: "1", time: "18:00" },
      { id: "2", time: "19:30" },
      { id: "3", time: "20:15" },
      { id: "4", time: "21:45" },
      { id: "5", time: "22:30" },
    ],
  },
];

const dates = ["28/07/2024", "29/07/2024"];

const combos = [
  {
    id: "1",
    name: "Combo Bắp Lớn",
    description: "1 Bắp rang + 2 Nước ngọt cỡ lớn",
    price: 99000,
    image: "https://placehold.co/300x300?text=Bap+Lon",
  },
  {
    id: "2",
    name: "Combo Tình Yêu",
    description: "1 Bắp rang vị phô mai + 2 Nước ngọt",
    price: 129000,
    image: "https://placehold.co/300x300?text=Love",
  },
  {
    id: "3",
    name: "Combo Gia Đình",
    description: "2 Bắp rang + 4 Nước ngọt",
    price: 199000,
    image: "https://placehold.co/300x300?text=Family",
  },
  {
    id: "4",
    name: "Combo Ăn Vặt",
    description: "1 Khoai tây chiên + 1 Xúc xích",
    price: 79000,
    image: "https://placehold.co/300x300?text=Snack",
  },
];

const seatMap: SeatRow[] = [
  [
    { code: "A1", status: "available" },
    { code: "A2", status: "available" },
    { code: "A3", status: "available" },
    { code: "A4", status: "booked" },
    { code: "A5", status: "booked" },
    { code: "A6", status: "available" },
    { code: "A7", status: "available" },
    { code: "A8", status: "available" },
    { code: "A9", status: "vip" },
    { code: "A10", status: "vip" },
  ],
  [
    { code: "B1", status: "available" },
    { code: "B2", status: "booked" },
    { code: "B3", status: "available" },
    { code: "B4", status: "available" },
    { code: "B5", status: "available" },
    { code: "B6", status: "vip" },
    { code: "B7", status: "vip" },
    { code: "B8", status: "vip" },
    { code: "B9", status: "available" },
    { code: "B10", status: "available" },
  ],
  [
    { code: "C1", status: "available" },
    { code: "C2", status: "available" },
    { code: "C3", status: "available" },
    { code: "C4", status: "booked" },
    { code: "C5", status: "selected" },
    { code: "C6", status: "selected" },
    { code: "C7", status: "available" },
    { code: "C8", status: "available" },
    { code: "C9", status: "vip" },
    { code: "C10", status: "vip" },
  ],
  [
    { code: "D1", status: "available" },
    { code: "D2", status: "available" },
    { code: "D3", status: "available" },
    { code: "D4", status: "available" },
    { code: "D5", status: "booked" },
    { code: "D6", status: "available" },
    { code: "D7", status: "vip" },
    { code: "D8", status: "vip" },
    { code: "D9", status: "available" },
    { code: "D10", status: "available" },
  ],
  [
    { code: "E1", status: "available" },
    { code: "E2", status: "available" },
    { code: "E3", status: "available" },
    { code: "E4", status: "available" },
    { code: "E5", status: "available" },
    { code: "E6", status: "available" },
    { code: "E7", status: "vip" },
    { code: "E8", status: "vip" },
    { code: "E9", status: "available" },
    { code: "E10", status: "available" },
  ],
];

const orderPreview = {
  cinema: "CGV Vincom Center",
  showtime: "20:15 - 28/07/2024",
  seats: ["E5", "E6"],
  combo: ["Combo Bắp Lớn"],
  totalPrice: 319000,
};

export default function MovieDetailContainer({
  movieId,
}: MovieDetailContainerProps) {
  console.log(movieId);

  return (
    <div>
      <MovieDetailBanner
        poster={movieData.poster}
        title={movieData.title}
        duration={movieData.duration}
        genres={movieData.genres}
        format={movieData.format}
      />

      <div className="mt-6 flex flex-col gap-6 px-4 lg:flex-row">
        <div className="flex w-full flex-col gap-6 lg:w-[66%]">
          <MovieDetailDescription
            summary="Một đặc vụ CIA ưu tú phát hiện ra những bí mật chấn động..."
            cast={["Diễn viên A", "Diễn viên B", "Diễn viên C"]}
            directors={["Đạo diễn X"]}
          />

          <MovieDetailShowtime cinemas={cinemas} dates={dates} />

          <MovieDetailCombo combos={combos} />
        </div>

        <MovieSeatMap seatMap={seatMap} orderPreview={orderPreview} />
      </div>
    </div>
  );
}
