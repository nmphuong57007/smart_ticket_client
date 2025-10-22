"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ComboCard from "@/modules/Combos/combo-card";
import { fetchCombos } from "@/services/combo.service";
import { Combo } from "@/types/combo";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Search,
  Filter,
  Loader2,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

interface ComboPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

const ComboContainer: React.FC = () => {
  const [allCombos, setAllCombos] = useState<Combo[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [pagination, setPagination] = useState<ComboPagination>({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
    from: 0,
    to: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("q") || "";
  const minPrice = searchParams.get("min_price") || "";
  const maxPrice = searchParams.get("max_price") || "";

  const [searchInput, setSearchInput] = useState(searchQuery);
  const [minPriceInput, setMinPriceInput] = useState(minPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);
  const [selectedPerPage, setSelectedPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  const fetchComboData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchCombos();
      setAllCombos(response);
    } catch (err) {
      setError("Không thể tải danh sách combo. Vui lòng thử lại sau.");
      console.error("Error fetching combos:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setFilterLoading(true);

    let filtered = [...allCombos];

    if (searchQuery) {
      filtered = filtered.filter(
        (combo) =>
          combo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          combo.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        filtered = filtered.filter((combo) => combo.price >= min);
      }
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter((combo) => combo.price <= max);
      }
    }

    const total = filtered.length;
    const lastPage = Math.ceil(total / selectedPerPage);
    const from = (currentPage - 1) * selectedPerPage + 1;
    const to = Math.min(currentPage * selectedPerPage, total);

    const paginatedCombos = filtered.slice(
      (currentPage - 1) * selectedPerPage,
      currentPage * selectedPerPage
    );

    setCombos(paginatedCombos);
    setPagination({
      current_page: currentPage,
      last_page: lastPage,
      per_page: selectedPerPage,
      total,
      from,
      to,
    });

    setFilterLoading(false);
  };

  useEffect(() => {
    fetchComboData();
  }, []);

  useEffect(() => {
    if (allCombos.length > 0) {
      applyFilters();
    }
  }, [
    allCombos,
    currentPage,
    searchQuery,
    minPrice,
    maxPrice,
    selectedPerPage,
  ]);

  const updateURLParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (Object.keys(newParams).some((key) => key !== "page")) {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  const handleSearch = () => {
    updateURLParams({
      q: searchInput,
      min_price: minPriceInput,
      max_price: maxPriceInput,
      per_page: selectedPerPage.toString(),
    });
  };

  const handleClear = () => {
    setSearchInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setSelectedPerPage(12);
    updateURLParams({
      q: "",
      min_price: "",
      max_price: "",
      per_page: "12",
    });
  };

  const handlePageChange = (page: number) => {
    updateURLParams({ page: page.toString() });
  };

  const generatePaginationItems = () => {
    const items = [];
    const { current_page, last_page } = pagination;

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

    const showPages = 5;
    let startPage = Math.max(1, current_page - Math.floor(showPages / 2));
    let endPage = Math.min(last_page, startPage + showPages - 1);

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
        <Button onClick={fetchComboData}>Thử lại</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Danh sách combo</h1>
        <p className="text-muted-foreground mt-2">
          Khám phá những combo hấp dẫn nhất hiện tại
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium">Tìm kiếm</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm combo..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  disabled={filterLoading}
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Giá từ</Label>
              <Input
                type="number"
                placeholder="Giá tối thiểu..."
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                className="mt-1"
                disabled={filterLoading}
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Giá đến</Label>
              <Input
                type="number"
                placeholder="Giá tối đa..."
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                className="mt-1"
                disabled={filterLoading}
              />
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
          {pagination.total} combo
        </div>
      )}

      {/* Combos grid */}
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
        ) : combos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {combos.map((combo) => (
              <ComboCard
                key={combo.id}
                name={combo.name}
                price={combo.price}
                description={combo.description}
                image={combo.image}
                stock={combo.stock}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Không tìm thấy combo nào phù hợp với điều kiện tìm kiếm
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
};

export default ComboContainer;
