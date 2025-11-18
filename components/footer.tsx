"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Clapperboard,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10">
        {/* 5 cột: Thương hiệu + 4 cột liên kết (đã điều chỉnh cho app phim) */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Thương hiệu + giới thiệu */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Clapperboard className="h-6 w-6" />
              <span className="font-bold text-xl">Smart Ticket</span>
            </div>

            <p className="text-sm text-muted-foreground leading-6">
              Ứng dụng đặt vé xem phim — duyệt lịch chiếu, chọn ghế và thanh
              toán nhanh chóng. Theo dõi phim mới, rạp gần bạn và ưu đãi ăn
              uống.
            </p>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild aria-label="Facebook">
                <Link href="#">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Instagram"
              >
                <Link href="#">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild aria-label="Twitter">
                <Link href="#">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild aria-label="Github">
                <Link
                  href="https://github.com/nmphuong57007/smart_ticket_client"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Ứng dụng */}
          <div className="space-y-3">
            <h4 className="font-semibold">Ứng dụng</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/movie-showing" className="hover:underline">
                  Phim đang chiếu
                </Link>
              </li>
              <li>
                <Link href="/upcoming-movies" className="hover:underline">
                  Phim sắp chiếu
                </Link>
              </li>
              <li>
                <Link href="/cinemas" className="hover:underline">
                  Rạp
                </Link>
              </li>
              <li>
                <Link href="/food-and-drinks" className="hover:underline">
                  Đồ ăn & đồ uống
                </Link>
              </li>
            </ul>
          </div>

          {/* Tài khoản */}
          <div className="space-y-3">
            <h4 className="font-semibold">Tài khoản</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="hover:underline">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:underline">
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:underline">
                  Hồ sơ của tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="space-y-3">
            <h4 className="font-semibold">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Liên hệ hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="space-y-3">
            <h4 className="font-semibold">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <Link
                  href="mailto:support@smartticket.com"
                  className="hover:underline"
                >
                  support@smartticket.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <Link href="tel:+842412345678" className="hover:underline">
                  +84 24 1234 5678
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Thanh dưới cùng */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Smart Ticket. Đã đăng ký bản quyền.
          </span>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline">
              Điều khoản
            </Link>
            <Link href="#" className="hover:underline">
              Quyền riêng tư
            </Link>
            <Link href="#" className="hover:underline">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
