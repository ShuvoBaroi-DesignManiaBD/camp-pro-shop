import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = window.innerWidth > 1023;

const deviceTypeSlice = createSlice({
  name: "deviceType",
  initialState,
  reducers: {
    setDeviceType: (state) => {
      return (state = !state);
    },
    // clearCart: (state) => {
    //   state.items = [];
    //   state.totalAmount = 0;
    //   state.numberOfProducts = 0;
    // },
  },
});

export const { setDeviceType } = deviceTypeSlice.actions;
export default deviceTypeSlice.reducer;
export const selectCurrentDevice = (state: RootState) => state.deviceType;
