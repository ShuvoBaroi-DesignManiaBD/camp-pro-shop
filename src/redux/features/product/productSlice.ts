import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { TProduct } from '@/types';
 

interface ProductState {
  products: TProduct[]; // Add a property for filtered products
}

const initialState: ProductState = {
  products: [],  // Initialize as null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<TProduct[]>) {
      console.log(state, action);
      state.products = action.payload;
    }
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const selectCurrentProducts = (state: RootState) => state?.products?.products;
