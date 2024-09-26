import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const userMenuDrawerSLice = createSlice({
  name: "userMenuDrawer",
  initialState,
  reducers: {
    setShowUserMenuDrawer: (state) => {
      return (state = !state);
    },
    // clearCart: (state) => {
    //   state.items = [];
    //   state.totalAmount = 0;
    //   state.numberOfProducts = 0;
    // },
  },
});

export const { setShowUserMenuDrawer } = userMenuDrawerSLice.actions;
export default userMenuDrawerSLice.reducer;
export const selectUserMenuDrawer = (state: RootState) => state.userMenuDrawer;
