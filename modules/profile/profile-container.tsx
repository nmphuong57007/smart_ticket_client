"use client";

import FormProfile from "./form-profile";
import FormChangePassword from "./form-change-password";
import { useProfile } from "@/api/hooks/use-profile";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfileContainer() {
  const { data, isLoading } = useProfile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = data?.data?.user;

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3 items-start">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Thông tin tài khoản</CardTitle>
                <CardDescription>
                  Quản lý thông tin cá nhân của bạn
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <FormProfile />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <div>
                <CardTitle>Đổi mật khẩu</CardTitle>
                <CardDescription>
                  Thay đổi mật khẩu để bảo mật tài khoản
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <FormChangePassword />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardContent>
              <div className="flex flex-col items-center gap-4 rounded-lg p-4">
                <Avatar className="size-20">
                  {user?.avatar ? (
                    <AvatarImage
                      src={user.avatar}
                      alt={user.fullname ?? "avatar"}
                    />
                  ) : (
                    <AvatarFallback>
                      {(user?.fullname || "").slice(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="text-center">
                  <div className="font-semibold">{user?.fullname}</div>
                  <div className="text-sm text-muted-foreground">
                    {user?.email}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {user?.role && <Badge variant="outline">{user.role}</Badge>}
                  {user?.status && (
                    <Badge variant="secondary">{user.status}</Badge>
                  )}
                </div>

                <div className="w-full text-sm">
                  {/* <div className="flex justify-between">
                    <span className="text-muted-foreground">Points</span>
                    <span>{user?.points ?? 0}</span>
                  </div> */}

                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Tạo</span>
                    <span>
                      {user?.created_at ? formatDate(user.created_at) : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Cập nhật</span>
                    <span>
                      {user?.updated_at ? formatDate(user.updated_at) : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  try {
    const d = new Date(value);
    // Use explicit locale to avoid server/client locale mismatches
    return d.toLocaleString("vi-VN");
  } catch {
    return String(value);
  }
}
