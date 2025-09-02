import { apiSlice } from "../api";

export const busynessApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create busyness
    createBusyness: builder.mutation({
      query: (body) => ({
        url: "/business/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateBusynessMutation } = busynessApi;
export default busynessApi;
