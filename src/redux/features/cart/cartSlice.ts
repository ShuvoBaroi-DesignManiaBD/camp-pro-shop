import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/types/cart.type";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

const initialState: CartState = {
  items: [],
  originalTotalPrice: 0,
  finalTotalPrice: 0,
  numberOfProducts: 0,
  deliveryCharge: 0,
  taxRate: Number((5 / 100).toFixed(2)),
  tax: 0,
};

// Utility function to update delivery charge based on the total price
const updateState = (state: CartState) => {
  const items = state.items;
  const taxRate = state.taxRate
  state.originalTotalPrice = Number(
    items
      .reduce(
        (acc: number, item: { price: number; quantity: number }) =>
          acc + item.price * item.quantity,
        0
      )
      .toFixed(2)
  );
  state.deliveryCharge = state.originalTotalPrice > 40 ? 5 : 0;
  state.tax = Number((state.originalTotalPrice * taxRate).toFixed(2));
  state.finalTotalPrice = Number(
    (state.originalTotalPrice + state.tax + state.deliveryCharge).toFixed(2)
  );
  
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const productsInCart = state.items;
      const existingItem = productsInCart.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.total += newItem.price * newItem.quantity;
      } else {
        newItem.total = newItem.price * newItem.quantity;
        state.items.push({ ...newItem });
        state.numberOfProducts += 1;
      }

      // calculateTotalAsync();
      updateState(state); // Update delivery charge
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
      if (state.items.length === 0) state.numberOfProducts = 0;
      updateState(state); // Update delivery charge
    },

    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);

      if (existingItem) {
        if (existingItem.stockQuantity <= existingItem.quantity) {
          toast.error(
            `Sorry, you can't add more than ${existingItem.stockQuantity} items.`
          );
        } else {
          existingItem.quantity++;
          existingItem.total = existingItem.price * existingItem.quantity;
        }
      }

      updateState(state); // Update delivery charge
    },

    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.total = existingItem.price * existingItem.quantity;
        } else {
          state.numberOfProducts--;
          state.items = state.items.filter((item) => item._id !== id);
        }
      }

      updateState(state); // Update delivery charge
    },

    setOriginalTotalPrice: (state, action: PayloadAction<number>) => {
      state.originalTotalPrice = action.payload;
      updateState(state); // Update delivery charge
    },
    setFinalTotalPrice: (state, action: PayloadAction<number>) => {
      state.finalTotalPrice = action.payload;
    },
    setTax: (state, action: PayloadAction<number>) => {
      state.tax = action.payload;
    },
    setDeliveryCharge: (state, action: PayloadAction<number>) => {
      state.deliveryCharge = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.originalTotalPrice = 0;
      state.finalTotalPrice = 0;
      state.numberOfProducts = 0;
      state.deliveryCharge = 0;
      state.tax = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  setOriginalTotalPrice,
  setFinalTotalPrice,
  setDeliveryCharge,
  setTax,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectOriginalTotalPrice = (state: RootState) =>
  state.cart.originalTotalPrice;
export const selectFinalTotalPrice = (state: RootState) =>
  state.cart.finalTotalPrice;
export const selectNumberOfProducts = (state: RootState) =>
  state.cart.numberOfProducts;
export const selectCurrentTax = (state: RootState) => state.cart.tax;
export const selectCurrentTaxRate = (state: RootState) => state.cart.taxRate;
export const selectCurrentDeliveryCharge = (state: RootState) =>
  state.cart.deliveryCharge;
