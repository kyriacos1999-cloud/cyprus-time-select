import { Watch } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Watches", href: "/shop" },
      ...products.slice(0, 4).map((p) => ({
        label: p.name,
        href: `/watches/${p.slug}`,
      })),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Why Choose Us", href: "/why-us" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Delivery Info", href: "/delivery" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const socialLinks = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@replic8cy",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.26a8.28 8.28 0 004.77 1.52V7.33a4.85 4.85 0 01-1-.64z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Watch className="w-6 h-6 text-accent" />
              <span className="font-display text-xl tracking-wider">REPLIC8</span>
            </Link>
            <p className="text-primary-foreground/40 text-sm leading-relaxed max-w-xs font-light mb-6">
              Premium men's watches in Cyprus. Quality materials, reliable automatic movements, and free next-day delivery island-wide.
            </p>
            <p className="text-primary-foreground/40 text-xs font-light mb-6">
              support@replic8.shop
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/30 hover:text-primary-foreground transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-5 text-primary-foreground/60">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/35 hover:text-primary-foreground text-sm transition-colors duration-300 font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/25 text-xs font-light">
            © {new Date().getFullYear()} Replic8. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-primary-foreground/25 hover:text-primary-foreground/50 text-xs font-light transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-primary-foreground/25 hover:text-primary-foreground/50 text-xs font-light transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
