"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { useContentDetail } from "@/api/hooks/use-content-detail";
import { Skeleton } from "@/components/ui/skeleton";
import type { ContentDetailRes } from "@/api/interfaces/content-interface";

export default function ContentContainer() {
  const { content, isLoading, isError } = useContentDetail();

  const MainWrapper = ({ children }: { children: React.ReactNode }) => (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <section className="mx-auto w-full max-w-[1120px] px-4 md:px-0 py-10 md:py-12">
        {children}
      </section>
    </main>
  );

  // LOADING
  if (isLoading) {
    return (
      <MainWrapper>
        <SectionSkeleton title="Khuyến mãi mới" />
        <div className="mt-12">
          <SectionSkeleton title="Tin mới" />
        </div>
      </MainWrapper>
    );
  }

  // ERROR
  if (isError) {
    return (
      <MainWrapper>
        <p className="text-center text-sm text-red-500">
          Không thể tải dữ liệu tin tức. Vui lòng thử lại sau.
        </p>
      </MainWrapper>
    );
  }

  // DATA (fallback mảng rỗng để tránh crash)
  const items = (content?.items ?? []) as ContentDetailRes["data"]["items"];

  const promotionItems = items.filter(
    (item) => item.type === "promotion" || item.type === "banner"
  );
  const sideNewsItems = items.filter(
    (item) => item.type === "news" || item.type === "blog"
  );

  return (
    <MainWrapper>
      <PromotionSection items={promotionItems} />

      <div className="mt-14">
        <SideNewsSection items={sideNewsItems} />
      </div>
    </MainWrapper>
  );
}

/* ========= TYPES ========= */

type Item = ContentDetailRes["data"]["items"][number];

/* ========= HELPERS ========= */

function formatApplyRange(from?: string, to?: string) {
  if (!from || !to) return "";
  const start = moment(from).format("DD/MM/YYYY");
  const end = moment(to).format("DD/MM/YYYY");
  return `${start} – ${end}`;
}

/* ========= KHUYẾN MÃI MỚI ========= */

function PromotionSection({ items }: { items: Item[] }) {
  if (!items.length) return null;

  const [first, ...rest] = items;

  return (
    <section>
      <h1 className="mb-5 text-2xl font-semibold text-black dark:text-white">
        Khuyến mãi mới
      </h1>

      {/* HÀNG TRÊN: hero bên trái + 2 tin nhỏ bên phải (giống Tin mới) */}
      <div className="grid gap-6 md:grid-cols-3">
        {first && <HeroPromoCard item={first} />}

        <div className="space-y-6">
          {rest.slice(0, 2).map((item) => (
            <SmallSideNews key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Các tin khuyến mãi còn lại phía dưới */}
      {rest.length > 2 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {rest.slice(2).map((item) => (
            <SmallSideNews key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

/* --- Box to bên trái: hero lớn, bo góc, có ngày áp dụng + thanh cam --- */

function HeroPromoCard({ item }: { item: Item }) {
  const applyRange = formatApplyRange(item.published_at, item.unpublished_at);

  return (
    <article className="md:col-span-2">
      <Link href={`/content/${item.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-md dark:shadow-lg transition-all duration-300 group-hover:shadow-xl">
          {/* Ảnh tỉ lệ 16:9 giống web Beta */}
          <div className="relative aspect-[16/9] w-full">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-500 dark:text-gray-300">
                Không có hình ảnh
              </div>
            )}

            {/* Dòng thời gian áp dụng, nằm sát trên thanh cam */}
            {applyRange && (
              <div className="absolute inset-x-0 bottom-[44px] px-5 py-1">
                <p className="text-[13px] font-semibold italic text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                  Chương trình áp dụng từ {applyRange}
                </p>
              </div>
            )}

            {/* Thanh cam + title trắng */}
            <div className="absolute inset-x-0 bottom-0 bg-[#f68b2c] px-5 py-3">
              <h3 className="line-clamp-1 text-sm font-bold uppercase text-white">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ========= TIN MỚI (TIN BÊN LỀ) ========= */

function SideNewsSection({ items }: { items: Item[] }) {
  if (!items.length) return null;

  const [first, ...rest] = items;

  return (
    <section>
      <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white">
        Tin mới
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Tin lớn bên trái */}
        {first && (
          <article className="md:col-span-2">
            <Link href={`/content/${first.slug}`} className="group block">
              <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-md dark:shadow-lg transition-all duration-300 group-hover:shadow-xl">
                <div className="relative aspect-[16/9] w-full">
                  {first.image ? (
                    <Image
                      src={first.image}
                      alt={first.title}
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-500 dark:text-gray-300">
                      Không có hình ảnh
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-[#f68b2c] px-5 py-3">
                    <h3 className="line-clamp-2 text-sm font-bold uppercase leading-snug text-white">
                      {first.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* 2 tin nhỏ bên phải */}
        <div className="space-y-6">
          {rest.slice(0, 2).map((item) => (
            <SmallSideNews key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Các tin nhỏ còn lại phía dưới */}
      {rest.length > 2 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {rest.slice(2).map((item) => (
            <SmallSideNews key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function SmallSideNews({ item }: { item: Item }) {
  const publishedDate = item.published_at
    ? moment(item.published_at).format("DD/MM/YYYY")
    : "";

  return (
    <article>
      <Link href={`/content/${item.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-md dark:shadow-lg transition-all duration-300 group-hover:shadow-lg">
          <div className="relative h-28 w-full">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-500 dark:text-gray-300">
                Không có hình ảnh
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-[11px] font-semibold leading-snug text-gray-900 dark:text-gray-100 group-hover:text-orange-500">
          {item.title}
        </p>
        {publishedDate && (
          <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
            {publishedDate}
          </p>
        )}
      </Link>
    </article>
  );
}

/* ========= SKELETON ========= */

function SectionSkeleton({ title }: { title: string }) {
  return (
    <section>
      <h1 className="mb-5 text-2xl font-semibold text-black dark:text-white">
        {title}
      </h1>

      {/* hero + 2 box phải */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Skeleton className="h-[220px] w-full rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[140px] w-full rounded-2xl" />
          <Skeleton className="h-[140px] w-full rounded-2xl" />
        </div>
      </div>

      {/* hàng dưới */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-2xl" />
        ))}
      </div>
    </section>
  );
}
