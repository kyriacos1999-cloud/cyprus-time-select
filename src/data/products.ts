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

export type Product = {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  images: string[];
  badge: string | null;
  priceId: string | null;
  slug: string;
  category: string;
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Meridian Diver Black",
    shortDescription: "Classic black dial automatic diver",
    description: "A refined automatic diver's watch with a clean black dial, stainless steel construction, and reliable self-winding movement. Built for everyday wear with 100m water resistance.",
    price: 300,
    image: product1Front,
    images: [product1Front, product1Dial, product1Side, product1Profile, product1Back, product1Clasp, product1Bracelet, product1BoxOpen, product1Box, product1Card],
    badge: "Best Seller",
    priceId: "price_1T939nF5cmmFi3mjCmqYm73I",
    slug: "meridian-diver-black",
    category: "Sport",
    specs: [
      { label: "Movement", value: "Automatic (self-winding)" },
      { label: "Case Material", value: "316L Stainless Steel" },
      { label: "Case Size", value: "40mm" },
      { label: "Water Resistance", value: "100m" },
      { label: "Crystal", value: "Scratch-resistant mineral glass" },
      { label: "Bracelet", value: "Stainless steel with fold-over clasp" },
    ],
  },
  {
    id: 2,
    name: "Meridian Diver Green",
    shortDescription: "Bold green dial automatic diver",
    description: "A striking green sunburst dial paired with a matching green bezel. This automatic diver combines bold colour with durable stainless steel construction.",
    price: 300,
    image: product2Front,
    images: [product2Front, product2Dial, product2Crown, product2Clasp, product2Box, product2Fullset],
    badge: "New",
    priceId: "price_1T93MkF5cmmFi3mjKn986pRM",
    slug: "meridian-diver-green",
    category: "Sport",
    specs: [
      { label: "Movement", value: "Automatic (self-winding)" },
      { label: "Case Material", value: "316L Stainless Steel" },
      { label: "Case Size", value: "40mm" },
      { label: "Water Resistance", value: "100m" },
      { label: "Crystal", value: "Scratch-resistant mineral glass" },
      { label: "Bracelet", value: "Stainless steel with safety clasp" },
    ],
  },
  {
    id: 3,
    name: "Viceroy Classic 36",
    shortDescription: "Elegant 36mm dress watch",
    description: "A refined 36mm dress watch with a sophisticated dark grey dial and fluted bezel detail. The perfect balance of elegance and everyday wearability.",
    price: 300,
    image: product3Front,
    images: [product3Front, product3Dial, product3Crown, product3Clasp, product3Box, product3Fullset],
    badge: null,
    priceId: "price_1T93PDF5cmmFi3mjc4ysUaGZ",
    slug: "viceroy-classic-36",
    category: "Classic",
    specs: [
      { label: "Movement", value: "Automatic (self-winding)" },
      { label: "Case Material", value: "316L Stainless Steel" },
      { label: "Case Size", value: "36mm" },
      { label: "Water Resistance", value: "50m" },
      { label: "Crystal", value: "Scratch-resistant mineral glass" },
      { label: "Bracelet", value: "Stainless steel with concealed clasp" },
    ],
  },
  {
    id: 4,
    name: "Meridian Diver Two-Tone",
    shortDescription: "Blue dial with gold-tone accents",
    description: "A premium two-tone design combining a deep blue dial with gold-toned accents. This automatic diver makes a statement while maintaining refined elegance.",
    price: 300,
    image: product4Front,
    images: [product4Front, product4Dial1, product4Dial2, product4Crown, product4Clasp, product4Box, product4Fullset],
    badge: "New",
    priceId: "price_1T93WDF5cmmFi3mjFW0QagSQ",
    slug: "meridian-diver-two-tone",
    category: "Classic",
    specs: [
      { label: "Movement", value: "Automatic (self-winding)" },
      { label: "Case Material", value: "316L Stainless Steel with gold PVD" },
      { label: "Case Size", value: "40mm" },
      { label: "Water Resistance", value: "100m" },
      { label: "Crystal", value: "Scratch-resistant mineral glass" },
      { label: "Bracelet", value: "Two-tone steel with fold-over clasp" },
    ],
  },
  {
    id: 5,
    name: "Atlas GMT",
    shortDescription: "Dual time zone traveller's watch",
    description: "A versatile GMT watch with a distinctive black and green dual-colour bezel. Track two time zones effortlessly with the automatic movement and comfortable linked bracelet.",
    price: 300,
    image: product5Front,
    images: [product5Front, product5FrontAlt, product5Angle, product5Bracelet, product5Clasp, product5OpenClasp, product5Box, product5Fullset],
    badge: "New",
    priceId: "price_1T93f6F5cmmFi3mj8mFGlsAa",
    slug: "atlas-gmt",
    category: "Sport",
    specs: [
      { label: "Movement", value: "Automatic (self-winding)" },
      { label: "Case Material", value: "316L Stainless Steel" },
      { label: "Case Size", value: "40mm" },
      { label: "Water Resistance", value: "100m" },
      { label: "Crystal", value: "Scratch-resistant mineral glass" },
      { label: "Bracelet", value: "Five-link steel bracelet" },
    ],
  },
  {
    id: 6,
    name: "Apex Chronograph",
    shortDescription: "Racing-inspired chronograph",
    description: "A precision chronograph with three sub-dials and a tachymeter-scale bezel. Designed for those who appreciate technical detail and sport-inspired aesthetics.",
    price: 350,
    image: product6Front,
    images: [product6Front, product6Angle, product6Side, product6Back, product6Clasp, product6Box, product6Fullset],
    badge: "New",
    priceId: "price_1T93oBF5cmmFi3mjleOURhm0",
    slug: "apex-chronograph",
    category: "Sport",
    specs: [
      { label: "Movement", value: "Automatic chronograph" },
      { label: "Case Material", value: "316L Stainless Steel" },
      { label: "Case Size", value: "40mm" },
      { label: "Water Resistance", value: "100m" },
      { label: "Crystal", value: "Scratch-resistant mineral glass" },
      { label: "Bracelet", value: "Stainless steel with fold-over clasp" },
    ],
  },
];

export const getProductBySlug = (slug: string): Product | null => {
  return products.find((p) => p.slug === slug) || null;
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};
