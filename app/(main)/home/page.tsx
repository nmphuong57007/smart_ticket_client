import { movieApi } from "@/services/movieServer";
import { Movie } from "@/types/movie";

export default async function HomePage() {
  // Gọi API từ backend
  const [showingRes, comingRes] = await Promise.all([
    movieApi.getMovies({ status: "showing", per_page: 6 }),
    movieApi.getMovies({ status: "coming", per_page: 6 }),
  ]);

  // ✅ Vì interceptor đã return response.data, không cần .data nữa
const showingMovies: Movie[] = showingRes?.data?.movies ?? [];
  const comingMovies: Movie[] = comingRes?.movies ?? [];

  return (
    <main className="container mx-auto px-4 py-8">
      {/* BANNER */}
      {showingMovies.length > 0 && (
        <section className="mb-12 relative">
          <img
            src={showingMovies[0].poster}
            alt={showingMovies[0].title}
            className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
          />
          <div className="absolute inset-0 bg-black/40 rounded-3xl flex flex-col justify-end p-8">
            <h1 className="text-4xl font-bold text-white">
              {showingMovies[0].title}
            </h1>
            <p className="text-gray-200 mt-2 line-clamp-2">
              {showingMovies[0].description}
            </p>
          </div>
        </section>
      )}

      {/* PHIM ĐANG CHIẾU */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          🎬 Phim đang chiếu
        </h2>
        {showingMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {showingMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-2"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="rounded-lg h-64 w-full object-cover"
                />
                <h3 className="font-semibold text-center mt-2 text-sm">
                  {movie.title}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có phim đang chiếu.</p>
        )}
      </section>

      {/* PHIM SẮP CHIẾU */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          🍿 Phim sắp chiếu
        </h2>
        {comingMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {comingMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-2"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="rounded-lg h-64 w-full object-cover"
                />
                <h3 className="font-semibold text-center mt-2 text-sm">
                  {movie.title}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có phim sắp chiếu.</p>
        )}
      </section>
    </main>
  );
}
