"use client";

import { Suspense } from "react";
import FormResetPassword from "./form-reset-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function ResetPasswordContainer() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Đặt lại mật khẩu</CardTitle>
        <CardDescription>
          Nhập mật khẩu mới của bạn bên dưới
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<div className="flex justify-center py-4"><Spinner /></div>}>
          <FormResetPassword />
        </Suspense>
      </CardContent>
    </Card>
  );
}
