"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
import { useChangePassword } from "@/api/hooks/use-change-password";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z
  .object({
    current_password: z.string().min(1, "Mật khẩu hiện tại là bắt buộc"),
    password: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    password_confirmation: z.string().min(6, "Xác nhận mật khẩu mới phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["password_confirmation"],
  });

export default function FormChangePassword() {
  const { mutate: changePassword, isPending } = useChangePassword();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    changePassword(data, {
      onSuccess: () => {
        toast.success("Đổi mật khẩu thành công!");
        form.reset();
      },
      onError: (err: unknown) => {
        console.error(err);
        if (err instanceof AxiosError && err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Đổi mật khẩu thất bại");
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu hiện tại</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
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
          Đổi mật khẩu
          {isPending && <Spinner />}
        </Button>
      </form>
    </Form>
  );
}
