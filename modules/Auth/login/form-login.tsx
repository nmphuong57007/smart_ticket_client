"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { routes } from "@/constants/site-config";
import { useLogin } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/hooks/use-auth";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Vui lòng nhập email hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: loginMutation, isPending } = useLogin({
    onSuccess: (data) => {
      // Lưu token và user info vào storage
      storage.setItem("auth_token", data.data.token);
      storage.setItem("user", JSON.stringify(data.data.user));
      
      // Invalidate và refresh auth queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      
      // Set user data vào cache
      queryClient.setQueryData(authKeys.me(), data.data.user);
      
      toast.success(data.message || "Đăng nhập thành công!");
      
      // Redirect về trang chủ
      router.push(routes.home);
    },

    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: LoginFormData) => {
   loginMutation({
      email: data.email,
      password: data.password,
      device_name: "web",
   });
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <LogIn className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Đăng nhập</h1>
        <p className="text-muted-foreground">
          Đăng nhập vào tài khoản SmartTicket của bạn
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Mail className="w-4 h-4" />
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Nhập email của bạn"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Lock className="w-4 h-4" />
                  Mật khẩu
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu của bạn"
                      className="h-11 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>
            <Link href={routes.forgotPassword}>
              <Button variant="link" className="p-0 h-auto text-sm">
                Quên mật khẩu?
              </Button>
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base font-medium"
            disabled={isPending}
          >
            {isPending ? (
              "Đang đăng nhập..."
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Đăng nhập
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link href={routes.register}>
            <Button variant="link" className="p-0 h-auto font-medium">
              Đăng ký ngay
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
