import DiscountSettings from "./components/DiscountSettings";
import TaxRatesSettings from "./components/TaxRatesSettings";

export default function InvoiceSettingsPage() {
  return (
    <section className="space-y-6 md:space-y-10">
      <h1 className="text-2xl font-semibold md:text-[32px]">
        Invoice Settings
      </h1>
      <DiscountSettings />
      <TaxRatesSettings />
    </section>
  );
}
