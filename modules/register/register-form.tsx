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
  fullname: z.string().min(1, "Họ và tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .min(7, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại không hợp lệ"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  gender: z.enum(["male", "female", "other"]),
  password: z.string().min(8, "Mật khẩu phải chứa ít nhất 8 ký tự"),
  device_name: z.string().min(1, "Tên thiết bị là bắt buộc"),
});

export default function RegisterForm() {
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
      gender: "male",
      password: "",
      device_name: getDeviceName(),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    register(data, {
      onSuccess: (data) => {
        toast.success("Đăng ký thành công!");
        setToken(data.data.token);
        router.push(redirectConfig.cinemas);
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

        {/* gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới tính</FormLabel>
              <FormControl>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  {...field}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
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
