export interface ChangePasswordReqInterface {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordResInterface {
  message: string;
}