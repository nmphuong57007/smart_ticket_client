import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { storage } from "./storage";

// Tạo axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor - thêm token vào mỗi request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getItem("auth_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - xử lý response và errors
api.interceptors.response.use(
  (response) => {
    // Trả về data trực tiếp từ response
    return response.data;
  },
  (error: AxiosError) => {
    // Xử lý các loại lỗi khác nhau
    if (error.response) {
      // Server trả về response với status code không phải 2xx
      const status = error.response.status;

      switch (status) {
        case 401:
          // Unauthorized - xóa token và redirect về login
          storage.removeItem("auth_token");
          storage.removeItem("user");
          //   window.location.href = "/login";
          break;

        case 403:
          // Forbidden
          console.error("Bạn không có quyền truy cập");
          break;

        case 404:
          console.error("Không tìm thấy tài nguyên");
          break;

        case 422:
          // Validation error
          console.error("Dữ liệu không hợp lệ");
          break;

        case 500:
          console.error("Lỗi máy chủ");
          break;

        default:
          console.error("Có lỗi xảy ra");
      }
    } else if (error.request) {
      console.error("Không thể kết nối đến máy chủ");
    } else {
      console.error("Lỗi:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
