import { useParams, Link, useNavigate } from "react-router-dom";
import { products, getProductBySlug } from "@/data/products";
import { productReviews } from "@/data/productReviews";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, Package, Truck, ShieldCheck, RotateCcw, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSoldOut } from "@/hooks/useSoldOut";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const productFaqs = [
  { q: "What quality can I expect?", a: "Every watch features a stainless steel case, automatic self-winding movement, scratch-resistant mineral glass, and detailed finishing. Each piece is individually inspected before shipping." },
  { q: "Does the watch come with packaging?", a: "Yes. Every watch ships in a premium presentation box, making it ready for gifting or personal collection." },
  { q: "How fast is delivery?", a: "We offer free next-day delivery across Cyprus. Orders placed before 3 PM are typically dispatched the same day." },
  { q: "Is this watch suitable for daily wear?", a: "Absolutely. Built with durable stainless steel and water resistance, our watches are designed for everyday use." },
  { q: "Can I pay on delivery?", a: "Yes. We offer cash on delivery across Cyprus with a small surcharge, in addition to secure online payment." },
  { q: "What if I'm not satisfied?", a: "We offer a 14-day return policy. Contact us if there's any issue and we'll resolve it promptly." },
];

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { soldOutIds } = useSoldOut();
  const [selectedImage, setSelectedImage] = useState(0);
  const product = slug ? getProductBySlug(slug) : null;
  const isSoldOut = product ? soldOutIds.has(product.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    document.title = `${product.name} | Premium Men's Watch | Replic8`;
    return () => {
      document.title = "Replic8 — Premium Men's Watches in Cyprus";
    };
  }, [product]);

  if (!product) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-14">
          <div className="text-center">
            <h1 className="text-3xl font-display text-foreground mb-4">Watch Not Found</h1>
            <Link to="/shop" className="text-accent hover:underline">Back to Collection</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main>
      <Navbar />
      <article className="pt-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
          <ol className="flex items-center gap-1.5 text-xs text-muted-foreground font-light">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li><Link to="/shop" className="hover:text-accent transition-colors">Shop</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-foreground font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Hero */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Gallery */}
            <div>
              <div className="relative aspect-square overflow-hidden bg-secondary mb-4 rounded-sm">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[selectedImage]}
                  alt={`${product.name} — view ${selectedImage + 1}`}
                  className="w-full h-full object-contain bg-background"
                  loading={selectedImage === 0 ? "eager" : "lazy"}
                />
                {isSoldOut ? (
                  <div className="absolute top-5 left-5 bg-destructive text-destructive-foreground text-[10px] tracking-[0.2em] uppercase font-medium px-4 py-1.5 rounded-sm">
                    Sold Out
                  </div>
                ) : product.badge && (
                  <div className="absolute top-5 left-5 bg-foreground text-background text-[10px] tracking-[0.2em] uppercase font-medium px-4 py-1.5 rounded-sm">
                    {product.badge}
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-square overflow-hidden border-2 transition-all duration-200 rounded-sm ${
                        selectedImage === i ? "border-accent" : "border-transparent hover:border-border"
                      }`}
                    >
                      <img src={img} alt={`${product.name} detail ${i + 1}`} className="w-full h-full object-cover bg-background" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center lg:pl-8">
              <div className="flex items-center gap-1.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">(24 reviews)</span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4 tracking-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-md font-light">
                {product.description}
              </p>

              <div className="flex items-end gap-6 mb-8">
                <div>
                  <p className="text-[10px] text-accent tracking-[0.2em] uppercase mb-1 font-medium">Price</p>
                  <span className="text-4xl font-display text-foreground">€{product.price}</span>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1">Cash on Delivery</p>
                  <span className="text-lg text-muted-foreground">€{product.price + 30}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Package className="w-4 h-4 text-accent" /> Presentation box included</div>
                <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-accent" /> Free next-day delivery</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> Secure checkout</div>
                <div className="flex items-center gap-2"><RotateCcw className="w-4 h-4 text-accent" /> 14-day returns</div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => navigate(`/checkout?product=${product.id}`)}
                  disabled={isSoldOut}
                  className="bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-foreground/90 transition-colors duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-foreground"
                >
                  {isSoldOut ? "Sold Out" : "Buy Now"}
                </button>
                <button
                  onClick={() => { addItem(product); toast.success(`${product.name} added to cart`); }}
                  disabled={isSoldOut}
                  className="border border-foreground text-foreground text-xs tracking-[0.2em] uppercase font-medium px-6 py-4 hover:bg-foreground/5 transition-colors duration-300 flex items-center gap-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
              <p className="text-muted-foreground text-[11px] mt-3 font-light tracking-wide">
                {isSoldOut ? "Currently unavailable — check back soon or contact us via TikTok @replic8cy" : "Free next-day delivery · Secure checkout · 1-year warranty"}
              </p>
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-8 tracking-tight">Specifications</h2>
            <div className="space-y-4">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground font-light">{spec.label}</span>
                  <span className="text-sm text-foreground font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-6 tracking-tight">Shipping & Returns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/50 p-6 rounded-sm">
                <Truck className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-display text-sm text-foreground mb-2">Free Next-Day Delivery</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">Orders placed before 3 PM ship same day. Free delivery to all Cyprus locations.</p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-sm">
                <RotateCcw className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-display text-sm text-foreground mb-2">14-Day Returns</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">Not happy? Return within 14 days for a full refund. Contact us for a prepaid return label.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        {productReviews[product.id] && productReviews[product.id].length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2 tracking-tight">Customer Reviews</h2>
              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-light">
                  {productReviews[product.id].length} verified reviews
                </span>
              </div>
              <div className="space-y-6">
                {productReviews[product.id].map((review, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="border border-border p-6 rounded-sm bg-secondary/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{review.name}</p>
                          <p className="text-[11px] text-muted-foreground font-light">{review.city}, Cyprus</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-light">{new Date(review.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</p>
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s < review.rating ? "fill-accent text-accent" : "text-border"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed font-light mb-4">"{review.text}"</p>
                    {review.photos.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {review.photos.map((photo, pi) => (
                          <img
                            key={pi}
                            src={photo}
                            alt={`Review photo by ${review.name}`}
                            className="w-24 h-24 object-cover rounded-sm border border-border"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-8 tracking-tight text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {productFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`pfaq-${i}`} className="border border-border px-6 bg-background rounded-sm">
                  <AccordionTrigger className="font-display text-sm text-foreground hover:no-underline tracking-wide hover:text-accent transition-colors duration-300 py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground font-light pb-4 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-10 tracking-tight text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} to={`/watches/${rp.slug}`} className="group">
                  <div className="aspect-square overflow-hidden bg-secondary rounded-sm mb-3">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <h3 className="font-display text-sm text-foreground text-center group-hover:text-accent transition-colors">{rp.name}</h3>
                  <p className="text-accent text-sm font-display text-center">€{rp.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-3 flex gap-2 lg:hidden">
          <button
            onClick={() => navigate(`/checkout?product=${product.id}`)}
            className="flex-1 bg-foreground text-background text-xs tracking-[0.15em] uppercase font-medium py-3.5 rounded-sm"
          >
            Buy Now · €{product.price}
          </button>
          <button
            onClick={() => { addItem(product); toast.success(`${product.name} added to cart`); }}
            className="border border-foreground text-foreground p-3.5 rounded-sm"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default ProductPage;
