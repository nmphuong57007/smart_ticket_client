'use client';

import { useMovieDetail } from "@/hooks/use-movie-detail";
import MovieInformation from "./movie-information";
import MoviePoster from "./movie-poster";

interface MovieDetailContainerProp {
    id:string;
}

export default function MovieDetailContainer({
    id,
}:MovieDetailContainerProp){
    const {data,isLoading, isError} = useMovieDetail(id);
    // if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
    if (isError) return <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu</div>;
    console.log(data);
    
    return( 
    <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/**ảnh */}
        <div className="flex flex-col md:flex-row gap-x-[100px]">
            <div className="w-[400px] h-[600px] ">
                <MoviePoster data = {data}/>
            </div>
                {/**nội dung */}
            <div className="w-full md:w-1/2">
                <MovieInformation  data = {data || []} isLoading={isLoading}/>
            </div>
        </div>
    </div>
    );
}