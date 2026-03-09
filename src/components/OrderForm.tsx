import { useState } from "react";
import { products } from "@/components/ProductSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { akisBranches, branchCities } from "@/data/akisBranches";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrderForm = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    courier: "",
  });

  const product = products.find((p) => p.id === selectedProduct)!;
  const surcharge = paymentMethod === "cod" ? 30 : 0;
  const total = product.price + surcharge;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.phone.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.phone.trim()))
      errs.phone = "Valid phone number is required";
    if (!form.address.trim()) errs.address = "Delivery address is required";
    if (!form.courier.trim()) errs.courier = "Nearest courier point is required";
    if (!agreed) errs.agreed = "Please agree to the terms";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <section id="order-section" className="py-24 md:py-32 bg-surface-sunken">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-surface-elevated border border-gold/20 p-12"
          >
            <CheckCircle2 className="w-14 h-14 text-gold mx-auto mb-6" />
            <h2 className="text-3xl font-display font-light text-foreground mb-3">Thank You</h2>
            <p className="text-muted-foreground font-body font-light">
              Your order request has been received. We will contact you shortly to confirm your purchase.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="order-section" className="py-24 md:py-32 bg-surface-sunken relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_hsl(40_65%_50%_/_0.04),_transparent_50%)]" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold/30" />
            <p className="text-gold font-body text-xs tracking-[0.4em] uppercase font-light">Checkout</p>
            <div className="h-px w-12 bg-gold/30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-light text-foreground tracking-tight">
            Complete Your <span className="italic text-gradient-gold">Order</span>
          </h2>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Product selector */}
            <div>
              <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3 block font-light">
                Select Timepiece
              </Label>
              <div className="space-y-2">
                {products.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={`w-full flex items-center gap-4 p-4 border text-left transition-all duration-300 ${
                      selectedProduct === p.id
                        ? "border-gold/50 bg-gold/5"
                        : "border-border bg-surface-elevated hover:border-gold/20"
                    }`}
                  >
                    <img src={p.image} alt={p.name} className="w-14 h-14 object-cover" />
                    <div className="flex-1">
                      <span className="font-display text-base text-foreground tracking-wide">{p.name}</span>
                      <span className="block text-xs text-muted-foreground font-body font-light mt-0.5">{p.description}</span>
                    </div>
                    <span className="font-body text-sm text-foreground">€{p.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
              { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
              { key: "phone", label: "Phone Number", type: "tel", placeholder: "+357 99 123456" },
              { key: "address", label: "Delivery Address", type: "text", placeholder: "Your full address in Cyprus" },
              { key: "courier", label: "Nearest Akis Express Courier", type: "text", placeholder: "e.g. Nicosia Central" },
            ].map((f) => (
              <div key={f.key}>
                <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block font-light">
                  {f.label}
                </Label>
                <Input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  className="font-body font-light rounded-none bg-surface-elevated border-border focus:border-gold/50 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground/50 h-12"
                />
                {errors[f.key] && <p className="text-destructive text-xs mt-1.5 font-body font-light">{errors[f.key]}</p>}
              </div>
            ))}

            {/* Payment */}
            <div>
              <Label className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3 block font-light">
                Payment Method
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("online")}
                  className={`relative p-5 border text-center transition-all duration-300 ${
                    paymentMethod === "online"
                      ? "border-gold/50 bg-gold/5 glow-gold"
                      : "border-border bg-surface-elevated hover:border-gold/20"
                  }`}
                >
                  {paymentMethod === "online" && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[9px] bg-gold text-accent-foreground px-3 py-1 font-body font-medium tracking-[0.15em] uppercase">
                      <Crown className="w-2.5 h-2.5" /> Recommended
                    </span>
                  )}
                  <span className="font-display text-sm text-foreground block mb-1 tracking-wide">Online Payment</span>
                  <span className="text-2xl font-body font-light text-foreground">€{product.price}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-5 border text-center transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-gold/50 bg-gold/5"
                      : "border-border bg-surface-elevated hover:border-gold/20"
                  }`}
                >
                  <span className="font-display text-sm text-foreground block mb-1 tracking-wide">Cash on Delivery</span>
                  <span className="text-2xl font-body font-light text-foreground">€{product.price + 30}</span>
                  <span className="block text-[10px] text-muted-foreground font-body mt-1 font-light">+€30 surcharge</span>
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => {
                  setAgreed(v === true);
                  if (errors.agreed) setErrors((prev) => ({ ...prev, agreed: "" }));
                }}
                className="mt-0.5 border-border data-[state=checked]:bg-gold data-[state=checked]:border-gold rounded-none"
              />
              <Label htmlFor="terms" className="font-body text-xs text-muted-foreground leading-relaxed cursor-pointer font-light">
                I agree to the terms and conditions and acknowledge the pricing structure shown.
              </Label>
            </div>
            {errors.agreed && <p className="text-destructive text-xs font-body font-light">{errors.agreed}</p>}
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 bg-surface-elevated border border-border p-7 space-y-5">
              <h3 className="font-display text-xl font-light text-foreground tracking-wide">Order Summary</h3>

              <div className="flex items-center gap-4 pb-5 border-b border-border">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                <div>
                  <p className="font-display text-base text-foreground tracking-wide">{product.name}</p>
                  <p className="text-[11px] text-muted-foreground font-body font-light mt-0.5">{product.description}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm font-body font-light">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timepiece</span>
                  <span className="text-foreground">€{product.price}</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">COD surcharge</span>
                    <span className="text-foreground">+€30</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-gold">Complimentary</span>
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <div className="flex justify-between items-end">
                  <span className="text-muted-foreground font-body text-xs tracking-[0.15em] uppercase font-light">Total</span>
                  <span className="text-3xl font-display font-light text-foreground">€{total}</span>
                </div>
                <p className="text-[10px] text-muted-foreground font-body mt-2 font-light">
                  Free next-day delivery across Cyprus
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-accent-foreground font-body font-medium tracking-wider uppercase text-xs py-6 rounded-none transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(40_65%_50%_/_0.4)]"
              >
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
