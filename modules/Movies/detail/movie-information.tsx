"use client";

import { MoviesDetailResponse } from "@/types/movie";
import { Skeleton } from "@/components/ui/skeleton";
import { TrailerPopup } from "./movie-trailer";

interface MovieInformationProps {
  isLoading: boolean;
  data: MoviesDetailResponse['data'];
}

export default function MovieInformation({
  data,
  isLoading,
}: MovieInformationProps) {
  const statusLabels: Record<MoviesDetailResponse['data']['status'], string> = {
    coming: "Sắp chiếu",
    showing: "Đang chiếu",
    stopped: "Ngừng chiếu",
  };

  console.log("MovieInformation data:", data);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }
  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900 ">{data?.title}</h2>

        <div className="space-y-1 text-sm text-gray-600">
          <p className="text-xl py-2">
            <span className="font-semibold ">Mô tả:</span> {data?.description}
          </p>
          <p className="text-xl py-2">
            <span className="font-semibold">Thể loại:</span> {data?.genre}
          </p>
          <p className="text-xl py-2">
            <span className="font-semibold">HÌnh thức:</span> {data?.format}
          </p>
          <p className="text-xl py-2">
            <span className="font-semibold">Thời lượng:</span> {data?.duration}{" "}
            phút
          </p>
          <p className="text-xl py-2">
            <span className="font-semibold">Trạng thái:</span>{" "}
            {statusLabels[data?.status]}
          </p>
          <p className="text-xl py-2">
            <span className="font-semibold">Khởi chiếu:</span>{" "}
            {data?.release_date}
          </p>
        </div>

        {/* Trailer */}
        <TrailerPopup trailerUrl={data?.trailer} label="Trailer" />
      </div>
    </div>
  );
}
