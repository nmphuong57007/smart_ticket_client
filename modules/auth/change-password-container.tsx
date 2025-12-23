"use client";

import FormChangePassword from "@/modules/profile/form-change-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChangePasswordContainer() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Đổi mật khẩu</CardTitle>
        <CardDescription>
          Thay đổi mật khẩu để bảo mật tài khoản
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormChangePassword />
      </CardContent>
    </Card>
  );
}