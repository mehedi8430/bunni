import { Button } from "@/components/ui/button";
import { icons } from "@/lib/imageProvider";

export default function PaymentIntegrationPage() {
  return (
    <section className="space-y-6 md:space-y-10">
      <div>
        <h1 className="text-2xl font-semibold md:text-[32px] mb-3">
          Payment Integration
        </h1>
      </div>
      <div className="bg-white p-6 rounded-md flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <img src={icons.stripeIcon} alt="Stripe Icon" />
          <div>
            <p className="text-xl font-normal text-foreground">Stripe</p>
            <p className="text-lg font-normal text-foreground/40">An easy, secure, and private way to check out using Stripe</p>
          </div>
        </div>
        <div>
          <Button>
            Connect
          </Button>
        </div>
      </div>
    </section>
  );
}
