"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { useUpdateProfile } from "@/api/hooks/use-update-profile";
import { useProfile } from "@/api/hooks/use-profile";
import { Spinner } from "@/components/ui/spinner";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  avatar: z.any().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormProfile() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { mutate: updateProfileMutate, isPending: isUpdating } =
    useUpdateProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      avatar: null,
      email: "",
      phone: "",
      address: "",
    },
  });

  const { watch, reset } = form;

  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch,
  } = useProfile();

  useEffect(() => {
    const user = profileData?.data?.user;
    if (!user) return;

    reset({
      fullname: user.fullname ?? "",
      avatar: null,
      email: user.email ?? "",
      phone: user.phone ?? "",
      address: user.address ?? "",
    });

    if (user.avatar) {
      setAvatarPreview(user.avatar);
    }
  }, [profileData, reset]);

  const watchedAvatar = watch("avatar");
  const watchedFullname = watch("fullname");
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (watchedAvatar && watchedAvatar instanceof File) {
      const url = URL.createObjectURL(watchedAvatar);
      setAvatarPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    setAvatarPreview(profileData?.data?.user?.avatar ?? null);
  }, [watchedAvatar, profileData?.data?.user?.avatar]);

  const initials = useMemo(() => {
    if (!watchedFullname) return "?";
    return watchedFullname
      .split(" ")
      .map((s) => s[0] ?? "")
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [watchedFullname]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { fullname, phone, address, avatar } = data;

    const fd = new FormData();
    fd.append("fullname", fullname);
    fd.append("phone", phone ?? "");
    fd.append("address", address ?? "");
    if (avatar && avatar instanceof File) {
      fd.append("avatar", avatar);
    }

    updateProfileMutate(fd, {
      onSuccess: async () => {
        try {
          if (refetch) await refetch();
        } catch (e) {
          console.warn("Refetch profile failed", e);
        }

        toast.success("Cập nhật thông tin thành công");
      },
      onError: (err: unknown) => {
        if (err instanceof AxiosError && err.response) {
          const resp = err.response as
            | { status?: number; data?: { errors?: Record<string, string[]> } }
            | undefined;
          if (resp?.status === 422 && resp.data?.errors) {
            const errors = resp.data.errors as Record<string, string[]>;
            Object.keys(errors).forEach((key) => {
              const msgs = errors[key];
              form.setError(key as keyof FormValues, {
                type: "server",
                message: msgs.join(" "),
              });
            });
            return;
          }
        }

        toast.error("Cập nhật thất bại");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="size-12">
            {avatarPreview ? (
              <AvatarImage
                src={avatarPreview}
                alt={profileData?.data?.user.fullname ?? watchedFullname ?? ""}
              />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => {
                const inputRef = avatarInputRef;
                const filename =
                  field.value && field.value instanceof File
                    ? field.value.name
                    : "Chưa chọn tệp";

                return (
                  <FormItem>
                    <FormLabel>Ảnh đại diện</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <input
                          ref={inputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files && e.target.files[0];
                            field.onChange(file ?? null);
                          }}
                        />

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => inputRef.current?.click()}
                        >
                          Chọn ảnh
                        </Button>

                        <div className="text-sm text-muted-foreground">
                          {filename}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="text-sm text-muted-foreground mt-2">
              Kích thước tối ưu: 200x200. Chọn ảnh mới để xem trước.
            </div>
          </div>
        </div>

        {/* fullname */}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ và tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email (readonly) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} disabled />
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

        <div className="flex gap-3 w-full">
          <Button
            type="submit"
            disabled={isUpdating || isProfileLoading}
            className="w-full md:flex-1"
          >
            Lưu
            {isUpdating && <Spinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
