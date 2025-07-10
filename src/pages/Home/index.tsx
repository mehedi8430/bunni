import Banner from "./components/Banner";
import HowDoesItWork from "./components/HowDoesItWork";
import BusinessFeatures from "./components/BusinessFeatures";
import StreamlineInvoicesTools from "./components/StreamlineInvoicesTools";
import KeyBenefits from "./components/KeyBenefits";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function HomePage() {
  return <main>
    <Banner />
    <HowDoesItWork />
    <BusinessFeatures />
    <StreamlineInvoicesTools />
    <KeyBenefits />
    <FAQ />
    <Footer />
  </main>;
}
