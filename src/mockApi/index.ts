/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utility function to simulate an asynchronous API call.
 * It returns a Promise that resolves with the provided data after a delay.
 * @template T The type of data to be returned.
 * @param {T} data - The data to be returned by the mock API.
 * @param {number} [delay=500] - The delay in milliseconds before resolving the promise.
 * @param {boolean} [success=true] - Whether the mock call should succeed or fail.
 * @returns {Promise<T>} A promise that resolves with the data or rejects with an error.
 */
export const simulateApiResponse = <T>(
  data: T,
  delay: number = 500,
  success: boolean = true,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject(new Error("Mock API Error: Something went wrong."));
      }
    }, delay);
  });
};

// --- Type Definitions ---

interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  businessAddress?: string;
  phone?: string;
  role: "business_owner" | "admin";
  is2FAEnabled?: boolean;
}

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: { id: string; name: string };
  amount: number;
  status: "Outstanding" | "Paid" | "Cancelled" | "Estimate";
  tenderType: "Card" | "ACH" | "Cash" | null;
  timestampSent: string; // ISO string
  sentBy: "Email link" | "Text" | "Manual Entry";
  dueDate: string; // YYYY-MM-DD
  items: InvoiceItem[];
  taxRate: number; // e.g., 0.08 for 8%
  discount: number; // e.g., 0.05 for 5% or fixed amount
  footer: string;
  terms: string;
  passThroughFees: boolean;
  recurring: boolean;
  templateId: string;
}

interface ProductService {
  id: string;
  name: string;
  type: "service" | "product";
  costPerUnit: number;
}

interface Discount {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  isActive: boolean;
}

interface TaxRate {
  id: string;
  name: string;
  percentage: number;
  isActive: boolean;
}

interface InvoiceTemplate {
  id: string;
  name: string;
  logoUrl: string;
  brandColor: string;
  formatOption: "standard" | "minimal";
  policy: string;
}

interface UserPermission {
  id: string;
  name: string;
  key: string;
}

interface PlatformSettings {
  id: string;
  billingLimits: {
    maxInvoices: number;
    maxCustomers: number;
    storageLimitGB: number;
  };
  paymentGatewayConfig: {
    stripe: { merchantId: string; apiKey: string };
    paypal: { merchantId: string; apiKey: string };
    // Add other payment gateways as needed
  };
  subscriptionTiers: {
    id: string;
    name: string;
    price: number;
    features: string[];
  }[];
}

// --- Mock Data Definitions ---

const mockUsers: User[] = [
  {
    id: "user_123",
    email: "businessowner@example.com",
    name: "John Doe",
    businessName: "Doe Enterprises",
    businessAddress: "123 Business Rd, Suite 100, City, State, 12345",
    phone: "+15551234567",
    role: "business_owner",
    is2FAEnabled: true,
  },
  {
    id: "user_456",
    email: "admin@example.com",
    name: "Admin User",
    businessName: "Platform Admin",
    role: "admin",
  },
];

const mockInvoices: Invoice[] = [
  {
    id: "inv_001",
    invoiceNumber: "INV-2023-001",
    customer: { id: "cust_001", name: "Alice Smith" },
    amount: 150.0,
    status: "Outstanding",
    tenderType: null,
    timestampSent: "2023-07-01T10:00:00Z",
    sentBy: "Email link",
    dueDate: "2023-07-15",
    items: [
      {
        id: "prod_001",
        name: "Web Design Service",
        quantity: 1,
        unitPrice: 120.0,
        total: 120.0,
      },
      {
        id: "prod_002",
        name: "Hosting Fee (Monthly)",
        quantity: 1,
        unitPrice: 30.0,
        total: 30.0,
      },
    ],
    taxRate: 0.08,
    discount: 0,
    footer: "Thank you for your business!",
    terms: "Payment due within 15 days.",
    passThroughFees: false,
    recurring: false,
    templateId: "tpl_basic",
  },
  {
    id: "inv_002",
    invoiceNumber: "INV-2023-002",
    customer: { id: "cust_002", name: "Bob Johnson" },
    amount: 75.5,
    status: "Paid",
    tenderType: "Card",
    timestampSent: "2023-06-20T14:30:00Z",
    sentBy: "Text",
    dueDate: "2023-07-01",
    items: [
      {
        id: "prod_003",
        name: "Consultation Hour",
        quantity: 1.5,
        unitPrice: 50.0,
        total: 75.0,
      },
      {
        id: "prod_004",
        name: "Travel Expense",
        quantity: 1,
        unitPrice: 0.5,
        total: 0.5,
      },
    ],
    taxRate: 0,
    discount: 0,
    footer: "Looking forward to our next meeting.",
    terms: "Immediate payment required.",
    passThroughFees: true,
    recurring: false,
    templateId: "tpl_basic",
  },
  {
    id: "inv_003",
    invoiceNumber: "EST-2023-001",
    customer: { id: "cust_001", name: "Alice Smith" },
    amount: 300.0,
    status: "Estimate",
    tenderType: null,
    timestampSent: "2023-07-05T09:00:00Z",
    sentBy: "Email link",
    dueDate: "2023-07-20",
    items: [
      {
        id: "prod_001",
        name: "Web Design Service",
        quantity: 1,
        unitPrice: 120.0,
        total: 120.0,
      },
      {
        id: "prod_005",
        name: "SEO Optimization",
        quantity: 1,
        unitPrice: 180.0,
        total: 180.0,
      },
    ],
    taxRate: 0.08,
    discount: 0.05, // 5% discount
    footer: "This is an estimate, subject to change.",
    terms: "Estimate valid for 30 days.",
    passThroughFees: false,
    recurring: false,
    templateId: "tpl_modern",
  },
  {
    id: "inv_004",
    invoiceNumber: "INV-2023-004",
    customer: { id: "cust_003", name: "Charlie Brown" },
    amount: 200.0,
    status: "Cancelled",
    tenderType: null,
    timestampSent: "2023-06-10T11:00:00Z",
    sentBy: "Email link",
    dueDate: "2023-06-25",
    items: [
      {
        id: "prod_006",
        name: "Graphic Design",
        quantity: 1,
        unitPrice: 200.0,
        total: 200.0,
      },
    ],
    taxRate: 0,
    discount: 0,
    footer: "Cancelled as per request.",
    terms: "",
    passThroughFees: false,
    recurring: false,
    templateId: "tpl_basic",
  },
  {
    id: "inv_005",
    invoiceNumber: "INV-2023-005",
    customer: { id: "cust_004", name: "Diana Prince" },
    amount: 50.0,
    status: "Paid",
    tenderType: "Cash",
    timestampSent: "2023-07-08T16:00:00Z",
    sentBy: "Manual Entry",
    dueDate: "2023-07-08",
    items: [
      {
        id: "prod_007",
        name: "Small Repair",
        quantity: 1,
        unitPrice: 50.0,
        total: 50.0,
      },
    ],
    taxRate: 0,
    discount: 0,
    footer: "Received cash payment.",
    terms: "",
    passThroughFees: false,
    recurring: false,
    templateId: "tpl_basic",
  },
];

const mockProductsServices: ProductService[] = [
  {
    id: "prod_001",
    name: "Web Design Service",
    type: "service",
    costPerUnit: 120.0,
  },
  {
    id: "prod_002",
    name: "Hosting Fee (Monthly)",
    type: "service",
    costPerUnit: 30.0,
  },
  {
    id: "prod_003",
    name: "Consultation Hour",
    type: "service",
    costPerUnit: 50.0,
  },
  { id: "prod_004", name: "Travel Expense", type: "product", costPerUnit: 0.5 },
  {
    id: "prod_005",
    name: "SEO Optimization",
    type: "service",
    costPerUnit: 180.0,
  },
  {
    id: "prod_006",
    name: "Graphic Design",
    type: "service",
    costPerUnit: 200.0,
  },
  { id: "prod_007", name: "Small Repair", type: "service", costPerUnit: 50.0 },
  {
    id: "prod_008",
    name: "Custom Software Development",
    type: "service",
    costPerUnit: 150.0,
  },
];

const mockDiscounts: Discount[] = [
  {
    id: "disc_001",
    name: "New Client Discount",
    type: "percentage",
    value: 0.1,
    isActive: true,
  }, // 10%
  {
    id: "disc_002",
    name: "Holiday Sale",
    type: "fixed",
    value: 25.0,
    isActive: false,
  }, // $25 off
];

const mockTaxRates: TaxRate[] = [
  { id: "tax_001", name: "State Sales Tax", percentage: 0.08, isActive: true }, // 8%
  {
    id: "tax_002",
    name: "Local Service Tax",
    percentage: 0.02,
    isActive: true,
  }, // 2%
];

const mockInvoiceTemplates: InvoiceTemplate[] = [
  {
    id: "tpl_basic",
    name: "Basic Template",
    logoUrl: "https://placehold.co/150x50/000/FFF?text=YourLogo", // Placeholder
    brandColor: "#3498db",
    formatOption: "standard",
    policy: "Payment due upon receipt.",
  },
  {
    id: "tpl_modern",
    name: "Modern Template",
    logoUrl: "https://placehold.co/150x50/000/FFF?text=YourLogo", // Placeholder
    brandColor: "#2ecc71",
    formatOption: "minimal",
    policy: "Late payments may incur a 5% fee.",
  },
];

const mockUserPermissions: UserPermission[] = [
  { id: "perm_001", name: "Can Create Invoices", key: "can_create_invoices" },
  { id: "perm_002", name: "Can Manage Customers", key: "can_manage_customers" },
  { id: "perm_003", name: "Can View Reports", key: "can_view_reports" },
  { id: "perm_004", name: "Can Manage Settings", key: "can_manage_settings" },
  {
    id: "perm_005",
    name: "Can Access Admin Panel",
    key: "can_access_admin_panel",
  }, // For super admin
];

const mockPlatformSettings: PlatformSettings = {
  id: "global_settings",
  billingLimits: {
    maxInvoices: 1000,
    maxCustomers: 500,
    storageLimitGB: 10,
  },
  paymentGatewayConfig: {
    stripe: { merchantId: "mock_stripe_id", apiKey: "mock_stripe_key" },
    paypal: { merchantId: "mock_paypal_id", apiKey: "mock_paypal_key" },
  },
  subscriptionTiers: [
    {
      id: "tier_basic",
      name: "Basic",
      price: 10,
      features: ["Invoicing", "50 Customers"],
    },
    {
      id: "tier_pro",
      name: "Pro",
      price: 30,
      features: ["All Basic", "Unlimited Customers", "Reporting"],
    },
  ],
};

// --- Mock API Functions ---

export const authApi = {
  /**
   * Simulates user login.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string, user: User}>}
   */
  login: async (
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> => {
    // Basic mock validation
    if (email === "businessowner@example.com" && password === "password123") {
      const user = mockUsers.find((u) => u.email === email);
      if (user)
        return simulateApiResponse({
          token: "mock_jwt_token_business_owner",
          user,
        });
    }
    if (email === "admin@example.com" && password === "adminpass") {
      const user = mockUsers.find((u) => u.email === email);
      if (user)
        return simulateApiResponse({ token: "mock_jwt_token_admin", user });
    }
    return simulateApiResponse(null as any, 500, false); // Simulate login failure
  },

  /**
   * Simulates user registration.
   * @param {Omit<User, 'id' | 'role'>} userData - { email, password, name, businessName, phone, is2FAEnabled }
   * @returns {Promise<{message: string}>}
   */
  signup: async (
    userData: Omit<User, "id" | "role">,
  ): Promise<{ message: string }> => {
    // In a real app, you'd add the user to a mock DB
    console.log("Mock Signup:", userData);
    return simulateApiResponse({
      message:
        "User registered successfully. Please verify your phone for 2FA.",
    });
  },

  /**
   * Simulates 2FA verification.
   * @param {string} userId
   * @param {string} code
   * @returns {Promise<{message: string}>}
   */
  verify2FA: async (
    userId: string,
    code: string,
  ): Promise<{ message: string }> => {
    if (code === "123456") {
      // Simple mock code
      console.log("Mock Verify 2FA:", userId, code);
      return simulateApiResponse({ message: "2FA verified successfully." });
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates getting the current authenticated user's profile.
   * @param {string} token - Mock token (not actually used for auth in this mock)
   * @returns {Promise<User>}
   */
  getProfile: async (token: string): Promise<User> => {
    console.log("Mock Get Profile:", token);
    // In a real app, token would determine the user. Here, we return a default mock user.
    const user = mockUsers.find((u) => u.role === "business_owner"); // Default for business owner view
    if (user) return simulateApiResponse(user);
    return simulateApiResponse(null as any, 500, false); // Should not happen with valid mock data
  },

  /**
   * Simulates updating user/business profile.
   * @param {string} userId
   * @param {Partial<User>} profileData
   * @returns {Promise<User>}
   */
  updateProfile: async (
    userId: string,
    profileData: Partial<User>,
  ): Promise<User> => {
    console.log(`Mock Update Profile for ${userId}:`, profileData);
    // Find and update the user in mockUsers array (for demonstration)
    const userIndex = mockUsers.findIndex((u) => u.id === userId);
    if (userIndex > -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...profileData };
      return simulateApiResponse(mockUsers[userIndex]);
    }
    return simulateApiResponse(null as any, 500, false);
  },
};

export const invoiceApi = {
  /**
   * Simulates fetching a list of invoices.
   * @param {object} [filters={}] - Optional filters (status, customerId, search)
   * @returns {Promise<Invoice[]>}
   */
  getInvoices: async (
    filters: { status?: Invoice["status"] | "All"; search?: string } = {},
  ): Promise<Invoice[]> => {
    let filteredInvoices: Invoice[] = [...mockInvoices];

    if (filters.status && filters.status !== "All") {
      filteredInvoices = filteredInvoices.filter(
        (inv) => inv.status === filters.status,
      );
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredInvoices = filteredInvoices.filter(
        (inv) =>
          inv.invoiceNumber.toLowerCase().includes(searchTerm) ||
          inv.customer.name.toLowerCase().includes(searchTerm),
      );
    }
    // Add more filter logic as needed

    return simulateApiResponse(filteredInvoices);
  },

  /**
   * Simulates fetching a single invoice by ID.
   * @param {string} invoiceId
   * @returns {Promise<Invoice>}
   */
  getInvoiceById: async (invoiceId: string): Promise<Invoice> => {
    const invoice = mockInvoices.find((inv) => inv.id === invoiceId);
    if (invoice) {
      return simulateApiResponse(invoice);
    }
    return simulateApiResponse(null as any, 500, false); // Not found
  },

  /**
   * Simulates creating a new invoice/estimate.
   * @param {Omit<Invoice, 'id' | 'timestampSent'>} invoiceData
   * @returns {Promise<Invoice>}
   */
  createInvoice: async (
    invoiceData: Omit<Invoice, "id" | "timestampSent">,
  ): Promise<Invoice> => {
    const newId = `inv_${Date.now()}`;
    const newInvoice: Invoice = {
      id: newId,
      ...invoiceData,
      timestampSent: new Date().toISOString(),
    };
    mockInvoices.push(newInvoice); // Add to mock data
    console.log("Mock Create Invoice:", newInvoice);
    return simulateApiResponse(newInvoice);
  },

  /**
   * Simulates updating an existing invoice.
   * @param {string} invoiceId
   * @param {Partial<Invoice>} updateData
   * @returns {Promise<Invoice>}
   */
  updateInvoice: async (
    invoiceId: string,
    updateData: Partial<Invoice>,
  ): Promise<Invoice> => {
    const index = mockInvoices.findIndex((inv) => inv.id === invoiceId);
    if (index > -1) {
      mockInvoices[index] = { ...mockInvoices[index], ...updateData };
      console.log("Mock Update Invoice:", mockInvoices[index]);
      return simulateApiResponse(mockInvoices[index]);
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates changing an invoice's status (e.g., void/cancel, paid by cash).
   * @param {string} invoiceId
   * @param {Invoice['status']} newStatus
   * @returns {Promise<{message: string}>}
   */
  updateInvoiceStatus: async (
    invoiceId: string,
    newStatus: Invoice["status"],
  ): Promise<{ message: string }> => {
    const invoice = mockInvoices.find((inv) => inv.id === invoiceId);
    if (invoice) {
      invoice.status = newStatus;
      console.log(`Mock Invoice ${invoiceId} status updated to ${newStatus}`);
      return simulateApiResponse({
        message: `Invoice ${invoiceId} status updated to ${newStatus}`,
      });
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates sending an invoice link (email/text).
   * @param {string} invoiceId
   * @param {'email' | 'text'} sendMethod
   * @returns {Promise<{message: string}>}
   */
  sendInvoiceLink: async (
    invoiceId: string,
    sendMethod: "email" | "text",
  ): Promise<{ message: string }> => {
    console.log(`Mock Send Invoice ${invoiceId} via ${sendMethod}`);
    return simulateApiResponse({
      message: `Invoice link sent via ${sendMethod}.`,
    });
  },

  /**
   * Simulates generating a preview/download link for an invoice.
   * @param {string} invoiceId
   * @returns {Promise<{downloadUrl: string}>}
   */
  getInvoiceDownloadLink: async (
    invoiceId: string,
  ): Promise<{ downloadUrl: string }> => {
    return simulateApiResponse({
      downloadUrl: `https://mockapi.com/invoices/${invoiceId}/download.pdf`,
    });
  },

  /**
   * Simulates setting up a recurring invoice.
   * @param {string} invoiceId
   * @param {object} recurringRules - Placeholder for actual recurring rules type
   * @returns {Promise<{message: string}>}
   */
  setupRecurringInvoice: async (
    invoiceId: string,
    recurringRules: object,
  ): Promise<{ message: string }> => {
    const invoice = mockInvoices.find((inv) => inv.id === invoiceId);
    if (invoice) {
      invoice.recurring = true; // Simple toggle for mock
      console.log(
        `Mock Recurring Invoice setup for ${invoiceId} with rules:`,
        recurringRules,
      );
      return simulateApiResponse({
        message: `Recurring invoice for ${invoiceId} set up.`,
      });
    }
    return simulateApiResponse(null as any, 500, false);
  },
};

export const settingsApi = {
  /**
   * Simulates fetching user management data (users and permissions).
   * @returns {Promise<{users: User[], permissions: UserPermission[]}>}
   */
  getUserManagementData: async (): Promise<{
    users: User[];
    permissions: UserPermission[];
  }> => {
    // Return mock users for the current business owner (excluding admin for this view)
    const businessUsers = mockUsers.filter((u) => u.role === "business_owner");
    return simulateApiResponse({
      users: businessUsers,
      permissions: mockUserPermissions,
    });
  },

  /**
   * Simulates updating user permissions.
   * @param {string} userId
   * @param {string[]} permissionKeys
   * @returns {Promise<{message: string}>}
   */
  updateUserPermissions: async (
    userId: string,
    permissionKeys: string[],
  ): Promise<{ message: string }> => {
    console.log(`Mock Update Permissions for ${userId}:`, permissionKeys);
    return simulateApiResponse({ message: "User permissions updated." });
  },

  /**
   * Simulates fetching notification preferences.
   * @returns {Promise<object>}
   */
  getNotificationPreferences: async (): Promise<{
    email: {
      invoiceSent: boolean;
      paymentReceived: boolean;
      reminderSent: boolean;
    };
    sms: {
      invoiceSent: boolean;
      paymentReceived: boolean;
      reminderSent: boolean;
    };
  }> => {
    return simulateApiResponse({
      email: { invoiceSent: true, paymentReceived: true, reminderSent: false },
      sms: { invoiceSent: false, paymentReceived: true, reminderSent: true },
    });
  },

  /**
   * Simulates updating notification preferences.
   * @param {object} preferencesData
   * @returns {Promise<object>}
   */
  updateNotificationPreferences: async (preferencesData: {
    email?: object;
    sms?: object;
  }): Promise<{ message: string; email?: object; sms?: object }> => {
    console.log("Mock Update Notification Preferences:", preferencesData);
    return simulateApiResponse({
      message: "Notification preferences updated.",
      ...preferencesData,
    });
  },

  /**
   * Simulates fetching discounts.
   * @returns {Promise<Discount[]>}
   */
  getDiscounts: async (): Promise<Discount[]> => {
    return simulateApiResponse(mockDiscounts);
  },

  /**
   * Simulates creating a new discount.
   * @param {Omit<Discount, 'id'>} discountData
   * @returns {Promise<Discount>}
   */
  createDiscount: async (
    discountData: Omit<Discount, "id">,
  ): Promise<Discount> => {
    const newId = `disc_${Date.now()}`;
    const newDiscount: Discount = { id: newId, ...discountData };
    mockDiscounts.push(newDiscount);
    console.log("Mock Create Discount:", newDiscount);
    return simulateApiResponse(newDiscount);
  },

  /**
   * Simulates updating an existing discount.
   * @param {string} discountId
   * @param {Partial<Discount>} updateData
   * @returns {Promise<Discount>}
   */
  updateDiscount: async (
    discountId: string,
    updateData: Partial<Discount>,
  ): Promise<Discount> => {
    const index = mockDiscounts.findIndex((d) => d.id === discountId);
    if (index > -1) {
      mockDiscounts[index] = { ...mockDiscounts[index], ...updateData };
      console.log("Mock Update Discount:", mockDiscounts[index]);
      return simulateApiResponse(mockDiscounts[index]);
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates fetching tax rates.
   * @returns {Promise<TaxRate[]>}
   */
  getTaxRates: async (): Promise<TaxRate[]> => {
    return simulateApiResponse(mockTaxRates);
  },

  /**
   * Simulates creating a new tax rate.
   * @param {Omit<TaxRate, 'id'>} taxRateData
   * @returns {Promise<TaxRate>}
   */
  createTaxRate: async (taxRateData: Omit<TaxRate, "id">): Promise<TaxRate> => {
    const newId = `tax_${Date.now()}`;
    const newTaxRate: TaxRate = { id: newId, ...taxRateData };
    mockTaxRates.push(newTaxRate);
    console.log("Mock Create Tax Rate:", newTaxRate);
    return simulateApiResponse(newTaxRate);
  },

  /**
   * Simulates updating an existing tax rate.
   * @param {string} taxRateId
   * @param {Partial<TaxRate>} updateData
   * @returns {Promise<TaxRate>}
   */
  updateTaxRate: async (
    taxRateId: string,
    updateData: Partial<TaxRate>,
  ): Promise<TaxRate> => {
    const index = mockTaxRates.findIndex((t) => t.id === taxRateId);
    if (index > -1) {
      mockTaxRates[index] = { ...mockTaxRates[index], ...updateData };
      console.log("Mock Update Tax Rate:", mockTaxRates[index]);
      return simulateApiResponse(mockTaxRates[index]);
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates fetching invoice templates.
   * @returns {Promise<InvoiceTemplate[]>}
   */
  getInvoiceTemplates: async (): Promise<InvoiceTemplate[]> => {
    return simulateApiResponse(mockInvoiceTemplates);
  },

  /**
   * Simulates creating a new invoice template.
   * @param {Omit<InvoiceTemplate, 'id'>} templateData
   * @returns {Promise<InvoiceTemplate>}
   */
  createInvoiceTemplate: async (
    templateData: Omit<InvoiceTemplate, "id">,
  ): Promise<InvoiceTemplate> => {
    const newId = `tpl_${Date.now()}`;
    const newTemplate: InvoiceTemplate = { id: newId, ...templateData };
    mockInvoiceTemplates.push(newTemplate);
    console.log("Mock Create Invoice Template:", newTemplate);
    return simulateApiResponse(newTemplate);
  },

  /**
   * Simulates updating an existing invoice template.
   * @param {string} templateId
   * @param {Partial<InvoiceTemplate>} updateData
   * @returns {Promise<InvoiceTemplate>}
   */
  updateInvoiceTemplate: async (
    templateId: string,
    updateData: Partial<InvoiceTemplate>,
  ): Promise<InvoiceTemplate> => {
    const index = mockInvoiceTemplates.findIndex((t) => t.id === templateId);
    if (index > -1) {
      mockInvoiceTemplates[index] = {
        ...mockInvoiceTemplates[index],
        ...updateData,
      };
      console.log("Mock Update Invoice Template:", mockInvoiceTemplates[index]);
      return simulateApiResponse(mockInvoiceTemplates[index]);
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates fetching products and services.
   * @returns {Promise<ProductService[]>}
   */
  getProductsServices: async (): Promise<ProductService[]> => {
    return simulateApiResponse(mockProductsServices);
  },

  /**
   * Simulates creating a new product or service.
   * @param {Omit<ProductService, 'id'>} itemData
   * @returns {Promise<ProductService>}
   */
  createProductService: async (
    itemData: Omit<ProductService, "id">,
  ): Promise<ProductService> => {
    const newId = `prod_${Date.now()}`;
    const newItem: ProductService = { id: newId, ...itemData };
    mockProductsServices.push(newItem);
    console.log("Mock Create Product/Service:", newItem);
    return simulateApiResponse(newItem);
  },

  /**
   * Simulates updating an existing product or service.
   * @param {string} itemId
   * @param {Partial<ProductService>} updateData
   * @returns {Promise<ProductService>}
   */
  updateProductService: async (
    itemId: string,
    updateData: Partial<ProductService>,
  ): Promise<ProductService> => {
    const index = mockProductsServices.findIndex((item) => item.id === itemId);
    if (index > -1) {
      mockProductsServices[index] = {
        ...mockProductsServices[index],
        ...updateData,
      };
      console.log("Mock Update Product/Service:", mockProductsServices[index]);
      return simulateApiResponse(mockProductsServices[index]);
    }
    return simulateApiResponse(null as any, 500, false);
  },
};

export const adminApi = {
  /**
   * Simulates fetching all platform users (for admin panel).
   * @returns {Promise<User[]>}
   */
  getAllPlatformUsers: async (): Promise<User[]> => {
    return simulateApiResponse(mockUsers);
  },

  /**
   * Simulates updating a platform user's role/status (for admin panel).
   * @param {string} userId
   * @param {Partial<User>} updateData
   * @returns {Promise<User>}
   */
  updatePlatformUser: async (
    userId: string,
    updateData: Partial<User>,
  ): Promise<User> => {
    const index = mockUsers.findIndex((u) => u.id === userId);
    if (index > -1) {
      mockUsers[index] = { ...mockUsers[index], ...updateData };
      console.log("Mock Update Platform User:", mockUsers[index]);
      return simulateApiResponse(mockUsers[index]);
    }
    return simulateApiResponse(null as any, 500, false);
  },

  /**
   * Simulates fetching global platform settings.
   * @returns {Promise<PlatformSettings>}
   */
  getGlobalSettings: async (): Promise<PlatformSettings> => {
    return simulateApiResponse(mockPlatformSettings);
  },

  /**
   * Simulates updating global platform settings.
   * @param {Partial<PlatformSettings>} settingsData
   * @returns {Promise<PlatformSettings>}
   */
  updateGlobalSettings: async (
    settingsData: Partial<PlatformSettings>,
  ): Promise<PlatformSettings> => {
    Object.assign(mockPlatformSettings, settingsData); // Update in place
    console.log("Mock Update Global Settings:", mockPlatformSettings);
    return simulateApiResponse(mockPlatformSettings);
  },

  /**
   * Simulates 'ghosting' into a merchant's view.
   * In a real app, this would involve backend session management.
   * Here, it just returns the target user's profile.
   * @param {string} merchantId
   * @returns {Promise<User>} - The merchant's user object
   */
  ghostIntoMerchantView: async (merchantId: string): Promise<User> => {
    const merchant = mockUsers.find(
      (u) => u.id === merchantId && u.role === "business_owner",
    );
    if (merchant) {
      return simulateApiResponse(merchant);
    }
    return simulateApiResponse(null as any, 500, false);
  },
};
