import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Sparkles, ArrowRight, FileText, X } from "lucide-react";
import { toast } from "sonner";

const subjects = [
  "Mathematics",
  "Science",
  "Computer Science",
  "English & Writing",
  "History",
  "Geography",
  "Business",
  "Economics",
  "Psychology",
  "Philosophy",
  "Arts",
  "Music",
  "Other",
];

interface AskQuestionProps {
  user: { displayName?: string | null } | null;
}

const AskQuestion = ({ user }: AskQuestionProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const removeFile = () => setFile(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!title.trim()) return toast.error("Please enter a question title");
  if (!subject) return toast.error("Please select a subject");

  setIsSubmitting(true);

  // simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // ✅ Redirect to Answer page with state
  navigate("/answer", {
  state: {
    question: title,
    subject,
    description,
  },
});


  setIsSubmitting(false);
};


  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} /> {/* Pass the user correctly */}

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-bg shadow-glow mb-5">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Ask a Question
              </h1>
              <p className="text-muted-foreground">
                Describe your question and our AI will provide a detailed answer
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Question Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., What is the quadratic formula?"
                  className="h-12"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-base font-medium">
                  Subject <span className="text-destructive">*</span>
                </Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subj) => (
                      <SelectItem key={subj} value={subj}>
                        {subj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Additional Details <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
  id="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={3}
  className="resize-none h-15"
  placeholder="Add context or details..."
/>

              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Attach File <span className="text-muted-foreground">(optional)</span>
                </Label>
                {!file ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-primary">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, PNG, JPG (max. 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl border border-border">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-background rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : <>Submit Question <ArrowRight className="h-5 w-5" /></>}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AskQuestion;
