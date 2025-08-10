import { toast } from "sonner";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../slices/authSlice";

interface ErrorResponse {
  code?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as { auth: { access_token: string } })?.auth
      ?.access_token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorData = result.error.data as ErrorResponse | undefined;
      if (errorData?.code === "token_not_valid") {
        toast.warning("your access token is expired!");
        api.dispatch(userLoggedOut());
      }
    }

    return result;
  },
  tagTypes: ["auth", "user"],
  endpoints: () => ({}),
});
