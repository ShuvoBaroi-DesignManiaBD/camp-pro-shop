import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://camp-pro-shop-backend.vercel.app/api/v1/",
  }),
  endpoints: (builder) => (
    {
    getAllProducts: builder.query<any, any>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `products?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getAProduct: builder.query<string,string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
  }
),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery, useGetAProductQuery } = baseAPI;
