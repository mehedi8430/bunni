/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TInvoice, TInvoiceData } from "@/types";
import { simulateApiResponse } from ".";

const mockEstimates: TInvoice[] & TInvoiceData[] = [
  {
    id: "EST-000001-1",
    customerName: "David Johnson",
    status: "Pending", // Changed status
    orderNumber: "#72648252",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "1",

    title: "Web Development Services Estimate", // Changed title for clarity
    customerId: "cust_001",
    invoiceNumber: "EST-000001-1", // Changed to EST number
    invoiceDate: "05 Feb, 2025",
    serviceDate: "01 Feb, 2025",
    dueDate: "10 Feb, 2025",
    footerTerms: "Estimate valid for 30 days.", // Changed terms
    items: [
      {
        id: "item-1",
        description: "Leak Detection",
        quantity: 1,
        price: 500,
        tax: 0,
        amount: 500,
        taxId: "tax-0",
        discount: 0,
      },
      {
        id: "item-2",
        description: "Pipe Repair",
        quantity: 1,
        price: 135,
        tax: 0,
        amount: 135,
        taxId: "tax-0",
        discount: 0,
      },
    ],
    subtotal: 635,
    discount: 0,
    totalTax: 0,
    total: 635,
    color: "#4CAF50",
  },
  {
    id: "EST-000001-2",
    customerName: "Sarah Thompson",
    status: "Approved", // Changed status
    orderNumber: "#A12B4D67",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "2",

    title: "Consulting Services Estimate", // Changed title
    customerId: "cust_002",
    invoiceNumber: "EST-000001-2", // Changed to EST number
    invoiceDate: "05 Feb, 2025",
    serviceDate: "03 Feb, 2025",
    dueDate: "12 Feb, 2025",
    footerTerms: "Estimate requires client approval.", // Changed terms
    items: [
      {
        id: "item-3",
        description: "Pipe Repair",
        quantity: 2,
        price: 300,
        tax: 0,
        amount: 600,
        taxId: "tax-0",
        discount: 0,
      },
      {
        id: "item-4",
        description: "Leak Detection",
        quantity: 1,
        price: 35,
        tax: 0,
        amount: 35,
        taxId: "tax-0",
        discount: 0,
      },
    ],
    subtotal: 635,
    discount: 0,
    totalTax: 0,
    total: 635,
    color: "#FF9800",
  },
  {
    id: "EST-000001-3",
    customerName: "Michael Brown",
    status: "Rejected", // Changed status
    orderNumber: "#E5F67834",
    amount: 635,
    tenderType: "Bank Transfer",
    date: "05 Feb, 2025",
    templateId: "3",

    title: "SEO Optimization Estimate", // Changed title
    customerId: "cust_003",
    invoiceNumber: "EST-000001-3", // Changed to EST number
    invoiceDate: "05 Feb, 2025",
    serviceDate: "04 Feb, 2025",
    dueDate: "11 Feb, 2025",
    footerTerms: "Estimate declined by client.", // Changed terms
    items: [
      {
        id: "item-5",
        description: "Pipe Repair",
        quantity: 1,
        price: 400,
        tax: 0,
        amount: 400,
        taxId: "tax-0",
        discount: 0,
      },
      {
        id: "item-6",
        description: "Leak Detection",
        quantity: 1,
        price: 235,
        tax: 0,
        amount: 235,
        taxId: "tax-0",
        discount: 0,
      },
    ],
    subtotal: 635,
    discount: 0,
    totalTax: 0,
    total: 635,
    color: "#2196F3",
  },
  {
    id: "EST-000001-4",
    customerName: "Emily White",
    status: "Pending", // Changed status
    orderNumber: "#B4C9201",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "4",

    title: "Graphic Design Package Estimate", // Changed title
    customerId: "cust_004",
    invoiceNumber: "EST-000001-4", // Changed to EST number
    invoiceDate: "05 Feb, 2025",
    serviceDate: "02 Feb, 2025",
    dueDate: "09 Feb, 2025",
    footerTerms: "Estimate pending review.", // Changed terms
    items: [
      {
        id: "item-7",
        description: "Logo Design",
        quantity: 1,
        price: 500,
        tax: 0,
        amount: 500,
        taxId: "tax-0",
        discount: 0,
      },
      {
        id: "item-8",
        description: "Flyer Design",
        quantity: 1,
        price: 135,
        tax: 0,
        amount: 135,
        taxId: "tax-0",
        discount: 0,
      },
    ],
    subtotal: 635,
    discount: 0,
    totalTax: 0,
    total: 635,
    color: "#9C27B0",
  },
  {
    id: "EST-000001-5",
    customerName: "Jessica Green",
    status: "Approved", // Changed status
    orderNumber: "#FBE6A237",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "1",

    title: "Photography Services Estimate", // Changed title
    customerId: "cust_005",
    invoiceNumber: "EST-000001-5", // Changed to EST number
    invoiceDate: "05 Feb, 2025",
    serviceDate: "01 Feb, 2025",
    dueDate: "08 Feb, 2025",
    footerTerms: "Estimate accepted.", // Changed terms
    items: [
      {
        id: "item-9",
        description: "Portrait Session",
        quantity: 1,
        price: 635,
        tax: 0,
        amount: 635,
        taxId: "tax-0",
        discount: 0,
      },
    ],
    subtotal: 635,
    discount: 0,
    totalTax: 0,
    total: 635,
    color: "#E91E63",
  },
  {
    id: "EST-000001-6",
    customerName: "Daniel Anderson",
    status: "Pending", // Changed status
    orderNumber: "#E52F8B90",
    amount: 635,
    tenderType: "Bank Transfer",
    date: "05 Feb, 2025",
    templateId: "2",

    title: "App Design UI/UX Estimate", // Changed title
    customerId: "cust_003",
    invoiceNumber: "EST-000001-6", // Changed to EST number
    invoiceDate: "05 Feb, 2025",
    serviceDate: "03 Feb, 2025",
    dueDate: "15 Feb, 2025",
    footerTerms: "Awaiting client feedback.", // Changed terms
    items: [
      {
        id: "item-10",
        description: "UI Wireframes",
        quantity: 1,
        price: 300,
        tax: 0,
        amount: 300,
        taxId: "tax-0",
        discount: 0,
      },
      {
        id: "item-11",
        description: "High Fidelity Design",
        quantity: 1,
        price: 335,
        tax: 0,
        amount: 335,
        taxId: "tax-0",
        discount: 0,
      },
    ],
    subtotal: 635,
    discount: 0,
    totalTax: 0,
    total: 635,
    color: "#3F51B5",
  },
  {
    id: "EST-000001-7",
    customerName: "Laura King",
    status: "Rejected", // Changed status
    orderNumber: "#C5F5B88",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "3",

    title: "Video Editing Service Estimate", // Changed title
    customerId: "cust_006",
    invoiceNumber: "EST-000001-7", // Changed to EST number
    invoiceDate: "05 Feb, 2025",
    serviceDate: "04 Feb, 2025",
    dueDate: "14 Feb, 2025",
    footerTerms: "Client decided not to proceed.", // Changed terms
    items: [
      {
        id: "item-12",
        description: "Basic Editing",
        quantity: 1,
        price: 300,
        tax: 0,
        amount: 300,
        taxId: "tax-0",
        discount: 0,
      },
      {
        id: "item-13",
        description: "Transitions and Effects",
        quantity: 1,
        price: 335,
        tax: 0,
        amount: 335,
        taxId: "tax-0",
        discount: 0,
      },
    ],
    subtotal: 635,
    discount: 0,
    totalTax: 0,
    total: 635,
    color: "#009688",
  },
  {
    id: "EST-000001-8",
    customerName: "James Martinez",
    status: "Approved", // Changed status
    orderNumber: "#9A5D3E74",
    amount: 829,
    tenderType: "Bank Transfer",
    date: "08 Feb, 2025",
    templateId: "4",

    title: "E-commerce Development Estimate", // Changed title
    customerId: "cust_007",
    invoiceNumber: "EST-000001-8", // Changed to EST number
    invoiceDate: "08 Feb, 2025",
    serviceDate: "05 Feb, 2025",
    dueDate: "15 Feb, 2025",
    footerTerms: "Estimate signed and approved.", // Changed terms
    items: [
      {
        id: "item-14",
        description: "Frontend Setup",
        quantity: 1,
        price: 500,
        tax: 0,
        amount: 500,
        taxId: "tax-0",
        discount: 0,
      },
      {
        id: "item-15",
        description: "Backend API Integration",
        quantity: 1,
        price: 329,
        tax: 0,
        amount: 329,
        taxId: "tax-0",
        discount: 0,
      },
    ],
    subtotal: 829,
    discount: 0,
    totalTax: 0,
    total: 829,
    color: "#795548",
  },
];

export const estimatesApi = {
  /**
   * Simulates fetching a list of estimates with pagination.
   * @param {object} params - Filters and pagination parameters
   * @returns {Promise<{ data: TInvoice[], total: number }>}
   */
  getEstimates: async ({
    search,
    page = 1,
    limit = 10,
    date,
  }: {
    search?: string;
    page?: number;
    limit?: number;
    date?: string;
  } = {}): Promise<{ data: TInvoice[]; total: number }> => {
    let filteredEstimates: TInvoice[] = [...mockEstimates]; // Use mockEstimates

    // Apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredEstimates = filteredEstimates.filter(
        (est) =>
          est.customerName.toLowerCase().includes(searchTerm) ||
          est.id.toLowerCase().includes(searchTerm) ||
          est.status.toLowerCase().includes(searchTerm) ||
          est.tenderType.toLowerCase().includes(searchTerm) ||
          est.orderNumber.toLowerCase().includes(searchTerm),
      );
    }

    // Apply date filter
    if (date) {
      const selectedDate = new Date(date);
      filteredEstimates = filteredEstimates.filter((est) => {
        const estimateDate = new Date(est.date);
        return (
          estimateDate.getFullYear() === selectedDate.getFullYear() &&
          estimateDate.getMonth() === selectedDate.getMonth() &&
          estimateDate.getDate() === selectedDate.getDate()
        ); // Match by year, month, and day
      });
    }

    // Calculate pagination
    const total = filteredEstimates.length;
    const startIndex = (page - 1) * limit;
    const paginatedEstimates = filteredEstimates.slice(
      startIndex,
      startIndex + limit,
    );

    return simulateApiResponse({ data: paginatedEstimates, total });
  },

  /**
   * Simulates fetching a single estimate by id.
   * @param {string} id
   * @returns {Promise<TInvoice>}
   */
  getEstimateById: async (id: string): Promise<TInvoice> => {
    const estimate = mockEstimates.find((est) => est.id === id); // Use mockEstimates
    if (estimate) {
      return simulateApiResponse(estimate);
    }
    // Return a rejected promise or throw an error for not found
    return simulateApiResponse(null as any, 404, false); // Changed status to 404 for not found
  },
};
