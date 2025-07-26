/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TDiscount, TInvoice, TInvoiceData, TInvoiceFooter, TTaxRate } from "@/types";
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

export const mockInvoiceFooter: TInvoiceFooter[] = [
  {
    id: "FOOTER-0001",
    footerContent: "Thank you for your business!",
  },
  {
    id: "FOOTER-0002",
    footerContent: "Payment is due within 30 days.",
  },
  {
    id: "FOOTER-0003",
    footerContent: "For any inquiries, contact us at support@example.com",
  },
];

const mockInvoices: TInvoice[] & TInvoiceData[] = [
  {
    id: "INV-000001-1",
    customerName: "David Johnson",
    status: "Paid",
    orderNumber: "#72648252",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "1",

    title: "Web Development Services",
    customerId: "cust_001",
    invoiceNumber: "INV-000001-1",
    invoiceDate: "05 Feb, 2025",
    serviceDate: "01 Feb, 2025",
    dueDate: "10 Feb, 2025",
    footerTerms: "Payment is due within 7 days.",
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
    id: "INV-000001-2",
    customerName: "Sarah Thompson",
    status: "Unpaid",
    orderNumber: "#A12B4D67",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "2",

    title: "Consulting Services",
    customerId: "cust_002",
    invoiceNumber: "INV-000001-2",
    invoiceDate: "05 Feb, 2025",
    serviceDate: "03 Feb, 2025",
    dueDate: "12 Feb, 2025",
    footerTerms: "Late payments will incur a 5% fee.",
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
    id: "INV-000001-3",
    customerName: "Michael Brown",
    status: "Paid",
    orderNumber: "#E5F67834",
    amount: 635,
    tenderType: "Bank Transfer",
    date: "05 Feb, 2025",
    templateId: "3",

    title: "SEO Optimization",
    customerId: "cust_003",
    invoiceNumber: "INV-000001-3",
    invoiceDate: "05 Feb, 2025",
    serviceDate: "04 Feb, 2025",
    dueDate: "11 Feb, 2025",
    footerTerms: "No refunds after payment.",
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
    id: "INV-000001-4",
    customerName: "Emily White",
    status: "Save",
    orderNumber: "#B4C9201",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "4",

    title: "Graphic Design Package",
    customerId: "cust_004",
    invoiceNumber: "INV-000001-4",
    invoiceDate: "05 Feb, 2025",
    serviceDate: "02 Feb, 2025",
    dueDate: "09 Feb, 2025",
    footerTerms: "All designs are final upon delivery.",
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
    id: "INV-000001-5",
    customerName: "Jessica Green",
    status: "Paid",
    orderNumber: "#FBE6A237",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "1",

    title: "Photography Services",
    customerId: "cust_005",
    invoiceNumber: "INV-000001-5",
    invoiceDate: "05 Feb, 2025",
    serviceDate: "01 Feb, 2025",
    dueDate: "08 Feb, 2025",
    footerTerms: "50% refund for cancellations within 24 hours.",
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
    id: "INV-000001-6",
    customerName: "Daniel Anderson",
    status: "Save",
    orderNumber: "#E52F8B90",
    amount: 635,
    tenderType: "Bank Transfer",
    date: "05 Feb, 2025",
    templateId: "2",

    title: "App Design UI/UX",
    customerId: "cust_003",
    invoiceNumber: "INV-000001-6",
    invoiceDate: "05 Feb, 2025",
    serviceDate: "03 Feb, 2025",
    dueDate: "15 Feb, 2025",
    footerTerms: "Revisions included up to 3 rounds.",
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
    id: "INV-000001-7",
    customerName: "Laura King",
    status: "Unpaid",
    orderNumber: "#C5F5B88",
    amount: 635,
    tenderType: "Credit Card",
    date: "05 Feb, 2025",
    templateId: "3",

    title: "Video Editing Service",
    customerId: "cust_006",
    invoiceNumber: "INV-000001-7",
    invoiceDate: "05 Feb, 2025",
    serviceDate: "04 Feb, 2025",
    dueDate: "14 Feb, 2025",
    footerTerms: "Final video delivered in MP4 format.",
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
    id: "INV-000001-8",
    customerName: "James Martinez",
    status: "Paid",
    orderNumber: "#9A5D3E74",
    amount: 829,
    tenderType: "Bank Transfer",
    date: "08 Feb, 2025",
    templateId: "4",

    title: "E-commerce Development",
    customerId: "cust_007",
    invoiceNumber: "INV-000001-8",
    invoiceDate: "08 Feb, 2025",
    serviceDate: "05 Feb, 2025",
    dueDate: "15 Feb, 2025",
    footerTerms: "Project milestones as per contract.",
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
    date,
  }: {
    search?: string;
    page?: number;
    limit?: number;
    date?: string;
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

    // Apply date filter
    if (date) {
      const selectedDate = new Date(date);
      filteredInvoices = filteredInvoices.filter((inv) => {
        const invoiceDate = new Date(inv.date);
        return (
          invoiceDate.getFullYear() === selectedDate.getFullYear() &&
          invoiceDate.getMonth() === selectedDate.getMonth() &&
          invoiceDate.getDate() === selectedDate.getDate()
        ); // Match by year, month, and day
      });
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
