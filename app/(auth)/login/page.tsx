import LoginContainer from "@/modules/Auth/login/login-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartTicket - Đăng nhập",
  description: "Đăng nhập vào tài khoản SmartTicket để đặt vé xem phim trực tuyến",
};

export default function LoginPage() {
  return <LoginContainer />;
}
