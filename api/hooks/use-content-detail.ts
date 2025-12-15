import useSWR from "swr";
import { contentApi } from "../services/content-api";
import type { ContentDetailRes } from "../interfaces/content-interface";

export function useContentDetail() {
  const { data, error, isLoading } = useSWR<ContentDetailRes>(
    "content/detail",
    contentApi.getDetail
  );

  return {
    content: data?.data,
    isLoading,
    isError: error,
  };
}
