"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { routes } from "../constants/site-config";

function LogoSmartTicket() {
  return (
    <Link
      href={routes.home}
      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
    >
      <Image
        src="/smart_ticket.svg"
        alt="Smart Ticket Logo"
        width={60}
        height={60}
        className="w-[60px] h-[60px]"
      />
      <span className="text-2xl font-bold text-primary hidden sm:block">
        Smart Ticket
      </span>
    </Link>
  );
}

const navigationItems = [
  { label: "Trang chủ", href: routes.home },
  { label: "Phim", href: routes.movies },
  { label: "Rạp", href: routes.cinemas },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <LogoSmartTicket />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary font-semibold text-lg transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Tìm kiếm phim, rạp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full rounded-full border-2 border-border focus:border-ring focus:ring-2 focus:ring-ring/20 bg-muted hover:bg-background transition-all duration-200 text-base"
                />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="ghost" size="default" className="relative p-3">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  0
                </span>
              </Button>

              <div className="flex items-center space-x-3 ml-4">
                <Button
                  variant="ghost"
                  size="default"
                  className="text-base font-medium"
                  asChild
                >
                  <Link href={routes.login}>Đăng nhập</Link>
                </Button>
                <Button
                  size="default"
                  className="px-6 py-2 text-base font-medium"
                  asChild
                >
                  <Link href={routes.register}>Đăng ký</Link>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button variant="ghost" size="default" className="relative p-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>
              <Button
                variant="ghost"
                size="default"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="p-2"
              >
                {isMenuOpen ? (
                  <X className="h-7 w-7" />
                ) : (
                  <Menu className="h-7 w-7" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-border bg-background shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Tìm kiếm phim, rạp..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 w-full rounded-full border-2 border-border focus:border-ring focus:ring-2 focus:ring-ring/20 text-base"
                  />
                </div>

                {/* Mobile Navigation Links */}
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-lg font-semibold text-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Actions */}
                <div className="pt-4 pb-2 border-t border-border mt-2">
                  <div className="flex space-x-3 px-3">
                    <Button
                      variant="outline"
                      size="default"
                      className="flex-1 py-3 text-base font-medium"
                      asChild
                    >
                      <Link href={routes.login}>Đăng nhập</Link>
                    </Button>
                    <Button
                      size="default"
                      className="flex-1 py-3 text-base font-medium"
                      asChild
                    >
                      <Link href={routes.register}>Đăng ký</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    </header>
  );
}
