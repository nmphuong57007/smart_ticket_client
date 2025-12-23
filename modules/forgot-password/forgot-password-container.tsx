"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormForgotPassword from "./form-forgot-password";

export default function ForgotPasswordContainer() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quên mật khẩu?</CardTitle>
        <CardDescription>
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormForgotPassword />
      </CardContent>
    </Card>
  );
}