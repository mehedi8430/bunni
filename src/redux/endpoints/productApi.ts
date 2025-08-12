import { apiSlice } from "../api";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // View All Products
    getProducts: build.query({
      query: () => ({
        url: "products/",
        method: "GET",
      }),
    }),

    // View Single Product
    getSingleProduct: build.query({
      query: (id) => ({
        url: `products/${id}/`,
        method: "GET",
      }),
    }),

    // Create Product
    createProduct: build.mutation({
      query: (data) => ({
        url: "products/",
        method: "POST",
        body: data,
      }),
    }),

    // Update Product
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}/update/`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete Product
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `products/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
