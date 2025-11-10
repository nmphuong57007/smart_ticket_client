"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMovies } from "@/api/hooks/use-movie";
import { Spinner } from "@/components/ui/spinner";
import MovieShowingList from "./movie-showing-list";
import Pagination from "@/components/pagination";
import Search from "@/components/search";

const PER_PAGE = 12;

export default function MovieShowingContainer() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isError, isLoading } = useMovies(
    PER_PAGE,
    page,
    "showing",
    "release_date",
    search
  );

  useEffect(() => {
    if (isError) toast.error("Đã có lỗi xảy ra khi tải danh sách phim.");
  }, [isError]);

  const lastPage = data?.data.pagination.last_page ?? 1;

  return (
    <div className="flex flex-col gap-10">
      <Search
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        loading={isLoading}
      />

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner className="size-8" />
        </div>
      ) : (
        <MovieShowingList
          data={data?.data}
          totalItems={data?.data.pagination.total}
        />
      )}

      <Pagination page={page} totalPages={lastPage} onPageChange={setPage} />
    </div>
  );
}
