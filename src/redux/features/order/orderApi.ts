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
  }
)
});

export const { useCreateOrderMutation, useCaptureOrderMutation} = orderApi;