import { apiSlice } from "../../api";

export const footerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // View All Footers
    getFooters: build.query({
      query: () => ({
        url: "footers/",
        method: "GET",
      }),
    }),

    // View Single Footer
    getSingleFooter: build.query({
      query: (id) => ({
        url: `footers/${id}/`,
        method: "GET",
      }),
    }),

    // Update Footer
    updateFooter: build.mutation({
      query: ({ id, data }) => ({
        url: `footers/${id}/update/`,
        method: "PUT",
        body: data,
      }),
    }),

    // Create Footer
    createFooter: build.mutation({
      query: (data) => ({
        url: "footers/",
        method: "POST",
        body: data,
      }),
    }),

    // Delete Footer
    deleteFooter: build.mutation({
      query: (id) => ({
        url: `footers/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFootersQuery,
  useGetSingleFooterQuery,
  useUpdateFooterMutation,
  useCreateFooterMutation,
  useDeleteFooterMutation,
} = footerApi;
