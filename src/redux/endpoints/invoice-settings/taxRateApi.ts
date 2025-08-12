import { apiSlice } from "../../api";

export const taxRateApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // View All Tax Rates
    getTaxRates: build.query({
      query: () => ({
        url: "tax-rates/",
        method: "GET",
      }),
    }),

    // View Single Tax Rate
    getSingleTaxRate: build.query({
      query: (id) => ({
        url: `tax-rates/${id}/`,
        method: "GET",
      }),
    }),

    // Create Tax Rate
    createTaxRate: build.mutation({
      query: (data) => ({
        url: "tax-rates/",
        method: "POST",
        body: data,
      }),
    }),

    // Update Tax Rate
    updateTaxRate: build.mutation({
      query: ({ id, data }) => ({
        url: `tax-rates/${id}/update/`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete Tax Rate
    deleteTaxRate: build.mutation({
      query: (id) => ({
        url: `tax-rates/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTaxRatesQuery,
  useGetSingleTaxRateQuery,
  useCreateTaxRateMutation,
  useUpdateTaxRateMutation,
  useDeleteTaxRateMutation,
} = taxRateApi;
