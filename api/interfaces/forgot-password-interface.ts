export interface ForgotPasswordReqInterface {
  email: string;
}

export interface ForgotPasswordResInterface {
  message: string;
  token?: string;
  errors?: {
    email: string[];
  };
}
