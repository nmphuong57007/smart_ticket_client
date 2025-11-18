import MovieDetailContainer from "@/modules/movie-detail/movie-detail-container";

interface CinemaDetailProps {
  params: {
    id: string;
  };
}

export default async function CinemaDetail({ params }: CinemaDetailProps) {
  const { id } = await params;

  return <MovieDetailContainer movieId={id} />;
}
