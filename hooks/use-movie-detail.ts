import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "@/services/movie.service";
import { useEffect, useState } from "react";
import { convertToEmbed } from "@/components/utils/convertToEmbed";
import { getMovieShowtimeDetail } from "@/services/movie.service";

/* ---------------------------- MOVIE DETAIL QUERY ---------------------------- */

export const movieDetailKeys = {
  all: ["movieDetail"] as const,
  detail: (id: any) => [...movieDetailKeys.all, "detail", id] as const,
};

/** Hook lấy chi tiết phim qua API */
export function useMovieDetail(id: any) {
  return useQuery({
    queryKey: movieDetailKeys.detail(id),
    queryFn: () => getMovieDetail(id as any),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 phút: data tươi, quay lại không fetch
  });
}

/* ---------------------------- TRAILER MODAL HOOK ---------------------------- */

/** Interface điều khiển modal trailer */
export interface UseTrailerModal {
  open: any;
  src: any;
  openModal: () => void;
  close: () => void;
}

/** Hook quản lý mở/đóng popup trailer */
export function useTrailerModal(trailerUrl?: any): UseTrailerModal {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");

  useEffect(() => {
    const onEsc = (e: any) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open]);

  const openModal = () => {
    if (trailerUrl) setSrc(convertToEmbed(trailerUrl));
    setOpen(true);
  };

  const close = () => setOpen(false);

  return { open, src, openModal, close };
}

/**
 * Hook lấy chi tiết lịch chiếu phim (dành cho trang chi tiết)
 * Có thể refetch khi đổi ngày hoặc rạp
 */

export const useMovieShowtimeDetail = (
  id: any,
  date?: any,
  cinemaId?: any
) => {
  return useQuery<any>({
    queryKey: ["movieShowtimeDetail", id, date, cinemaId],
    queryFn: () => getMovieShowtimeDetail(id, date, cinemaId),
    enabled: !!id, // chỉ gọi API khi có id
    staleTime: 1000 * 60, // dữ liệu cache 1 phút
    retry: 1, // thử lại 1 lần nếu lỗi
  });
};



