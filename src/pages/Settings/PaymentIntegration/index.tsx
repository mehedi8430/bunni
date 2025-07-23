import Translator from "@/components/shared/Translator";
import { Button } from "@/components/ui/button";
import { icons } from "@/lib/imageProvider";

export default function PaymentIntegrationPage() {
  return (
    <section className="space-y-6 md:space-y-10">
      <div>
        <h1 className="mb-3 text-2xl font-semibold md:text-[32px]">
          <Translator text="payment_integration" />
        </h1>
      </div>
      <div className="flex flex-col items-center justify-between rounded-md bg-white p-6 md:flex-row">
        <div className="flex items-center space-x-8">
          <img src={icons.stripeIcon} alt="Stripe Icon" />
          <div className="">
            <p className="text-foreground text-xl font-normal">Stripe</p>
            <p className="text-foreground/40 text-lg font-normal">
              <Translator text="payment_integration_description" />
            </p>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-end md:mt-0">
          <Button>Connect</Button>
        </div>
      </div>
    </section>
  );
}
