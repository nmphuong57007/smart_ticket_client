import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../services/review-api";
import { toast } from "sonner";

export const useCreateReview = (movieId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Gửi đánh giá thành công, chờ duyệt!");
      queryClient.invalidateQueries({
        queryKey: ["reviewsByMovie", movieId],
      });
    },
    onError: () => {
      toast.error("Gửi đánh giá thất bại");
    },
  });
};

