import { baseAPI } from "@/redux/api/baseApi";

const productApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, any>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `products?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getAProduct: builder.query<string, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    })
  }),
});

export const { useGetAllProductsQuery, useGetAProductQuery } = productApi;
