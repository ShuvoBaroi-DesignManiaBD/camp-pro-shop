import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const cartDrawerSlice = createSlice({
  name: "cartDrawer",
  initialState,
  reducers: {
    setShowHideCartDrawer: (state) => {
      return state = !state;
    },
    // clearCart: (state) => {
    //   state.items = [];
    //   state.totalAmount = 0;
    //   state.numberOfProducts = 0;
    // },
  },
});

export const { setShowHideCartDrawer } = cartDrawerSlice.actions;
export default cartDrawerSlice.reducer;
export const selectShowHideCartDrawer = (state: RootState) => state.cartDrawer;
