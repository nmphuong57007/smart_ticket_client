import Image from "next/image";
import Link from "next/link";
import { Facebook, Youtube, Instagram, Phone, Mail } from "lucide-react";

import { routes } from "../constants/site-config";

const accountLinks = [
  { label: "Đăng nhập", href: routes.login },
  { label: "Đăng ký", href: routes.register },
];

const smartTicketLinks = [
  { label: "Giới thiệu", href: routes.about },
  { label: "Liên hệ", href: routes.contact },
  { label: "Tuyển dụng", href: routes.careers },
];

const movieLinks = [
  { label: "Phim đang chiếu", href: routes.moviesNowShowing },
  { label: "Phim sắp chiếu", href: routes.moviesComingSoon },
  { label: "Suất chiếu đặc biệt", href: routes.moviesSpecial },
];

const cinemaLocations = [
  "SmartTicket Indochina Plaza",
  "SmartTicket Phạm Ngọc Thạch",
  "SmartTicket Smart City",
  "SmartTicket Hai Bà Trưng",
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com/smartticket",
    label: "Facebook",
  },
  { icon: Youtube, href: "https://youtube.com/smartticket", label: "YouTube" },
  {
    icon: Instagram,
    href: "https://instagram.com/smartticket",
    label: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo và Social Media */}
          <div className="space-y-8">
            <div className="flex items-center space-x-5">
              <Image
                src="/smart_ticket.svg"
                alt="Smart Ticket Logo"
                width={90}
                height={90}
              />
              <div>
                <h3 className="text-3xl font-bold text-primary leading-tight">
                  SMART
                </h3>
                <h3 className="text-3xl font-bold text-primary leading-tight">
                  TICKET
                </h3>
              </div>
            </div>

            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Tài khoản */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-primary">TÀI KHOẢN</h4>
            <ul className="space-y-4">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Smart Ticket */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-primary">
              SMART TICKET
            </h4>
            <ul className="space-y-4">
              {smartTicketLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Xem phim */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-primary">XEM PHIM</h4>
            <ul className="space-y-4">
              {movieLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hệ thống rạp */}
        <div className="mt-16 pt-12 border-t border-border">
          <h4 className="text-xl font-bold mb-8 text-primary">HỆ THỐNG RẠP</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-4 text-foreground text-lg">
                Tất cả hệ thống rạp
              </h5>
              <ul className="space-y-3">
                {cinemaLocations.map((location, index) => (
                  <li key={index}>
                    <Link
                      href={`/cinemas/${location
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      {location}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <Link
                href={routes.cinemasSpecialScreenings}
                className="text-foreground hover:text-primary transition-colors font-medium text-lg"
              >
                Suất chiếu đặc biệt
              </Link>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h5 className="font-bold mb-5 text-primary text-xl">LIÊN HỆ</h5>
              <p className="text-foreground mb-4 font-medium">
                CÔNG TY CỔ PHẦN Smart Smart TICKET
              </p>

              <div className="flex items-center space-x-3 mb-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-foreground">
                  Hotline:{" "}
                  <a
                    href="tel:19006368007"
                    className="hover:text-primary font-medium"
                  >
                    1900 636807
                  </a>{" "}
                  /{" "}
                  <a
                    href="tel:18006464220"
                    className="hover:text-primary font-medium"
                  >
                    1800 646420
                  </a>
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-foreground">
                  Email:{" "}
                  <a
                    href="mailto:mkt@ticketcinemas.vn"
                    className="hover:text-primary font-medium"
                  >
                    mkt@ticketcinemas.vn
                  </a>
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-4 lg:items-end">
              <Link
                href={routes.privacyPolicy}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href={routes.faq}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Hỏi đáp
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-muted-foreground font-medium">
            © 2025 SmartTicket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
