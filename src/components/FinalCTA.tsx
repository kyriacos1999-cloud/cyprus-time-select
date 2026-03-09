import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const scrollToOrder = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
          Order Today, Wear Tomorrow
        </h2>
        <p className="text-primary-foreground/70 font-body text-lg max-w-lg mx-auto mb-8">
          Get free next-day delivery anywhere in Cyprus. Your new watch is just one click away.
        </p>
        <Button
          onClick={scrollToOrder}
          className="bg-gold hover:bg-gold-dark text-accent-foreground font-body font-semibold text-lg px-10 py-6 rounded-sm"
        >
          Complete My Order
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
