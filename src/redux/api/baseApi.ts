import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import toast from "react-hot-toast";
import { logout, setUser } from "../features/auth/authSlice";

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('accessToken', `${token}`);
      }
  
      return headers;
    },
})

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle different status errors
  if (result?.error) {
    const status = result.error.status;
    if (status === 404 || status === 403) {
      toast.error(result.error.data?.message || 'An error occurred.');
    } else if (status === 401) {
      //* Send Refresh Token Request
      console.log('Sending refresh token');

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        console.log(data);
        
        if (data?.data?.accessToken) {
          console.log((api.getState() as RootState).auth.user);
          
          const user = (api.getState() as RootState).auth.user;

          // Update the token in state
          api.dispatch(
            setUser({
              user,
              token: data.data.accessToken,
            })
          );

          // Retry original request with new token
          result = await baseQuery(args, api, extraOptions);
          return result;
        } else {
          toast.error('Failed to refresh token. Logging out...');
          api.dispatch(logout());
        }
      } catch (error) {
        toast.error('Error refreshing token. Logging out...');
        api.dispatch(logout());
      }
    }
  }

  return result;
};



export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['semester', 'courses', 'offeredCourse'],
  endpoints: () => ({}),
});