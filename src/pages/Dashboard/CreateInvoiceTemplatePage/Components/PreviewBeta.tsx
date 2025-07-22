import { images } from "@/lib/imageProvider";
import { useCustomerApi } from "@/mock-api-hook/features/customers/useCustomerApi";
import { useAppSelector } from "@/redux/hooks";
import { templateSelector } from "@/redux/slices/invoiceTemplateSlice";
import { formatDateToShort } from "@/utils/dateFormat";
import { useSearchParams } from "react-router";


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

interface PreviewBetaProps {
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

export default function PreviewBeta({
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
}: Partial<PreviewBetaProps>) {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    console.log("Template Name:", name);

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
        dueDate
    } = useAppSelector(templateSelector);

    const { customer: selectedCustomer } = useCustomerApi(customerId);

    return (
        <div
            className="max-w-xl min-w-xl overflow-hidden rounded-lg bg-white shadow-lg"
            style={{ color: color || "#38988A" }}
        >
            {/* Date and invoice number */}
            <div className="mb-6 flex justify-between bg-gray-100 py-2.5 my-4 mx-3 rounded-full">
                <div className="flex w-full px-4 justify-between text-[15px] font-medium">
                    <span>Invoice {invoiceNumber}</span>
                    <span>Date: {formatDateToShort(invoiceDate)}</span>
                </div>
            </div>

            {/* Bill From and Bill To */}
            <div className="mb-8 flex flex-wrap justify-between gap-4 my-4 mx-3">
                <div className="flex-1 bg-gray-100 px-4 py-3 rounded-xl">
                    <p className="mb-1 text-[15px] font-bold">To</p>
                    <p className="text-xs font-bold">{selectedCustomer?.name}</p>
                    <p className="text-xs whitespace-pre-line">
                        {selectedCustomer?.address}
                    </p>
                    <p className="text-xs">{selectedCustomer?.phone}</p>
                </div>
                <div className="flex-1 bg-gray-100 px-4 py-3 rounded-xl">
                    <p className="mb-1 text-[15px] font-bold">From</p>
                    <p className="text-xs font-bold">{billFrom.name}</p>
                    <p className="text-xs whitespace-pre-line">{billFrom.address}</p>
                    <p className="text-xs">{billFrom.phone}</p>
                </div>
            </div>

            {/* Due date */}
            <div className="mb-6 bg-gray-100 py-2.5 my-4 mx-3 rounded-full">
                <div className="mx-auto w-full px-5 text-sm font-medium">
                    <span>Due Date: {formatDateToShort(dueDate)}</span>
                </div>
            </div>

            {/* Product Table */}
            <table className="mx-3 border-collapse overflow-hidden">
                <thead>
                    <tr style={{ backgroundColor: color || "#38988A", color: "#fff" }}>
                        <th className="w-6/12 px-4 py-2 text-left text-xs font-bold">
                            Service
                        </th>
                        <th className="w-3/12 px-4 py-2 text-left text-xs font-bold">
                            Qty.
                        </th>
                        <th className="w-3/12 px-4 py-2 text-left text-xs font-bold">
                            Rate
                        </th>
                        <th className="w-3/12 px-4 py-2 text-left text-xs font-bold text-nowrap">
                            Line total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                        >
                            <td className="w-6/12 px-4 py-2 text-xs">{item.description}</td>
                            <td className="w-2/12 px-4 py-2 text-xs">
                                {item.quantity.toString().padStart(2, "0")}
                            </td>
                            <td className="w-2/12 px-4 py-2 text-xs">
                                ${item.price.toFixed(2)}
                            </td>
                            <td className="w-2/12 px-4 py-2 text-xs">
                                ${item.amount.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td
                            colSpan={3}
                            className="px-4 py-1 text-right text-xs font-semibold"
                        >
                            Subtotal:
                        </td>
                        <td className="px-4 py-1 text-xs">${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td
                            colSpan={3}
                            className="px-4 py-1 text-right text-xs font-semibold"
                        >
                            Tax:
                        </td>
                        <td className="px-4 py-1 text-xs">${totalTax.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="w-3/12 px-4 py-1 text-xs font-semibold">&nbsp;</td>
                        <td className="w-2/12 px-4 py-1 text-xs font-semibold">&nbsp;</td>

                        <td
                            className="w-fit px-4 py-2 text-right text-xs font-bold"
                            style={{ backgroundColor: color || "#38988A", color: "#fff" }}
                        >
                            Total:
                        </td>
                        <td
                            className="w-fit px-4 py-2 text-xs font-bold"
                            style={{ backgroundColor: color || "#38988A", color: "#fff" }}
                        >
                            ${total.toFixed(2)}
                        </td>
                    </tr>
                </tfoot>
            </table>

            {/* Terms and Conditions and Billing Information */}
            <div className="mb-8 flex flex-wrap justify-between gap-4 my-4 mx-3">
                <div className="flex-1  bg-gray-100 px-4 py-3 rounded-xl">
                    <h1 className="text-lg font-bold" style={{ color: color || "#38988A" }}>
                        Thank you for the business!
                    </h1>
                    <p className="mt-2 mb-6 text-xs">
                        {footerTerms}
                    </p>
                </div>
                <div className="flex-1 bg-gray-100 px-4 py-3 rounded-xl">
                    <p className="mb-1 text-[15px] font-bold">Payment Details</p>
                    <p className="text-xs"><span className="text-sm font-medium">Bank details:</span> {paymentDetails.bankName}</p>
                    <p className="text-xs"><span className="text-sm font-medium">Account Type:</span> {paymentDetails.accountType}</p>
                    <p className="text-xs"><span className="text-sm font-medium">Account Number:</span> {paymentDetails.accountNumber}</p>
                    {/* <p className="text-xs font-bold uppercase">
                        {paymentDetails.paymentMethod}
                    </p> */}
                    
                </div>
            </div>

            {/* Footer */}
            <div
                className="flex items-center justify-between px-6 py-1  my-4 mx-3 bg-gray-100 rounded-full"
            // style={{ backgroundColor: color || "#38988A", color: "#fff" }}
            >
                <div className="w-1/3">
                    <img
                        src={images.templateLogo}
                        alt="Logo"
                        className="h-12 w-12 object-contain"
                    />
                </div>
                <div className="flex w-2/3 items-center justify-end gap-3">
                    <span className="text-sm font-bold">+01234345</span>
                    <div className="w-0.5 h-[16px] bg-gray-300"></div>
                    <span className="text-sm font-bold">support@example.com</span>
                </div>
            </div>
        </div>
    )
}
