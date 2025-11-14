import instance from "@/lib/instance";

export async function postLogout() {
  try {
    const response = await instance.post("/api/auth/logout");

    return response.data;
  } catch (error) {
    throw error;
  }
}
