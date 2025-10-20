import MovieDetailContainer from "@/modules/Movies/detail/movie-detail-container";


export default async function MovieDetailPage({
  params,
}: {
  params: Promise <{ id: string }>;
}) {
  const { id } = await params;
  return <MovieDetailContainer id={id}  />;
}
