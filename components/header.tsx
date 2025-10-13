"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModeToggle } from "./mode-toggle";
import CartDropdown from "./cart-dropdown";
import UserDropdown from "./user-dropdown";
import ClientOnly from "./client-only";
import { routes } from "../constants/site-config";
import { useIsAuthenticated } from "@/hooks/use-auth";

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
      />
      {/* <span className="text-2xl font-bold text-primary hidden sm:block">
        Smart Ticket
      </span> */}
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
  const pathname = usePathname();
  const isAuthenticated = useIsAuthenticated();

  // Đóng mobile menu khi chuyển trang
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
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
                className="text-foreground hover:text-primary font-semibold text-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm phim, rạp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 rounded-full bg-muted"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <CartDropdown />

            <ModeToggle />

            <ClientOnly
              fallback={
                <div className="flex items-center space-x-3 ml-4">
                  <Button
                    variant="ghost"
                    size="default"
                    className="text-base font-medium"
                    asChild
                  >
                    <Link href={routes.login}>Đăng nhập</Link>
                  </Button>
                  <Button size="default" className="text-base font-medium" asChild>
                    <Link href={routes.register}>Đăng ký</Link>
                  </Button>
                </div>
              }
            >
              {isAuthenticated ? (
                <div className="flex items-center space-x-3 ml-4">
                  <UserDropdown />
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <Button
                    variant="ghost"
                    size="default"
                    className="text-base font-medium"
                    asChild
                  >
                    <Link href={routes.login}>Đăng nhập</Link>
                  </Button>
                  <Button size="default" className="text-base font-medium" asChild>
                    <Link href={routes.register}>Đăng ký</Link>
                  </Button>
                </div>
              )}
            </ClientOnly>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <CartDropdown />
            <ModeToggle />
            <ClientOnly>
              {isAuthenticated && <UserDropdown />}
            </ClientOnly>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm phim, rạp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 rounded-full"
                />
              </div>

              {/* Mobile Navigation Links */}
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-lg font-semibold text-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Actions */}
              <ClientOnly
                fallback={
                  <div className="pt-4 pb-2 border-t border-border mt-2">
                    <div className="flex space-x-3 px-3">
                      <Button
                        variant="outline"
                        size="default"
                        className="flex-1 text-base font-medium"
                        asChild
                      >
                        <Link href={routes.login}>Đăng nhập</Link>
                      </Button>
                      <Button
                        size="default"
                        className="flex-1 text-base font-medium"
                        asChild
                      >
                        <Link href={routes.register}>Đăng ký</Link>
                      </Button>
                    </div>
                  </div>
                }
              >
                {!isAuthenticated && (
                  <div className="pt-4 pb-2 border-t border-border mt-2">
                    <div className="flex space-x-3 px-3">
                      <Button
                        variant="outline"
                        size="default"
                        className="flex-1 text-base font-medium"
                        asChild
                      >
                        <Link href={routes.login}>Đăng nhập</Link>
                      </Button>
                      <Button
                        size="default"
                        className="flex-1 text-base font-medium"
                        asChild
                      >
                        <Link href={routes.register}>Đăng ký</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </ClientOnly>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
