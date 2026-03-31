import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { productSEOData } from "@/data/productSEO";
import { products } from "@/data/products";

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
          Buy Premium Men's Watches in Cyprus
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-light">
          <p>
            Looking to <strong>buy a luxury watch in Cyprus</strong>? Replic8 is the island's top destination for premium AAA-grade
            men's watches — offering iconic designs at accessible prices with <strong>free next-day delivery</strong> to every city.
            Our collection features automatic timepieces inspired by the world's most coveted watch brands, built with 904L stainless
            steel and reliable Seiko NH35 movements.
          </p>
          <p>
            Whether you're shopping for a <Link to={`/watches/${productSEOData[1]?.slug}`} className="text-primary hover:underline">classic black dial Submariner</Link>,
            a <Link to={`/watches/${productSEOData[2]?.slug}`} className="text-primary hover:underline">green Hulk diver</Link>,
            a <Link to={`/watches/${productSEOData[3]?.slug}`} className="text-primary hover:underline">refined Datejust dress watch</Link>,
            or a bold <Link to={`/watches/${productSEOData[6]?.slug}`} className="text-primary hover:underline">Daytona racing chronograph</Link>,
            every piece is quality-checked before shipping and arrives in a premium presentation box with papers.
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-foreground mb-8 mt-16 tracking-tight">
          Best Automatic Watches in Cyprus
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-light">
          <p>
            All our watches feature the <strong>Seiko NH35 automatic movement</strong> — a self-winding Japanese calibre trusted
            by watch enthusiasts worldwide for its accuracy, durability, and smooth sweeping seconds hand. Combined with
            904L-grade stainless steel cases, 100-metre water resistance, and scratch-resistant sapphire-style crystals,
            our timepieces deliver the look, weight, and feel of a genuine luxury watch.
          </p>
          <p>
            Unlike quartz watches, automatic movements require no battery changes and can last decades with proper care.
            This makes our collection ideal for daily wear, special occasions, or as a lasting gift for someone you value.
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-foreground mb-8 mt-16 tracking-tight">
          Watch Delivery Across Cyprus
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-light">
          <p>
            We deliver to <strong>every city and village in Cyprus</strong> via Akis Express — completely free. Whether you're
            in <strong>Nicosia</strong>, <strong>Limassol</strong>, <strong>Larnaca</strong>, <strong>Paphos</strong>,
            <strong> Ayia Napa</strong>, Paralimni, or any other location on the island, your watch arrives within
            1–2 business days. We also offer <strong>cash on delivery</strong> for customers who prefer to inspect and pay on receipt.
          </p>
          <p>
            Every order is carefully packaged in a protective case to ensure your watch arrives in perfect condition — ready
            to wear or gift straight from the box.
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-foreground mb-8 mt-16 tracking-tight">
          Why Buy From Replic8?
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-light">
          <p>
            Cyprus has limited options for affordable luxury-style watches. Replic8 fills that gap by offering
            <strong> premium AAA-grade replicas</strong> that look and feel identical to watches costing thousands of euros.
            Our customers include professionals in Nicosia, tourists visiting Limassol, collectors across Larnaca, and
            gift-shoppers in Paphos — all choosing Replic8 for quality, price, and convenience.
          </p>
          <ul className="list-disc list-inside space-y-1.5 ml-2">
            <li>AAA-grade construction with real automatic movements</li>
            <li>Free next-day delivery to all Cyprus locations</li>
            <li>Secure online payment or cash on delivery</li>
            <li>Full set included: premium box, papers & warranty card</li>
            <li>Quality checked before every shipment</li>
            <li>1-year warranty on all timepieces</li>
          </ul>
        </div>

        {/* Internal links to products */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-display text-lg text-foreground mb-4">Browse Our Watch Collection</h3>
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

        {/* City-specific links for local SEO */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-display text-lg text-foreground mb-3">Serving All of Cyprus</h3>
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            We deliver premium watches to{" "}
            {["Nicosia", "Limassol", "Larnaca", "Paphos", "Ayia Napa", "Paralimni", "Famagusta", "Strovolos", "Lakatamia", "Latsia"].map((city, i, arr) => (
              <span key={city}>
                <strong>{city}</strong>{i < arr.length - 1 ? ", " : ""}
              </span>
            ))}
            {" "}and every other location on the island. Free next-day delivery on all orders.
          </p>
        </div>

        {/* Blog links for SEO */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-display text-lg text-foreground mb-3">Watch Guides & Articles</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/blog" className="text-xs text-primary border border-primary/20 px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
              All Articles
            </Link>
            <Link to="/blog/rolex-clone-cyprus-complete-guide" className="text-xs text-primary border border-primary/20 px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
              Rolex Clone Guide
            </Link>
            <Link to="/blog/buy-watch-cyprus-complete-guide" className="text-xs text-primary border border-primary/20 px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
              Buy Watch Cyprus
            </Link>
            <Link to="/blog/luxury-watch-limassol-style-guide" className="text-xs text-primary border border-primary/20 px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
              Limassol Watch Guide
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SEOContentBlock;
