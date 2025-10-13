"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Thời gian cache mặc định (5 phút)
            staleTime: 1000 * 60 * 5,
            // Thời gian giữ data trong cache khi không có observer (10 phút)
            gcTime: 1000 * 60 * 10,
            // Retry khi có lỗi
            retry: (failureCount, error: any) => {
              // Không retry cho lỗi 401, 403, 404
              if (error?.response?.status === 401 || 
                  error?.response?.status === 403 || 
                  error?.response?.status === 404) {
                return false;
              }
              // Retry tối đa 3 lần cho các lỗi khác
              return failureCount < 3;
            },
            // Không refetch khi window focus
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry cho mutation
            retry: (failureCount, error: any) => {
              // Không retry cho lỗi client (4xx)
              if (error?.response?.status >= 400 && error?.response?.status < 500) {
                return false;
              }
              // Retry tối đa 2 lần cho lỗi server (5xx)
              return failureCount < 2;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}