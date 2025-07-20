import { images } from "@/lib/imageProvider";

type BillToFrom = {
  name: string;
  address: string;
  phone: string;
};

type PaymentDetails = {
  accountType: string;
  accountNumber: string;
  paymentMethod: string;
  bankName: string;
};

interface PreviewTemplateProps {
  titleColor: string;
  invoiceNumber: string;
  date: string;
  billTo: BillToFrom;
  billFrom: BillToFrom;
  paymentDetails: PaymentDetails;
  subTotal: number;
  tax: number;
  total: number;
}

export default function PreviewTemplate({
  titleColor = "#38988A",
  invoiceNumber = "123344",
  date = "12/12/24",
  billTo = {
    name: "John Doe",
    address: "123 Main St\nCity, State, Zip",
    phone: "555-1234",
  },
  billFrom = {
    name: "Jane Smith",
    address: "456 Elm St\nCity, State, Zip",
    phone: "555-5678",
  },
  paymentDetails = {
    accountType: "Bank Acc",
    accountNumber: "123456789",
    paymentMethod: "Bank",
    bankName: "Bank name",
  },
  subTotal = 1000,
  tax = 10,
  total = 1010,
}: Partial<PreviewTemplateProps>) {
  return (
    <div className="mx-auto max-w-4xl min-w-xl rounded-2xl bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center">
        <img
          src={images.templateLogo}
          alt="Logo"
          className="mx-auto my-4 h-[100px] w-[200px] object-contain"
        />
        <h1
          className="mb-4 text-5xl font-extrabold"
          style={{ color: titleColor }}
        >
          INVOICE
        </h1>
      </div>

      {/* Date and invoice number */}
      <div className="mb-6 flex justify-between rounded bg-gray-200 px-6 py-3 text-sm font-semibold uppercase">
        <span>Invoice n° {invoiceNumber}</span>
        <span>Date: {date}</span>
      </div>

      {/* Payment details */}
      <div className="mb-8 flex flex-wrap justify-between gap-8">
        <div className="min-w-[200px] flex-1">
          <div className="mb-1 font-bold uppercase">Bill To</div>
          <div className="font-bold">{billTo.name}</div>
          <div className="whitespace-pre-line">{billTo.address}</div>
          <div>{billTo.phone}</div>
        </div>
        <div className="min-w-[200px] flex-1">
          <div className="mb-1 font-bold uppercase">Bill From</div>
          <div className="font-bold">{billFrom.name}</div>
          <div className="whitespace-pre-line">{billFrom.address}</div>
          <div>{billFrom.phone}</div>
        </div>
        <div className="min-w-[200px] flex-1 text-right">
          <div className="mb-1 font-bold uppercase">Payment</div>
          <div className="font-bold uppercase">Paid by</div>
          <div>{paymentDetails.accountType}</div>
          <div>{paymentDetails.accountNumber}</div>
          <div className="font-bold uppercase">
            {paymentDetails.paymentMethod}
          </div>
          <div>{paymentDetails.bankName}</div>
        </div>
      </div>

      {/* Table Header */}
      <div
        className="flex justify-between rounded-t px-4 py-3"
        style={{ backgroundColor: titleColor, color: "#fff" }}
      >
        <div className="w-1/12 text-lg font-bold">Item</div>
        <div className="w-3/12 text-lg font-bold">Description</div>
        <div className="w-2/12 text-lg font-bold">Price</div>
        <div className="w-2/12 text-lg font-bold">Qty.</div>
        <div className="w-2/12 text-lg font-bold">Total</div>
      </div>
      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={`flex justify-between px-4 py-3 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-100"
          }`}
        >
          <div className="w-1/12">1</div>
          <div className="w-3/12">Service</div>
          <div className="w-2/12">$100</div>
          <div className="w-2/12">2</div>
          <div className="w-2/12">$200</div>
        </div>
      ))}

      {/* Subtotal, Tax, Total */}
      <div className="mt-6 flex flex-col items-end space-y-2">
        <div className="flex w-60 justify-between">
          <span>Subtotal:</span>
          <span>${subTotal}</span>
        </div>
        <div className="flex w-60 justify-between">
          <span>Tax:</span>
          <span>${tax}</span>
        </div>
        <div
          className="flex w-60 justify-between rounded px-2 py-1 font-bold"
          style={{ backgroundColor: titleColor, color: "#fff" }}
        >
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10">
        <div className="text-xl font-bold" style={{ color: titleColor }}>
          Thank you!
        </div>
        <div className="mt-2 mb-6 text-sm">
          The origin of the first constellation data back to prehistoric times
          purpose was to tell stories of their beliefs, experiences, Creation,
          or mythology.
        </div>
        <div
          className="flex items-center justify-between rounded px-6 py-3"
          style={{ backgroundColor: titleColor, color: "#fff" }}
        >
          <span className="font-bold">+01234345</span>
          <span className="font-bold">support@example.com</span>
        </div>
      </div>
    </div>
  );
}
