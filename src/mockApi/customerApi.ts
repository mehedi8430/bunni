/* eslint-disable @typescript-eslint/no-explicit-any */
import { simulateApiResponse } from ".";

interface PaymentMethod {
  id: string;
  type: "Card" | "ACH";
  last4: string;
  brand?: string; // e.g., 'Visa', 'Mastercard'
  bankName?: string;
  truncatedToken: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  truncated_tokens: string;
  company: string;
  businessName: string;
  address: string;
  paymentMethods: PaymentMethod[];
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
    paymentMethods: [
      {
        id: "pm_001",
        type: "Card",
        last4: "1234",
        brand: "Visa",
        truncatedToken: "tok_visa_xxxx1234",
      },
      {
        id: "pm_002",
        type: "ACH",
        bankName: "Bank of America",
        last4: "5678",
        truncatedToken: "tok_ach_xxxx5678",
      },
    ],
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
    paymentMethods: [],
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
    paymentMethods: [
      {
        id: "pm_003",
        type: "Card",
        last4: "9012",
        brand: "Mastercard",
        truncatedToken: "tok_mc_xxxx9012",
      },
    ],
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
    paymentMethods: [],
  },
];

export const customerApi = {
  /**
   * Simulates fetching a list of customers.
   * @param {object} [filters={}] - Optional filters (search)
   * @returns {Promise<Customer[]>}
   */
  getCustomers: async (
    filters: { search?: string } = {},
  ): Promise<Customer[]> => {
    let filteredCustomers: Customer[] = [...mockCustomers];
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(
        (cust) =>
          cust.name.toLowerCase().includes(searchTerm) ||
          cust.email.toLowerCase().includes(searchTerm) ||
          cust.businessName.toLowerCase().includes(searchTerm),
      );
    }
    return simulateApiResponse(filteredCustomers);
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

  /**
   * Simulates creating a new customer.
   * @param {Omit<Customer, 'id' | 'paymentMethods'>} customerData
   * @returns {Promise<Customer>}
   */
  createCustomer: async (
    customerData: Omit<Customer, "id" | "paymentMethods">,
  ): Promise<Customer> => {
    const newId = `cust_${Date.now()}`;
    const newCustomer: Customer = {
      id: newId,
      paymentMethods: [],
      ...customerData,
    };
    mockCustomers.push(newCustomer);
    console.log("Mock Create Customer:", newCustomer);
    return simulateApiResponse(newCustomer);
  },

  /**
   * Simulates updating an existing customer.
   * @param {string} customerId
   * @param {Partial<Customer>} updateData
   * @returns {Promise<Customer>}
   */
  updateCustomer: async (
    customerId: string,
    updateData: Partial<Customer>,
  ): Promise<Customer> => {
    const index = mockCustomers.findIndex((cust) => cust.id === customerId);
    if (index > -1) {
      mockCustomers[index] = { ...mockCustomers[index], ...updateData };
      console.log("Mock Update Customer:", mockCustomers[index]);
      return simulateApiResponse(mockCustomers[index]);
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates adding a payment method to a customer.
   * @param {string} customerId
   * @param {Omit<PaymentMethod, 'id'>} paymentMethodData
   * @returns {Promise<Customer>}
   */
  addPaymentMethod: async (
    customerId: string,
    paymentMethodData: Omit<PaymentMethod, "id">,
  ): Promise<Customer> => {
    const customer = mockCustomers.find((cust) => cust.id === customerId);
    if (customer) {
      const newPmId = `pm_${Date.now()}`;
      customer.paymentMethods.push({ id: newPmId, ...paymentMethodData });
      console.log(
        `Mock Added Payment Method for ${customerId}:`,
        paymentMethodData,
      );
      return simulateApiResponse(customer);
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates deleting a payment method from a customer.
   * @param {string} customerId
   * @param {string} paymentMethodId
   * @returns {Promise<{message: string}>}
   */
  deletePaymentMethod: async (
    customerId: string,
    paymentMethodId: string,
  ): Promise<{ message: string }> => {
    const customer = mockCustomers.find((cust) => cust.id === customerId);
    if (customer) {
      customer.paymentMethods = customer.paymentMethods.filter(
        (pm) => pm.id !== paymentMethodId,
      );
      console.log(
        `Mock Deleted Payment Method ${paymentMethodId} from ${customerId}`,
      );
      return simulateApiResponse({ message: "Payment method deleted." });
    }
    return simulateApiResponse(null as any, 500, false);
  },
};
