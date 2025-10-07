import RegisterContainer from "@/modules/Auth/register/register-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartTicket - Đăng ký",
  description: "Đăng ký tài khoản SmartTicket để đặt vé xem phim trực tuyến",
};

export default function RegisterPage() {
  return <RegisterContainer />;
}
