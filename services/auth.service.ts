import { api } from "@/lib/axios-intance";

export const authApi = {
  // Đăng nhập
  login: async (data: any): Promise<any> => {
    return api.post("/auth/login", data);
  },

  // Đăng xuất
  logout: async (): Promise<any> => {
    return api.post("/auth/logout");
  },

  // Lấy thông tin user hiện tại
  me: async () => {
    return api.get("/auth/profile");
  },

  // Đăng ký
  register: async (data: any): Promise<any> => {
    return api.post("/auth/register", data);
  },

  // Quên mật khẩu
  forgotPassword: async (email: any) => {
    return api.post("/auth/forgot-password", { email });
  },

  // Reset mật khẩu
  resetPassword: async (data: any) => {
    return api.post("/auth/reset-password", data);
  },
};
