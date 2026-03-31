import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Watch, Users, MapPin, Heart } from "lucide-react";

const AboutPage = () => (
  <main>
    <Navbar />
    <div className="pt-14 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl md:text-5xl font-display text-foreground tracking-tight mb-6">About Replic8</h1>
          <p className="text-muted-foreground text-base leading-relaxed font-light mb-8">
            Replic8 is a men's watch store based in Cyprus, dedicated to offering premium-quality timepieces at fair prices. We believe every man deserves a watch that feels substantial, looks refined, and works reliably — without the luxury markup.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Watch, title: "Quality First", desc: "We hand-select every watch in our collection, ensuring quality materials and reliable automatic movements." },
              { icon: Users, title: "Customer Focused", desc: "Your satisfaction is our priority. We offer easy returns, responsive support, and a straightforward ordering process." },
              { icon: MapPin, title: "Proudly Local", desc: "Based in Cyprus, serving Cyprus. We deliver island-wide with free next-day shipping to every city and village." },
              { icon: Heart, title: "Built on Trust", desc: "Transparent pricing, honest product descriptions, and secure checkout. We earn trust by delivering on our promises." },
            ].map((item) => (
              <div key={item.title} className="bg-secondary/50 p-6 rounded-sm">
                <item.icon className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-display text-sm text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-display text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground text-sm leading-relaxed font-light mb-8">
            We started Replic8 because we saw a gap in the Cyprus market: quality men's watches at accessible prices, backed by real customer service and fast local delivery. Our curated collection features automatic watches built with stainless steel, mineral glass crystals, and reliable movements — designed for people who appreciate craftsmanship without the inflated price tag.
          </p>

          <h2 className="text-2xl font-display text-foreground mb-4">Why Customers Choose Us</h2>
          <ul className="space-y-3 text-sm text-muted-foreground font-light mb-8">
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /> Free next-day delivery across all of Cyprus</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /> 14-day return policy — no questions asked</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /> 1-year warranty on every watch</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /> Secure checkout with Visa, Mastercard, Apple Pay, Google Pay</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /> Cash on delivery available island-wide</li>
          </ul>
        </motion.div>
      </div>
    </div>
    <Footer />
  </main>
);

export default AboutPage;
