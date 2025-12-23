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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function ProfileContainer() {
  const { data, isLoading } = useProfile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = data?.data?.user;

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* LEFT - TABS */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="profile">
                Thông tin tài khoản
              </TabsTrigger>
              <TabsTrigger value="password">
                Đổi mật khẩu
              </TabsTrigger>
            </TabsList>

            {/* TAB: PROFILE */}
            <TabsContent value="profile">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="border-b">
                  <CardTitle className="text-xl">
                    Thông tin tài khoản
                  </CardTitle>
                  <CardDescription>
                    Quản lý thông tin cá nhân của bạn
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  <FormProfile />
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: PASSWORD */}
            <TabsContent value="password">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader className="border-b">
                  <CardTitle className="text-xl">
                    Đổi mật khẩu
                  </CardTitle>
                  <CardDescription>
                    Thay đổi mật khẩu để bảo mật tài khoản
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                  <FormChangePassword />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* RIGHT - PROFILE SUMMARY */}
        <div>
          <Card className="sticky top-24 rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-5">
                <Avatar className="h-24 w-24 border">
                  {user?.avatar ? (
                    <AvatarImage
                      src={user.avatar}
                      alt={user.fullname ?? "avatar"}
                    />
                  ) : (
                    <AvatarFallback className="text-xl font-semibold">
                      {(user?.fullname || "").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="text-center space-y-1">
                  <div className="text-lg font-semibold">
                    {user?.fullname}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {user?.email}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {user?.role && (
                    <Badge variant="outline" className="capitalize">
                      {user.role}
                    </Badge>
                  )}
                  {user?.status && (
                    <Badge variant="secondary" className="capitalize">
                      {user.status}
                    </Badge>
                  )}
                </div>

                <div className="w-full text-sm space-y-3 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạo</span>
                    <span>
                      {user?.created_at
                        ? formatDate(user.created_at)
                        : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Cập nhật
                    </span>
                    <span>
                      {user?.updated_at
                        ? formatDate(user.updated_at)
                        : "-"}
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
    return new Date(value).toLocaleString("vi-VN");
  } catch {
    return String(value);
  }
}
