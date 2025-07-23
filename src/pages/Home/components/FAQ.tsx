import SectionTitle from "@/components/shared/SectionTitle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";


// Define types for FAQ item
// interface FAQItem {
//     value: string;
//     question: string;
//     answer: string;
// }

export default function FAQ() {
    const { t } = useTranslation();
    const [openItem, setOpenItem] = useState<string | null>("item-1");
    return (
        <section id="faq" className='container mx-auto px-4 pt-8 pb-16'>
            <SectionTitle title={t("faq_title")} subtitle={t("faq_subtitle")} className="mb-10" />
            <Accordion
                type="single"
                collapsible
                className="w-full space-y-4 "
                defaultValue="item-1"
                onValueChange={(value) => setOpenItem(value)}
            >
                {faqs.map(({ value, questionKey, answerKey }) => (
                    <div key={value}>
                        <AccordionItem value={value} className={`${openItem === value ? "bg-primary-2/4" : ""} border border-border py-2 px-5 rounded-md`}>
                            <AccordionTrigger>
                                <div className="flex md:items-center justify-between w-full gap-3 cursor-pointer">
                                    <span className="text-base md:text-xl text-foreground01">{t(questionKey)}</span>
                                    {openItem === value ? <CircleMinus className="size-6" /> : <CirclePlus className="size-6" />}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="md:w-[85%]">
                                <p className="text-sm md:text-base text-description">{t(answerKey)}</p>
                            </AccordionContent>
                        </AccordionItem>
                    </div>
                ))}
            </Accordion>
        </section>
    )
}

const faqs = [
  { value: 'item-1', questionKey: "faq_q1", answerKey: "faq_a1" },
  { value: 'item-2', questionKey: "faq_q2", answerKey: "faq_a2" },
  { value: 'item-3', questionKey: "faq_q3", answerKey: "faq_a3" },
  { value: 'item-4', questionKey: "faq_q4", answerKey: "faq_a4" },
  { value: 'item-5', questionKey: "faq_q5", answerKey: "faq_a5" },
  { value: 'item-6', questionKey: "faq_q6", answerKey: "faq_a6" },
];

// const faqs: FAQItem[] = [
//     {
//         value: 'item-1',
//         question: "Q. Can I integrate this with my online store or app?",
//         answer: "Yes. We offer ready-made plugins for platforms like Shopify and WooCommerce, as well as API and SDK options for mobile apps or custom e-commerce systems.",
//     },
//     {
//         value: 'item-2',
//         question: "Q. What payment methods do you support?",
//         answer: "We support a wide range of payment methods including credit/debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and various local payment options.",
//     },
//     {
//         value: 'item-3',
//         question: "Q. Is there a setup fee or monthly charge?",
//         answer: "No, there are no setup fees or monthly charges. You only pay a small transaction fee per successful payment.",
//     },
//     {
//         value: 'item-4',
//         question: "Q. How long does the onboarding process take?",
//         answer: "The onboarding process typically takes 1-3 business days, depending on the completeness of your documentation. We aim to get you up and running as quickly as possible.",
//     },
//     {
//         value: 'item-5',
//         question: "Q. How quickly will I receive the funds?",
//         answer: "Funds are typically settled within 2-3 business days after the transaction. Payout schedules can be customized based on your business needs.",
//     },
//     {
//         value: 'item-6',
//         question: "Q. Is the platform secure and compliant?",
//         answer: "Absolutely. Our platform is PCI DSS Level 1 compliant and uses advanced encryption and fraud detection tools to ensure the highest level of security for all transactions.",
//     },
// ];