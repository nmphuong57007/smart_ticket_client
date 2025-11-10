"use client";

import { Fragment, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useMovies } from "@/api/hooks/use-movie";
import { Spinner } from "@/components/ui/spinner";
import { redirectConfig } from "@/helpers/redirect-config";
import MovieList from "./movie-list";

const per_page = 10;
export default function MovieContainer() {
  const [page, setPage] = useState<number>(1);
  // const debounceDelay = useDebounce(300);

  const {
    data: movies,
    isError,
    isLoading,
  } = useMovies(per_page, page, "showing", "release_date");

  console.log(movies);

  if (isError) toast.error("Đã có lỗi xảy ra khi tải danh sách phim.");

  const lastPage = movies?.data.pagination.last_page || 1;

  return (
    <div>{isLoading ? <Spinner /> : <MovieList data={movies?.data} />}</div>
  );
}
