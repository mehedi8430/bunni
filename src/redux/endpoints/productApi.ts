import { apiSlice } from "../api";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // View All Products
    getProducts: build.query({
      query: (body) => {
        console.log("Fetching products with data:", body);
        return (
          {
            url: "products/",
            method: "GET",
            body,
          }
        )
      },
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
      query: (data) => {
          console.log("Creating product with data:", data);
        return (
          {
            url: "products/",
            method: "POST",
            body: data,
            withCredentials: true,
          }
        )
      },
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
