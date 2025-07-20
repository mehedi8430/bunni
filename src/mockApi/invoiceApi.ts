/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TDiscount, TInvoice, TTaxRate } from "@/types";
import { simulateApiResponse } from ".";

const mockDiscounts: TDiscount[] = [
  {
    id: "DISC-0001",
    name: "Seasonal Sale",
    amount: "10%",
    createdDate: "Jun 28, 2025, 6:03 AM",
    status: "Active",
    type: "Percentage",
  },
  {
    id: "DISC-0002",
    name: "Loyalty Discount",
    amount: "$50.00",
    createdDate: "Jun 28, 2025, 6:03 AM",
    status: "Inactive",
    type: "Fixed Amount",
  },
  {
    id: "DISC-0003",
    name: "Referral Bonus",
    amount: "15%",
    createdDate: "Jun 28, 2025, 2:03 PM",
    status: "Inactive",
    type: "Percentage",
  },
  {
    id: "DISC-0004",
    name: "Seasonal Sale",
    amount: "5%",
    createdDate: "Jun 28, 2025, 2:03 PM",
    status: "Active",
    type: "Percentage",
  },
];

export const mockTaxRates: TTaxRate[] = [
  {
    id: "TAX-0001",
    name: "VAT",
    amount: "10%",
    createdDate: "Jun 28, 2025, 6:03 AM",
    lastLogin: "Pending Invitation",
    rate: "Percentage",
    status: "Active",
  },
  {
    id: "TAX-0002",
    name: "Sales Tax",
    amount: "$50.00",
    createdDate: "Jun 28, 2025, 6:03 AM",
    lastLogin: "Jun 28, 2025, 6:03 AM",
    rate: "Fixed Amount",
    status: "Inactive",
  },
  {
    id: "TAX-0003",
    name: "GST",
    amount: "15%",
    createdDate: "Jun 28, 2025, 2:03 PM",
    lastLogin: "Jun 28, 2025, 2:03 PM",
    rate: "Percentage",
    status: "Inactive",
  },
  {
    id: "TAX-0004",
    name: "Service Tax",
    amount: "5%",
    createdDate: "Jun 28, 2025, 2:03 PM",
    lastLogin: "Jun 28, 2025, 2:03 PM",
    rate: "Percentage",
    status: "Active",
  },
];

const mockInvoices: TInvoice[] = [
  {
    id: "INV-000001-1",
    customerName: "David Johnson",
    status: "Paid",
    orderNumber: "#72648252",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "1",
  },
  {
    id: "INV-000001-2",
    customerName: "Sarah Thompson",
    status: "Unpaid",
    orderNumber: "#A12B4D67",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "2",
  },
  {
    id: "INV-000001-3",
    customerName: "Michael Brown",
    status: "Paid",
    orderNumber: "#E5F67834",
    amount: 635,
    tenderType: "Bank Transfer",
    date: "05 Feb, 2025",
    templateId: "3",
  },
  {
    id: "INV-000001-4",
    customerName: "Emily White",
    status: "Save",
    orderNumber: "#B4C9201",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "4",
  },
  {
    id: "INV-000001-5",
    customerName: "Jessica Green",
    status: "Paid",
    orderNumber: "#FBE6A237",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "1",
  },
  {
    id: "INV-000001-6",
    customerName: "Daniel Anderson",
    status: "Save",
    orderNumber: "#E52F8B90",
    amount: 635,
    tenderType: "Bank Transfer",
    date: "05 Feb, 2025",
    templateId: "2",
  },
  {
    id: "INV-000001-7",
    customerName: "Laura King",
    status: "Unpaid",
    orderNumber: "#C5F5B88",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "3",
  },
  {
    id: "INV-000001-8",
    customerName: "James Martinez",
    status: "Paid",
    orderNumber: "#9A5D3E74",
    amount: 829,
    tenderType: "Bank Transfer",
    date: "08 Feb, 2025",
    templateId: "4",
  },
];

export const invoiceApi = {
  /**
   * Simulates fetching a list of invoices with pagination.
   * @param {object} params - Filters and pagination parameters
   * @returns {Promise<{ data: Invoice[], total: number }>}
   */
  getInvoices: async ({
    search,
    page = 1,
    limit = 10,
  }: {
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{ data: TInvoice[]; total: number }> => {
    let filteredInvoices: TInvoice[] = [...mockInvoices];

    // Apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredInvoices = filteredInvoices.filter(
        (inv) =>
          inv.customerName.toLowerCase().includes(searchTerm) ||
          inv.id.toLowerCase().includes(searchTerm) ||
          inv.status.toLowerCase().includes(searchTerm) ||
          inv.tenderType.toLowerCase().includes(searchTerm) ||
          inv.orderNumber.toLowerCase().includes(searchTerm),
      );
    }

    // Calculate pagination
    const total = filteredInvoices.length;
    const startIndex = (page - 1) * limit;
    const paginatedInvoices = filteredInvoices.slice(
      startIndex,
      startIndex + limit,
    );

    return simulateApiResponse({ data: paginatedInvoices, total });
  },

  /**
   * Simulates fetching a single invoice by id.
   * @param {string} id
   * @returns {Promise<Invoice>}
   */
  getInvoiceById: async (id: string): Promise<TInvoice> => {
    const invoice = mockInvoices.find((inv) => inv.id === id);
    if (invoice) {
      return simulateApiResponse(invoice);
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates fetching a list of discounts with pagination.
   * @param {object} params - Filters and pagination parameters
   * @returns {Promise<{ data: TDiscount[], total: number }>}
   */
  getDiscounts: async ({
    search,
    page = 1,
    limit = 10,
  }: {
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{ data: TDiscount[]; total: number }> => {
    let filteredDiscounts: TDiscount[] = [...mockDiscounts];

    if (search) {
      const searchTerm = search.toLowerCase();
      filteredDiscounts = filteredDiscounts.filter(
        (disc) =>
          disc.name.toLowerCase().includes(searchTerm) ||
          String(disc.amount).toLowerCase().includes(searchTerm) ||
          disc.status.toLowerCase().includes(searchTerm) ||
          disc.createdDate.toLowerCase().includes(searchTerm),
      );
    }

    const total = filteredDiscounts.length;
    const startIndex = (page - 1) * limit;
    const paginatedDiscounts = filteredDiscounts.slice(
      startIndex,
      startIndex + limit,
    );

    return simulateApiResponse({ data: paginatedDiscounts, total });
  },

  /**
   * Simulates fetching a single discount by id.
   * @param {string} id
   * @returns {Promise<TDiscount>}
   */
  getDiscountById: async (id: string): Promise<TDiscount> => {
    const discount = mockDiscounts.find((disc) => disc.id === id);
    if (discount) {
      return simulateApiResponse(discount);
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates fetching a list of tax rates with pagination.
   * @param {object} params - Filters and pagination parameters
   * @returns {Promise<{ data: TTaxRate[], total: number }>}
   */
  getTaxRates: async ({
    search,
    page = 1,
    limit = 10,
  }: {
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{ data: TTaxRate[]; total: number }> => {
    let filteredTaxRates: TTaxRate[] = [...mockTaxRates];

    if (search) {
      const searchTerm = search.toLowerCase();
      filteredTaxRates = filteredTaxRates.filter(
        (tax) =>
          tax.name.toLowerCase().includes(searchTerm) ||
          String(tax.amount).toLowerCase().includes(searchTerm) ||
          tax.lastLogin?.toLowerCase().includes(searchTerm) ||
          tax.createdDate.toLowerCase().includes(searchTerm),
      );
    }

    const total = filteredTaxRates.length;
    const startIndex = (page - 1) * limit;
    const paginatedTaxRates = filteredTaxRates.slice(
      startIndex,
      startIndex + limit,
    );

    return simulateApiResponse({ data: paginatedTaxRates, total });
  },

  /**
   * Simulates fetching a single tax rate by id.
   * @param {string} id
   * @returns {Promise<TTaxRate>}
   */
  getTaxRateById: async (id: string): Promise<TTaxRate> => {
    const taxRate = mockTaxRates.find((tax) => tax.id === id);
    if (taxRate) {
      return simulateApiResponse(taxRate);
    }
    return simulateApiResponse(null as any, 500, false);
  },
};
