import { 
  Calculator, 
  FlaskConical, 
  Code, 
  BookOpen, 
  Globe, 
  Briefcase, 
  Palette, 
  Music 
} from "lucide-react";

const subjects = [
  { icon: Calculator, name: "Mathematics", questions: "50K+", bg: "bg-card-light-blue" },
  { icon: FlaskConical, name: "Science", questions: "35K+", bg: "bg-card-light-green" },
  { icon: Code, name: "Computer Science", questions: "28K+", bg: "bg-card-light-violet" },
  { icon: BookOpen, name: "English & Writing", questions: "42K+", bg: "bg-card-light-yellow" },
  { icon: Globe, name: "History & Geography", questions: "22K+", bg: "bg-card-light-orange" },
  { icon: Briefcase, name: "Business", questions: "18K+", bg: "bg-card-light-rose" },
  { icon: Palette, name: "Arts", questions: "12K+", bg: "bg-card-light-pink" },
  { icon: Music, name: "Music", questions: "8K+", bg: "bg-card-light-indigo" },
];

const SubjectsSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            All Subjects Covered
          </h2>
          <p className="text-lg text-muted-foreground">
            From algebra to zoology, our AI tutors are experts in every field
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {subjects.map((subject, index) => (
            <div 
              key={index}
              className={`group relative rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${subject.bg}`}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                   style={{ background: 'var(--gradient-hero)' }} />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <subject.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {subject.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {subject.questions} questions
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
