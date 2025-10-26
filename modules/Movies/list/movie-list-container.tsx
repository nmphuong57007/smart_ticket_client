"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MovieCard } from "@/modules/Movies/movie-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { movieApi } from "@/services/movie.service";
import type { Movie, MoviePagination, MoviesParams } from "@/types/movie";
import {
  Search,
  Filter,
  Loader2,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import {
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  Pagination,
  PaginationContent,
} from "@/components/ui/pagination";

export function MovieListContainer() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<MoviePagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Lấy params từ URL
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "";
  const genreFilter = searchParams.get("genre") || "";
  const sortBy = searchParams.get("sort_by") || "title";
  const sortOrder = (searchParams.get("sort_order") as "asc" | "desc") || "asc";

  // State cho form filters
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [selectedStatus, setSelectedStatus] = useState(statusFilter);
  const [selectedGenre, setSelectedGenre] = useState(genreFilter);
  const [selectedSortBy, setSelectedSortBy] = useState(sortBy);
  const [selectedSortOrder, setSelectedSortOrder] = useState(sortOrder);
  const [selectedPerPage, setSelectedPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch movies
  const fetchMovies = async (params: MoviesParams, isFilter = false) => {
    try {
      if (isFilter) {
        setFilterLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await movieApi.getMovies(params);

      if (response.success) {
        setMovies(response.data.movies);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || "Có lỗi xảy ra khi tải danh sách phim");
      }
    } catch (err) {
      setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
      console.error("Error fetching movies:", err);
    } finally {
      if (isFilter) {
        setFilterLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  // Effect để fetch data khi params thay đổi
  useEffect(() => {
    const params: MoviesParams = {
      page: currentPage,
      per_page: Number(searchParams.get("per_page")) || 12,
    };

    if (searchQuery) params.search = searchQuery;
    if (statusFilter) params.status = statusFilter as any;
    if (genreFilter) params.genre = genreFilter;
    if (sortBy) params.sort_by = sortBy as any;
    if (sortOrder) params.sort_order = sortOrder;

    // Kiểm tra xem có phải là lần đầu load không
    const isInitialLoad =
      !searchQuery && !statusFilter && !genreFilter && currentPage === 1;
    fetchMovies(params, !isInitialLoad);
  }, [
    currentPage,
    searchQuery,
    statusFilter,
    genreFilter,
    sortBy,
    sortOrder,
    searchParams,
  ]);

  // Update URL params
  const updateURLParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset về trang 1 khi thay đổi filter
    if (Object.keys(newParams).some((key) => key !== "page")) {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  // Handle search
  const handleSearch = () => {
    updateURLParams({
      search: searchInput,
      status: selectedStatus === "all" ? "" : selectedStatus,
      genre: selectedGenre,
      sort_by: selectedSortBy,
      sort_order: selectedSortOrder,
      per_page: selectedPerPage.toString(),
    });
  };

  // Handle clear filters
  const handleClear = () => {
    setSearchInput("");
    setSelectedStatus("");
    setSelectedGenre("");
    setSelectedSortBy("title");
    setSelectedSortOrder("asc");
    setSelectedPerPage(12);
    updateURLParams({
      search: "",
      status: "",
      genre: "",
      sort_by: "title",
      sort_order: "asc",
      per_page: "12",
    });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    updateURLParams({ page: page.toString() });
  };

  // Handle booking
  const handleBooking = (movieId: number) => {
    router.push(`/booking/${movieId}`);
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    if (!pagination) return [];

    const items = [];
    const { current_page, last_page } = pagination;

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(current_page - 1)}
          className={
            current_page <= 1
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    // Page numbers
    const showPages = 5;
    let startPage = Math.max(1, current_page - Math.floor(showPages / 2));
    const endPage = Math.min(last_page, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={current_page === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            onClick={() => handlePageChange(page)}
            isActive={current_page === page}
            className="cursor-pointer"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < last_page) {
      if (endPage < last_page - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={last_page}>
          <PaginationLink
            onClick={() => handlePageChange(last_page)}
            isActive={current_page === last_page}
            className="cursor-pointer"
          >
            {last_page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => handlePageChange(current_page + 1)}
          className={
            current_page >= last_page
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg mb-4">{error}</p>
        <Button
          onClick={() => fetchMovies({ page: currentPage, per_page: 12 })}
        >
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Danh sách phim</h1>
        <p className="text-muted-foreground mt-2">
          Khám phá những bộ phim hot nhất hiện tại
        </p>
      </div>

      {/* Toggle Filters */}
      <div className="flex justify-start">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4"
        >
          {showFilters ? (
            <ChevronUp className="h-4 w-4 mr-2" />
          ) : (
            <ChevronDown className="h-4 w-4 mr-2" />
          )}
          {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-card p-6 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <Label className="text-sm font-medium">Tìm kiếm</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm phim..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  disabled={filterLoading}
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Thể loại</Label>
              <Input
                placeholder="Thể loại..."
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="mt-1"
                disabled={filterLoading}
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Trạng thái</Label>
              <Select
                value={selectedStatus || undefined}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="coming">Sắp chiếu</SelectItem>
                  <SelectItem value="showing">Đang chiếu</SelectItem>
                  <SelectItem value="stopped">Ngừng chiếu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Sắp xếp theo</Label>
              <Select value={selectedSortBy} onValueChange={setSelectedSortBy}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">ID</SelectItem>
                  <SelectItem value="title">Tên phim</SelectItem>
                  <SelectItem value="release_date">Ngày chiếu</SelectItem>
                  <SelectItem value="duration">Thời lượng</SelectItem>
                  <SelectItem value="created_at">Ngày tạo</SelectItem>
                  <SelectItem value="status">Trạng thái</SelectItem>
                  <SelectItem value="genre">Thể loại</SelectItem>
                  <SelectItem value="format">Định dạng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Thứ tự</Label>
              <Select
                value={selectedSortOrder}
                onValueChange={(value) =>
                  setSelectedSortOrder(value as "asc" | "desc")
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Thứ tự" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Tăng dần</SelectItem>
                  <SelectItem value="desc">Giảm dần</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Số bản ghi</Label>
              <Select
                value={selectedPerPage.toString()}
                onValueChange={(value) => setSelectedPerPage(Number(value))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Số bản ghi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-start gap-2 mt-4">
            <Button onClick={handleSearch} disabled={filterLoading}>
              {filterLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Filter className="h-4 w-4 mr-2" />
              )}
              {filterLoading ? "Đang lọc..." : "Lọc"}
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={filterLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Xóa lọc
            </Button>
          </div>
        </div>
      )}

      {/* Results info */}
      {pagination && (
        <div className="text-sm text-muted-foreground">
          Hiển thị {pagination.from}-{pagination.to} trong tổng số{" "}
          {pagination.total} phim
        </div>
      )}

      {/* Movies grid */}
      <div className="relative">
        {filterLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="flex items-center space-x-2 bg-background px-4 py-2 rounded-lg shadow-lg border">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">Đang tải dữ liệu...</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-muted aspect-[3/4] rounded-lg mb-4"></div>
                <div className="bg-muted h-4 rounded mb-2"></div>
                <div className="bg-muted h-3 rounded mb-2"></div>
                <div className="bg-muted h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onBooking={handleBooking}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Không tìm thấy phim nào phù hợp với điều kiện tìm kiếm
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex justify-center mt-8">
          <div
            className={filterLoading ? "pointer-events-none opacity-50" : ""}
          >
            <Pagination>
              <PaginationContent>{generatePaginationItems()}</PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
