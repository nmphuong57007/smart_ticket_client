import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "@/api/services/review-api";
import { toast } from "sonner";

export const useDeleteReview = (movieId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReview(id),

    onSuccess: () => {
      toast.success("Xóa review thành công");

      // reload lại danh sách review
      if (movieId) {
        queryClient.invalidateQueries({
          queryKey: ["reviewsByMovie", movieId],
        });
      }
    },

    onError: () => {
      toast.error("Xóa review thất bại");
    },
  });
};
