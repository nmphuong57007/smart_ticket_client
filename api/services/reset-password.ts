import instance from "@/lib/instance";
import {
  ResetPasswordReqInterface,
  ResetPasswordResInterface,
} from "../interfaces/reset-password-interface";

export async function resetPassword(data: ResetPasswordReqInterface) {
  try {
    const response = await instance.post<ResetPasswordResInterface>(
      "/api/auth/reset-password",
      data
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}