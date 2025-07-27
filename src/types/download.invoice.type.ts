

export type InvoiceTemplateProps = {
  invoice: {
    color?: string;
    footerTerms?: string;
    invoiceNumber?: string;
    invoiceDate?: string;
    dueDate?: string;
    serviceDate?: string;
    billTo: {
      name: string;
      address: string;
      phone: string;
    };
    paymentDetails: {
      accountType: string;
      accountNumber: string;
      paymentMethod: string;
      bankName: string;
    };
    items: {
      description: string;
      price: number;
      quantity: number;
      amount: number;
    }[];
    subtotal: number;
    totalTax: number;
    total: number;
  };
};