import { apiSlice } from "../../api";

export const discountApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // View All Discounts
    getDiscounts: build.query({
      query: () => ({
        url: "discounts/",
        method: "GET",
      }),
    }),

    // View Single Discount
    getSingleDiscount: build.query({
      query: (id) => ({
        url: `discounts/${id}/`,
        method: "GET",
      }),
    }),

    // Create Discount
    createDiscount: build.mutation({
      query: (data) => ({
        url: "discounts/",
        method: "POST",
        body: data,
      }),
    }),

    // Update Discount
    updateDiscount: build.mutation({
      query: ({ id, data }) => ({
        url: `discounts/${id}/update/`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete Discount
    deleteDiscount: build.mutation({
      query: (id) => ({
        url: `discounts/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDiscountsQuery,
  useGetSingleDiscountQuery,
  useCreateDiscountMutation,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,
} = discountApi;
