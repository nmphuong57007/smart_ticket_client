"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Clapperboard,
  Clock,
  UtensilsCrossed,
  LogIn,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { redirectConfig } from "@/helpers/redirect-config";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  { href: redirectConfig.home, label: "Trang chủ", icon: Home },
  { href: redirectConfig.movieShowing, label: "Phim đang chiếu", icon: Clapperboard },
  { href: redirectConfig.upcomingMovies, label: "Phim sắp chiếu", icon: Clock },
  {
    href: redirectConfig.foodAndDrinks,
    label: "Đồ ăn, thức uống",
    icon: UtensilsCrossed,
  },
  { href: redirectConfig.cinemas, label: "Rạp chiếu", icon: MapPin },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href={redirectConfig.home}
          className="font-bold text-xl flex items-center gap-2"
        >
          <Clapperboard className="h-5 w-5" />
          ST
        </Link>

        {/* Navigation Buttons */}
        <nav className="flex items-center gap-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Button
              key={href}
              asChild
              variant={pathname === href ? "secondary" : "ghost"}
              className={cn(
                "flex items-center gap-2 px-3",
                "transition-colors duration-200"
              )}
            >
              <Link href={href}>
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            </Button>
          ))}
        </nav>

        {/* Toggle + Đăng nhập */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button variant="secondary" asChild>
            <Link
              href={redirectConfig.login}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Đăng nhập
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
