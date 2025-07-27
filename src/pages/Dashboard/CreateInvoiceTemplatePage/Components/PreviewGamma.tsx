import { images } from "@/lib/imageProvider";
import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";
import { useAppSelector } from "@/redux/hooks";
import { templateSelector } from "@/redux/slices/invoiceTemplateSlice";

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

interface PreviewGammaProps {
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

export default function PreviewGamma({
  billFrom = {
    name: "Jane Smith",
    address: "456 Elm St\nCity, State, Zip",
    phone: "555-5678",
  },
  // paymentDetails = {
  //     accountType: "Bank Acc",
  //     accountNumber: "123456789",
  //     paymentMethod: "Bank",
  //     bankName: "Bank name",
  // },
}: Partial<PreviewGammaProps>) {
  const {
    color,
    footerTerms,
    invoiceNumber,
    invoiceDate,
    customerId,
    items,
    subtotal,
    totalTax,
    total,
    dueDate,
  } = useAppSelector(templateSelector);

  const { customer: selectedCustomer } = useCustomerApi(customerId);

  return (
    <div
      className="overflow-hidden rounded-lg bg-white p-10 shadow-lg"
      style={{ color: color || "#38988A" }}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            className="text-[26px] font-extrabold"
            style={{ color: color || "#38988A" }}
          >
            INVOICE
          </h1>
          <span className="text-sm">#{invoiceNumber}</span>
        </div>
        <img
          src={images.templateLogo}
          alt="Logo"
          className="h-[70px] w-[100px] object-contain"
        />
      </div>

      {/* <div className="flex-1 text-right">
                    <p className="mb-1 text-sm font-bold uppercase">Payment</p>
                    <p className="text-xs font-bold uppercase">Paid by</p>
                    <p className="text-xs">{paymentDetails.accountType}</p>
                    <p className="text-xs">{paymentDetails.accountNumber}</p>
                    <p className="text-xs font-bold uppercase">
                        {paymentDetails.paymentMethod}
                    </p>
                    <p className="text-xs">{paymentDetails.bankName}</p>
                </div> */}

      {/* Payment details */}
      <div className="mx-auto mb-8 flex flex-wrap justify-between gap-3 border-y border-gray-200">
        <div className="flex-1 py-3.5">
          <div className="mb-2">
            <p className="mb-1 text-sm font-bold">Issued</p>
            <p className="text-xs">{invoiceDate}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-bold">Due</p>
            <p className="text-xs">{dueDate}</p>
          </div>
        </div>
        <div className="flex-1 border-x border-gray-200 px-2.5 py-3.5">
          <p className="mb-1 text-sm font-bold">Bill To</p>
          <p className="text-xs font-bold">{selectedCustomer?.name}</p>
          <p className="text-xs">{selectedCustomer?.phone}</p>
          <p className="text-xs whitespace-pre-line">
            {selectedCustomer?.address}
          </p>
        </div>
        <div className="flex-1 py-3.5">
          <p className="mb-1 text-sm font-bold">From</p>
          <p className="text-xs font-bold">{billFrom.name}</p>
          <p className="text-xs">{billFrom.phone}</p>
          <p className="text-xs whitespace-pre-line">{billFrom.address}</p>
        </div>
      </div>

      {/* Product Table */}
      <table className="mx-auto w-full border-collapse overflow-hidden">
        <thead>
          <tr
            style={{
              borderBottom: `1px solid #E5E7EB`,
            }}
          >
            <th className="w-6/12 pb-3 text-left text-xs font-bold">Service</th>
            <th className="w-1/12 px-4 pb-3 text-left text-xs font-bold">
              Price
            </th>
            <th className="w-1/12 px-4 pb-3 text-left text-xs font-bold">
              Qty.
            </th>
            <th className="w-1/12 pb-3 pl-4 text-left text-xs font-bold text-nowrap">
              Line total
            </th>
          </tr>
        </thead>
        <tbody
          style={{
            borderBottom: `1px solid #E5E7EB`,
          }}
        >
          {items.map((item, index) => (
            <tr key={index}>
              <td className="w-6/12 py-3 text-xs">{item.description}</td>
              <td className="w-1/12 px-4 py-2 text-xs">
                ${item.price.toFixed(2)}
              </td>
              <td className="w-1/12 px-4 py-2 text-xs">
                {item.quantity.toString().padStart(2, "0")}
              </td>
              <td className="w-1/12 px-4 py-2 text-xs">
                ${item.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={3}
              className="px-4 py-2 text-right text-xs font-semibold"
            >
              Subtotal:
            </td>
            <td className="px-4 py-2 text-xs">${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="px-4 py-2 text-right text-xs font-semibold"
            >
              Tax:
            </td>
            <td className="px-4 py-2 text-xs">${totalTax.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="w-3/12 px-4 py-2 text-xs font-semibold">&nbsp;</td>
            <td className="w-2/12 px-4 py-2 text-xs font-semibold">&nbsp;</td>

            <td
              className="w-fit px-4 py-2 text-right text-xs font-bold"
              style={{
                borderTop: `1px solid #E5E7EB`,
                borderBottom: `1px solid #E5E7EB`,
              }}
            >
              Total:
            </td>
            <td
              className="w-fit px-4 py-2 text-xs font-bold"
              style={{
                borderTop: `1px solid #E5E7EB`,
                borderBottom: `1px solid #E5E7EB`,
              }}
            >
              ${total.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="mx-auto mt-10 border-b border-gray-200 pb-3">
        <h1 className="text-lg font-bold" style={{ color: color || "#38988A" }}>
          Thank you for the business!
        </h1>
        <p className="mt-2 text-xs">{footerTerms}</p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between py-1">
        <div className="flex w-full justify-between">
          <span className="text-sm font-bold">+01234345</span>
          <span className="text-sm font-bold">support@example.com</span>
        </div>
      </div>
    </div>
  );
}
