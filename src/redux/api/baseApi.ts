import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://camp-pro-shop-backend.vercel.app/api/v1/",
  }),
  endpoints: ()=>({}),
});

