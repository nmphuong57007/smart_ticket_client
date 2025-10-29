'use client';

import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/use-profile';
import { getUserProfile, updateUserProfile } from '@/services/profile.service';

export default function ProfileForm() {
  const { form, setForm, preview, setPreview } = useProfile();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  // Hàm convert path backend thành URL full
  const getAvatarUrl = (path: string | null) => {
    if (!path) return null;
    if (path.startsWith('http')) return path; // đã là URL
    return `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/storage/${path}`;
  };

  useEffect(() => {
    getUserProfile()
      .then(user => {
        setForm(user);
        setPreview(getAvatarUrl(user.avatar));
      })
      .catch(() => setMessage('❌ Không thể tải hồ sơ'))
      .finally(() => setLoading(false));
  }, [setForm, setPreview]);
console.log(getAvatarUrl(form.avatar));

  if (loading) return <p>Đang tải hồ sơ...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected)); // preview tạm thời
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setProgress(0);

    try {
      // Chuẩn bị FormData
      const formData = new FormData();
      formData.append('fullname', form.fullname || '');
      formData.append('phone', form.phone || '');
      formData.append('address', form.address || '');
      formData.append('gender', form.gender || 'other');
      if (file) formData.append('avatar', file);

      // Gọi API
      const updated = await updateUserProfile(formData, (p) => setProgress(p));

      // Cập nhật state local
      setForm(updated);
      setPreview(getAvatarUrl(updated.avatar));
      setFile(null);
      setMessage('✅ Cập nhật hồ sơ thành công!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Có lỗi khi cập nhật hồ sơ');
    }
  };

  return (
     <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      {/* Hàng trên: thông tin & avatar */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Bên trái: thông tin */}
        <div className="ml-20 flex-1 max-w-xl space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Họ và tên</label>
            <input
              name="fullname"
              value={form.fullname || ''}
              onChange={handleChange}
              placeholder="Họ và tên"
              className="w-full border rounded-md p-2 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              name="email"
              value={form.email || ''}
              readOnly
              placeholder="Email"
              className="w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Số điện thoại</label>
            <input
              name="phone"
              value={form.phone || ''}
              onChange={handleChange}
              placeholder="Số điện thoại"
              className="w-full border rounded-md p-2 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Địa chỉ</label>
            <input
              name="address"
              value={form.address || ''}
              onChange={handleChange}
              placeholder="Địa chỉ"
              className="w-full border rounded-md p-2 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Giới tính</label>
            <select
              name="gender"
              value={form.gender || 'other'}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-blue-500"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        {/* Bên phải: avatar */}
        <div className="flex flex-col items-center justify-start gap-3 md:w-[220px] mr-20 mt-20">
          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400">
              No image
            </div>
          )}

          {/* <label className="text-sm text-gray-600 font-medium">Chọn ảnh mới</label> */}
          <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
        </div>
      </div>

      {/* Hàng dưới: nút lưu */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-8 rounded-md transition"
        >
          Lưu {progress > 0 && `(${progress}%)`}
        </button>
      </div>

      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </form>
  );
}
