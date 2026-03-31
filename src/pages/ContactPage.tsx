import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <Navbar />
      <div className="pt-14 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl md:text-5xl font-display text-foreground tracking-tight mb-3">Contact Us</h1>
              <p className="text-muted-foreground text-base font-light mb-12">
                Have a question, need help with an order, or just want to say hello? We'd love to hear from you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-secondary/50 p-6 rounded-sm text-center">
                <Mail className="w-5 h-5 text-accent mx-auto mb-3" />
                <h3 className="font-display text-sm text-foreground mb-1">Email</h3>
                <a href="mailto:support@replic8.shop" className="text-xs text-accent hover:underline">support@replic8.shop</a>
              </div>
              <div className="bg-secondary/50 p-6 rounded-sm text-center">
                <MapPin className="w-5 h-5 text-accent mx-auto mb-3" />
                <h3 className="font-display text-sm text-foreground mb-1">Location</h3>
                <p className="text-xs text-muted-foreground font-light">Cyprus (Online Store)</p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-sm text-center">
                <Clock className="w-5 h-5 text-accent mx-auto mb-3" />
                <h3 className="font-display text-sm text-foreground mb-1">Response Time</h3>
                <p className="text-xs text-muted-foreground font-light">Within a few hours</p>
              </div>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-secondary/50 p-12 text-center rounded-sm">
                <h2 className="text-2xl font-display text-foreground mb-3">Message Sent</h2>
                <p className="text-sm text-muted-foreground font-light">Thank you for reaching out. We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">Your Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" required className="bg-background border-border focus:border-accent h-12" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required className="bg-background border-border focus:border-accent h-12" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block font-medium">Message</Label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" required rows={5} className="bg-background border-border focus:border-accent resize-none" />
                </div>
                <Button type="submit" className="w-full bg-foreground hover:bg-foreground/90 text-background text-xs tracking-[0.2em] uppercase font-medium py-6">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContactPage;
