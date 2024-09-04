import { baseAPI } from "@/redux/api/baseApi";
import { selectCurrentProducts, setProducts } from "@/redux/features/product/productSlice";
import { TProduct } from "@/types/product.type";
import { AppDispatch } from "@/redux/store"; // Ensure this is correctly pointing to your store's dispatch type
import { useAppSelector } from "@/redux/hooks";

const productApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, any>({
      query: ({ page = 1, limit = 6 }) => ({
        url: `products?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      onQueryStarted: async ({ page, limit }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const products = useAppSelector(selectCurrentProducts);
          !products && dispatch(setProducts(data.data as TProduct[])); // Dispatch the action to save products
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
    }),
    getAProduct: builder.query<string, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetAProductQuery } = productApi;