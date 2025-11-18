import instance from "@/lib/instance";
import { ProfileResInterface } from "../interfaces/profile-interface";

export const getProfile = async (): Promise<ProfileResInterface> => {
  try {
    const response = await instance.get<ProfileResInterface>("/api/auth/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (formData: FormData) => {
  try {
    const response = await instance.post("/api/auth/profile", formData, {
      headers: {
        // Override default so axios sets proper boundary
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
