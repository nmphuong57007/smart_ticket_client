"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useTrailerModal } from "@/hooks/use-movie-detail";

interface MovieTrailerPopupProps {
  trailerUrl?: string;
  label?: string;
}

export const TrailerEmbed: React.FC<{ src?: string }> = ({ src }) => {
  if (!src) return null;
  return (
    <div className="w-[80vw] max-w-[1200px] aspect-video">
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

  //  Chặn scroll nền khi mở popup
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Nút mở trailer */}
      <button
        onClick={openModal}
        className="flex-1 w-1/2 border-2 border-black rounded-lg py-0.5"
      >
        {label}
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"  style={{ marginBottom: "0px" }}
        onClick={close}>
          <div className="relative p-4"
          onClick={(e) => e.stopPropagation()} // tránh tắt khi click trong video >
          >
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





