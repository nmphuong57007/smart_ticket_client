import axiosInstance from "@/lib/axios-intance";

export const fetchCombos = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/combos");
    return response.data.combos;
  } catch (error) {
    console.error("Failed to fetch combos", error);
    throw error;
  }
};
