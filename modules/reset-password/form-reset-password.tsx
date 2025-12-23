"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";

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
import { useResetPassword } from "@/api/hooks/use-reset-password";
import { Spinner } from "@/components/ui/spinner";
import { redirectConfig } from "@/helpers/redirect-config";

const formSchema = z
  .object({
    email: z.email("Email không hợp lệ"),
    token: z.string().min(1, "Token là bắt buộc"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    password_confirmation: z.string().min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["password_confirmation"],
  });

export default function FormResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const { mutate: resetPassword, isPending } = useResetPassword();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      token: token,
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    resetPassword(data, {
      onSuccess: () => {
        toast.success("Đặt lại mật khẩu thành công!");
        router.push(redirectConfig.login);
      },
      onError: (err: unknown) => {
        console.error(err);
        if (err instanceof AxiosError && err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Đặt lại mật khẩu thất bại");
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Nhập email của bạn" {...field} disabled />
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
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu mới</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          Đặt lại mật khẩu
          {isPending && <Spinner />}
        </Button>

        <div className="text-sm text-center text-gray-600">
          Quay lại{" "}
          <Link
            href={redirectConfig.login}
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            Đăng nhập
          </Link>
        </div>
      </form>
    </Form>
  );
}