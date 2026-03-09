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
import watch2 from "@/assets/watch-2.jpg";
import watch3 from "@/assets/watch-3.jpg";
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
  },
  {
    id: 2,
    name: "Noir Minimalist",
    description: "Matte black · Japanese mesh strap",
    price: 149,
    image: watch2,
    images: [watch2],
    badge: "Best Price",
  },
  {
    id: 3,
    name: "Aqua Diver Pro",
    description: "Stainless steel · Sapphire crystal",
    price: 219,
    image: watch3,
    images: [watch3],
    badge: null,
  },
];

export { products };

const ProductGallery = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Main image + thumbnails */}
      <div>
        <div className="relative aspect-square overflow-hidden bg-secondary mb-4">
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

        <div className="space-y-3 mb-8 text-sm text-muted-foreground font-light">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>Full set: Box, papers & international guarantee card</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>904L stainless steel construction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>Free next-day delivery across Cyprus</span>
          </div>
        </div>

        <button
          onClick={() => document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-rolex-green-light transition-colors duration-300 w-fit"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const featuredProduct = products[0];
  const otherProducts = products.slice(1);

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

        {/* Featured product with gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <ProductGallery product={featuredProduct} />
        </motion.div>

        {/* Other products */}
        {otherProducts.length > 0 && (
          <>
            <div className="h-px bg-border max-w-6xl mx-auto mb-20" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border max-w-4xl mx-auto">
              {otherProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group cursor-pointer bg-background"
                  onClick={scrollToOrder}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {product.badge && (
                      <div className="absolute top-5 left-5 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-medium px-4 py-1.5">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 text-center">
                    <h3 className="font-display text-xl md:text-2xl text-foreground mb-2 tracking-wide">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5 font-light">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-center gap-6">
                      <div>
                        <p className="text-[10px] text-primary tracking-[0.2em] uppercase mb-1 font-medium">Online</p>
                        <span className="text-xl font-display text-foreground">€{product.price}</span>
                      </div>
                      <div className="w-px h-8 bg-border" />
                      <div>
                        <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1">COD</p>
                        <span className="text-sm text-muted-foreground">€{product.price + 30}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
