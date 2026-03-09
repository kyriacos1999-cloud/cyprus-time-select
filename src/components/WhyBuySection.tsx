import { Truck, ShieldCheck, Banknote, ListChecks, MapPin } from "lucide-react";

const reasons = [
  { icon: Truck, title: "Free Next-Day Delivery", desc: "Anywhere in Cyprus, at no extra cost" },
  { icon: ShieldCheck, title: "Secure Online Payments", desc: "Safe & encrypted checkout" },
  { icon: Banknote, title: "Cash on Delivery", desc: "Pay when you receive (+€30)" },
  { icon: ListChecks, title: "Simple Ordering", desc: "Quick form, no account needed" },
  { icon: MapPin, title: "Local Cyprus Service", desc: "Dedicated to serving Cyprus" },
];

const WhyBuySection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-3">Why Choose Us</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Built for Cyprus
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {reasons.map((r) => (
          <div key={r.title} className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
              <r.icon className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-1">{r.title}</h3>
            <p className="text-xs text-muted-foreground font-body">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyBuySection;
