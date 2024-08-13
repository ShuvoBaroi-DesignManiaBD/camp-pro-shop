// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://camp-pro-shop-backend.vercel.app/api/v1/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: 'products',
        method: 'GET',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery } = baseAPI