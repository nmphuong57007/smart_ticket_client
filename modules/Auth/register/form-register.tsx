"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routes } from "@/constants/site-config";
import { useRegister } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  fullname: z
    .string()
    .min(1, "Họ tên là bắt buộc")
    .max(100, "Họ tên không được vượt quá 100 ký tự"),
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Vui lòng nhập email hợp lệ")
    .max(100, "Email không được vượt quá 100 ký tự"),
  phone: z
    .string()
    .max(20, "Số điện thoại không được vượt quá 20 ký tự")
    .optional(),
  address: z
    .string()
    .max(255, "Địa chỉ không được vượt quá 255 ký tự")
    .optional(),
  gender: z
    .enum(["male", "female", "other", ""], {
      message: "Giới tính không hợp lệ",
    })
    .optional(),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function FormRegister() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      password: "",
    },
  });

  const { mutateAsync: registerMutation, isPending } = useRegister({
    onSuccess: (data) => {
      toast.success(data.message || "Đăng ký thành công!");
      form.reset();
      router.push(routes.login);
    },

    onError: (error) => {
      if (error?.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              form.setError(field as keyof RegisterFormData, {
                message: messages[0],
              });
            }
          }
        );
      } else {
        const errorMessage =
          error?.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại.";
        toast.error(errorMessage);
      }
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    registerMutation({
      fullname: data.fullname,
      email: data.email,
      phone: data.phone || null,
      address: data.address || null,
      gender: data.gender === "" ? null : data.gender,
      password: data.password,
      password_confirmation: data.password,
      device_name: "web",
    });
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Đăng ký</h1>
        <p className="text-muted-foreground">
          Tạo tài khoản SmartTicket để bắt đầu đặt vé xem phim
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Họ tên */}
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <User className="w-4 h-4" />
                  Họ tên
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nhập họ và tên đầy đủ"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
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

          {/* Số điện thoại */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Phone className="w-4 h-4" />
                  Số điện thoại
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Địa chỉ */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <MapPin className="w-4 h-4" />
                  Địa chỉ
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nhập địa chỉ"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Giới tính */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mật khẩu */}
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
                      placeholder="Nhập mật khẩu"
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

          <Button
            type="submit"
            className="w-full h-11 text-base font-medium"
            disabled={isPending}
          >
            {isPending ? (
              "Đang đăng ký..."
            ) : (
              <>
                <User className="w-4 h-4 mr-2" />
                Đăng ký
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link href={routes.login}>
            <Button variant="link" className="p-0 h-auto font-medium">
              Đăng nhập ngay
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
