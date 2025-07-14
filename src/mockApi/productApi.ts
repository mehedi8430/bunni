/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TProduct } from "@/types";
import { simulateApiResponse } from ".";

const mockProducts: TProduct[] = [
  {
    id: "PROD-000001-1",
    name: "Pipe Repair",
    type: "Product",
    unit: "per hour",
    price: 100.0,
    description: "Standard pipe repair service",
  },
  {
    id: "PROD-000001-2",
    name: "Leak Detection",
    type: "Service",
    unit: "per month",
    price: 150.0,
    description: "Emergency pipe repair service",
  },
  {
    id: "PROD-000001-3",
    name: "Plumbing Check",
    type: "Product",
    unit: "per month",
    price: 200.0,
    description: "Residential plumbing solutions",
  },
  {
    id: "PROD-000001-4",
    name: "Drain Cleaning",
    type: "Service",
    unit: "per hour",
    price: 250.0,
    description: "Commercial plumbing maintenance",
  },
  {
    id: "PROD-000001-5",
    name: "Sewer Replacement",
    type: "Product",
    unit: "per month",
    price: 300.0,
    description: "Leak detection and repair",
  },
  {
    id: "PROD-000001-6",
    name: "Water Heater Setup",
    type: "Service",
    unit: "per hour",
    price: 350.0,
    description: "Drain cleaning and unclogging",
  },
  {
    id: "PROD-000001-7",
    name: "Fixture Installation",
    type: "Product",
    unit: "per hour",
    price: 400.0,
    description: "Pipe installation and replacement",
  },
  {
    id: "PROD-000001-8",
    name: "Plumbing Services",
    type: "Service",
    unit: "per month",
    price: 450.0,
    description: "Water heater repair and installation",
  },
  {
    id: "PROD-000001-9",
    name: "Pipe Insulation",
    type: "Product",
    unit: "per month",
    price: 500.0,
    description: "Sewer line inspection and repair",
  },
];

export const productApi = {
  /**
   * Simulates fetching a list of products with pagination.
   * @param {object} params - Filters and pagination parameters
   * @returns {Promise<{ data: Product[], total: number }>}
   */
  getProducts: async ({
    search,
    page = 1,
    limit = 10,
  }: {
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{ data: TProduct[]; total: number }> => {
    let filteredProducts: TProduct[] = [...mockProducts];

    // Apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (prod) =>
          prod.name.toLowerCase().includes(searchTerm) ||
          prod.type.toLowerCase().includes(searchTerm) ||
          prod.unit.toLowerCase().includes(searchTerm) ||
          prod.description.toLowerCase().includes(searchTerm),
      );
    }

    // Calculate pagination
    const total = filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + limit,
    );

    return simulateApiResponse({ data: paginatedProducts, total });
  },

  /**
   * Simulates fetching a single product by id.
   * @param {string} id
   * @returns {Promise<Product>}
   */
  getProductById: async (id: string): Promise<TProduct> => {
    const product = mockProducts.find((prod) => prod.id === id);
    if (product) {
      return simulateApiResponse(product);
    }
    return simulateApiResponse(null as any, 500, false);
  },
};
