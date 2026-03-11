import { Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { productSEOData } from "@/data/productSEO";
import { products } from "@/components/ProductSection";

const footerLinks = [
  {
    title: "Collection",
    links: products.slice(0, 6).map((p) => ({
      label: p.name,
      href: `/watches/${productSEOData[p.id]?.slug || p.id}`,
      internal: true,
    })),
  },
  {
    title: "Services",
    links: [
      { label: "Order Online", href: "/#order-section", internal: true },
      { label: "Delivery Info", href: "/#faq", internal: true },
      { label: "Payment Options", href: "/#faq", internal: true },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Why Choose Us", href: "/#why-us", internal: true },
      { label: "FAQ", href: "/#faq", internal: true },
      { label: "Contact Us", href: "https://www.tiktok.com/@replic8cy?_r=1&_t=ZN-94XoCUvwPNW", internal: false },
    ],
  },
];

const socialLinks = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@replic8cy?_r=1&_t=ZN-94XoCUvwPNW",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.26a8.28 8.28 0 004.77 1.52V7.33a4.85 4.85 0 01-1-.64z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--rolex-dark))] text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Crown className="w-6 h-6 text-[hsl(var(--rolex-gold))]" />
              <span className="font-display text-xl tracking-wider">REPLIC8</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs font-light mb-8">
              Premium men's watches in Cyprus. Automatic movements, stainless steel construction, and free next-day delivery to Nicosia, Limassol, Larnaca, and Paphos.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-5 text-white/70">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.internal ? (
                      <Link
                        to={link.href}
                        className="text-white/40 hover:text-white text-sm transition-colors duration-300 font-light"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white text-sm transition-colors duration-300 font-light"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-light">
            © {new Date().getFullYear()} Replic8. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs font-light transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs font-light transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;