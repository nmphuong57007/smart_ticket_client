import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/auth.service";
import { storage } from "@/lib/storage";
import type { LoginRequest, User, RegisterRequest } from "@/types/auth";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/site-config";
import { toast } from "sonner";

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApi.me,
    enabled: !!storage.getItem("auth_token"),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook đăng nhập
export function useLogin(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// Hook đăng xuất
export function useLogout() {
  return useMutation({
    mutationFn: authApi.logout,
  });
}

export function useHandleLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (showToast: boolean = true) => {
    // Xóa token và user info
    storage.removeItem("auth_token");
    storage.removeItem("user");

    // Clear tất cả cache
    queryClient.clear();

    // Show success toast
    if (showToast) {
      toast.success("Đăng xuất thành công!");
    }

    // Redirect về trang login
    router.push(routes.login);
  };
}

// Hook đăng ký
export function useRegister(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

// Hook quên mật khẩu
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  });
}

// Hook reset mật khẩu
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: {
      token: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => authApi.resetPassword(data),
  });
}

// Utility function để check xem user đã đăng nhập chưa
export function useIsAuthenticated(): boolean {
  const token = storage.getItem("auth_token");
  return !!token;
}

// Utility function để lấy user từ storage
export function useAuthUser(): User | null {
  const userString = storage.getItem("user");
  if (!userString) return null;

  try {
    return JSON.parse(userString) as User;
  } catch {
    return null;
  }
}
