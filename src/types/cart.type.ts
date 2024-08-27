import { TProduct } from "./product.type";

export interface CartItem extends TProduct {
  quantity: number;
  total: number;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  numberOfProducts: number;
}
