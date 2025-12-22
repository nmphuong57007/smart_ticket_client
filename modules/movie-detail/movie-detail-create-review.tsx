"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview } from "@/api/hooks/use-review-create";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/api/hooks/use-profile";
// import { Trash2Icon } from "lucide-react";

interface MovieDetailReviewFormProps {
  movieId: number;
  profile?: UserType;
  isLoading?: boolean;
}

type UserType = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address: null;
  gender: null;
  avatar: string;
  role: string;
  points: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function MovieDetailReviewForm({
  movieId,
  profile: profileProp,
  isLoading: isLoadingProp,
}: MovieDetailReviewFormProps,) {
const { mutate: createReview, isPending } = useCreateReview(movieId);
const { data: profileData, isLoading: loading } = useProfile();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const profile = profileProp ?? profileData?.data.user;
  const isLoading = isLoadingProp ?? loading;

  const initials = profile?.fullname
    ? profile.fullname.charAt(0).toUpperCase()
    : "U";

  const handleSubmit = () => {
    if (!comment.trim()) return;

    createReview({
      movie_id: movieId,
      rating,
      comment,
    });

    setComment("");
    setRating(5);
  };

  return (
    <div className="mb-6 rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold">Viết đánh giá của bạn</h4>

        <button
          type="button"
          className="text-gray-500 hover:text-red-500 transition"
        >
          {/* <Trash2Icon className="h-4 w-4" /> */}
        </button>
      </div>

      {/* RATING */}
      {/* <div className="mb-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div> */}
      <div className="flex gap-3">
        {/* AVATAR */}
        <div className="flex-shrink-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar || ""} />
            <AvatarFallback>
              {isLoading ? (
                <Skeleton className="h-10 w-10 rounded-full" />
              ) : (
                initials
              )}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* COMMENT + ACTION */}
        <div className="flex-1">
          <Textarea
            placeholder="Chia sẻ cảm nhận của bạn về bộ phim..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="resize-none"
          />

          <div className="mt-2 text-right">
            <Button
              onClick={handleSubmit}
              disabled={isPending || !comment.trim()}
            >
              {isPending ? "Đang gửi..." : "Gửi"}
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Đánh giá sẽ được hiển thị sau khi được duyệt.
      </p>
    </div>
  );
}
