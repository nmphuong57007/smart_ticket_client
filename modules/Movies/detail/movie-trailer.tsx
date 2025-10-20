"use client";
import { X } from "lucide-react";
import { useTrailerModal } from "@/hooks/use-movie-detail";

interface MovieTrailerPopupProps {
  trailerUrl?: string;
  label?: string;
}

export const TrailerEmbed: React.FC<{ src?: string }> = ({ src }) => {
  if (!src) return null;
  return (
    <div className="w-[900px] h-[500px]">
      <iframe
        src={src}
        title="Trailer"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="w-full h-full rounded-xl"
      />
    </div>
  );
};

export const TrailerPopup: React.FC<MovieTrailerPopupProps> = ({
  trailerUrl,
  label = "Trailer",
}) => {
  const { open, src, openModal, close } = useTrailerModal(trailerUrl);

  return (
    <>
      {/* Nút mở trailer */}
      <button
        onClick={openModal}
        className="text-blue-600 hover:underline text-3xl font-semibold"
      >
        {label}
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative p-4">
            <button
              onClick={close}
              className="absolute -top-3 -right-3 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
            >
              <X size={20} />
            </button>
            <TrailerEmbed src={src} />
          </div>
        </div>
      )}
    </>
  );
};
