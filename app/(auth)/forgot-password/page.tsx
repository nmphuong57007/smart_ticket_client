import ForgotPasswordContainer from "@/modules/Auth/forgot-password/forgot-password-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartTicket - Quên mật khẩu",
  description: "Đặt lại mật khẩu tài khoản SmartTicket của bạn",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordContainer />;
}
