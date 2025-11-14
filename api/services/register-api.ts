import instance from "@/lib/instance";
import { RegisterReqInterface, RegisterResInterface } from "../interfaces/register-interface";

export async function postRegister(data: RegisterReqInterface) {
  try {
    const response = await instance.post<RegisterResInterface>("/api/auth/register", data);

    return response.data;
  } catch (error) {
    throw error;
  }
}
