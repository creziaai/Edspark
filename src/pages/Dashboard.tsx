import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Clock, 
  CheckCircle, 
  Loader2,
  BookOpen,
  Sparkles,
  Filter
} from "lucide-react";

// Mock data for demonstration
const mockQuestions = [
  {
    id: "1",
    title: "What is the quadratic formula and how do I use it?",
    subject: "Mathematics",
    status: "answered",
    createdAt: "2024-01-15T10:30:00Z",
    answer: "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a. It's used to solve any quadratic equation in the form ax² + bx + c = 0...",
  },
  {
    id: "2",
    title: "Explain the process of photosynthesis in plants",
    subject: "Science",
    status: "answered",
    createdAt: "2024-01-14T15:45:00Z",
    answer: "Photosynthesis is the process by which plants convert light energy into chemical energy. The overall equation is 6CO2 + 6H2O + light → C6H12O6 + 6O2...",
  },
  {
    id: "3",
    title: "How do I implement a binary search algorithm in Python?",
    subject: "Computer Science",
    status: "generating",
    createdAt: "2024-01-15T11:20:00Z",
    answer: null,
  },
];

interface DashboardProps {
  user?: { displayName?: string | null } | null;
}

const Dashboard = ({ user }: DashboardProps) => {
  if (user === undefined) return null; // wait for Firebase to load

  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [questions] = useState(mockQuestions);

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === "all" || q.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Header user={user} />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                My Questions
              </h1>
              <p className="text-muted-foreground mt-1">
                View and manage your asked questions
              </p>
            </div>
            <Button variant="hero" asChild>
              <Link to="/ask" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Ask New Question
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="English & Writing">English & Writing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Questions List */}
          {filteredQuestions.length > 0 ? (
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        question.status === 'answered' 
                          ? 'bg-success/10' 
                          : 'bg-primary/10'
                      }`}>
                        {question.status === 'answered' ? (
                          <CheckCircle className="h-6 w-6 text-success" />
                        ) : (
                          <Loader2 className="h-6 w-6 text-primary animate-spin" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary" className="font-medium">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {question.subject}
                        </Badge>
                        <Badge 
                          variant={question.status === 'answered' ? 'default' : 'outline'}
                          className={question.status === 'answered' 
                            ? 'bg-success/10 text-success border-success/20' 
                            : ''
                          }
                        >
                          {question.status === 'answered' ? 'Answered' : 'Generating...'}
                        </Badge>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {question.title}
                      </h3>

                      {question.answer && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {question.answer}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(question.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {question.status === 'answered' && (
                        <>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="secondary" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-6">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No questions yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchQuery || subjectFilter !== 'all' 
                  ? "No questions match your search criteria" 
                  : "Ask your first question and get an instant AI-powered answer"}
              </p>
              {!searchQuery && subjectFilter === 'all' && (
                <Button variant="hero" asChild>
                  <Link to="/ask" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Ask Your First Question
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
