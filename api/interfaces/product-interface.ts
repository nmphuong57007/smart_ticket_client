
export interface ProductItem {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  stock: number;
  is_active: boolean;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: {
    products: ProductItem[];
    pagination: {
      current_page: number;
      last_page: number;
      total: number;
    };
  };
}

export interface SelectedCombo {
  id: number;
  name: string;
  qty: number;
  price: number;
}
