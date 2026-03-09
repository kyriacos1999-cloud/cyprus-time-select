import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Do you deliver all over Cyprus?", a: "Yes! We offer free next-day delivery to every address in Cyprus." },
  { q: "Can I pay cash on delivery?", a: "Yes, cash on delivery is available for an additional €30 surcharge." },
  { q: "Can I pay online?", a: "Absolutely. Secure online payments are available at checkout with no extra fees." },
  { q: "Do you deliver outside Cyprus?", a: "No, we currently serve Cyprus only." },
];

const FAQSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-2xl">
      <div className="text-center mb-14">
        <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-3">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Common Questions
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-sm bg-surface-elevated px-5">
            <AccordionTrigger className="font-display text-sm font-semibold text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="font-body text-sm text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
