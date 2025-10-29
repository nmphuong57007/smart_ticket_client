// hooks/use-profile.ts
'use client';

import { useState } from 'react';
import { User } from '@/types/auth';

interface UseProfileReturn {
  form: User;
  setForm: React.Dispatch<React.SetStateAction<User>>;
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useProfile(initialData?: User): UseProfileReturn {
  const [form, setForm] = useState<User>(
    initialData || {
      id: 0,
      fullname: '',
      email: '',
      phone: '',
      address: '',
      gender: 'other',
      avatar: null,
      role: '',
      points: 0,
      status: 'active',
      created_at: '',
      updated_at: '',
    }
  );

  const [preview, setPreview] = useState<string | null>(form.avatar || null);

  return { form, setForm, preview, setPreview };
}
