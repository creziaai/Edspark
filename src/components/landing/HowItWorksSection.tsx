import { FileQuestion, Zap, FileText, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileQuestion,
    title: "Post Your Question",
    description: "Type your academic question or upload an image. Select the subject and any relevant details.",
    color: "primary",
    bg: "bg-card-light-blue",
  },
  {
    icon: Zap,
    title: "AI Generates Answer",
    description: "Our advanced AI analyzes your question and crafts a detailed, accurate explanation in seconds.",
    color: "accent",
    bg: "bg-card-light-violet",
  },
  {
    icon: FileText,
    title: "Get Your Answer",
    description: "Receive a comprehensive response with examples, step-by-step solutions, and downloadable PDF.",
    color: "success",
    bg: "bg-card-light-green",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 bg-muted/40 p-6 rounded-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get help with any academic question in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-border">
                  <ArrowRight className="absolute -right-1 -top-2 h-5 w-5 text-muted-foreground" />
                </div>
              )}
              
              <div className={`relative rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 ${step.bg}`}>
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-bg flex items-center justify-center shadow-glow">
                  <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 ${
                  step.color === 'primary' ? 'bg-primary/10' :
                  step.color === 'accent' ? 'bg-accent/10' :
                  'bg-success/10'
                }`}>
                  <step.icon className={`h-8 w-8 ${
                    step.color === 'primary' ? 'text-primary' :
                    step.color === 'accent' ? 'text-accent' :
                    'text-success'
                  }`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
