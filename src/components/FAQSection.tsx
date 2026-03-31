import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const faqs = [
  { q: "How long does delivery take?", a: "We offer free next-day delivery across Cyprus. Orders placed before 3 PM are dispatched the same day and typically arrive within 1–2 business days." },
  { q: "Do you offer cash on delivery?", a: "Yes. We offer cash on delivery across Cyprus with a small surcharge. You can inspect the watch before paying." },
  { q: "Are payments secure?", a: "Absolutely. Our checkout is protected by 256-bit SSL encryption, and we accept Visa, Mastercard, Apple Pay, and Google Pay through our secure payment partner." },
  { q: "What is your return policy?", a: "We offer a 14-day return window. If you're not satisfied with your purchase, contact us for a hassle-free return and full refund." },
  { q: "How can I contact support?", a: "You can reach us via email at support@replic8.shop. We typically respond within a few hours during business days." },
  { q: "Do the watches come with packaging?", a: "Yes. Every watch ships in a premium presentation box, making it ready for gifting or personal collection." },
  { q: "What warranty do you offer?", a: "All watches include a 1-year warranty covering manufacturing defects. Contact us if you experience any issues." },
];

const FAQSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    script.id = "faq-schema";
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("faq-schema");
      if (el) el.remove();
    };
  }, []);

  return (
    <section id="faq" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-display text-foreground tracking-tight">
            Frequently Asked
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <AccordionItem value={`faq-${i}`} className="border border-border px-6 bg-background rounded-sm">
                <AccordionTrigger className="font-display text-base text-foreground hover:no-underline tracking-wide hover:text-accent transition-colors duration-300 py-5 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-light pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <div className="text-center mt-8">
          <Link
            to="/faq"
            className="text-xs text-accent font-medium hover:text-warm-dark transition-colors"
          >
            View all frequently asked questions →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
