import { apiSlice } from "../api";

export const busynessApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create busyness
    createBusyness: builder.mutation({
      query: (body) => ({
        url: "business-data/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Business"],
    }),
    // get all business
    getAllBusiness: builder.query({
      query: () => ({
        url: "/business/",
        method: "GET",
      }),
      providesTags: ["Business"],
    }),
  }),
});

export const { useCreateBusynessMutation, useGetAllBusinessQuery } = busynessApi;
export default busynessApi;
