import instance from "@/lib/instance";
import {
  ForgotPasswordReqInterface,
  ForgotPasswordResInterface,
} from "../interfaces/forgot-password-interface";

export async function postForgotPassword(data: ForgotPasswordReqInterface) {
  try {
    const response = await instance.post<ForgotPasswordResInterface>(
      "/api/auth/forgot-password",
      data
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}