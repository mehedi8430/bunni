/* eslint-disable @typescript-eslint/no-explicit-any */
import { simulateApiResponse } from ".";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  truncated_tokens: string;
  company: string;
  businessName: string;
  address: string;
  achToken: string; // Added achToken as a string
}

const mockCustomers: Customer[] = [
  {
    id: "cust_001",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    phone: "+12223334444",
    truncated_tokens: "1Z999AA10123456784",
    company: "Mitsubishi Motors",
    businessName: "Smith & Co.",
    address: "456 Oak Ave, Town, State, 67890",
    achToken: "tok_ach_xxxx5678",
  },
  {
    id: "cust_002",
    name: "Bob Johnson",
    email: "bob.j@example.com",
    phone: "+17778889999",
    truncated_tokens: "1Z999AA10123456784",
    company: "Johnson & Johnson",
    businessName: "Johnson Solutions",
    address: "789 Pine Ln, Village, State, 10111",
    achToken: "",
  },
  {
    id: "cust_003",
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    phone: "+11112223333",
    truncated_tokens: "1Z999AA10123456784",
    company: "Brown Industries",
    businessName: "Brown Design",
    address: "101 Maple St, Hamlet, State, 12131",
    achToken: "",
  },
  {
    id: "cust_004",
    name: "Diana Prince",
    email: "diana.p@example.com",
    phone: "+19998887777",
    truncated_tokens: "1Z999AA10123456784",
    company: "Wonder Innovations",
    businessName: "Wonder Innovations",
    address: "202 Amazon Way, Paradise, State, 14151",
    achToken: "",
  },
];

export const customerApi = {
  /**
   * Simulates fetching a list of customers with pagination.
   * @param {object} params - Filters and pagination parameters
   * @returns {Promise<{ data: Customer[], total: number }>}
   */
  getCustomers: async ({
    search,
    page = 1,
    limit = 10,
  }: {
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{ data: Customer[]; total: number }> => {
    let filteredCustomers: Customer[] = [...mockCustomers];

    // Apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(
        (cust) =>
          cust.name.toLowerCase().includes(searchTerm) ||
          cust.email.toLowerCase().includes(searchTerm) ||
          cust.businessName.toLowerCase().includes(searchTerm),
      );
    }

    // Calculate pagination
    const total = filteredCustomers.length;
    const startIndex = (page - 1) * limit;
    const paginatedCustomers = filteredCustomers.slice(
      startIndex,
      startIndex + limit,
    );

    return simulateApiResponse({ data: paginatedCustomers, total });
  },

  /**
   * Simulates fetching a single customer by ID.
   * @param {string} customerId
   * @returns {Promise<Customer>}
   */
  getCustomerById: async (customerId: string): Promise<Customer> => {
    const customer = mockCustomers.find((cust) => cust.id === customerId);
    if (customer) {
      return simulateApiResponse(customer);
    }
    return simulateApiResponse(null as any, 500, false);
  },
};
