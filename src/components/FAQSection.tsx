import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "Do you deliver all over Cyprus?", a: "Yes. We offer complimentary next-day delivery to every address across Cyprus — no exceptions." },
  { q: "Can I pay cash on delivery?", a: "Absolutely. Cash on delivery is available for a €30 surcharge, applied transparently at checkout." },
  { q: "Can I pay online?", a: "Yes. We offer secure, encrypted online payments with no additional fees — the most affordable option." },
  { q: "Do you deliver outside Cyprus?", a: "At this time, we exclusively serve Cyprus to ensure the highest quality of service and delivery speed." },
];

const FAQSection = () => (
  <section className="py-24 md:py-32 bg-background relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,_hsl(40_65%_50%_/_0.03),_transparent_50%)]" />
    <div className="container mx-auto px-4 max-w-2xl relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-gold/30" />
          <p className="text-gold font-body text-xs tracking-[0.4em] uppercase font-light">Questions</p>
          <div className="h-px w-12 bg-gold/30" />
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-light text-foreground tracking-tight">
          Frequently <span className="italic text-gradient-gold">Asked</span>
        </h2>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <AccordionItem value={`faq-${i}`} className="border border-border bg-surface-elevated px-6">
              <AccordionTrigger className="font-display text-base font-light text-foreground hover:no-underline tracking-wide hover:text-gold transition-colors duration-300 py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground font-light pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
