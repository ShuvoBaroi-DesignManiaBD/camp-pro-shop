import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '@/types/cart.type';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  numberOfProducts: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state?.items?.find(item => item._id === newItem._id);
    
      if (existingItem) {
        // If the item already exists, increase its quantity and total price
        existingItem.quantity = Number(existingItem.quantity) + Number(newItem.quantity);
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price * newItem.quantity);
      } else {
        // If it's a new item, add it with the correct quantity and total price
        state.items.push({
          ...newItem,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
        });
        state.numberOfProducts += 1;
      }

      console.log(newItem, existingItem);
      
      // Update the total amount for the entire cart
      state.totalAmount += newItem.price * newItem.quantity;
    },
    
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      const newTotal = state.totalAmount - existingItem?.totalPrice!;
      state.totalAmount = newTotal;
      state.items = state.items.filter(item => item._id !== id);
    //   if (existingItem) {
    //     state.totalAmount -= existingItem.price / existingItem.quantity;
        
    //     if (existingItem.quantity === 1) {
    //     } else {
    //       existingItem.totalPrice -= existingItem.price / existingItem.quantity;
    //       existingItem.quantity--;
    //     }
    //   }
    },
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalAmount += existingItem.price;
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.totalAmount -= existingItem.price;
        } else {
          state.totalAmount -= existingItem.totalPrice;
          state.items = state.items.filter(item => item._id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.numberOfProducts = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalAmount = (state: RootState) => state.cart.totalAmount;
export const selectNumberOfProducts = (state: RootState) => state.cart.numberOfProducts;
