export interface ResetPasswordReqInterface {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordResInterface {
  message: string;
  token: string;
}