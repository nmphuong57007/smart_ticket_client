import instance from "@/lib/instance";
import {
  ChangePasswordReqInterface,
  ChangePasswordResInterface,
} from "../interfaces/change-password";

export async function changePassword(data: ChangePasswordReqInterface) {
  try {
    const response = await instance.post<ChangePasswordResInterface>(
      "/api/auth/change-password",
      data
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
