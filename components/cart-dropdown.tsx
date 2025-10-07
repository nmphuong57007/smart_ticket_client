"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { routes } from "../constants/site-config";

// Mock data cho giỏ hàng
interface CartItem {
  id: string;
  movieTitle: string;
  cinema: string;
  showtime: string;
  seats: string[];
  price: number;
  quantity: number;
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    movieTitle: "Avengers: Endgame",
    cinema: "SmartTicket Indochina Plaza",
    showtime: "19:30 - 08/10/2025",
    seats: ["A5", "A6"],
    price: 90000,
    quantity: 2,
  },
  {
    id: "2",
    movieTitle: "Spider-Man: No Way Home",
    cinema: "SmartTicket Phạm Ngọc Thạch",
    showtime: "21:00 - 08/10/2025",
    seats: ["D3"],
    price: 85000,
    quantity: 1,
  },
];

export default function CartDropdown() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Đóng dropdown khi chuyển trang
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleIncreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 max-h-[600px] overflow-y-auto"
      >
        <DropdownMenuLabel className="text-lg font-bold">
          Giỏ hàng ({totalItems} vé)
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {cartItems.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-medium">
              Giỏ hàng của bạn đang trống
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Hãy chọn phim và đặt vé ngay!
            </p>
          </div>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-1">
                        {item.movieTitle}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.cinema}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.showtime}
                      </p>
                      <p className="text-xs text-primary font-medium mt-1">
                        Ghế: {item.seats.join(", ")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleDecreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm font-bold text-primary">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <DropdownMenuSeparator />

            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Tổng cộng:</span>
                <span className="text-lg font-bold text-primary">
                  {totalAmount.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <Button className="w-full font-semibold" size="lg" asChild>
                <Link href={routes.checkout} onClick={() => setIsOpen(false)}>
                  Thanh toán
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full font-semibold"
                size="lg"
                asChild
              >
                <Link href={routes.cart} onClick={() => setIsOpen(false)}>
                  Xem giỏ hàng
                </Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
