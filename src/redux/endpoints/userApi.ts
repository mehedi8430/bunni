import { apiSlice } from "../api";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    userCreate: build.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    userDelete: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    userUpdate: build.mutation({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    allUsers: build.query({
      query: (params) => ({
        url: "users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    singleUsers: build.query({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    currentUser: build.query({
      query: () => ({
        url: "profile/",
        method: "GET",
      }),
      providesTags: ["User", "Auth"],
    }),
  }),
});

export const {
  useUserCreateMutation,
  useUserDeleteMutation,
  useUserUpdateMutation,
  useAllUsersQuery,
  useSingleUsersQuery,
  useCurrentUserQuery,
} = userApi;
