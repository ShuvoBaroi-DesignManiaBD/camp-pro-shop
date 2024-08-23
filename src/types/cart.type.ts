import { TProduct } from "./product.type";

export interface CartItem extends TProduct {
    quantity: number;
    totalPrice: number;
  }
  
export interface CartState {
    items: CartItem[];
    totalAmount: number;
    numberOfProducts: number;
  }