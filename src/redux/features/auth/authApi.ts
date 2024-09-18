import { baseAPI } from "@/redux/api/baseApi";
import { TUpdateUser } from "@/types";

const authApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    registerCustomer: builder.mutation<void, void>({
      query: (data) => ({
        url: `users/create-customer`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<{ token: string }, void>({
      query: (data) => ({
        url: `/auth/signin`,
        method: "POST",
        body: data,
      })
    }),
    updateUser: builder.mutation<
      void,
      {
        userId: string;
        updatedValues: Partial<TUpdateUser|FormData>;
      }
    >({
      query: ({ userId, updatedValues }) => ({
        url: `users/update-user/${userId}`,
        method: "PATCH",
        body: updatedValues,
      }),
    }),
    uploadProfilePhoto: builder.mutation<
  void,
  {
    userId: string;
    file: File;
    type?: string
  }
>({
  query: ({ userId, file, type=null }) => {
    console.log(userId, file);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    type && formData.append('type', type);
    
    // To check what is inside formData
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log(formData.entries());
    
    return {
      url: `users/update-profile-photo?userId=${userId}&type=${type}`,
      method: "PATCH",
      body: formData,
    };
  },
}),

  }),
});

export const {
  useRegisterCustomerMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useUploadProfilePhotoMutation,
} = authApi;
