import instance from "@/lib/instance";
import type { CinemaDetailRes } from "../interfaces/cinema-interface";

export const cinemaApi = {
  getDetail: async () => {
    try {
      const res = await instance.get<CinemaDetailRes>("/api/cinema");
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};
