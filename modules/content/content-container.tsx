"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { useContentDetail } from "@/api/hooks/use-content-detail";
import { Skeleton } from "@/components/ui/skeleton";
import type { ContentDetailRes } from "@/api/interfaces/content-interface";

/* ========= COMMON ========= */

type Item = ContentDetailRes["data"]["items"][number];

const CARD_BASE =
  "overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-md dark:shadow-lg transition-all duration-300";

const MainWrapper = ({ children }: { children: React.ReactNode }) => (
  <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
    <section className="mx-auto w-full max-w-[1120px] px-4 md:px-0 py-10 md:py-12">
      {children}
    </section>
  </main>
);

const formatApplyRange = (from?: string, to?: string) => {
  if (!from || !to) return "";
  const start = moment(from).format("DD/MM/YYYY");
  const end = moment(to).format("DD/MM/YYYY");
  return `${start} – ${end}`;
};

/* ========= MAIN COMPONENT ========= */

export default function ContentContainer() {
  const { content, isLoading, isError } = useContentDetail();

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

  if (isError) {
    return (
      <MainWrapper>
        <p className="text-center text-sm text-red-500">
          Không thể tải dữ liệu tin tức. Vui lòng thử lại sau.
        </p>
      </MainWrapper>
    );
  }

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

/* ========= KHUYẾN MÃI MỚI ========= */

function PromotionSection({ items }: { items: Item[] }) {
  if (!items.length) return null;

  const [first, ...rest] = items;

  return (
    <section>
      <h1 className="mb-5 text-2xl font-semibold text-black dark:text-white">
        Khuyến mãi mới
      </h1>

      {/* 3 cột, 2 hàng – hero trái span 2 hàng */}
      <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
        {first && <HeroPromoCard item={first} />}

        {rest.slice(0, 2).map((item) => (
          <SmallSideNews key={item.id} item={item} />
        ))}
      </div>

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

function HeroPromoCard({ item }: { item: Item }) {
  const applyRange = formatApplyRange(item.published_at, item.unpublished_at);

  return (
    <article className="md:col-span-2 md:row-span-2 h-full">
      <Link href={`/content/${item.slug}`} className="group block h-full">
        <div className={`${CARD_BASE} h-full group-hover:shadow-xl`}>
          {/* h-full để cao bằng 2 box bên phải, min-h tránh bị thấp quá */}
          <div className="relative w-full h-full min-h-[260px]">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <NoImageFallback />
            )}

            {applyRange && (
              <div className="absolute inset-x-0 bottom-[48px] px-5 py-1">
                <p className="text-[13px] font-semibold italic text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                  Chương trình áp dụng từ {applyRange}
                </p>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-[#f68b2c] px-5 py-3">
              <h3 className="line-clamp-2 text-sm font-bold uppercase text-white">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ========= TIN MỚI ========= */

function SideNewsSection({ items }: { items: Item[] }) {
  if (!items.length) return null;

  const [first, ...rest] = items;

  return (
    <section>
      <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white">
        Tin mới
      </h2>

      {/* giống layout trên: hero span 2 hàng */}
      <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
        {first && <HeroNewsCard item={first} />}

        {rest.slice(0, 2).map((item) => (
          <SmallSideNews key={item.id} item={item} />
        ))}
      </div>

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

function HeroNewsCard({ item }: { item: Item }) {
  return (
    <article className="md:col-span-2 md:row-span-2 h-full">
      <Link href={`/content/${item.slug}`} className="group block h-full">
        <div className={`${CARD_BASE} h-full group-hover:shadow-xl`}>
          <div className="relative w-full h-full min-h-[260px]">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <NoImageFallback />
            )}

            <div className="absolute inset-x-0 bottom-0 bg-[#f68b2c] px-5 py-3">
              <h3 className="line-clamp-2 text-sm font-bold uppercase leading-snug text-white">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ========= CARD NHỎ ========= */

function SmallSideNews({ item }: { item: Item }) {
  const publishedDate = item.published_at
    ? moment(item.published_at).format("DD/MM/YYYY")
    : "";

  return (
    <article>
      <Link href={`/content/${item.slug}`} className="group block">
        <div className={`${CARD_BASE} group-hover:shadow-lg`}>
          {/* Box nhỏ – chiều cao đã thu gọn */}
          <div className="relative w-full h-24 sm:h-28 md:h-32">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <NoImageFallback />
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

function NoImageFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center text-xs text-gray-500 dark:text-gray-300">
      Không có hình ảnh
    </div>
  );
}

/* ========= SKELETON ========= */

function SectionSkeleton({ title }: { title: string }) {
  return (
    <section>
      <h1 className="mb-5 text-2xl font-semibold text-black dark:text-white">
        {title}
      </h1>

      {/* Skeleton theo layout 3 cột, 2 hàng, hero span 2 hàng */}
      <div className="grid gap-6 md:grid-cols-3 md:grid-rows-2">
        <div className="md:col-span-2 md:row-span-2">
          <Skeleton className="h-full min-h-[260px] w-full rounded-2xl" />
        </div>

        <Skeleton className="h-24 sm:h-28 md:h-32 w-full rounded-2xl" />
        <Skeleton className="h-24 sm:h-28 md:h-32 w-full rounded-2xl" />
      </div>

      {/* hàng dưới */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-24 sm:h-28 md:h-32 w-full rounded-2xl"
          />
        ))}
      </div>
    </section>
  );
}
