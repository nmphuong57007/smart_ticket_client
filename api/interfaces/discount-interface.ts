// src/api/interfaces/promotion-interface.ts

export interface PromotionItem {
  id: number;
  code: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  status: "active" | "expired" | string;
  status_label: string;
  is_valid: boolean;
  is_expired: boolean;
  created_at: string;
  updated_at: string;
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
}

export interface PromotionApplyResponse {
  valid: boolean;
  discount_percent: number;
  message: string;
}
