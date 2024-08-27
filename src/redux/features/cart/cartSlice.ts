import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/types/cart.type";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  numberOfProducts: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state?.items?.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        // If the item already exists, increase its quantity and total price
        existingItem.quantity =
          Number(existingItem.quantity) + Number(newItem.quantity);
        existingItem.total =
          Number(existingItem.total) + Number(newItem.price * newItem.quantity);
      } else {
        // If it's a new item, add it with the correct quantity and total price
        state.items.push({
          ...newItem,
          quantity: newItem.quantity,
          total: newItem.price * newItem.quantity,
        });
        state.numberOfProducts += 1;
      }

      console.log(newItem, existingItem);

      // Update the total amount for the entire cart
      state.totalPrice += newItem.price * newItem.quantity;
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      const newTotal = state.totalPrice - existingItem?.total!;
      state.totalPrice = newTotal;
      state.items = state.items.filter((item) => item._id !== id);
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
      const existingItem = state.items.find((item) => item._id === id);

      if (existingItem) {
        if (existingItem?.stockQuantity < existingItem.quantity + 1) {
          toast.error(
            `Sorry you can't add more than ${existingItem?.stockQuantity} items.`
          );
        } else {
          existingItem.quantity++;
          existingItem.total += existingItem.price;
          state.totalPrice += existingItem.price;
        }
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.total -= existingItem.price;
          state.totalPrice -= existingItem.price;
          if (existingItem.quantity === 0) state.numberOfProducts = 0;
        } else {
          state.totalPrice -= existingItem.total;
          state.numberOfProducts--;
          state.items = state.items.filter((item) => item._id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.numberOfProducts = 0;
      // state.items.length === 0 && (state.totalPrice = 0);
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectNumberOfProducts = (state: RootState) =>
  state.cart.numberOfProducts;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { CartItem, CartState } from "@/types/cart.type";
// import { useAppSelector } from "@/redux/hooks";
// import { RootState } from "@/redux/store";
// import toast from "react-hot-toast";

// const initialState: CartState = {
//   items: [],
//   totalPrice: 0,
//   numberOfProducts: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItemToCart: (state, action: PayloadAction<CartItem>) => {
//       const newItem = action.payload;
//       const existingItem = state?.items?.find(
//         (item) => item._id === newItem._id
//       );

//       if (existingItem) {
//         // If the item already exists, increase its quantity and total price
//         existingItem.quantity =
//           Number(existingItem.quantity) + Number(newItem.quantity);
//         existingItem.totalPrice =
//           Number(existingItem.totalPrice) +
//           Number(newItem.price * newItem.quantity);
//       } else {
//         // If it's a new item, add it with the correct quantity and total price
//         state.items.push({
//           ...newItem,
//           quantity: newItem.quantity,
//           totalPrice: newItem.price * newItem.quantity,
//         });
//         state.numberOfProducts += 1;
//       }

//       console.log(newItem, existingItem);

//       // Update the total amount for the entire cart
//       state.totalPrice += newItem.price * newItem.quantity;
//     },

//     removeItemFromCart: (state, action: PayloadAction<string>) => {
//       const id = action.payload;
//       const existingItem = state.items.find((item) => item._id === id);
//       const newTotal = state.totalPrice - existingItem?.totalPrice!;
//       state.totalPrice = newTotal;
//       state.items = state.items.filter((item) => item._id !== id);
//       //   if (existingItem) {
//       //     state.totalAmount -= existingItem.price / existingItem.quantity;

//       //     if (existingItem.quantity === 1) {
//       //     } else {
//       //       existingItem.totalPrice -= existingItem.price / existingItem.quantity;
//       //       existingItem.quantity--;
//       //     }
//       //   }
//     },
//     increaseItemQuantity: (state, action: PayloadAction<{id:string, quantity:number}>) => {
//       const id = action?.payload?.id;
//       const quantity = action?.payload?.quantity;
//       const existingItem = state.items.find((item) => item?._id === id);

//       if (existingItem) {
//         if(existingItem?.stockQuantity<(existingItem.quantity + quantity)){
//           toast.error(`Sorry only ${existingItem?.stockQuantity} items are left in the stock`);
//         }
//         existingItem.quantity = quantity;
//         existingItem.totalPrice = Number((existingItem.price * existingItem.quantity).toFixed(2));
//         // state.totalPrice += existingItem.totalPrice;
//         cartSlice.caseReducers.countTotalPrice(state)
//       }
//     },
//     decreaseItemQuantity: (state, action: PayloadAction<{id:string, quantity:number}>) => {
//       const id = action?.payload?.id;
//       const quantity = action?.payload?.quantity;
//       const existingItem = state.items.find((item) => item._id === id);
//       // cartSlice.caseReducers.
//       if (existingItem) {
//         if (existingItem.quantity > quantity) {
//           existingItem.quantity -= quantity;
//           existingItem.totalPrice -= existingItem.price;
//           state.totalPrice -= existingItem.price;
//         } else {
//           state.totalPrice -= existingItem.totalPrice;
//           state.items = state.items.filter((item) => item._id !== id);
//         }
//       }
//     },
//     countTotalPrice: (state) => {
//       const productCartTotal = 0;
//       const fullCartTotal = 0;

//       state.items.map((item) => {
//         item.totalPrice = Number((item?.quantity * item?.price).toFixed(2));
//         state.totalPrice = Number((fullCartTotal + item.totalPrice).toFixed(2));
//       });
//     },
//     clearCart: (state) => {
//       state.items = [];
//       state.totalPrice = 0;
//       state.numberOfProducts = 0;
//     },
//   },
// });

// export const {
//   addItemToCart,
//   removeItemFromCart,
//   increaseItemQuantity,
//   decreaseItemQuantity,
//   clearCart,
// } = cartSlice.actions;
// export default cartSlice.reducer;
// export const selectCartItems = (state: RootState) => state.cart.items;
// export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
// export const selectNumberOfProducts = (state: RootState) =>
//   state.cart.numberOfProducts;
