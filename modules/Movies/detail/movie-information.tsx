import { MoviesDetailResponse } from "@/types/movie";
import { Skeleton } from "@/components/ui/skeleton";
import {TrailerPopup} from "./movie-trailer";

interface MovieInformationProps extends MoviesDetailResponse{
    isLoading: boolean;    
}

export default function MovieInformation({data, isLoading}:MovieInformationProps){
    // console.log("MovieInformation", data);
    const statusLabels = {
    coming: "Sắp chiếu",
    showing: "Đang chiếu",
    stopped: "Ngừng chiếu",
  };
    if (isLoading){
        return(
            <div>
                <Skeleton className="h-8 w-1/2 mb-4"/>
                <Skeleton className="h-4 w-full mb-2"/>
                <Skeleton className="h-4 w-full mb-2"/>
                <Skeleton className="h-4 w-full mb-2"/>
                <Skeleton className="h-4 w-3/4"/>
            </div>
        )
    }
    return <div>

     <div className="space-y-4">
      <h2 className="text-3xl font-semibold text-gray-900 ">{data?.title}</h2>

      <div className="space-y-1 text-sm text-gray-600">
        <p className="text-xl py-2"><span className="font-semibold ">Mô tả:</span> {data?.description}</p>
        <p className="text-xl py-2"><span className="font-semibold">Thể loại:</span> {data?.genre}</p>
        <p className="text-xl py-2"><span className="font-semibold">HÌnh thức:</span> {data?.format}</p>
        <p className="text-xl py-2"><span className="font-semibold">Thời lượng:</span> {data?.duration} phút</p>
        <p className="text-xl py-2"><span className="font-semibold">Trạng thái:</span> {statusLabels[data?.status]}</p>
        <p className="text-xl py-2"><span className="font-semibold">Khởi chiếu:</span> {data?.release_date}</p>
      </div>

      {/* Trailer */}
      <TrailerPopup trailerUrl={data?.trailer} label="Trailer" />



      {/* Lịch chiếu */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2 text-3xl">Lịch chiếu</h3>
        <div className="flex gap-3 mb-3">
          {["12/10", "13/10", "14/10"].map((d) => (
            <button
              key={d}
              className={`px-3 py-1 rounded-md border ${
                d === "12/10"
                  ? "bg-yellow-400 text-white border-yellow-500"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {["13:00", "14:00", "15:00", "16:00"].map((t) => (
            <button
              key={t}
              className="border rounded-md py-2 text-sm hover:bg-gray-100"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
}