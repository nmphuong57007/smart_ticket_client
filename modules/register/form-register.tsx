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
import { useRegister } from "@/api/hooks/use-register";
import { Spinner } from "@/components/ui/spinner";
import { setToken } from "@/helpers/has-token";
import { redirectConfig } from "@/helpers/redirect-config";

const formSchema = z.object({
  fullname: z
    .string()
    .min(1, "Họ tên không được để trống")
    .max(100, "Họ tên không được vượt quá 100 ký tự"),

  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không đúng định dạng")
    .max(100, "Email không được vượt quá 100 ký tự"),

  phone: z
    .string()
    .max(20, "Số điện thoại không được vượt quá 20 ký tự")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .max(255, "Địa chỉ không được vượt quá 255 ký tự")
    .optional()
    .or(z.literal("")),

  password: z
    .string()
    .min(1, "Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),

  device_name: z.string().min(1, "Tên thiết bị là bắt buộc"),
});

export default function FormRegister() {
  const router = useRouter();

  const { getDeviceName } = useDeviceName();

  const { mutate: register, isPending: isRegistering } = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      device_name: getDeviceName(),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    register(data, {
      onSuccess: (data) => {
        toast.success("Đăng ký thành công!");
        setToken(data.data.token);
        router.push(redirectConfig.home);
      },

      onError: (err) => {
        console.log(err);
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
              <FormLabel>Mật khẩu</FormLabel>
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

        {/* fullname */}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ và tên của bạn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="Nhập số điện thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Nhập địa chỉ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isRegistering}>
          Đăng ký
          {isRegistering && <Spinner />}
        </Button>

        <div className="text-sm text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            href={redirectConfig.login}
            className="text-blue-600 hover:underline hover:text-blue-800"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </form>
    </Form>
  );
}
