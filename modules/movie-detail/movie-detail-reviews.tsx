"use client";

import { useDeleteReview } from "@/api/hooks/use-review-delete";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2Icon } from "lucide-react";

export interface ReviewItem {
  id: number;
  user_id: number;
  movie_id: number;
  rating: number;
  comment: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    fullname: string;
    avatar?: string;
  };
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

interface MovieDetailReviewsProps {
  reviews: ReviewItem[];
  isLoading: boolean;
  profile?: UserType;
   movieId: number;
}

const getAvatarUrl = (avatar?: string) => {
  if (!avatar) return undefined;
  if (avatar.startsWith("http")) return avatar;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${avatar}`;
};

export default function MovieDetailReviews({
  reviews,
  isLoading,
  profile,
  movieId
}: MovieDetailReviewsProps) {
  const { mutate: deleteReview, isPending } = useDeleteReview(movieId);
  if (isLoading) {
    return <p>Đang tải đánh giá...</p>;
  }

  if (!reviews.length) {
    return <p className="text-gray-500">Chưa có đánh giá nào.</p>;
  }

  return (
<div className="mt-6">
  <h3 className="mb-4 text-lg font-semibold">Đánh giá phim</h3>

  {/* BOX CHỨA TOÀN BỘ COMMENT */}
  <div className="rounded-lg border bg-white shadow-sm">
    {reviews.map((r) => (
      <div key={r.id} className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={getAvatarUrl(r.user.avatar)}
                alt={r.user.fullname}
              />
              <AvatarFallback>
                {r.user.fullname.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="font-medium leading-none">
                {r.user.fullname}
              </span>

              <p className="mt-1 text-gray-700">
                {r.comment}
              </p>
            </div>
          </div>
          {/*  DELETE BUTTON */}
          {profile?.id === r.user_id && (
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                if (confirm("Bạn có chắc muốn xóa đánh giá này?")) {
                  deleteReview(r.id);
                }
              }}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <Trash2Icon className="h-4 w-4" />
            </button>
          )}
        </div>


      </div>
    ))}
  </div>
</div>

  );
}
