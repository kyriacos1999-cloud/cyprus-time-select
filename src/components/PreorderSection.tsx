import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, X, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const PreorderSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", description: "" });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: "Image must be under 5MB" }));
      return;
    }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, photo: "" }));
  };

  const removePhoto = () => {
    setPhoto(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email is required";
    if (!form.description.trim()) errs.description = "Please describe the watch you're looking for";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      let photoUrl: string | null = null;

      if (photo) {
        const ext = photo.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("preorder-photos")
          .upload(fileName, photo);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("preorder-photos")
          .getPublicUrl(fileName);
        photoUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from("preorder_requests").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        watch_description: form.description.trim(),
        photo_url: photoUrl,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      setErrors({ submit: err.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-secondary border border-border p-12"
          >
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display text-foreground mb-3">Request Received</h2>
            <p className="text-muted-foreground font-light text-sm leading-relaxed">
              We'll review your request and get back to you within 48 hours with availability and pricing details.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs tracking-[0.5em] uppercase mb-4 font-medium">
            Special Request
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground tracking-tight mb-4">
            Can't Find Your Watch?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
            Tell us which timepiece you're looking for and we'll source it for you.
            Delivery within 30 days, guaranteed.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-6"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block font-medium">
                Your Name
              </Label>
              <Input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Full name"
                className="rounded-none border-border bg-background focus:border-primary h-12 text-sm"
              />
              {errors.name && <p className="text-destructive text-xs mt-1.5 font-light">{errors.name}</p>}
            </div>
            <div>
              <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block font-medium">
                Email
              </Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="your@email.com"
                className="rounded-none border-border bg-background focus:border-primary h-12 text-sm"
              />
              {errors.email && <p className="text-destructive text-xs mt-1.5 font-light">{errors.email}</p>}
            </div>
          </div>

          {/* Phone */}
          <div>
            <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block font-medium">
              Phone <span className="text-muted-foreground/50">(optional)</span>
            </Label>
            <Input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+357 99 123 456"
              className="rounded-none border-border bg-background focus:border-primary h-12 text-sm"
            />
          </div>

          {/* Watch Description */}
          <div>
            <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block font-medium">
              Describe the Watch
            </Label>
            <Textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="e.g. Rolex Submariner 'Kermit' with green bezel and black dial, 41mm..."
              rows={4}
              className="rounded-none border-border bg-background focus:border-primary text-sm resize-none"
            />
            {errors.description && <p className="text-destructive text-xs mt-1.5 font-light">{errors.description}</p>}
          </div>

          {/* Photo Upload */}
          <div>
            <Label className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2 block font-medium">
              Reference Photo <span className="text-muted-foreground/50">(optional)</span>
            </Label>

            <AnimatePresence mode="wait">
              {photoPreview ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative w-full aspect-video border border-border overflow-hidden bg-secondary"
                >
                  <img src={photoPreview} alt="Reference" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-2 right-2 bg-foreground/80 text-background p-1.5 rounded-full hover:bg-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-border hover:border-primary/40 transition-colors py-10 flex flex-col items-center gap-3 bg-secondary/30"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-foreground font-medium">Upload a photo</p>
                    <p className="text-[11px] text-muted-foreground font-light mt-0.5">JPG, PNG — max 5MB</p>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhoto}
              className="hidden"
            />
            {errors.photo && <p className="text-destructive text-xs mt-1.5 font-light">{errors.photo}</p>}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-rolex-green-light text-primary-foreground font-medium tracking-wider uppercase text-xs py-6 rounded-none transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Submitting…" : "Submit Pre-Order Request"}
            </Button>
            <p className="text-center text-[11px] text-muted-foreground mt-3 font-light">
              No payment required · We'll contact you with pricing · Estimated delivery within 30 days
            </p>
          </div>

          {errors.submit && <p className="text-destructive text-xs text-center font-light">{errors.submit}</p>}
        </motion.form>
      </div>
    </section>
  );
};

export default PreorderSection;
