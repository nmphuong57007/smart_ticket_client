import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeToken } from "@/helpers/has-token";

type UserType = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address: null;
  gender: null;
  avatar: string;
  role: string;
  points: number;
  status: string;
  created_at: string;
  updated_at: string;
};

interface UserDropdownProps {
  profile?: UserType;
  isLoading?: boolean;
}

import { useProfile } from "@/api/hooks/use-profile";
import { redirectConfig } from "@/helpers/redirect-config";
import { useLogout } from "@/api/hooks/use-logout";

export default function UserDropdown({
  profile: profileProp,
  isLoading: isLoadingProp,
}: UserDropdownProps = {}) {
  const router = useRouter();

  const { data: profileData, isLoading: loading } = useProfile();

  const { mutate: logout } = useLogout();

  const profile = profileProp ?? profileData?.data.user;
  const isLoading = isLoadingProp ?? loading;

  const initials = profile?.fullname
    ? profile.fullname.charAt(0).toUpperCase()
    : "U";

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        removeToken();
        router.push(redirectConfig.login);
        toast.success("Đăng xuất thành công");
      },

      onError: () => {
        removeToken();
        router.push(redirectConfig.login);
        toast.error("Đăng xuất thất bại phía máy chủ");
      },
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={isLoading ? undefined : profile?.avatar || ""} />
          <AvatarFallback>
            {isLoading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : (
              initials
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar>
            <AvatarImage src={profile?.avatar || ""} />
            <AvatarFallback>
              {isLoading ? (
                <Skeleton className="h-10 w-10 rounded-full" />
              ) : (
                initials
              )}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col leading-none">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-36 mb-1" />
                <Skeleton className="h-3 w-48" />
              </>
            ) : (
              <>
                <span className="font-medium">
                  {profile?.fullname || "Người dùng"}
                </span>
                {profile?.email && (
                  <span className="text-sm text-muted-foreground">
                    {profile.email}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(redirectConfig.profile)}
          className="cursor-pointer"
        >
          Chỉnh sửa thông tin tài khoản
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(redirectConfig.bookingHistory)}
          className="cursor-pointer"
        >
          Đơn vé đã đặt
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => handleLogout()}
          className="cursor-pointer"
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
