import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/components/ProductSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, CheckCircle2, ChevronsUpDown, Crown, Search } from "lucide-react";
import { motion } from "framer-motion";
import { akisBranches, branchCities } from "@/data/akisBranches";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const OrderForm = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [courierOpen, setCourierOpen] = useState(false);

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
                {products.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={`w-full flex items-center gap-4 p-4 border text-left transition-all duration-300 ${
                      selectedProduct === p.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/30"
                    }`}
                  >
                    <img src={p.image} alt={p.name} className="w-14 h-14 object-cover" />
                    <div className="flex-1">
                      <span className="font-display text-base text-foreground tracking-wide">{p.name}</span>
                      <span className="block text-xs text-muted-foreground font-light mt-0.5">{p.description}</span>
                    </div>
                    <span className="text-sm text-foreground font-medium">€{p.price}</span>
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
                disabled={loading}
                className="w-full bg-primary hover:bg-rolex-green-light text-primary-foreground font-medium tracking-wider uppercase text-xs py-6 rounded-none transition-all duration-300"
              >
                {loading ? "Redirecting to Payment..." : paymentMethod === "online" ? "Pay with Stripe" : "Place Order"}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3 font-light flex items-center justify-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--rolex-green))] animate-pulse" />
                High demand this week – limited pieces available.
              </p>
              {errors.submit && <p className="text-destructive text-xs mt-2 font-light">{errors.submit}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
