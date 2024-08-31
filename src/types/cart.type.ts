import { TProduct } from "./product.type";

export interface CartItem extends TProduct {
  quantity: number;
  total: number;
}

export interface CartState {
  items: CartItem[];
  originalTotalPrice: number;
  finalTotalPrice: number,
  numberOfProducts: number;
  deliveryCharge: number;
  tax: number;
  taxRate: number;
}
