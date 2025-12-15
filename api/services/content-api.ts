import instance from "@/lib/instance";
import type { ContentDetailRes } from "../interfaces/content-interface";

export const contentApi = {
  getDetail: async () => {
    try {
      // baseURL hiện tại của instance đã là http://localhost:8000
      // nên path đúng phải là /api/content-posts
      const res = await instance.get<ContentDetailRes>("/api/content-posts");
      return res.data;
    } catch (err) {
      console.error("contentApi.getDetail error:", err);
      throw err;
    }
  },
};

