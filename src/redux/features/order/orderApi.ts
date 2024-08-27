import { baseAPI } from "@/redux/api/baseApi";


const orderApi = baseAPI.injectEndpoints({
  endpoints: (builder) => (
    {
    createOrder: builder.mutation<void, void>({
      query: (data)=>({
        url: `/order/create-order`,
        method: "POST",
        body: data
      }),
    }),
    captureOrder: builder.mutation<void, void>({
      query: (orderId)=>({
        url: `/paypal/capture-order`,
        method: "POST",
        body: orderId
      }),
    }),
  }
)
});

export const { useCreateOrderMutation, useCaptureOrderMutation} = orderApi;