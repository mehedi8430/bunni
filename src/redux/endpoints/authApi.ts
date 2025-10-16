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
    logoutUser: build.mutation({
      query: (body) => ({
        url: "auth/logout/",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // Wait for the server response
          await queryFulfilled;
          // Then clear tokens
          dispatch(userLoggedOut());
          // Clear all cached queries (like currentUser)
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log("Logout failed:", err);
        }
      },
      invalidatesTags: ["Auth", "User"],
    }),

    // Verify OTP for registration
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

    // forgate password otp verification
    forgetPasswordOtpVerification: build.mutation({
      query: (data) => ({
        url: "auth/reset-password/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // forget password otp verification
    forgetPassword: build.mutation({
      query: (data) => ({
        url: "auth/forgot-password/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
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
  useLogoutUserMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useForgetPasswordOtpVerificationMutation,
  useForgetPasswordMutation,
  useUpdateUserProfileMutation,
} = authApi;
