"use client";

import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthUser, useLogout } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { storage } from "@/lib/storage";
import { toast } from "sonner";
import { routes } from "@/constants/site-config";

export default function UserDropdown() {
  const user = useAuthUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: logoutMutation, isPending } = useLogout({
    onSuccess: () => {
      storage.removeItem("auth_token");
      storage.removeItem("user");

      // Clear tất cả cache
      queryClient.clear();

      toast.success("Đăng xuất thành công!");

      router.push(routes.login);
    },

    onError: (err) => {
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    },
  });

  const onLogout = () => {
    logoutMutation();
  };

  const goToProfile = () => {
    router.push(routes.profile);
  }

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || ""} alt={user.fullname} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user.fullname)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullname}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={goToProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>Hồ sơ của tôi</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} disabled={isPending}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isPending ? "Đang đăng xuất..." : "Đăng xuất"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
