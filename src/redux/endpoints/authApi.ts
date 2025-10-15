import { apiSlice } from "../api";
import { userLoggedIn, userLoggedOut } from "../slices/authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // User Register
    userRegister: build.mutation({
      query: (data) => ({
        url: "auth/signup/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // User Login
    userLogin: build.mutation({
      query: (data) => ({
        url: "auth/login/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],

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
    userLoggedOut: build.mutation({
      query: (refresh_token) => ({
        url: "auth/logout/",
        method: "POST",
        body: refresh_token,
      }),
      async onQueryStarted({ dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // Verify OTP
    verifyOTP: build.mutation({
      query: (data) => ({
        url: "auth/verify-otp/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log("Full result:", result);

          const response = result.data?.data;

          dispatch(
            userLoggedIn({
              email: response?.email ?? null,
              refresh_token: response?.refresh,
              access_token: response?.access,
            })
          )
        } catch (err) {
          console.log(err);
        }
      }
    }),

    // Resend OTP
    resendOTP: build.mutation({
      query: (data) => ({
        url: "auth/resend-otp/",
        method: "POST",
        body: data,
      }),
    }),

    // Reset Password
    resetPassword: build.mutation({
      query: (data) => ({
        url: "auth/reset-password/",
        method: "POST",
        body: data,
      }),
    }),

    // forget password
    forgetPassword: build.mutation({
      query: (data) => ({
        url: "auth/forgot-password/",
        method: "POST",
        body: data,
      }),
    }),

    // Get User Profile
    getUserProfile: build.query({
      query: () => ({
        url: "profile/",
        method: "GET",
      }),
    }),

    // Update User Profile
    updateUserProfile: build.mutation({
      query: (data) => ({
        url: "profile/",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLoggedOutMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useResetPasswordMutation,
  useForgetPasswordMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = authApi;
