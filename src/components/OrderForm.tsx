import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/components/ProductSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, CheckCircle2, ChevronsUpDown, Crown, Search, Tag, X } from "lucide-react";
import { motion } from "framer-motion";
import { akisBranches, branchCities } from "@/data/akisBranches";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useSoldOut } from "@/hooks/useSoldOut";

const OrderForm = () => {
  const location = useLocation();
  const queryProduct = new URLSearchParams(location.search).get("product");
  const initialProduct = queryProduct ? parseInt(queryProduct, 10) : products[0].id;
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const { soldOutIds } = useSoldOut();

  useEffect(() => {
    if (queryProduct) {
      const id = parseInt(queryProduct, 10);
      const found = products.find((p) => p.id === id);
      if (found) {
        setSelectedProduct(id);
        setTimeout(() => {
          document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [queryProduct]);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [courierOpen, setCourierOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    courier: "",
  });

  const product = products.find((p) => p.id === selectedProduct)!;
  const surcharge = paymentMethod === "cod" ? 30 : 0;
  const discount = appliedPromo === "WELCOME10" ? Math.round(product.price * 0.1) : 0;
  const total = product.price + surcharge - discount;

  const applyPromo = () => {
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "WELCOME10") {
      setAppliedPromo("WELCOME10");
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.phone.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.phone.trim()))
      errs.phone = "Valid phone number is required";
    if (!form.address.trim()) errs.address = "Delivery address is required";
    if (!form.courier.trim()) errs.courier = "Please select an Akis Express branch";
    if (!agreed) errs.agreed = "Please agree to the terms";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // For online payment with a Stripe price, redirect to Stripe Checkout
    if (paymentMethod === "online" && product.priceId) {
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
            couponId: appliedPromo === "WELCOME10" ? "Kpc0LacG" : undefined,
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
    } else {
      // COD or no Stripe price — show confirmation
      setSubmitted(true);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <section id="order-section" className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-background border border-border p-12"
          >
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display text-foreground mb-3">Thank You</h2>
            <p className="text-muted-foreground font-light">
              Your order request has been received. We will contact you shortly to confirm your purchase.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="order-section" className="py-24 md:py-32 bg-secondary relative">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs tracking-[0.5em] uppercase mb-4 font-medium">
            Checkout
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-foreground tracking-tight">
            Complete Your Order
          </h2>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Product selector */}
            <div>
              <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3 block font-medium">
                Select Timepiece
              </Label>
              <div className="space-y-2">
                {products.map((p) => {
                  const isSoldOut = soldOutIds.has(p.id);
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => !isSoldOut && setSelectedProduct(p.id)}
                      disabled={isSoldOut}
                      className={`w-full flex items-center gap-4 p-4 border text-left transition-all duration-300 ${
                        isSoldOut
                          ? "border-border bg-muted opacity-60 cursor-not-allowed"
                          : selectedProduct === p.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background hover:border-primary/30"
                      }`}
                    >
                      <img src={p.image} alt={p.name} className={`w-14 h-14 object-cover ${isSoldOut ? "grayscale" : ""}`} />
                      <div className="flex-1">
                        <span className="font-display text-base text-foreground tracking-wide">{p.name}</span>
                        <span className="block text-xs text-muted-foreground font-light mt-0.5">{p.description}</span>
                      </div>
                      {isSoldOut ? (
                        <span className="text-xs text-destructive font-medium tracking-wider uppercase">Sold Out</span>
                      ) : (
                        <span className="text-sm text-foreground font-medium">€{p.price}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fields */}
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
              { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
              { key: "phone", label: "Phone Number", type: "tel", placeholder: "+357 99 123456" },
              { key: "address", label: "Delivery Address", type: "text", placeholder: "Your full address in Cyprus" },
            ].map((f) => (
              <div key={f.key}>
                <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block font-medium">
                  {f.label}
                </Label>
                <Input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  className="rounded-none bg-background border-border focus:border-primary focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 h-12"
                />
                {errors[f.key] && <p className="text-destructive text-xs mt-1.5 font-light">{errors[f.key]}</p>}
              </div>
            ))}

            {/* Akis Express Branch Searchable Dropdown */}
            <div>
              <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block font-medium">
                Nearest Akis Express Branch
              </Label>
              <Popover open={courierOpen} onOpenChange={setCourierOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={courierOpen}
                    className={cn(
                      "flex h-12 w-full items-center justify-between rounded-none bg-background border border-border px-3 py-2 text-sm transition-colors",
                      "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20",
                      form.courier ? "text-foreground" : "text-muted-foreground/40"
                    )}
                  >
                    {form.courier
                      ? akisBranches.find((b) => b.name === form.courier)?.name
                      : "Search for your nearest branch..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-none border-border bg-background" align="start">
                  <Command className="bg-transparent">
                    <div className="flex items-center border-b border-border px-3">
                      <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground/50" />
                      <CommandInput
                        placeholder="Type to search branches..."
                        className="h-11 text-foreground placeholder:text-muted-foreground/40"
                      />
                    </div>
                    <CommandList className="max-h-[250px]">
                      <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                        No branch found.
                      </CommandEmpty>
                      {branchCities.map((city) => (
                        <CommandGroup
                          key={city}
                          heading={city}
                          className="[&_[cmdk-group-heading]]:font-display [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-primary/70 [&_[cmdk-group-heading]]:font-medium"
                        >
                          {akisBranches
                            .filter((b) => b.city === city)
                            .map((branch) => (
                              <CommandItem
                                key={branch.name}
                                value={`${branch.name} ${branch.address} ${branch.city}`}
                                onSelect={() => {
                                  updateField("courier", branch.name);
                                  setCourierOpen(false);
                                }}
                                className="rounded-none cursor-pointer aria-selected:bg-primary/5"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 text-primary",
                                    form.courier === branch.name ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span className="text-foreground">{branch.name}</span>
                                  <span className="text-[10px] text-muted-foreground">{branch.address}</span>
                                </div>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.courier && <p className="text-destructive text-xs mt-1.5 font-light">{errors.courier}</p>}
            </div>

            {/* Payment */}
            <div>
              <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3 block font-medium">
                Payment Method
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("online")}
                  className={`relative p-5 border text-center transition-all duration-300 ${
                    paymentMethod === "online"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/30"
                  }`}
                >
                  {paymentMethod === "online" && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[9px] bg-primary text-primary-foreground px-3 py-1 font-medium tracking-[0.15em] uppercase">
                      <Crown className="w-2.5 h-2.5" /> Recommended
                    </span>
                  )}
                  <span className="font-display text-sm text-foreground block mb-1 tracking-wide">Online Payment</span>
                  <span className="text-2xl font-display text-foreground">€{product.price}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-5 border text-center transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/30"
                  }`}
                >
                  <span className="font-display text-sm text-foreground block mb-1 tracking-wide">Cash on Delivery</span>
                  <span className="text-2xl font-display text-foreground">€{product.price + 30}</span>
                  <span className="block text-[10px] text-muted-foreground mt-1 font-light">+€30 surcharge</span>
                </button>
              </div>
            </div>

            {/* Promo Code */}
            <div>
              <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block font-medium">
                Promo Code
              </Label>
              {appliedPromo ? (
                <div className="flex items-center gap-2 bg-primary/5 border border-primary/30 px-4 py-3">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground font-medium flex-1">{appliedPromo}</span>
                  <span className="text-xs text-primary font-medium">-10%</span>
                  <button type="button" onClick={removePromo} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyPromo())}
                    className="rounded-none bg-background border-border focus:border-primary focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 h-12 uppercase tracking-wider"
                  />
                  <Button
                    type="button"
                    onClick={applyPromo}
                    variant="outline"
                    className="rounded-none border-border h-12 px-5 text-xs tracking-wider uppercase hover:border-primary hover:text-primary"
                  >
                    Apply
                  </Button>
                </div>
              )}
              {promoError && <p className="text-destructive text-xs mt-1.5 font-light">{promoError}</p>}
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
                className="mt-0.5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-none"
              />
              <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-light">
                I agree to the terms and conditions and acknowledge the pricing structure shown.
              </Label>
            </div>
            {errors.agreed && <p className="text-destructive text-xs font-light">{errors.agreed}</p>}
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 bg-background border border-border p-7 space-y-5">
              <h3 className="font-display text-xl text-foreground tracking-wide">Order Summary</h3>

              <div className="flex items-center gap-4 pb-5 border-b border-border">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                <div>
                  <p className="font-display text-base text-foreground tracking-wide">{product.name}</p>
                  <p className="text-[11px] text-muted-foreground font-light mt-0.5">{product.description}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm font-light">
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
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-primary font-medium">WELCOME10 discount</span>
                    <span className="text-primary font-medium">-€{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-primary font-medium">FREE</span>
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <div className="flex justify-between items-end">
                  <span className="text-muted-foreground text-xs tracking-[0.15em] uppercase font-medium">Total</span>
                  <span className="text-3xl font-display text-foreground">€{total}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 font-light">
                  Free next-day delivery across Cyprus
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading || soldOutIds.has(selectedProduct)}
                className="w-full bg-primary hover:bg-rolex-green-light text-primary-foreground font-medium tracking-wider uppercase text-xs py-6 rounded-none transition-all duration-300 disabled:opacity-50"
              >
                {soldOutIds.has(selectedProduct) ? "Sold Out" : loading ? "Redirecting to Payment..." : paymentMethod === "online" ? "Pay with Stripe" : "Place Order"}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3 font-light flex items-center justify-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--rolex-green))] animate-pulse" />
                High demand this week – limited pieces available.
              </p>
              <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-border">
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium">We accept</span>
                <div className="flex items-center gap-2">
                  {/* Visa */}
                  <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                    <path d="M19.5 21H17L18.9 11H21.4L19.5 21ZM15.2 11L12.8 18L12.5 16.5L12.5 16.5L11.6 12C11.6 12 11.5 11 10.2 11H6.1L6 11.2C6 11.2 7.5 11.5 9.2 12.5L11.4 21H14L18 11H15.2ZM35.4 21H37.7L35.7 11H33.7C32.6 11 32.3 11.8 32.3 11.8L28.5 21H31.1L31.6 19.5H34.8L35.1 21H35.4ZM32.3 17.5L33.7 13.6L34.5 17.5H32.3ZM28.5 13.5L28.9 11.3C28.9 11.3 27.5 10.8 26.1 10.8C24.5 10.8 21 11.5 21 14.3C21 16.9 24.5 16.9 24.5 18.3C24.5 19.7 21.4 19.4 20.1 18.5L19.7 20.8C19.7 20.8 21.1 21.4 23 21.4C24.9 21.4 28.4 20.4 28.4 17.8C28.4 15.1 24.9 14.9 24.9 13.7C24.9 12.5 27.2 12.7 28.5 13.5Z" fill="white"/>
                  </svg>
                  {/* Mastercard */}
                  <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="#252525"/>
                    <circle cx="19" cy="16" r="8" fill="#EB001B"/>
                    <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
                    <path d="M24 10.3C25.8 11.7 27 13.7 27 16C27 18.3 25.8 20.3 24 21.7C22.2 20.3 21 18.3 21 16C21 13.7 22.2 11.7 24 10.3Z" fill="#FF5F00"/>
                  </svg>
                  {/* Apple Pay */}
                  <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="#000"/>
                    <path d="M15.2 11.8C15.6 11.3 15.8 10.7 15.8 10C15.1 10.1 14.3 10.5 13.8 11C13.4 11.4 13.1 12.1 13.2 12.7C13.9 12.8 14.7 12.3 15.2 11.8Z" fill="white"/>
                    <path d="M15.8 12.9C14.7 12.8 13.8 13.5 13.3 13.5C12.8 13.5 12 12.9 11.1 12.9C10 13 9 13.6 8.4 14.5C7.2 16.4 8.1 19.3 9.3 20.8C9.9 21.6 10.6 22.4 11.5 22.4C12.3 22.4 12.7 21.9 13.7 21.9C14.7 21.9 15.1 22.4 16 22.4C16.9 22.4 17.5 21.6 18.1 20.8C18.8 19.9 19.1 19 19.1 19C19.1 19 17.5 18.3 17.5 16.5C17.5 14.9 18.8 14.2 18.8 14.2C18.1 13.2 17 12.9 15.8 12.9Z" fill="white"/>
                    <path d="M24.2 10.5C26.6 10.5 28.3 12.2 28.3 14.5C28.3 16.9 26.5 18.6 24 18.6H22.2V22.3H20.5V10.5H24.2ZM22.2 17.2H23.7C25.4 17.2 26.5 16.1 26.5 14.5C26.5 13 25.4 11.9 23.7 11.9H22.2V17.2Z" fill="white"/>
                    <path d="M32.5 22.4C31 22.4 29.8 21.6 29.8 20.3C29.8 19 30.8 18.3 32.6 18.2L34.7 18.1V17.5C34.7 16.6 34.1 16.1 33.1 16.1C32.2 16.1 31.6 16.5 31.5 17.1H30V17C30.1 15.6 31.4 14.7 33.2 14.7C35 14.7 36.3 15.6 36.3 17.3V22.3H34.8V21.1H34.8C34.3 21.9 33.4 22.4 32.5 22.4ZM32.9 21.1C33.9 21.1 34.7 20.4 34.7 19.5V19.1L32.9 19.2C31.9 19.3 31.4 19.6 31.4 20.2C31.4 20.7 31.9 21.1 32.9 21.1Z" fill="white"/>
                    <path d="M38 24.5V23.1C38.1 23.1 38.4 23.2 38.6 23.2C39.3 23.2 39.7 22.9 39.9 22.2L40 21.9L37.3 14.8H39.1L41 20.3H41L42.9 14.8H44.6L41.8 22.5C41.2 24.1 40.4 24.6 39 24.6C38.7 24.6 38.2 24.5 38 24.5Z" fill="white"/>
                  </svg>
                  {/* Google Pay */}
                  <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E5E5" strokeWidth="0.5"/>
                    <path d="M22.6 16.2V19.3H21.4V10.7H24.5C25.3 10.7 26 11 26.5 11.5C27.1 12 27.3 12.7 27.3 13.4C27.3 14.2 27.1 14.8 26.5 15.3C26 15.8 25.3 16.1 24.5 16.1H22.6V16.2ZM22.6 11.9V15H24.5C25 15 25.4 14.8 25.7 14.5C26 14.2 26.2 13.8 26.2 13.4C26.2 13 26 12.6 25.7 12.3C25.4 12 25 11.9 24.5 11.9H22.6Z" fill="#3C4043"/>
                    <path d="M30.3 13.5C31.2 13.5 31.9 13.8 32.4 14.3C32.9 14.8 33.2 15.5 33.2 16.3V19.3H32V18.5H32C31.5 19.2 30.9 19.5 30.1 19.5C29.4 19.5 28.8 19.3 28.3 18.8C27.8 18.4 27.6 17.8 27.6 17.2C27.6 16.5 27.9 16 28.4 15.6C28.9 15.2 29.6 15 30.4 15C31.1 15 31.7 15.1 32.1 15.4V15.2C32.1 14.7 31.9 14.3 31.6 14C31.3 13.7 30.9 13.6 30.4 13.6C29.7 13.6 29.2 13.9 28.8 14.5L27.8 13.9C28.4 13.1 29.2 13.5 30.3 13.5ZM28.8 17.2C28.8 17.6 29 17.9 29.2 18.1C29.5 18.3 29.8 18.5 30.2 18.5C30.7 18.5 31.2 18.3 31.6 17.9C32 17.5 32.2 17.1 32.2 16.6C31.8 16.3 31.2 16.1 30.5 16.1C30 16.1 29.5 16.2 29.2 16.5C28.9 16.7 28.8 17 28.8 17.2Z" fill="#3C4043"/>
                    <path d="M38.6 13.7L34.8 22.3H33.5L35 19.1L32.5 13.7H33.9L35.7 18L37.4 13.7H38.6Z" fill="#3C4043"/>
                    <path d="M17.1 15.8C17.1 15.5 17.1 15.1 17 14.8H12.2V16.7H15C14.9 17.4 14.5 17.9 14 18.3V19.7H15.6C16.5 18.9 17.1 17.5 17.1 15.8Z" fill="#4285F4"/>
                    <path d="M12.2 21C13.7 21 14.9 20.5 15.6 19.7L14 18.3C13.5 18.6 12.9 18.8 12.2 18.8C10.8 18.8 9.6 17.9 9.2 16.6H7.5V18.1C8.5 19.9 10.2 21 12.2 21Z" fill="#34A853"/>
                    <path d="M9.2 16.6C9 16 9 15.3 9.2 14.7V13.2H7.5C6.8 14.5 6.8 16.1 7.5 17.4L9.2 16.6Z" fill="#FBBC04"/>
                    <path d="M12.2 12.5C12.9 12.5 13.6 12.8 14.1 13.3L15.7 11.7C14.8 10.9 13.6 10.4 12.2 10.4C10.2 10.4 8.5 11.6 7.5 13.3L9.2 14.8C9.6 13.4 10.8 12.5 12.2 12.5Z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
              {errors.submit && <p className="text-destructive text-xs mt-2 font-light">{errors.submit}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
