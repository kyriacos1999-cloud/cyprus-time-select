import watch1 from "@/assets/watch-1.jpg";
import watch2 from "@/assets/watch-2.jpg";
import watch3 from "@/assets/watch-3.jpg";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Chronos Elite",
    description: "Rose gold chronograph with leather strap",
    price: 189,
    image: watch1,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Noir Minimalist",
    description: "Matte black with mesh strap",
    price: 149,
    image: watch2,
    badge: "Best Price Online",
  },
  {
    id: 3,
    name: "Aqua Diver Pro",
    description: "Stainless steel sport dive watch",
    price: 219,
    image: watch3,
    badge: null,
  },
];

export { products };

const ProductSection = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="products" className="py-20 bg-surface-sunken">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-3">Our Collection</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Featured Watches
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-surface-elevated rounded-sm border border-border overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={scrollToOrder}
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-gold text-accent-foreground font-body text-xs border-0 rounded-sm">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-muted-foreground font-body text-sm mb-4">
                  {product.description}
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-body font-bold text-foreground">€{product.price}</span>
                    <span className="text-xs font-body bg-gold/10 text-gold-dark px-2 py-0.5 rounded-sm">
                      Online Price
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    Cash on Delivery: €{product.price + 30}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
