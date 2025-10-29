"use client";

import { useState } from "react";
import { changePassword } from "@/services/profile.service";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // ✅ Kiểm tra trước khi gửi request
    if (newPassword !== confirmPassword) {
      setMessage("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      setMessage(res.message || "✅ Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      // ✅ Hiển thị lỗi backend gửi về (vd: mật khẩu cũ sai)
      setMessage(`❌ ${error.message || "Đã xảy ra lỗi khi đổi mật khẩu"}`);
    } finally {
      setLoading(false);
    }
  };

  const passwordMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="max-w-md mx-auto p-6 bg-white  rounded-2xl ">
      <h2 className="text-2xl font-semibold mb-4 text-center">Đổi mật khẩu</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-base font-medium">Mật khẩu hiện tại</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-base font-medium">Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-base font-medium">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring ${
              passwordMismatch ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
            }`}
            required
          />
          {passwordMismatch && (
            <p className="text-red-600 text-sm mt-1">⚠️ Mật khẩu xác nhận không khớp!</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
