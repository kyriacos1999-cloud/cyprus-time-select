import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, RotateCcw, Headphones, Lock, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { products } from "@/components/ProductSection";
import { supabase } from "@/integrations/supabase/client";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = parseInt(searchParams.get("product") || "1", 10);
  const withBox = searchParams.get("box") !== "false";

  const product = products.find((p) => p.id === productId) || products[0];
  const boxDiscount = withBox ? 0 : 80;
  const basePrice = product.price - boxDiscount;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = basePrice;
  const discount = promoApplied ? promoDiscount : 0;
  const total = subtotal - discount;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.address.trim()) errs.address = "Billing address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.postalCode.trim()) errs.postalCode = "Postal code is required";
    if (!agreed) errs.agreed = "You must agree to the terms";
    return errs;
  };

  const isFormValid =
    form.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.address.trim() &&
    form.city.trim() &&
    form.postalCode.trim() &&
    agreed;

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleApplyPromo = () => {
    // Placeholder for promo code validation — connect to Stripe coupons
    if (promoCode.trim().toUpperCase() === "WELCOME10") {
      setPromoDiscount(Math.round(subtotal * 0.1));
      setPromoApplied(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!product.priceId) {
      setErrors({ submit: "This product is not available for online payment." });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          priceId: product.priceId,
          productId: product.id,
          customerEmail: form.email,
          customerName: form.name,
          productName: product.name,
          origin: window.location.origin,
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setErrors({ submit: err.message || "Payment failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/#order-section"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to store
          </Link>
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
              Secure Checkout
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* LEFT — Order Summary (on top for mobile) */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="lg:sticky lg:top-8 space-y-6">
                  <div className="bg-background border border-border p-6 md:p-8">
                    <h2 className="font-display text-lg text-foreground tracking-wide mb-6">
                      Order Summary
                    </h2>

                    {/* Product */}
                    <div className="flex gap-4 pb-6 border-b border-border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover border border-border"
                      />
                      <div className="flex-1">
                        <p className="font-display text-sm text-foreground tracking-wide">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground font-light mt-1">
                          {product.description}
                        </p>
                        <p className="text-[11px] text-primary font-medium mt-1.5">
                          {withBox ? "Full Set — Box, papers & card" : "Watch Only"}
                        </p>
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="py-5 space-y-3 text-sm font-light">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">€{subtotal}</span>
                      </div>
                      {promoApplied && discount > 0 && (
                        <div className="flex justify-between text-primary">
                          <span>Promo discount</span>
                          <span>-€{discount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-primary font-medium">FREE</span>
                      </div>
                    </div>

                    <Separator className="bg-border" />

                    {/* Total */}
                    <div className="pt-5 flex justify-between items-end">
                      <span className="text-muted-foreground text-xs tracking-[0.15em] uppercase font-medium">
                        Total
                      </span>
                      <span className="text-3xl font-display text-foreground">€{total}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 font-light">
                      Free next-day delivery across Cyprus
                    </p>
                  </div>

                  {/* Trust indicators */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Shield, label: "Secure Payment", desc: "256-bit SSL" },
                      { icon: RotateCcw, label: "Easy Returns", desc: "14-day policy" },
                      { icon: Headphones, label: "Support", desc: "Available 24/7" },
                    ].map(({ icon: Icon, label, desc }) => (
                      <div
                        key={label}
                        className="bg-background border border-border p-3 text-center"
                      >
                        <Icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                        <p className="text-[9px] tracking-[0.1em] uppercase text-foreground font-medium">
                          {label}
                        </p>
                        <p className="text-[9px] text-muted-foreground font-light">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — Checkout Form */}
              <div className="lg:col-span-7 order-2 lg:order-1 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h1 className="text-2xl md:text-3xl font-display text-foreground tracking-tight mb-1">
                    Checkout
                  </h1>
                  <p className="text-sm text-muted-foreground font-light">
                    Complete your purchase securely
                  </p>
                </motion.div>

                {/* Contact */}
                <div className="space-y-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Contact Information
                  </p>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      Full Name *
                    </Label>
                    <Input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                      className="rounded-none bg-background border-border focus:border-primary h-12"
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs mt-1 font-light">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@example.com"
                      className="rounded-none bg-background border-border focus:border-primary h-12"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs mt-1 font-light">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      Phone <span className="text-muted-foreground/50">(optional)</span>
                    </Label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+357 99 123456"
                      className="rounded-none bg-background border-border focus:border-primary h-12"
                    />
                  </div>
                </div>

                {/* Billing */}
                <div className="space-y-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Billing Address
                  </p>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      Address *
                    </Label>
                    <Input
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="Street address"
                      className="rounded-none bg-background border-border focus:border-primary h-12"
                    />
                    {errors.address && (
                      <p className="text-destructive text-xs mt-1 font-light">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                        City *
                      </Label>
                      <Input
                        value={form.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="e.g. Nicosia"
                        className="rounded-none bg-background border-border focus:border-primary h-12"
                      />
                      {errors.city && (
                        <p className="text-destructive text-xs mt-1 font-light">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                        Postal Code *
                      </Label>
                      <Input
                        value={form.postalCode}
                        onChange={(e) => updateField("postalCode", e.target.value)}
                        placeholder="1234"
                        className="rounded-none bg-background border-border focus:border-primary h-12"
                      />
                      {errors.postalCode && (
                        <p className="text-destructive text-xs mt-1 font-light">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Payment
                  </p>
                  <div className="bg-background border border-border p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Lock className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs text-muted-foreground font-light">
                        You'll be redirected to our secure payment partner to complete your purchase.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium">
                        We accept
                      </span>
                      <div className="flex gap-1.5">
                        {["Visa", "Mastercard", "Apple Pay", "Google Pay"].map((m) => (
                          <span
                            key={m}
                            className="text-[9px] bg-muted text-muted-foreground px-2 py-0.5 font-medium"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo code */}
                <div className="space-y-2">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Promo Code
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        if (promoApplied) {
                          setPromoApplied(false);
                          setPromoDiscount(0);
                        }
                      }}
                      placeholder="Enter code"
                      className="rounded-none bg-background border-border focus:border-primary h-10 flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyPromo}
                      className="rounded-none h-10 text-xs tracking-wider uppercase"
                    >
                      <Tag className="w-3.5 h-3.5 mr-1" />
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-primary text-xs font-light">
                      Code applied — you save €{promoDiscount}!
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="checkout-terms"
                    checked={agreed}
                    onCheckedChange={(v) => {
                      setAgreed(v === true);
                      if (errors.agreed) setErrors((prev) => ({ ...prev, agreed: "" }));
                    }}
                    className="mt-0.5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-none"
                  />
                  <Label
                    htmlFor="checkout-terms"
                    className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-light"
                  >
                    I agree to the{" "}
                    <span className="text-foreground underline underline-offset-2">
                      terms & conditions
                    </span>{" "}
                    and acknowledge the pricing shown above.
                  </Label>
                </div>
                {errors.agreed && (
                  <p className="text-destructive text-xs font-light">{errors.agreed}</p>
                )}

                {/* CTA */}
                <Button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full bg-primary hover:bg-rolex-green-light text-primary-foreground font-medium tracking-wider uppercase text-xs py-7 rounded-none transition-all duration-300 disabled:opacity-40"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing…
                    </span>
                  ) : (
                    `Complete Purchase · €${total}`
                  )}
                </Button>

                {errors.submit && (
                  <p className="text-destructive text-sm text-center font-light">{errors.submit}</p>
                )}

                <p className="text-center text-[10px] text-muted-foreground font-light">
                  <Lock className="w-3 h-3 inline mr-1 -mt-0.5" />
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
