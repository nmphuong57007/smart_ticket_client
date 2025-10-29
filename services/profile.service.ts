// services/profile.service.ts
import { api } from '@/lib/axios-intance';
import { User } from '@/types/auth';

export async function getUserProfile(): Promise<User> {
  const res = await api.get('/auth/profile');
  return res.data.user;
}

export async function updateUserProfile(formData: FormData, onUploadProgress?: (p: number) => void) {
  const res = await api.post('/auth/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (event) => {
      if (onUploadProgress && event.total) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onUploadProgress(percent);
      }
    },
  });

  return res.data.user;
}

export async function changePassword(data: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`;
  // console.log("🔹 Gửi request đến:", url);

  const token = localStorage.getItem("auth_token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    redirect: "manual", // 👈 Quan trọng
  });

  const text = await res.text();
  // console.log("📩 Phản hồi từ server:", text);

  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.message || "Lỗi khi đổi mật khẩu");
    return json;
  } catch {
    throw new Error("Mật khẩu hiện tại không đúng");
  }
}






// Upload avatar dùng axios (dùng interceptor, có token)

