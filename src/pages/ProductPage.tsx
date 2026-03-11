import { useParams, Link } from "react-router-dom";
import { products } from "@/components/ProductSection";
import { getProductBySlug, productSEOData } from "@/data/productSEO";
import { productReviews } from "@/data/productReviews";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, Package, Truck, ShieldCheck, Gift, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import UrgencyBanner from "@/components/UrgencyBanner";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const productFaqs = [
  { q: "What quality can I expect from this watch?", a: "Every watch features a stainless steel case, Seiko NH35 automatic movement, scratch-resistant glass, and detailed finishing. Each piece is individually inspected before shipping to ensure premium quality." },
  { q: "Does the watch come with a box and papers?", a: "Yes. Every watch ships in a premium presentation box with accompanying papers, making it ready for gifting or personal collection." },
  { q: "How fast is delivery in Cyprus?", a: "We offer free next-day delivery across Cyprus via Akis Express. Orders placed before 3pm are typically dispatched the same day." },
  { q: "Is this watch suitable for daily wear?", a: "Absolutely. Built with durable stainless steel and 100m water resistance, our watches are designed for everyday use — from office to outdoor." },
  { q: "Can I pay on delivery?", a: "Yes. We offer cash on delivery across Cyprus with a €30 surcharge, in addition to secure online payment via Stripe." },
  { q: "What if I'm not satisfied?", a: "We offer a customer satisfaction guarantee. Contact us if there is any issue and we will resolve it promptly." },
];

const ReviewsSection = ({ productId }: { productId: number }) => {
  const reviews = productReviews[productId] || [];
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0";

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-display text-foreground tracking-tight">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[hsl(var(--rolex-gold))] text-[hsl(var(--rolex-gold))]" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-light">{avgRating} ({reviews.length})</span>
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-border p-5 md:p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground font-light">{review.city}, Cyprus · {review.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${s < review.rating ? "fill-[hsl(var(--rolex-gold))] text-[hsl(var(--rolex-gold))]" : "text-border"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-light mb-4">
                "{review.text}"
              </p>
              {review.photos.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {review.photos.map((photo, pi) => (
                    <button
                      key={pi}
                      onClick={() => setLightboxImg(photo)}
                      className="w-16 h-16 md:w-20 md:h-20 overflow-hidden border border-border hover:border-primary transition-colors"
                    >
                      <img
                        src={photo}
                        alt={`Review photo by ${review.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightboxImg}
              alt="Review photo enlarged"
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const result = slug ? getProductBySlug(slug, products) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!result) return;
    const { product, seo } = result;

    document.title = seo.seoTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const pageUrl = `https://replic8.shop/watches/${seo.slug}`;
    // Product images are bundled assets — use origin + path for absolute URL
    const ogImage = `${window.location.origin}${product.image}`;

    setMeta("name", "description", seo.metaDescription);
    setMeta("property", "og:title", seo.seoTitle);
    setMeta("property", "og:description", seo.metaDescription);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:type", "product");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.seoTitle);
    setMeta("name", "twitter:description", seo.metaDescription);
    setMeta("name", "twitter:image", ogImage);

    // Set canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    return () => {
      // Reset to homepage defaults on unmount
      document.title = "Luxury Watches Cyprus | Premium Men's Watches | Fast Delivery";
    };
  }, [result]);

  if (!result) {
    return (
      <main>
        <UrgencyBanner />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-3xl font-display text-foreground mb-4">Watch Not Found</h1>
            <Link to="/" className="text-primary hover:underline">Back to Collection</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const { product, seo } = result;
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: seo.longDescription,
    image: product.images,
    brand: { "@type": "Brand", name: "Replic8" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Replic8" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "CY" },
        deliveryTime: { "@type": "ShippingDeliveryTime", handlingTime: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" } },
        shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "EUR" },
      },
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "24" },
    review: [
      { "@type": "Review", author: { "@type": "Person", name: "Andreas K." }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "Excellent presentation and very fast delivery." },
      { "@type": "Review", author: { "@type": "Person", name: "Maria L." }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "Looks premium and feels solid." },
    ],
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://replic8.shop/" },
      { "@type": "ListItem", position: 2, name: "Watches", item: "https://replic8.shop/#products" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://replic8.shop/watches/${seo.slug}` },
    ],
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: productFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />

      <UrgencyBanner />
      <Navbar />

      <article className="pt-[94px]">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
          <ol className="flex items-center gap-1.5 text-xs text-muted-foreground font-light">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li><Link to="/#products" className="hover:text-primary transition-colors">Watches</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-foreground font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Hero */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Gallery */}
            <div>
              <div className="relative aspect-square overflow-hidden bg-secondary mb-4">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[selectedImage]}
                  alt={`${product.name} — premium stainless steel men's watch, view ${selectedImage + 1}`}
                  className="w-full h-full object-contain bg-white"
                  loading={selectedImage === 0 ? "eager" : "lazy"}
                />
                {product.badge && (
                  <div className="absolute top-5 left-5 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-medium px-4 py-1.5">
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
                      className={`aspect-square overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === i ? "border-primary" : "border-transparent hover:border-border"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} detail ${i + 1}`}
                        className="w-full h-full object-cover bg-white"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center lg:pl-8">
              <div className="flex items-center gap-1.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[hsl(var(--rolex-gold))] text-[hsl(var(--rolex-gold))]" />
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
                  <p className="text-[10px] text-primary tracking-[0.2em] uppercase mb-1 font-medium">Online Price</p>
                  <span className="text-4xl font-display text-foreground">€{product.price}</span>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1">Cash on Delivery</p>
                  <span className="text-lg text-muted-foreground">€{product.price + 30}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> Box & papers included</div>
                <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> Free next-day delivery</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Secure checkout</div>
                <div className="flex items-center gap-2"><Gift className="w-4 h-4 text-primary" /> Gift-ready packaging</div>
              </div>

              <Link
                to={`/?product=${product.id}#order-section`}
                className="bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-[hsl(var(--rolex-green-light))] transition-colors duration-300 w-fit text-center"
              >
                Order Now
              </Link>
              <p className="text-xs text-muted-foreground mt-3 font-light flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                High demand this week – limited pieces available.
              </p>
            </div>
          </div>
        </section>

        {/* Long Description */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-6 tracking-tight">
              About This Watch
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              {seo.longDescription}
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-6 tracking-tight">
              Watch Features
            </h2>
            <ul className="space-y-3">
              {seo.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground font-light">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Packaging */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-6 tracking-tight">
              Presentation &amp; Packaging
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              Every watch from Replic8 arrives in a premium presentation box with accompanying papers and an international-style guarantee card. The packaging is designed to match the luxury feel of the timepiece itself — making it ideal for personal enjoyment or as a gift. Each box is carefully padded to protect the watch during transit, ensuring it arrives in perfect condition at your door anywhere in Cyprus.
            </p>
          </div>
        </section>

        {/* Gifting */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-6 tracking-tight">
              Perfect for Gifting
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              {seo.giftText}
            </p>
          </div>
        </section>

        {/* Customer Reviews */}
        <ReviewsSection productId={product.id} />

        {/* Product FAQ */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display text-foreground mb-8 tracking-tight text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {productFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`pfaq-${i}`} className="border border-border px-6 bg-background">
                  <AccordionTrigger className="font-display text-sm text-foreground hover:no-underline tracking-wide hover:text-primary transition-colors duration-300 py-4">
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
              {relatedProducts.map((rp) => {
                const rpSeo = productSEOData[rp.id];
                return (
                  <Link
                    key={rp.id}
                    to={`/watches/${rpSeo?.slug || rp.id}`}
                    className="group"
                  >
                    <div className="aspect-square overflow-hidden bg-white mb-3">
                      <img
                        src={rp.image}
                        alt={`${rp.name} — premium men's watch`}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-display text-sm text-foreground text-center">{rp.name}</h3>
                    <p className="text-primary text-sm font-display text-center">€{rp.price}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
};

export default ProductPage;
