"use client";

import { useEffect, useState } from "react";
import { movieApi } from "@/services/movieServer";
import { Movie } from "@/types/movie";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ticket, Clock, Tags } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

export default function HomePage() {
    const [showingMovies, setShowingMovies] = useState<Movie[]>([]);
    const [comingMovies, setComingMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [showingRes, comingRes] = await Promise.all([
                    movieApi.getMovies({ status: "showing", per_page: 6 }),
                    movieApi.getMovies({ status: "coming", per_page: 6 }),
                ]);
                setShowingMovies(showingRes.movies);
                setComingMovies(comingRes.movies);
            } catch (error) {
                console.error("❌ Lỗi khi lấy danh sách phim:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                Đang tải dữ liệu...
            </div>
        );

    return (
        <main className="container mx-auto px-4 py-8">
            {/* === BANNER === */}
            {showingMovies.length > 0 ? (
                <section className="mb-16 relative">
                    <Swiper
                        modules={[EffectFade, Autoplay]}
                        effect="fade"
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop
                        className="rounded-3xl shadow-lg overflow-hidden"
                    >
                        {showingMovies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <div className="relative w-full h-[450px] flex items-center justify-center">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    {/* Overlay mờ tối để làm nổi bật text */}
                                    <div className="absolute inset-0 bg-black/50" />
                                    {/* Text & nút ở giữa */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="relative z-10 text-center text-white"
                                    >
                                        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">
                                            {movie.title}
                                        </h1>
                                        
                                    </motion.div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            ) : (
                <p className="text-center text-gray-500 mb-10">
                    Không có phim đang chiếu
                </p>
            )}

            {/* === PHIM ĐANG CHIẾU === */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6">🎬 Phim đang chiếu</h2>
                {showingMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {showingMovies.map((movie) => (
                            <motion.div
                                key={movie.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-base mb-2 line-clamp-1">
                                            {movie.title}
                                        </h3>

                                        
                                        <div className="flex items-center text-gray-500 text-sm mb-1">
                                            <Clock className="w-4 h-4 mr-1" />
                                            <span>{movie.duration ?? 0} phút</span>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Tags className="w-4 h-4 mr-1" />
                                            <span className="italic">
                                                Thể loại: {movie.genre || "Chưa cập nhật"}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        className="mt-4 w-full bg-black text-white hover:bg-gray-900"
                                        onClick={() =>
                                            alert(`Đặt vé cho phim: ${movie.title}`)
                                        }
                                    >
                                        Đặt vé
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Không có phim đang chiếu.</p>
                )}
            </section>

            {/* === PHIM SẮP CHIẾU === */}
            <section>
                <h2 className="text-2xl font-bold mb-6">🍿 Phim sắp chiếu</h2>
                {comingMovies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {comingMovies.map((movie) => (
                            <motion.div
                                key={movie.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
                            >
                                <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-base mb-2 line-clamp-1">
                                            {movie.title}
                                        </h3>

                                        {/* <div className="flex items-center text-gray-500 text-sm mb-1">
                                            <span className="mr-2">📅</span>
                                            <span>{movie.release_date || "Đang cập nhật"}</span>
                                        </div> */}
                                        <div className="flex items-center text-gray-500 text-sm mb-1">
                                            <Clock className="w-4 h-4 mr-1" />
                                            <span>{movie.duration ?? 0} phút</span>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Tags className="w-4 h-4 mr-1" />
                                            <span className="italic">
                                                Thể loại: {movie.genre || "Chưa cập nhật"}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        className="mt-4 w-full bg-black text-white hover:bg-gray-900"
                                        onClick={() =>
                                            alert(`Đặt vé cho phim: ${movie.title}`)
                                        }
                                    >
                                        Đặt vé
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Không có phim sắp chiếu.</p>
                )}
            </section>
        </main>
    );
}
