import { useState, useMemo } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, RotateCcw, Headphones, Lock, Tag, Loader2, ChevronsUpDown, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { products } from "@/data/products";
import { akisBranches, branchCities } from "@/data/akisBranches";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart();

  const directProductId = searchParams.get("product");
  const directProduct = directProductId
    ? products.find((p) => p.id === parseInt(directProductId, 10))
    : null;

  const isDirectCheckout = !!directProduct;
  const checkoutItems = isDirectCheckout
    ? [{ product: directProduct!, quantity: 1 }]
    : cartItems;

  const subtotal = isDirectCheckout ? directProduct!.price : cartSubtotal;

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", postalCode: "",
  });
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchOpen, setBranchOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const discount = promoApplied ? promoDiscount : 0;
  const total = subtotal - discount;

  const selectedBranchData = useMemo(
    () => akisBranches.find((b) => b.name === selectedBranch),
    [selectedBranch]
  );

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email is required";
    if (!form.address.trim()) errs.address = "Billing address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.postalCode.trim()) errs.postalCode = "Postal code is required";
    if (!selectedBranch) errs.branch = "Please select an Akis Express branch for delivery";
    if (!agreed) errs.agreed = "You must agree to the terms";
    return errs;
  };

  const isFormValid = form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.address.trim() && form.city.trim() && form.postalCode.trim() && agreed;

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleApplyPromo = () => {
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

    const primaryItem = checkoutItems[0];
    if (!primaryItem?.product.priceId) {
      setErrors({ submit: "This product is not available for online payment." });
      return;
    }

    setLoading(true);
    try {
      const productNames = checkoutItems.map((i) => i.product.name).join(", ");
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          priceId: primaryItem.product.priceId,
          productId: primaryItem.product.id,
          customerEmail: form.email,
          customerName: form.name,
          productName: productNames,
          origin: window.location.origin,
          akisBranch: selectedBranch || undefined,
        },
      });
      if (error) throw error;
      if (data?.url) {
        if (!isDirectCheckout) clearCart();
        window.location.href = data.url;
      }
    } catch (err: any) {
      setErrors({ submit: err.message || "Payment failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-foreground mb-4">No items to checkout</h1>
          <Link to="/shop" className="text-accent hover:underline text-sm">Browse Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={isDirectCheckout ? "/shop" : "/cart"} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-light">
            <ArrowLeft className="w-4 h-4" />
            {isDirectCheckout ? "Back to store" : "Back to cart"}
          </Link>
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="lg:sticky lg:top-8 space-y-6">
                  <div className="bg-background border border-border p-6 md:p-8 rounded-sm">
                    <h2 className="font-display text-lg text-foreground tracking-wide mb-6">Order Summary</h2>
                    <div className="space-y-4 pb-6 border-b border-border">
                      {checkoutItems.map((item) => (
                        <div key={item.product.id} className="flex gap-4">
                          <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover border border-border rounded-sm" />
                          <div className="flex-1">
                            <p className="font-display text-sm text-foreground tracking-wide">{item.product.name}</p>
                            <p className="text-[11px] text-muted-foreground font-light mt-1">{item.product.shortDescription}</p>
                            <div className="flex justify-between items-center mt-1.5">
                              <p className="text-[11px] text-accent font-medium">{item.quantity > 1 && `× ${item.quantity}`}</p>
                              <p className="text-sm font-display text-foreground">€{item.product.price * item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="py-5 space-y-3 text-sm font-light">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">€{subtotal}</span>
                      </div>
                      {promoApplied && discount > 0 && (
                        <div className="flex justify-between text-accent">
                          <span>Promo discount</span>
                          <span>-€{discount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-accent font-medium">FREE</span>
                      </div>
                    </div>
                    <Separator className="bg-border" />
                    <div className="pt-5 flex justify-between items-end">
                      <span className="text-muted-foreground text-xs tracking-[0.15em] uppercase font-medium">Total</span>
                      <span className="text-3xl font-display text-foreground">€{total}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Shield, label: "Secure Payment", desc: "256-bit SSL" },
                      { icon: RotateCcw, label: "Easy Returns", desc: "14-day policy" },
                      { icon: Headphones, label: "Support", desc: "We're here to help" },
                    ].map(({ icon: Icon, label, desc }) => (
                      <div key={label} className="bg-background border border-border p-3 text-center rounded-sm">
                        <Icon className="w-4 h-4 text-accent mx-auto mb-1.5" />
                        <p className="text-[9px] tracking-[0.1em] uppercase text-foreground font-medium">{label}</p>
                        <p className="text-[9px] text-muted-foreground font-light">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-2 lg:order-1 space-y-8">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <h1 className="text-2xl md:text-3xl font-display text-foreground tracking-tight mb-1">Checkout</h1>
                  <p className="text-sm text-muted-foreground font-light">Complete your purchase securely</p>
                </motion.div>

                <div className="space-y-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Contact Information</p>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">Full Name *</Label>
                    <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Your full name" className="bg-background border-border focus:border-accent h-12" />
                    {errors.name && <p className="text-destructive text-xs mt-1 font-light">{errors.name}</p>}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">Email *</Label>
                    <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@example.com" className="bg-background border-border focus:border-accent h-12" />
                    {errors.email && <p className="text-destructive text-xs mt-1 font-light">{errors.email}</p>}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">Phone <span className="text-muted-foreground/50">(optional)</span></Label>
                    <Input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+357 99 123456" className="bg-background border-border focus:border-accent h-12" />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Billing Address</p>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">Address *</Label>
                    <Input value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Street address" className="bg-background border-border focus:border-accent h-12" />
                    {errors.address && <p className="text-destructive text-xs mt-1 font-light">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">City *</Label>
                      <Input value={form.city} onChange={(e) => updateField("city", e.target.value)} placeholder="e.g. Nicosia" className="bg-background border-border focus:border-accent h-12" />
                      {errors.city && <p className="text-destructive text-xs mt-1 font-light">{errors.city}</p>}
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">Postal Code *</Label>
                      <Input value={form.postalCode} onChange={(e) => updateField("postalCode", e.target.value)} placeholder="1234" className="bg-background border-border focus:border-accent h-12" />
                      {errors.postalCode && <p className="text-destructive text-xs mt-1 font-light">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>

                {/* Akis Express Branch Selector */}
                <div className="space-y-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Pickup Point (Optional)</p>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      <MapPin className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                      Akis Express Branch <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-[11px] text-muted-foreground font-light mb-2">
                      Select an Akis Express branch for delivery.
                    </p>
                    <Popover open={branchOpen} onOpenChange={setBranchOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={branchOpen}
                          className="w-full justify-between bg-background border-border h-12 font-light text-sm hover:bg-background"
                        >
                          {selectedBranch
                            ? selectedBranchData
                              ? `${selectedBranchData.name} — ${selectedBranchData.city}`
                              : selectedBranch
                            : "Select a branch..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search branch or city..." />
                          <CommandList>
                            <CommandEmpty>No branch found.</CommandEmpty>
                            {branchCities.map((city) => (
                              <CommandGroup key={city} heading={city}>
                                {akisBranches
                                  .filter((b) => b.city === city)
                                  .map((branch) => (
                                    <CommandItem
                                      key={branch.name}
                                      value={`${branch.name} ${branch.city} ${branch.address}`}
                                      onSelect={() => {
                                        setSelectedBranch(
                                          selectedBranch === branch.name ? "" : branch.name
                                        );
                                        setBranchOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          selectedBranch === branch.name ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <div>
                                        <p className="text-sm">{branch.name}</p>
                                        <p className="text-[11px] text-muted-foreground">{branch.address}</p>
                                      </div>
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {selectedBranchData && (
                      <p className="text-xs text-accent mt-1.5 font-light">
                        📍 {selectedBranchData.address}
                      </p>
                    )}
                    {errors.branch && (
                      <p className="text-xs text-destructive mt-1.5">{errors.branch}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Payment</p>
                  <div className="bg-background border border-border p-5 rounded-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Lock className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs text-muted-foreground font-light">You'll be redirected to our secure payment partner.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium">We accept</span>
                      <div className="flex gap-1.5">
                        {["Visa", "Mastercard", "Apple Pay", "Google Pay"].map((m) => (
                          <span key={m} className="text-[9px] bg-muted text-muted-foreground px-2 py-0.5 font-medium rounded-sm">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Promo Code</p>
                  <div className="flex gap-2">
                    <Input value={promoCode} onChange={(e) => { setPromoCode(e.target.value); if (promoApplied) { setPromoApplied(false); setPromoDiscount(0); } }} placeholder="Enter code" className="bg-background border-border focus:border-accent h-10 flex-1" />
                    <Button type="button" variant="outline" onClick={handleApplyPromo} className="h-10 text-xs tracking-wider uppercase">
                      <Tag className="w-3.5 h-3.5 mr-1" />Apply
                    </Button>
                  </div>
                  {promoApplied && <p className="text-accent text-xs font-light">Code applied — you save €{promoDiscount}!</p>}
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="checkout-terms" checked={agreed} onCheckedChange={(v) => { setAgreed(v === true); if (errors.agreed) setErrors((prev) => ({ ...prev, agreed: "" })); }} className="mt-0.5 border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground" />
                  <Label htmlFor="checkout-terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-light">
                    I agree to the <Link to="/terms" className="text-foreground underline underline-offset-2">terms & conditions</Link> and acknowledge the pricing shown above.
                  </Label>
                </div>
                {errors.agreed && <p className="text-destructive text-xs font-light">{errors.agreed}</p>}

                <Button type="submit" disabled={!isFormValid || loading} className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium tracking-wider uppercase text-xs py-7 transition-all duration-300 disabled:opacity-40">
                  {loading ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Processing…</span>
                  ) : (
                    `Complete Purchase · €${total}`
                  )}
                </Button>

                {errors.submit && <p className="text-destructive text-sm text-center font-light">{errors.submit}</p>}

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
