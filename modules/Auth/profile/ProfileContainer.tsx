'use client';

import { useState } from 'react';
import ProfileForm from './ProfileForm';
import ChangePasswordPage from './ChangePass';

export default function ProfileContainer() {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { key: 'account', label: 'Thông tin tài khoản' },
    { key: 'pass', label: 'Đổi mật khẩu' },
    { key: 'member', label: 'Thẻ thành viên' },
    { key: 'points', label: 'Điểm' },
    { key: 'voucher', label: 'Voucher' },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md mt-8">
      {/* Thanh tab ngang */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 text-sm md:text-base font-medium border-b-2 transition-colors duration-200 ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600 bg-gray-50'
                : 'border-transparent text-gray-600 hover:text-blue-500 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Nội dung tab */}
      <div className="p-8">
        {activeTab === 'account' && <ProfileForm />}

        {activeTab === 'member' && (
          <div className="text-gray-700 text-center py-6">
            <p>💳 Thông tin thẻ thành viên đang được cập nhật...</p>
          </div>
        )}
        {activeTab === 'pass' && <ChangePasswordPage />}
        {activeTab === 'points' && (
          <div className="text-gray-700 text-center py-6">
            <p>⭐ Điểm của bạn sẽ được cập nhật sớm.</p>
          </div>
        )}

        {activeTab === 'voucher' && (
          <div className="text-gray-700 text-center py-6">
            <p>🎁 Danh sách voucher của bạn hiện đang trống.</p>
          </div>
        )}
      </div>
    </div>
  );
}
