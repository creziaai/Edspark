import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "College Student",
    avatar: "S",
    content: "StudySpark saved my semester! The AI explanations are incredibly detailed and helped me understand calculus concepts I'd been struggling with for weeks.",
    rating: 5,
    bg: "bg-card-light-blue", // updated to match new CSS variables
  },
  {
    name: "James K.",
    role: "High School Senior",
    avatar: "J",
    content: "Best study tool I've ever used. The instant answers mean I can actually get my homework done without waiting hours for help.",
    rating: 5,
    bg: "bg-card-light-green",
  },
  {
    name: "Emily R.",
    role: "Graduate Student",
    avatar: "E",
    content: "The quality of answers is amazing. It's like having a personal tutor available 24/7. Worth every penny!",
    rating: 5,
    bg: "bg-card-light-yellow",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by Students
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of students who are acing their classes with AI-powered help
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 ${testimonial.bg}`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
