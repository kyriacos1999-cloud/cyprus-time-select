import { Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-[38px] left-0 right-0 z-50 bg-rolex-green">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[hsl(var(--rolex-gold))]" />
            <span className="font-display text-lg text-primary-foreground tracking-wider">
              REPLIC8
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#products" className="text-primary-foreground/80 hover:text-primary-foreground text-xs tracking-[0.15em] uppercase font-medium transition-colors">
              Collection
            </a>
            <Link to="/blog" className="text-primary-foreground/80 hover:text-primary-foreground text-xs tracking-[0.15em] uppercase font-medium transition-colors">
              Blog
            </Link>
            <a href="/#why-us" className="text-primary-foreground/80 hover:text-primary-foreground text-xs tracking-[0.15em] uppercase font-medium transition-colors">
              Why Us
            </a>
            <a href="/#faq" className="text-primary-foreground/80 hover:text-primary-foreground text-xs tracking-[0.15em] uppercase font-medium transition-colors">
              FAQ
            </a>
          </div>

          <button
            onClick={scrollToOrder}
            className="bg-primary-foreground text-primary text-xs tracking-[0.15em] uppercase font-medium px-5 py-2 hover:bg-primary-foreground/90 transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;