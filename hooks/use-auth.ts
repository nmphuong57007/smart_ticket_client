import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/auth.service";
import { storage } from "@/lib/storage";
import type { LoginRequest, User, RegisterRequest } from "@/types/auth";
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
export function useLogout(options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
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

// Utility function để check xem user đã đăng nhập chưa
export function useIsAuthenticated(): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Chỉ check authentication sau khi hydration hoàn tất
    const token = storage.getItem("auth_token");
    setIsAuthenticated(!!token);
    setIsHydrated(true);
  }, []);

  // Trả về false trong lúc đang hydrate để tránh mismatch
  if (!isHydrated) {
    return false;
  }

  return isAuthenticated;
}

// Utility function để lấy user từ storage
export function useAuthUser(): User | null {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Chỉ lấy user sau khi hydration hoàn tất
    const userString = storage.getItem("user");
    if (userString) {
      try {
        setUser(JSON.parse(userString) as User);
      } catch {
        setUser(null);
      }
    }
    setIsHydrated(true);
  }, []);

  // Trả về null trong lúc đang hydrate để tránh mismatch
  if (!isHydrated) {
    return null;
  }

  return user;
}
