import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "@/services/movie.service";
import { useEffect, useState } from "react";
import { convertToEmbed } from "@/components/utils/convertToEmbed";

/* ---------------------------- MOVIE DETAIL QUERY ---------------------------- */

export const movieDetailKeys = {
  all: ["movieDetail"] as const,
  detail: (id: number | string) => [...movieDetailKeys.all, "detail", id] as const,
};

/** Hook lấy chi tiết phim qua API */
export function useMovieDetail(id: number | string) {
  return useQuery({
    queryKey: movieDetailKeys.detail(id),
    queryFn: () => getMovieDetail(id as number),
    enabled: !!id,
  });
}

/* ---------------------------- TRAILER MODAL HOOK ---------------------------- */

/** Interface điều khiển modal trailer */
export interface UseTrailerModal {
  open: boolean;
  src: string;
  openModal: () => void;
  close: () => void;
}

/** Hook quản lý mở/đóng popup trailer */
export function useTrailerModal(trailerUrl?: string): UseTrailerModal {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
