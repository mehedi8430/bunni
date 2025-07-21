import SectionTitle from "@/components/shared/SectionTitle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useState } from "react";


// Define types for FAQ item
interface FAQItem {
    value: string;
    question: string;
    answer: string;
}

export default function FAQ() {
    const [openItem, setOpenItem] = useState<string | null>("item-1");
    return (
        <section id="faq" className='container mx-auto px-4 pt-8 pb-16'>
            <SectionTitle title="FAQ" subtitle="Everything You Need to Know Before Getting Started" className="mb-10" />
            <Accordion
                type="single"
                collapsible
                className="w-full space-y-4 "
                defaultValue="item-1"
                onValueChange={(value) => setOpenItem(value)}
            >
                {faqs.map(({ value, question, answer }) => (
                    <div key={value}>
                        <AccordionItem value={value} className={`${openItem === value ? "bg-primary-2/4" : ""} border border-border py-2 px-5 rounded-md`}>
                            <AccordionTrigger>
                                <div className="flex md:items-center justify-between w-full gap-3">
                                    <span className="text-base md:text-xl text-foreground01">{question}</span>
                                    {openItem === value ? <CircleMinus className="size-6" /> : <CirclePlus className="size-6" />}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="md:w-[85%]">
                                <p className="text-sm md:text-base text-description">{answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </div>
                ))}
            </Accordion>
        </section>
    )
}


const faqs: FAQItem[] = [
    {
        value: 'item-1',
        question: "Q. Can I integrate this with my online store or app?",
        answer: "Yes. We offer ready-made plugins for platforms like Shopify and WooCommerce, as well as API and SDK options for mobile apps or custom e-commerce systems.",
    },
    {
        value: 'item-2',
        question: "Q. What payment methods do you support?",
        answer: "We support a wide range of payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and various local payment options.",
    },
    {
        value: 'item-3',
        question: "Q. Is there a setup fee or monthly charge?",
        answer: "No, there are no setup fees or monthly charges. You only pay a small transaction fee per successful payment.",
    },
    {
        value: 'item-4',
        question: "Q. How long does the onboarding process take?",
        answer: "The onboarding process typically takes 1-3 business days, depending on the completeness of your documentation. We aim to get you up and running as quickly as possible.",
    },
    {
        value: 'item-5',
        question: "Q. How quickly will I receive the funds?",
        answer: "Funds are typically settled within 2-3 business days after the transaction. Payout schedules can be customized based on your business needs.",
    },
    {
        value: 'item-6',
        question: "Q. Is the platform secure and compliant?",
        answer: "Absolutely. Our platform is PCI DSS Level 1 compliant and uses advanced encryption and fraud detection tools to ensure the highest level of security for all transactions.",
    },
];