import { api } from "@/lib/axios-intance";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

export const authApi = {
  // Đăng nhập
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return api.post("/auth/login", data);
  },

  // Đăng xuất
  logout: async (): Promise<{ success: boolean; message: string }> => {
    return api.post("/auth/logout");
  },

  // Lấy thông tin user hiện tại
  me: async () => {
    return api.get("/auth/profile");
  },

  // Đăng ký
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return api.post("/auth/register", data);
  },

  // Quên mật khẩu
  forgotPassword: async (email: string) => {
    return api.post("/auth/forgot-password", { email });
  },

  // Reset mật khẩu
  resetPassword: async (data: {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    return api.post("/auth/reset-password", data);
  },
};
