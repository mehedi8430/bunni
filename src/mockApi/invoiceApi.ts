/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TInvoice } from "@/types";
import { simulateApiResponse } from ".";

const mockInvoices: TInvoice[] = [
  {
    id: "INV-000001-1",
    customerName: "David Johnson",
    status: "Paid",
    orderNumber: "#72648252",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
  },
  {
    id: "INV-000001-2",
    customerName: "Sarah Thompson",
    status: "Unpaid",
    orderNumber: "#A12B4D67",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
  },
  {
    id: "INV-000001-3",
    customerName: "Michael Brown",
    status: "Paid",
    orderNumber: "#E5F67834",
    amount: 635,
    tenderType: "Bank Transfer",
    date: "05 Feb, 2025",
  },
  {
    id: "INV-000001-4",
    customerName: "Emily White",
    status: "Save",
    orderNumber: "#B4C9201",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
  },
  {
    id: "INV-000001-5",
    customerName: "Jessica Green",
    status: "Paid",
    orderNumber: "#FBE6A237",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
  },
  {
    id: "INV-000001-6",
    customerName: "Daniel Anderson",
    status: "Save",
    orderNumber: "#E52F8B90",
    amount: 635,
    tenderType: "Bank Transfer",
    date: "05 Feb, 2025",
  },
  {
    id: "INV-000001-7",
    customerName: "Laura King",
    status: "Unpaid",
    orderNumber: "#C5F5B88",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
  },
  {
    id: "INV-000001-8",
    customerName: "James Martinez",
    status: "Paid",
    orderNumber: "#9A5D3E74",
    amount: 829,
    tenderType: "Bank Transfer",
    date: "08 Feb, 2025",
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
};
