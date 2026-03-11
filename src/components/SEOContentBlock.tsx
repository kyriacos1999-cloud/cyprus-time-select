import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { productSEOData } from "@/data/productSEO";
import { products } from "@/components/ProductSection";

const SEOContentBlock = () => (
  <section className="py-20 md:py-24 bg-secondary/30">
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display text-foreground mb-8 tracking-tight">
          Premium Men's Watches in Cyprus
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-light">
          <p>
            Replic8 is Cyprus's leading destination for premium men's watches that combine luxury design with accessible pricing.
            Our curated collection features AAA-grade timepieces inspired by the world's most iconic watch designs — including
            diver's watches, dress watches, and chronographs — all crafted with stainless steel cases, automatic Seiko NH35
            movements, and scratch-resistant glass.
          </p>
          <p>
            Whether you're looking for a <Link to={`/watches/${productSEOData[1]?.slug}`} className="text-primary hover:underline">classic black dial diver</Link>,
            a <Link to={`/watches/${productSEOData[3]?.slug}`} className="text-primary hover:underline">refined 36mm dress watch</Link>,
            or a bold <Link to={`/watches/${productSEOData[6]?.slug}`} className="text-primary hover:underline">racing chronograph</Link>,
            our collection has a premium automatic watch to match your style. Each watch is individually inspected
            before shipping and arrives in a luxury presentation box with papers.
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-foreground mb-8 mt-16 tracking-tight">
          Automatic &amp; Luxury Style Watches
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-light">
          <p>
            All watches in our collection are powered by the Seiko NH35 automatic movement — a self-winding calibre trusted
            worldwide for its reliability and smooth sweeping seconds hand. Combined with 904L-grade stainless steel construction,
            100-metre water resistance, and sapphire-style scratch-resistant crystals, our timepieces deliver the look and feel
            of luxury without the premium price tag.
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-foreground mb-8 mt-16 tracking-tight">
          Fast Delivery Across Cyprus
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-light">
          <p>
            We offer <strong>free next-day delivery</strong> to every city in Cyprus via Akis Express. Whether you're in
            Nicosia, Limassol, Larnaca, Paphos, or any town on the island, your watch will arrive within 1–2 business days.
            We also offer <strong>cash on delivery</strong> for customers who prefer to pay upon receipt.
            Every order is carefully packaged to ensure your watch arrives in perfect condition, ready to wear or gift.
          </p>
        </div>

        {/* Internal links to products */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-display text-lg text-foreground mb-4">Browse Our Collection</h3>
          <div className="flex flex-wrap gap-3">
            {products.map((p) => {
              const seo = productSEOData[p.id];
              return seo ? (
                <Link
                  key={p.id}
                  to={`/watches/${seo.slug}`}
                  className="text-xs text-primary border border-primary/20 px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  {p.name}
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SEOContentBlock;
