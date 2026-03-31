import { Watch } from "lucide-react";
import { Link } from "react-router-dom";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <Watch className="w-5 h-5 text-accent" />
            <span className="font-display text-lg text-primary-foreground tracking-wider">
              REPLIC8
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-primary-foreground/70 hover:text-primary-foreground text-xs tracking-[0.12em] uppercase font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <CartDrawer />
            <Link
              to="/shop"
              className="hidden sm:inline-flex bg-accent text-accent-foreground text-xs tracking-[0.12em] uppercase font-medium px-5 py-2 hover:bg-warm-dark transition-colors rounded-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
