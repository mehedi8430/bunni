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
    //     url: "auth/logout",
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

    // Verify OTP
    verifyOTP: build.mutation({
      query: (data) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Resend OTP
    resendOTP: build.mutation({
      query: (data) => ({
        url: "auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
} = authApi;
