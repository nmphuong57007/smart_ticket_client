import MovieDetailContainer from "@/modules/Movies/detail/movie-detail-container";


export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <MovieDetailContainer id={id}  />;
}
