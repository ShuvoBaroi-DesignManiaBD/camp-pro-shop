import { baseAPI } from "@/redux/api/baseApi";


const authApi = baseAPI.injectEndpoints({
  endpoints: (builder) => (
    {
    registerCustomer: builder.mutation<void, void>({
      query: (data)=>({
        url: `users/create-customer`,
        method: "POST",
        body: data
      }),
    }),
    login: builder.mutation<void, void>({
      query: (data)=>({
        url: `/auth/signin`,
        method: "POST",
        body: data
      }),
    }),
  }
)
});

export const { useRegisterCustomerMutation, useLoginMutation} = authApi;