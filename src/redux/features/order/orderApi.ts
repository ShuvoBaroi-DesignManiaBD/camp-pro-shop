import { baseAPI } from "@/redux/api/baseApi";


const orderApi = baseAPI.injectEndpoints({
  endpoints: (builder) => (
    {
    createOrder: builder.mutation<void, void>({
      query: (data)=>({
        url: `/orders/create-order`,
        method: "POST",
        // headers:(accessToken && {accesstoken: accessToken}) || {refreshToken: refreshToken}||{},
        body: data
      }),
    }),
    captureOrder: builder.mutation<void, void>({
      query: (orderId)=>({
        url: `/orders/capture-order`,
        method: "POST",
        body: orderId
      }),
    }),
    myOrders: builder.query<any, any>({
      query: ({ userId,page = 1, limit = 5 })=>({
        url: `/orders/my-orders?userId=${userId}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    allOrders: builder.query<any, any>({
      query: ({ page = 1, limit = 5 })=>({
        url: `/orders/all-orders?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }
)
});

export const { useCreateOrderMutation, useCaptureOrderMutation, useMyOrdersQuery, useAllOrdersQuery} = orderApi;