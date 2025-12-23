"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useDeviceName } from "@/hooks/use-device-name";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/api/hooks/use-login";
import { Spinner } from "@/components/ui/spinner";
import { setToken } from "@/helpers/has-token";
import { redirectConfig } from "@/helpers/redirect-config";

const formSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
  device_name: z.string().min(1, "Tên thiết bị là bắt buộc"),
});

export default function FormLogin() {
  const router = useRouter();

  const { getDeviceName } = useDeviceName();

  const { mutate: login, isPending: isLoggingIn } = useLogin();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      device_name: getDeviceName(),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    login(data, {
      onSuccess: (data) => {
        toast.success("Đăng nhập thành công!");
        setToken(data.data.token);
        router.push(redirectConfig.home);
      },

      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Nhập địa chỉ email của bạn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Mật khẩu</FormLabel>
                <Link
                  href={redirectConfig.forgotPassword}
                  className="text-sm text-blue-600 hover:underline hover:text-blue-800"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoggingIn}>
          Đăng nhập
          {isLoggingIn && <Spinner />}
        </Button>

        {/* Chưa có tài khoản đăng ký ngay */}
        <div className="text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            href={redirectConfig.register}
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </Form>
  );
}