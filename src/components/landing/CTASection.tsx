import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg opacity-5" />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg shadow-glow mb-8">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Ace Your Classes?
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Stop stressing over homework. Get instant AI-powered answers and start learning smarter today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/ask" className="flex items-center gap-2">
                Ask Your First Question
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/login">Sign Up Free</Link>
            </Button>
          </div>

          {/* Trust text */}
          <p className="text-sm text-muted-foreground mt-8">
            No credit card required • First answer free
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
