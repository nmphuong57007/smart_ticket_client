// src/api/interfaces/promotion-interface.ts

export interface PromotionItem {
  id: number;
  code: string;

  // Loại giảm giá: theo backend
  type: "percent" | "money";

  // Nếu type = percent
  discount_percent: number;

  // Nếu type = fixed
  discount_amount: number;

  // Giảm theo % nhưng giới hạn tối đa
  max_discount_amount: number | null;

  // Áp dụng theo phim
  movie_id: number | null;
  apply_for_all_movies: boolean;

  // Điều kiện đơn hàng tối thiểu
  min_order_amount: number;

  // Trạng thái backend
  status: string;
  is_valid: boolean;
  is_expired: boolean;

  // Những trường bổ sung từ backend (optional để tránh lỗi)
  usage_limit?: number;
  used_count?: number;
  remaining?: number;

  start_date?: string;
  end_date?: string;

  created_at?: string;
  updated_at?: string;
}

export interface PromotionListResponse {
  success: boolean;
  data: PromotionItem[];
  pagination: {
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
  };
}

export interface PromotionApplyPayload {
  code: string;
  movie_id: number;
  total_amount: number;
}

export interface PromotionApplyResponse {
  valid: boolean;
  discount_value: number;
  final_amount: number;
  message: string;
}
