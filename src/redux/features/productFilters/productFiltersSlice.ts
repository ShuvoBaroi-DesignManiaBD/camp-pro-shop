import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FilterValues } from "@/types/filter.type";

const initialState = {
  productFilters: {},
  totalProducts: 0,
  page: 1,
  pageSize: 6,
};

const productFiltersSlice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.productFilters = action.payload;
    },
    setProductsCount: (state, action) => {
      state.totalProducts = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize:(state, action) => {
      state.pageSize = action.payload;
    },
    clearFilter: () => initialState,
  },
});

export const { setFilters,setProductsCount, setPage, setPageSize } = productFiltersSlice.actions;

export default productFiltersSlice.reducer;

export const selectCurrentFilters = (state: RootState) => state.productFilters.productFilters;
export const selectProductsCount = (state: RootState) => state.productFilters.totalProducts;
export const selectPage = (state: RootState) => state.productFilters.page;
export const selectPageSize = (state: RootState) => state.productFilters.pageSize;
