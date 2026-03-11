import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useEffect } from "react";

const faqs = [
  { q: "Is this a real Rolex?", a: "No. Our watches are high-quality replica models inspired by Rolex designs, not original watches from Rolex. They are designed for customers who appreciate the style of luxury watches at a much more accessible price." },
  { q: "How close are the watches to the original?", a: "Our watches are AAA-grade replicas, meaning they closely match the design, weight, and materials of the original models. Most people cannot distinguish them from the original without expert inspection." },
  { q: "What quality can I expect?", a: "Our watches feature stainless steel cases, automatic movements, scratch-resistant glass, and detailed finishing and engravings. Every watch is tested before shipping." },
  { q: "Will people be able to tell it's a replica?", a: "In everyday situations, very unlikely. Our replicas are designed to closely match the appearance of the original watches, including size, weight, and finishing." },
  { q: "Do you ship within Cyprus?", a: "Yes. We offer fast delivery across Cyprus, usually within 1–2 business days." },
  { q: "Is payment safe?", a: "Yes. We use secure payment processing and encrypted checkout to protect your information." },
  { q: "What if I'm not satisfied with my watch?", a: "We offer a customer satisfaction guarantee. If there is any issue with your watch when it arrives, contact us and we will help resolve it quickly." },
  { q: "Do the watches come with a box?", a: "Yes. Watches include a presentation box suitable for storage or gifting, along with papers." },
  { q: "Are these watches durable for daily wear?", a: "Yes. Our watches are designed for everyday use, with durable materials and reliable movements." },
  { q: "Why are your prices so much lower than luxury watches?", a: "Luxury watches from brands like Rolex cost thousands due to brand value, heritage, and manufacturing. Our replicas focus on the look and feel of the design without the luxury price tag." },
];

const FAQSection = () => {
  // Inject FAQ schema
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
          <p className="text-primary text-xs tracking-[0.5em] uppercase mb-4 font-medium">
            Questions
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-foreground tracking-tight">
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
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <AccordionItem value={`faq-${i}`} className="border border-border px-6 bg-background">
                <AccordionTrigger className="font-display text-base text-foreground hover:no-underline tracking-wide hover:text-primary transition-colors duration-300 py-5 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-light pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;