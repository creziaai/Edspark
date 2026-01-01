import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, BookOpen, Zap, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero-bg" />
      <div
        className="absolute inset-0 bg-[url('/images/study-bg.jpg')] 
                   bg-cover bg-center opacity-10 
                   animate-ken-burns"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 
                   w-[800px] h-[600px] opacity-30"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/5 animate-float hidden lg:block" />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-accent/5 animate-float-delayed hidden lg:block" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-success/5 animate-float hidden lg:block" />
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              AI-Powered Learning
            </span>
          </div>
          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl 
                       font-bold text-foreground leading-tight mb-6 
                       animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            From Doubt to{" "}
            <span className="gradient-text">Clout, Learn</span>{" "}
            Without a Shout
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground 
                       max-w-2xl mx-auto mb-10 leading-relaxed 
                       animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Stop struggling with homework. Our AI tutor provides detailed,
            accurate explanations for any academic question—available 24/7.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center 
                       justify-center gap-4 mb-12 
                       animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/ask" className="flex items-center gap-2">
                Ask a Question
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/ask">View Dashboard</Link>
            </Button>
          </div>
          <div
            className="flex flex-wrap items-center 
                       justify-center gap-6 text-sm 
                       text-muted-foreground 
                       animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Instant Answers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>All Subjects</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
        <div
          className="max-w-3xl mx-auto mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative">

            {/* Glow behind card */}
            <div className="absolute inset-0 gradient-bg rounded-2xl blur-3xl opacity-20 scale-105" />

            <div className="relative bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-background rounded-md flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      Edspark.app/ask
                    </span>
                  </div>
                </div>
              </div>
             <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      What is the quadratic formula and how do I use it?
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mathematics • Algebra
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pl-14">

                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shadow-glow">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 bg-secondary/50 rounded-lg p-4 border border-border">
                    <p className="text-sm text-foreground leading-relaxed">
                      The quadratic formula is{" "}
                      <strong>
                        x = (-b ± √(b² - 4ac)) / 2a
                      </strong>
                      . It's used to solve any quadratic equation in the form
                      ax² + bx + c = 0...
                    </p>
                    <div className="mt-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success font-medium">
                        Detailed explanation included
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
