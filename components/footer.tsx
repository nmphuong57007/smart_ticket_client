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
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10">
        {/* 5 cột: Thương hiệu + 4 cột liên kết */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Thương hiệu + giới thiệu */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Clapperboard className="h-6 w-6" />
              <span className="font-bold text-xl">Smart Ticket</span>
            </div>

            <p className="text-sm text-muted-foreground leading-6">
              Xây dựng những trải nghiệm đặt vé đẹp mắt và hiệu quả với các công
              nghệ hiện đại. Chúng tôi giúp startup và doanh nghiệp tạo dựng
              hiện diện số.
            </p>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild aria-label="Facebook">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Instagram"
              >
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild aria-label="Twitter">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild aria-label="Github">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Về chúng tôi */}
          <div className="space-y-3">
            <h4 className="font-semibold">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Lịch sử công ty
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Đội ngũ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Sổ tay nhân viên
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Dịch vụ */}
          <div className="space-y-3">
            <h4 className="font-semibold">Dịch vụ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Phát triển Web
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Thiết kế Web
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Quảng cáo Google
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên kết hữu ích */}
          <div className="space-y-3">
            <h4 className="font-semibold">Liên kết hữu ích</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Hỗ trợ
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Link href="#" className="hover:underline">
                  Trò chuyện trực tuyến
                </Link>
                <Badge variant="secondary" className="px-1 py-0 text-[10px]">
                  •
                </Badge>
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
                  href="mailto:hello@smartticket.com"
                  className="hover:underline"
                >
                  hello@smartticket.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <Link href="tel:+918637373116" className="hover:underline">
                  +91 8637373116
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Thành phố Hà Nội, Việt Nam</span>
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
