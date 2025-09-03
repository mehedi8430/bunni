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
    // get all business
    getAllBusiness: builder.query({
      query: () => ({
        url: "/business/",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateBusynessMutation, useGetAllBusinessQuery } = busynessApi;
export default busynessApi;
