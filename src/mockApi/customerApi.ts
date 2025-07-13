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
  achToken: string;
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
    achToken: "tok_ach_xxxx5678",
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
    achToken: "tok_ach_xxxx5678",
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
    achToken: "tok_ach_xxxx5678",
  },
  {
    id: "cust_005",
    name: "Eve Adams",
    email: "eve.a@example.com",
    phone: "+15551112222",
    truncated_tokens: "1Z999AA10123456784",
    company: "Adams Analytics",
    businessName: "Adams Data Solutions",
    address: "303 Cedar Dr, Cityville, State, 98765",
    achToken: "tok_ach_xxxx9012",
  },
  {
    id: "cust_006",
    name: "Frank White",
    email: "frank.w@example.com",
    phone: "+16664445555",
    truncated_tokens: "1Z999AA10123456784",
    company: "White Holdings",
    businessName: "White & Sons",
    address: "505 Birch Rd, Countryside, State, 23456",
    achToken: "tok_ach_xxxx5678",
  },
  {
    id: "cust_007",
    name: "Grace Taylor",
    email: "grace.t@example.com",
    phone: "+13337778888",
    truncated_tokens: "1Z999AA10123456784",
    company: "Taylor Tech",
    businessName: "Taylor Solutions Group",
    address: "606 Spruce Ct, Metropolis, State, 34567",
    achToken: "tok_ach_xxxx3456",
  },
  {
    id: "cust_008",
    name: "Henry Green",
    email: "henry.g@example.com",
    phone: "+14449990000",
    truncated_tokens: "1Z999AA10123456784",
    company: "Green Innovations",
    businessName: "Green Energy Systems",
    address: "707 Willow Way, Suburbia, State, 45678",
    achToken: "tok_ach_xxxx5678",
  },
  {
    id: "cust_009",
    name: "Ivy Lee",
    email: "ivy.l@example.com",
    phone: "+18881112222",
    truncated_tokens: "1Z999AA10123456784",
    company: "Lee Consulting",
    businessName: "Lee & Associates",
    address: "808 Poplar Ave, Downtown, State, 56789",
    achToken: "tok_ach_xxxx7890",
  },
  {
    id: "cust_010",
    name: "Jack King",
    email: "jack.k@example.com",
    phone: "+19993334444",
    truncated_tokens: "1Z999AA10123456784",
    company: "King Enterprises",
    businessName: "King Global",
    address: "909 Elm St, Uptown, State, 67890",
    achToken: "tok_ach_xxxx5678",
  },
  {
    id: "cust_011",
    name: "Jack King",
    email: "jack.k@example.com",
    phone: "+19993334444",
    truncated_tokens: "1Z999AA10123456784",
    company: "King Enterprises",
    businessName: "King Global",
    address: "909 Elm St, Uptown, State, 67890",
    achToken: "tok_ach_xxxx5678",
  },
  {
    id: "cust_012",
    name: "Jack King",
    email: "jack.k@example.com",
    phone: "+19993334444",
    truncated_tokens: "1Z999AA10123456784",
    company: "King Enterprises",
    businessName: "King Global",
    address: "909 Elm St, Uptown, State, 67890",
    achToken: "tok_ach_xxxx5678",
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
