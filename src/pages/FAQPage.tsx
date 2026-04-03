import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Ordering & Payment",
    faqs: [
      { q: "How do I place an order?", a: "Browse our collection, select your watch, and click 'Buy Now' or 'Add to Cart'. Follow the checkout process to complete your purchase securely." },
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, Apple Pay, Google Pay, and cash on delivery across Cyprus." },
      { q: "Do you offer cash on delivery?", a: "Yes. Cash on delivery is available island-wide with a €30 surcharge. You can inspect the watch before paying." },
      { q: "Are payments secure?", a: "Absolutely. Our checkout is protected by 256-bit SSL encryption and processed through our secure payment partner." },
      { q: "Do you have any discount codes?", a: "We occasionally offer promotional codes. Follow us on social media or sign up for our newsletter to stay updated." },
    ],
  },
  {
    title: "Products & Quality",
    faqs: [
      { q: "What materials are your watches made from?", a: "Our watches are crafted from 904L stainless steel — the same corrosion-resistant, high-grade alloy used by top Swiss luxury brands. Combined with scratch-resistant sapphire crystals and reliable automatic movements, the result is exceptional durability and a premium feel." },
      { q: "Are your watches automatic?", a: "Yes. All our watches feature automatic (self-winding) movements that don't require batteries." },
      { q: "Do the watches come with packaging?", a: "Yes. Every watch ships in a premium presentation box suitable for gifting or personal collection." },
      { q: "What warranty do you offer?", a: "All watches include a 1-year warranty covering manufacturing defects." },
      { q: "Are the watches water resistant?", a: "Most of our watches are rated for 100m water resistance, suitable for swimming and everyday exposure to water." },
    ],
  },
  {
    title: "Delivery & Returns",
    faqs: [
      { q: "How long does delivery take?", a: "We offer free next-day delivery across Cyprus. Orders placed before 3 PM are dispatched the same day." },
      { q: "Is delivery really free?", a: "Yes. Standard delivery is completely free for all orders across Cyprus." },
      { q: "Where do you deliver?", a: "We deliver to every city and village across Cyprus — Nicosia, Limassol, Larnaca, Paphos, and all other locations." },
      { q: "What is your return policy?", a: "We offer a 14-day return window. If you're not satisfied, contact us for a hassle-free return and full refund." },
      { q: "How do I return a watch?", a: "Email us at support@replic8.shop with your order details. We'll send you a prepaid return label within 24 hours." },
    ],
  },
  {
    title: "Contact & Support",
    faqs: [
      { q: "How can I contact you?", a: "Email us at support@replic8.shop. We typically respond within a few hours during business days." },
      { q: "Do you have a physical store?", a: "We operate as an online store to keep prices accessible. This allows us to invest in product quality and fast delivery instead of retail overhead." },
      { q: "Can I track my order?", a: "Yes. You'll receive tracking information via email once your order is dispatched." },
    ],
  },
];

const FAQPage = () => (
  <main>
    <Navbar />
    <div className="pt-14 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-5xl font-display text-foreground tracking-tight mb-3">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-base font-light mb-12">
            Find answers to common questions about our watches, ordering, delivery, and returns.
          </p>

          {faqCategories.map((cat, ci) => (
            <div key={cat.title} className="mb-10">
              <h2 className="text-xl font-display text-foreground mb-4">{cat.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {cat.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${ci}-${i}`} className="border border-border px-5 bg-background rounded-sm">
                    <AccordionTrigger className="font-display text-sm text-foreground hover:no-underline hover:text-accent transition-colors py-4 text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground font-light pb-4 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    <Footer />
  </main>
);

export default FAQPage;
