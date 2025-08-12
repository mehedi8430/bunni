import { apiSlice } from "../api";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // View All Customers
    getCustomers: build.query({
      query: () => ({
        url: "customers/",
        method: "GET",
      }),
    }),

    // View Single customer
    getSingleCustomer: build.query({
      query: (id) => ({
        url: `customers/${id}/`,
        method: "GET",
      }),
    }),

    // Create customers
    createCustomer: build.mutation({
      query: (data) => ({
        url: "customers/",
        method: "POST",
        body: data,
      }),
    }),

    // Update customer
    updateCustomer: build.mutation({
      query: ({ id, data }) => ({
        url: `customers/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete customer
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `customers/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetSingleCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
