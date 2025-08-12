import { apiSlice } from "../api";

export const invoiceApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // View All Invoices
    getInvoices: build.query({
      query: () => ({
        url: "invoices/",
        method: "GET",
      }),
    }),

    // View Single Invoice
    getSingleInvoice: build.query({
      query: (id) => ({
        url: `invoices/${id}/`,
        method: "GET",
      }),
    }),

    // Create Invoice
    createInvoice: build.mutation({
      query: (data) => ({
        url: "invoices/",
        method: "POST",
        body: data,
      }),
    }),

    // Update Invoice
    updateInvoice: build.mutation({
      query: ({ id, data }) => ({
        url: `invoices/${id}/update/`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete Invoice
    deleteInvoice: build.mutation({
      query: (id) => ({
        url: `invoices/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetSingleInvoiceQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
