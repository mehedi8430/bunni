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
    <div
      className="max-w-xl min-w-xl overflow-hidden rounded-lg bg-white shadow-lg"
      style={{ color: titleColor }}
    >
      {/* Header */}
      <div className="mb-2 flex flex-col items-center">
        <img
          src={images.templateLogo}
          alt="Logo"
          className="mx-auto h-[100px] w-[200px] object-contain"
        />
        <h1 className="text-4xl font-extrabold" style={{ color: titleColor }}>
          INVOICE
        </h1>
      </div>

      {/* Date and invoice number */}
      <div className="mb-6 flex justify-between bg-gray-200 py-1">
        <div className="mx-auto flex w-full max-w-md justify-between text-xs font-medium uppercase">
          <span>Invoice n° {invoiceNumber}</span>
          <span>Date: {date}</span>
        </div>
      </div>

      {/* Payment details */}
      <div className="mx-auto mb-8 flex max-w-md flex-wrap justify-between gap-8">
        <div className="flex-1">
          <p className="mb-1 text-sm font-bold uppercase">Bill To</p>
          <p className="text-xs font-bold">{billTo.name}</p>
          <p className="text-xs whitespace-pre-line">{billTo.address}</p>
          <p className="text-xs">{billTo.phone}</p>
        </div>
        <div className="flex-1">
          <p className="mb-1 text-sm font-bold uppercase">Bill From</p>
          <p className="text-xs font-bold">{billFrom.name}</p>
          <p className="text-xs whitespace-pre-line">{billFrom.address}</p>
          <p className="text-xs">{billFrom.phone}</p>
        </div>
        <div className="flex-1 text-right">
          <p className="mb-1 text-sm font-bold uppercase">Payment</p>
          <p className="text-xs font-bold uppercase">Paid by</p>
          <p className="text-xs">{paymentDetails.accountType}</p>
          <p className="text-xs">{paymentDetails.accountNumber}</p>
          <p className="text-xs font-bold uppercase">
            {paymentDetails.paymentMethod}
          </p>
          <p className="text-xs">{paymentDetails.bankName}</p>
        </div>
      </div>

      {/* Product Table */}
      {/* Product Table */}
      <table className="mx-auto w-full max-w-md border-collapse overflow-hidden">
        <thead>
          <tr style={{ backgroundColor: titleColor, color: "#fff" }}>
            <th className="w-1/12 px-4 py-1 text-left text-xs font-bold">
              Item
            </th>
            <th className="w-6/12 px-4 py-1 text-left text-xs font-bold">
              Description
            </th>
            <th className="w-1/12 px-4 py-1 text-left text-xs font-bold">
              Price
            </th>
            <th className="w-1/12 px-4 py-1 text-left text-xs font-bold">
              Qty.
            </th>
            <th className="w-1/12 px-4 py-1 text-left text-xs font-bold">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="w-1/12 px-4 py-1 text-xs">1</td>
              <td className="w-3/12 px-4 py-1 text-xs">Service</td>
              <td className="w-2/12 px-4 py-1 text-xs">$100</td>
              <td className="w-2/12 px-4 py-1 text-xs">2</td>
              <td className="w-2/12 px-4 py-1 text-xs">$200</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={4}
              className="px-4 py-1 text-right text-xs font-semibold"
            >
              Subtotal:
            </td>
            <td className="px-4 py-1 text-xs">${subTotal}</td>
          </tr>
          <tr>
            <td
              colSpan={4}
              className="px-4 py-1 text-right text-xs font-semibold"
            >
              Tax:
            </td>
            <td className="px-4 py-1 text-xs">${tax}</td>
          </tr>
          <tr>
            <td className="w-1/12 px-4 py-1 text-xs font-semibold">&nbsp;</td>
            <td className="w-3/12 px-4 py-1 text-xs font-semibold">&nbsp;</td>
            <td className="w-2/12 px-4 py-1 text-xs font-semibold">&nbsp;</td>

            <td
              className="w-fit px-4 py-1 text-right text-xs font-bold"
              style={{ backgroundColor: titleColor, color: "#fff" }}
            >
              Total:
            </td>
            <td
              className="w-fit px-4 py-1 text-xs font-bold"
              style={{ backgroundColor: titleColor, color: "#fff" }}
            >
              ${total}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="mx-auto mt-10 max-w-md">
        <div className="text-lg font-bold" style={{ color: titleColor }}>
          Thank you!
        </div>
        <div className="mt-2 mb-6 text-xs">
          The origin of the first constellation data back to prehistoric times
          purpose was to tell stories of their beliefs, experiences, Creation,
          or mythology.
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-6 py-1"
        style={{ backgroundColor: titleColor, color: "#fff" }}
      >
        <div className="mx-auto flex w-full max-w-md justify-between">
          <span className="text-sm font-bold">+01234345</span>
          <span className="text-sm font-bold">support@example.com</span>
        </div>
      </div>
    </div>
  );
}
