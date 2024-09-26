import { baseAPI } from "@/redux/api/baseApi";
import {
  selectCurrentProducts,
  setProducts,
} from "@/redux/features/product/productSlice";
import { TProduct } from "@/types/product.type";
import { useAppSelector } from "@/redux/hooks";

const productApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, any>({
      query: ({ page = 1, limit = 6 }) => ({
        url: `products?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      onQueryStarted: async ({ dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const products = useAppSelector(selectCurrentProducts);
          !products && dispatch(setProducts(data.data as TProduct[])); // Dispatch the action to save products
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      providesTags: ["products"],
    }),
    getAProduct: builder.query<any, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
    updateAProduct: builder.mutation<
      void,
      {
        productId: string;
        updatedProduct: Partial<TProduct | unknown>;
        // updatedValues: Partial<TProduct|unknown>;
        // images: FormData,
      }
    >({
      query: ({ productId, updatedProduct }) => (
        console.log('update_query=>',updatedProduct, productId),
        {
          url: `products/update-product?productId=${productId}&type=product`,
          method: "PATCH",
          body: updatedProduct,
        }
      ),
      invalidatesTags: ["products"],
    }),
    deleteAProduct: builder.mutation<void, { id: string }>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    AddAProduct: builder.mutation<void, {data: Partial<TProduct | unknown>}>({
      query: ({data}) => (
        console.log(data),
        {
        url: `products/create-product?type=product`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAProductQuery,
  useUpdateAProductMutation,
  useDeleteAProductMutation,
  useAddAProductMutation,
} = productApi;
