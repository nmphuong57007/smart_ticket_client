"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useForgotPassword } from "@/api/hooks/use-forgot-password";
import { Spinner } from "@/components/ui/spinner";
import { redirectConfig } from "@/helpers/redirect-config";

const formSchema = z.object({
  email: z.email("Email không hợp lệ"),
});

export default function FormForgotPassword() {
  const router = useRouter();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    forgotPassword(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Vui lòng nhập thông tin để đặt lại mật khẩu");
        if (res.token) {
          router.push(`${redirectConfig.resetPassword}?token=${res.token}&email=${data.email}`);
        }
      },
      onError: (err: unknown) => {
        console.error(err);
        if (err instanceof AxiosError && err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Gửi yêu cầu thất bại");
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
                <Input placeholder="Nhập địa chỉ email của bạn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          Gửi yêu cầu
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