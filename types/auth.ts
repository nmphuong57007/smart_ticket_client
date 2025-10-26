// Auth related types with any type
export interface User {
  id: any;
  fullname: any;
  avatar: any;
  email: any;
  phone: any;
  address: any;
  gender: any;
  role: any;
  points: any;
  status: any;
  created_at: any;
  updated_at: any;
}

export interface LoginRequest {
  email: any;
  password: any;
  device_name: any;
}

export interface LoginResponse {
  success: any;
  message: any;
  data: any;
}

export interface RegisterRequest {
  fullname: any;
  email: any;
  password: any;
  password_confirmation: any;
  phone?: any;
  address?: any;
  gender?: any;
  device_name: any;
}

export interface RegisterResponse {
  success: any;
  message: any;
  data?: any;
}

export interface AuthError {
  success: any;
  message: any;
  errors?: any;
}
