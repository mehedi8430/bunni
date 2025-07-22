import { icons, } from "@/lib/imageProvider";
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

interface PreviewDeltaProps {
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

export default function PreviewDelta({
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
}: Partial<PreviewDeltaProps>) {

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
        serviceDate
    } = useAppSelector(templateSelector);

    const { customer: selectedCustomer } = useCustomerApi(customerId);

    return (
        <div
            className="max-w-xl min-w-xl overflow-hidden rounded-lg bg-white shadow-lg py-6 px-4"
            style={{ color: color || "#38988A", backgroundColor: `#f9fafc`, }}
        >
            {/* Header */}
            <div className="mb-2 flex items-center justify-between px-4">
                <div className="flex-1 flex items-center">
                    <img
                        src={icons.navLogo}
                        alt="Logo"
                        className="h-[80px] w-[80px] object-contain"
                    />
                    <div>
                        <p className="text-2xl font-bold">Bunni</p>
                        <div className="flex flex-col">
                            <span className="text-xs">support@example.com</span>
                            <span className="text-xs">+01234345</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 text-right">
                    <p className="mb-1 text-xs">Business address</p>
                    <p className="text-xs">{billFrom.address}</p>
                    <p className="text-xs">{billFrom.phone}</p>
                </div>
            </div>

            <div
                style={{
                    backgroundColor: `#ffffff`,
                    borderRadius: "8px",
                    padding: "20px 16px",
                    border: `1px solid ${color || "#38988A"}`,
                }}
            >

                {/* Payment details */}
                <div className="mx-auto mb-8 flex flex-wrap justify-between gap-8">
                    <div className="flex-1">
                        <p className="mb-1 text-sm font-bold uppercase">Bill To</p>
                        <p className="text-xs font-bold">{selectedCustomer?.name}</p>
                        <p className="text-xs whitespace-pre-line">
                            {selectedCustomer?.address}
                        </p>
                        <p className="text-xs">{selectedCustomer?.phone}</p>
                    </div>
                    <div className="flex-1">
                        <div className="mb-2">
                            <p className="mb-1 text-sm font-bold">Invoice number</p>
                            <p className="text-xs">#{invoiceNumber}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-sm font-bold">Service date</p>
                            <p className="text-xs">{serviceDate}</p>
                        </div>
                    </div>
                    <div className="flex-1 text-right">
                        <p className="mb-1 text-sm font-bold uppercase">Payment</p>
                        {/* <p className="text-xs font-bold uppercase">Paid by</p> */}
                        <p className="text-xs">{paymentDetails.accountType}</p>
                        <p className="text-xs">{paymentDetails.accountNumber}</p>
                        <p className="text-xs font-bold uppercase">
                            {paymentDetails.paymentMethod}
                        </p>
                        <p className="text-xs">{paymentDetails.bankName}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="mb-1 text-sm font-bold">Invoice date</p>
                        <p className="text-xs">{invoiceDate}</p>
                    </div>
                    <div>
                        <p className="mb-1 text-sm font-bold">Due date</p>
                        <p className="text-xs">{dueDate}</p>
                    </div>
                </div>

                {/* Product Table */}
                {/* Product Table */}
                <table className="mx-auto w-full border-collapse overflow-hidden">
                    <thead>
                        <tr
                            // style={{ backgroundColor: color || "#38988A", color: "#fff" }}
                            style={{
                                borderBottom: `1px solid #E5E7EB`,
                                borderTop: `1px solid #E5E7EB`,
                            }}
                        >
                            <th className="w-6/12 px-4 py-2 text-left text-xs font-bold">
                                Item Detail
                            </th>
                            <th className="w-1/12 px-4 py-2 text-left text-xs font-bold">
                                Price
                            </th>
                            <th className="w-1/12 px-4 py-2 text-left text-xs font-bold">
                                Qty.
                            </th>
                            <th className="w-1/12 px-4 py-2 text-left text-xs font-bold">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{
                        borderBottom: `1px solid #E5E7EB`,
                    }}>
                        {items.map((item, index) => (
                            <tr
                                key={index}
                            >
                                <td className="w-6/12 px-4 py-2 text-xs">{item.description}</td>
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
                                }}
                            >
                                Total:
                            </td>
                            <td
                                className="w-fit px-4 py-2 text-xs font-bold"
                                style={{
                                    borderTop: `1px solid #E5E7EB`,
                                }}
                            >
                                ${total.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <div>
                    <h1 className="text-sm font-bold mt-10" style={{ color: color || "#38988A" }}>
                        Thanks for the business.
                    </h1>
                </div>
            </div>

            <div className="mt-4 px-4">
                <p className="text-sm font-medium">Terms & Conditions</p>
                <p className="text-xs">
                    {footerTerms}
                </p>
            </div>
        </div>
    )
}
