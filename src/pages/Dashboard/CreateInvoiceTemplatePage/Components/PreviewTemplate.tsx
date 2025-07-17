export default function PreviewTemplate() {
  return (
    <div className="bg-sidebar rounded-lg p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600">
            <span className="text-sm font-bold text-white">HM</span>
          </div>
          <div>
            <div className="font-semibold">HANDYMAN</div>
            <div className="text-sm text-gray-500">WEBSITE</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">INVOICE</div>
          <div className="text-sm text-gray-500">INVOICE ID 1053544</div>
          <div className="text-sm text-gray-500">DATE: 10/10/2022</div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-6">
        <div>
          <div className="mb-1 text-sm font-semibold text-blue-600">
            BILL TO
          </div>
          <div className="text-sm">
            JESSICA SMITH
            <br />
            123 CHERRY LANE
            <br />
            CITY, STATE 12345
            <br />
            USA
          </div>
        </div>
        <div>
          <div className="mb-1 text-sm font-semibold text-blue-600">
            BILL FROM
          </div>
          <div className="text-sm">
            HANDYMAN WEBSITE
            <br />
            456 BUSINESS ST
            <br />
            CITY, STATE 12345
            <br />
            USA
          </div>
        </div>
        <div>
          <div className="mb-1 text-sm font-semibold text-blue-600">
            PAYMENT
          </div>
          <div className="text-sm">
            Cash
            <br />
            Paypal
            <br />
            Bank
            <br />
            Account
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Item</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-center">Price</th>
              <th className="px-4 py-2 text-center">Qty</th>
              <th className="px-4 py-2 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">Service {i}</td>
                <td className="px-4 py-2">Service {i}</td>
                <td className="px-4 py-2 text-center">$10.00</td>
                <td className="px-4 py-2 text-center">5</td>
                <td className="px-4 py-2 text-center">$50.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between border-t py-2">
            <span className="font-semibold">Total</span>
            <span className="rounded bg-blue-600 px-3 py-1 font-semibold text-white">
              $400.00
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="mb-2 font-semibold text-blue-600">THANK YOU!</div>
        <div className="text-xs text-gray-500">
          This invoice is for your convenience and is not a demand for payment.
          This invoice acts as a record of services rendered at the time of
          services.
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="font-semibold text-blue-600">+123 123 123</div>
        <div className="text-sm text-gray-500">www.handymanwebsite.com</div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {["red", "blue", "green", "orange", "purple", "yellow"].map((color) => (
          <div
            key={color}
            className={`h-8 w-8 rounded-full bg-${color}-500 cursor-pointer`}
          ></div>
        ))}
      </div>
    </div>
  );
}
