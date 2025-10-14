// Auth related types
export interface User {
  id: number;
  fullname: string;
  avatar: string | null;
  email: string;
  phone: string;
  address: string | null;
  gender: string | null;
  role: string;
  points: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  device_name: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface RegisterRequest {
  fullname: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string | null;
  address?: string | null;
  gender?: string | null;
  device_name: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface AuthError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
