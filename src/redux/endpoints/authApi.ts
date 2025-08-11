import { apiSlice } from "../api";
import { userLoggedIn } from "../slices/authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // User Register
    userRegister: build.mutation({
      query: (data) => ({
        url: "auth/signup/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // User Login
    userLogin: build.mutation({
      query: (data) => ({
        url: "auth/login/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          const response = result.data?.data;

          dispatch(
            userLoggedIn({
              email: response.email,
              refresh_token: response.refresh,
              access_token: response.access,
            }),
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // User Logout
    // userLoggedOut: builder.mutation({
    //   query: (token) => ({
    //     url: "/logout",
    //     method: "POST",
    //     headers: { Authorization: `Bearer ${token}` },
    //     // body:token
    //   }),
    //   async onQueryStarted(arg, { dispatch }) {
    //     try {
    //       dispatch(
    //         loggedOut({
    //           status: null,
    //           message: null,
    //           token: null,
    //           student: null,
    //         }),
    //       );
    //       persistor.purge(["auth"]);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   },
    // }),

    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    setNewPassword: build.mutation({
      query: ({ data, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    resetPassword: build.mutation({
      query: ({ data, userId }) => ({
        url: `/users/update-password/${userId}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),

    loggedInUserInfo: build.query({
      query: () => ({
        method: "GET",
        url: "/user/me",
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
  useResetPasswordMutation,
  useLoggedInUserInfoQuery,
} = authApi;
