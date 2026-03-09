import { useState } from "react";
import { products } from "@/components/ProductSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

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
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required";
    if (!form.phone.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.phone.trim()))
      errs.phone = "Valid phone required";
    if (!form.address.trim()) errs.address = "Required";
    if (!form.courier.trim()) errs.courier = "Required";
    if (!agreed) errs.agreed = "You must agree to terms";
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
      <section id="order-section" className="py-20 bg-surface-sunken">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <div className="bg-surface-elevated border border-border rounded-sm p-10">
            <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">Thank You!</h2>
            <p className="text-muted-foreground font-body">
              Your order request has been received. We will contact you shortly to confirm.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order-section" className="py-20 bg-surface-sunken">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-3">Checkout</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Complete Your Order
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Form fields */}
          <div className="md:col-span-3 space-y-5">
            {/* Product selector */}
            <div>
              <Label className="font-body text-sm font-medium text-foreground mb-2 block">Select Watch</Label>
              <div className="grid grid-cols-1 gap-2">
                {products.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={`flex items-center gap-3 p-3 rounded-sm border text-left transition-colors ${
                      selectedProduct === p.id
                        ? "border-gold bg-gold/5"
                        : "border-border bg-surface-elevated hover:border-gold/40"
                    }`}
                  >
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-sm object-cover" />
                    <div className="flex-1">
                      <span className="font-display text-sm font-semibold text-foreground">{p.name}</span>
                      <span className="block text-xs text-muted-foreground font-body">€{p.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact fields */}
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
              { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              { key: "phone", label: "Phone Number", type: "tel", placeholder: "+357 99 123456" },
              { key: "address", label: "Delivery Address", type: "text", placeholder: "Your full address in Cyprus" },
              { key: "courier", label: "Nearest Akis Express Courier", type: "text", placeholder: "e.g. Nicosia Central" },
            ].map((f) => (
              <div key={f.key}>
                <Label className="font-body text-sm font-medium text-foreground mb-1.5 block">{f.label}</Label>
                <Input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  className="font-body rounded-sm bg-surface-elevated"
                />
                {errors[f.key] && <p className="text-destructive text-xs mt-1 font-body">{errors[f.key]}</p>}
              </div>
            ))}

            {/* Payment method */}
            <div>
              <Label className="font-body text-sm font-medium text-foreground mb-2 block">Payment Method</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("online")}
                  className={`relative p-4 rounded-sm border text-center transition-colors ${
                    paymentMethod === "online"
                      ? "border-gold bg-gold/5 ring-1 ring-gold"
                      : "border-border bg-surface-elevated hover:border-gold/40"
                  }`}
                >
                  {paymentMethod === "online" && (
                    <span className="absolute top-1.5 right-1.5 text-[10px] bg-gold text-accent-foreground px-1.5 py-0.5 rounded-sm font-body font-semibold">
                      Recommended
                    </span>
                  )}
                  <span className="font-display text-sm font-semibold text-foreground block">Online Payment</span>
                  <span className="text-lg font-body font-bold text-foreground">€{product.price}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-sm border text-center transition-colors ${
                    paymentMethod === "cod"
                      ? "border-gold bg-gold/5 ring-1 ring-gold"
                      : "border-border bg-surface-elevated hover:border-gold/40"
                  }`}
                >
                  <span className="font-display text-sm font-semibold text-foreground block">Cash on Delivery</span>
                  <span className="text-lg font-body font-bold text-foreground">€{product.price + 30}</span>
                  <span className="block text-[10px] text-muted-foreground font-body">+€30 surcharge</span>
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => {
                  setAgreed(v === true);
                  if (errors.agreed) setErrors((prev) => ({ ...prev, agreed: "" }));
                }}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="font-body text-xs text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the terms and conditions and understand the pricing shown.
              </Label>
            </div>
            {errors.agreed && <p className="text-destructive text-xs font-body">{errors.agreed}</p>}
          </div>

          {/* Order summary */}
          <div className="md:col-span-2">
            <div className="sticky top-8 bg-surface-elevated border border-border rounded-sm p-6 space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground">Order Summary</h3>
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-14 h-14 rounded-sm object-cover" />
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{product.description}</p>
                </div>
              </div>
              <hr className="border-border" />
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base price</span>
                  <span className="text-foreground font-medium">€{product.price}</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">COD surcharge</span>
                    <span className="text-foreground font-medium">+€30</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-gold font-medium">Free</span>
                </div>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-body font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">€{total}</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-body">Free next-day delivery across Cyprus</p>
              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-accent-foreground font-body font-semibold py-5 rounded-sm text-base"
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
