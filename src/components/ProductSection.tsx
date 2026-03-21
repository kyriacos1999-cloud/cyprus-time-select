import product1Front from "@/assets/product1-front.jpg";
import product1Side from "@/assets/product1-side.jpg";
import product1Back from "@/assets/product1-back.jpg";
import product1Clasp from "@/assets/product1-clasp.jpg";
import product1Bracelet from "@/assets/product1-bracelet.jpg";
import product1Dial from "@/assets/product1-dial.jpg";
import product1Profile from "@/assets/product1-profile.jpg";
import product1Box from "@/assets/product1-box.jpg";
import product1BoxOpen from "@/assets/product1-boxopen.jpg";
import product1Card from "@/assets/product1-card.jpg";
import product2Front from "@/assets/product2-front.jpg";
import product2Dial from "@/assets/product2-dial.jpg";
import product2Crown from "@/assets/product2-crown.jpg";
import product2Clasp from "@/assets/product2-clasp.jpg";
import product2Box from "@/assets/product2-box.jpg";
import product2Fullset from "@/assets/product2-fullset.jpg";
import product3Front from "@/assets/product3-front.jpg";
import product3Dial from "@/assets/product3-dial.jpg";
import product3Crown from "@/assets/product3-crown.jpg";
import product3Clasp from "@/assets/product3-clasp.jpg";
import product3Box from "@/assets/product3-box.jpg";
import product3Fullset from "@/assets/product3-fullset.jpg";
import product4Front from "@/assets/product4-front.jpg";
import product4Dial1 from "@/assets/product4-dial-1.jpg";
import product4Dial2 from "@/assets/product4-dial-2.jpg";
import product4Crown from "@/assets/product4-crown.jpg";
import product4Clasp from "@/assets/product4-clasp.jpg";
import product4Box from "@/assets/product4-box.jpg";
import product4Fullset from "@/assets/product4-fullset.jpg";
import product5Front from "@/assets/product5-front.jpg";
import product5FrontAlt from "@/assets/product5-front-alt.jpg";
import product5Angle from "@/assets/product5-angle.jpg";
import product5Bracelet from "@/assets/product5-bracelet.jpg";
import product5Clasp from "@/assets/product5-clasp.jpg";
import product5OpenClasp from "@/assets/product5-openclasp.jpg";
import product5Box from "@/assets/product5-box.jpg";
import product5Fullset from "@/assets/product5-fullset.jpg";
import product6Front from "@/assets/product6-front.jpg";
import product6Angle from "@/assets/product6-angle.jpg";
import product6Side from "@/assets/product6-side.jpg";
import product6Back from "@/assets/product6-back.jpg";
import product6Clasp from "@/assets/product6-clasp.jpg";
import product6Box from "@/assets/product6-box.jpg";
import product6Fullset from "@/assets/product6-fullset.jpg";
import { useState } from "react";
import { motion } from "framer-motion";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  badge: string | null;
  priceId: string | null;
};

const products: Product[] = [
  {
    id: 1,
    name: "Rolex No Date AAA Clone",
    description: "Submariner · Stainless steel · Black dial · 904L steel bracelet",
    price: 300,
    image: product1Front,
    images: [
      product1Front,
      product1Dial,
      product1Side,
      product1Profile,
      product1Back,
      product1Clasp,
      product1Bracelet,
      product1BoxOpen,
      product1Box,
      product1Card,
    ],
    badge: "Best Seller",
    priceId: "price_1T939nF5cmmFi3mjCmqYm73I",
  },
  {
    id: 2,
    name: "Rolex Hulk AAA Clone",
    description: "Submariner Hulk · Green dial · Green bezel · 904L steel bracelet",
    price: 300,
    image: product2Front,
    images: [
      product2Front,
      product2Dial,
      product2Crown,
      product2Clasp,
      product2Box,
      product2Fullset,
    ],
    badge: "New",
    priceId: "price_1T93MkF5cmmFi3mjKn986pRM",
  },
  {
    id: 3,
    name: "Rolex Datejust 36mm AAA Clone",
    description: "Datejust · Dark grey dial · Fluted bezel · 904L steel bracelet",
    price: 300,
    image: product3Front,
    images: [
      product3Front,
      product3Dial,
      product3Crown,
      product3Clasp,
      product3Box,
      product3Fullset,
    ],
    badge: null,
    priceId: "price_1T93PDF5cmmFi3mjc4ysUaGZ",
  },
  {
    id: 4,
    name: "Rolex Submariner Blue/Gold",
    description: "Submariner · Blue dial · Blue bezel · Two-tone steel & gold bracelet",
    price: 300,
    image: product4Front,
    images: [
      product4Front,
      product4Dial1,
      product4Dial2,
      product4Crown,
      product4Clasp,
      product4Box,
      product4Fullset,
    ],
    badge: "New",
    priceId: "price_1T93WDF5cmmFi3mjFW0QagSQ",
  },
  {
    id: 5,
    name: "Rolex GMT-Master II Sprite AAA Clone",
    description: "GMT-Master II Sprite · Black dial · Black/green bezel · Jubilee bracelet",
    price: 300,
    image: product5Front,
    images: [
      product5Front,
      product5FrontAlt,
      product5Angle,
      product5Bracelet,
      product5Clasp,
      product5OpenClasp,
      product5Box,
      product5Fullset,
    ],
    badge: "New",
    priceId: "price_1T93f6F5cmmFi3mj8mFGlsAa",
  },
  {
    id: 6,
    name: "Rolex Daytona Black AAA Clone",
    description: "Daytona · Black dial · Tachymeter bezel · 904L steel bracelet",
    price: 350,
    image: product6Front,
    images: [
      product6Front,
      product6Angle,
      product6Side,
      product6Back,
      product6Clasp,
      product6Box,
      product6Fullset,
    ],
    badge: "New",
    priceId: "price_1T93oBF5cmmFi3mjleOURhm0",
  },
];

export { products };

const ProductGallery = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0 && selectedImage < product.images.length - 1) {
      setSelectedImage(selectedImage + 1);
    } else if (distance < 0 && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Main image + thumbnails */}
      <div>
        <div
          className="relative aspect-square overflow-hidden bg-secondary mb-4 touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <motion.img
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={product.images[selectedImage]}
            alt={`${product.name} - View ${selectedImage + 1}`}
            className="w-full h-full object-contain bg-white"
          />
          {product.badge && (
            <div className="absolute top-5 left-5 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-medium px-4 py-1.5">
              {product.badge}
            </div>
          )}
          {/* Dot indicators for mobile */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
            {product.images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  selectedImage === i ? "bg-primary" : "bg-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === i
                    ? "border-primary"
                    : "border-transparent hover:border-border"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover bg-white"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col justify-center lg:pl-8">
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3 font-medium">
          Featured Timepiece
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4 tracking-tight">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-md font-light">
          {product.description}
        </p>

        <div className="flex items-end gap-6 mb-4">
          <div>
            <p className="text-[10px] text-primary tracking-[0.2em] uppercase mb-1 font-medium">Full Set</p>
            <span className="text-4xl font-display text-foreground">€{product.price}</span>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1">Watch Only</p>
            <span className="text-lg text-muted-foreground">€{product.price - 80}</span>
          </div>
        </div>
        <div className="flex items-end gap-6 mb-8">
          <div>
            <p className="text-[10px] text-muted-foreground/60 tracking-[0.2em] uppercase mb-1">Cash on Delivery</p>
            <span className="text-sm text-muted-foreground">from €{product.price - 80 + 30}</span>
          </div>
        </div>

        <div className="space-y-3 mb-8 text-sm text-muted-foreground font-light">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>Automatic movement · Seiko NH35</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>100m water resistant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>Full set: Box, papers & international guarantee card</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>1 year warranty included</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>Free next-day delivery with Akis Express across Cyprus</span>
          </div>
        </div>

        <button
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            params.set("product", String(product.id));
            window.history.replaceState({}, "", `?${params.toString()}`);
            document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
            window.dispatchEvent(new CustomEvent("select-product", { detail: product.id }));
          }}
          className="bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-rolex-green-light transition-colors duration-300 w-fit"
        >
          Select This Timepiece
        </button>
        <p className="text-muted-foreground/60 text-[11px] mt-3 font-light tracking-wide">
          Free next-day delivery · Secure checkout · No hidden fees
        </p>
      </div>
    </div>
  );
};

const ProductSection = () => {

  return (
    <section id="products" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary text-xs tracking-[0.5em] uppercase mb-4 font-medium">
            The Collection
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground tracking-tight">
            Our Timepieces
          </h2>
        </motion.div>

      {/* All products with gallery */}
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            id={`product-${product.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`scroll-mt-20 ${i < products.length - 1 ? "mb-24" : ""}`}
          >
            {i > 0 && <div className="h-px bg-border max-w-6xl mx-auto mb-20" />}
            <ProductGallery product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
