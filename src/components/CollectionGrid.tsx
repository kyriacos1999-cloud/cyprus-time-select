import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const categories = [
  {
    name: "Classic",
    description: "Timeless elegance for every occasion",
    image: products.find((p) => p.slug === "viceroy-classic-36")?.image || products[2].image,
    price: "From €300",
  },
  {
    name: "Sport",
    description: "Built for performance and style",
    image: products.find((p) => p.slug === "atlas-gmt")?.image || products[4].image,
    price: "From €300",
  },
  {
    name: "Minimal",
    description: "Clean lines, pure design",
    image: products.find((p) => p.slug === "meridian-diver-two-tone")?.image || products[3].image,
    price: "From €300",
  },
  {
    name: "Gift Picks",
    description: "The perfect present, beautifully boxed",
    image: products.find((p) => p.slug === "apex-chronograph")?.image || products[5].image,
    price: "From €350",
  },
];

const CollectionGrid = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            Collections
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground tracking-tight">
            Shop by Style
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/shop?category=${cat.name}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-sm mb-3">
                  <img
                    src={cat.image}
                    alt={`${cat.name} watches`}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                </div>
                <h3 className="font-display text-base text-foreground mb-1">
                  {cat.name}
                </h3>
                <p className="text-muted-foreground text-xs font-light">
                  {cat.description}
                </p>
                <p className="text-accent text-xs font-medium mt-1">
                  {cat.price}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;
