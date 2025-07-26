import DiscountSettings from "./components/DiscountSettings";
import InvoiceFooterSetting from "./components/InvoiceFooterSetting";
import TaxRatesSettings from "./components/TaxRatesSettings";

export default function InvoiceSettingsPage() {
  return (
    <section className="space-y-6 md:space-y-10">
      <h1 className="text-2xl font-semibold md:text-[26px]">
        Invoice Settings
      </h1>
      <DiscountSettings />
      <TaxRatesSettings />
      <InvoiceFooterSetting />
    </section>
  );
}
