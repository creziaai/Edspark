import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeft,
  Volume2,
  VolumeX,
  User,
  User2,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

// Local image paths
const maleTutorImg = "/assets/male_tutor.png";
const femaleTutorImg = "/assets/female_tutor.png";

interface QuestionState {
  question: string;
  subject: string;
  description?: string;
  fileBase64?: string; // <-- NEW: For image/PDF analysis
  fileType?: string;
}

const API_KEY = "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";

const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as QuestionState | undefined;

  const [finalAnswer, setFinalAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [tutor, setTutor] = useState<"male" | "female">("female");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Clean up AI output
  const formatAnswer = (text: string) => {
    return text
      .replace(/#+/g, "")
      .replace(/\*\*/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  // 🔊 Toggle Speak
  const toggleSpeak = () => {
    if (!finalAnswer) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utter = new SpeechSynthesisUtterance(finalAnswer);
    speakRef.current = utter;

    const voices = speechSynthesis.getVoices();

    const targetVoice = voices.find((v) =>
      tutor === "male"
        ? v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("man") ||
          v.name.toLowerCase().includes("david")
        : v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("woman") ||
          v.name.toLowerCase().includes("ava")
    );

    utter.voice = targetVoice || voices[0];
    utter.rate = 1;
    utter.pitch = 1;

    utter.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    speechSynthesis.speak(utter);
  };

  // 🛑 Stop voice automatically on tutor change
  const handleTutorChange = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setTutor(tutor === "male" ? "female" : "male");
  };

  // PDF Export
  const exportPDF = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("AI Tutor - Answer", 40, 50);

    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(11);

    const maxWidth = 520;
    const lines = pdf.splitTextToSize(finalAnswer, maxWidth);
    pdf.text(lines, 40, 90);
    pdf.save("answer.pdf");
  };

  // Fetch AI Answer
  useEffect(() => {
    if (!state || !state.question) {
      toast.error("No question data provided");
      navigate("/ask");
      return;
    }

    const fetchAnswer = async () => {
      setLoading(true);
      try {
        const messages: any[] = [
          {
            role: "system",
            content:
              "You are a professional tutor. Provide clear, simple explanations in step-by-step form. No markdown formatting.",
          },
          {
            role: "user",
            content: `
Question: ${state.question}
Subject: ${state.subject}
Details: ${state.description || "None"}
Provide a clear subject-based explanation.`,
          },
        ];

        // If file exists → attach Base64 to AI
        if (state.fileBase64) {
          messages.push({
            role: "user",
            content: [
              { type: "text", text: "Analyze this file and use it in the answer." },
              {
                type: "image_url",
                image_url: `data:${state.fileType};base64,${state.fileBase64}`,
              },
            ],
          });
        }

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "xiaomi/mimo-v2-flash:free",
            messages,
          }),
        });

        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content || "No answer received.";
        setFinalAnswer(formatAnswer(text));
      } catch (err) {
        console.error(err);
        toast.error("Error fetching answer.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnswer();
  }, [state, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={state?.user || null} />


      <main className="flex-1 py-10 container mx-auto px-4 max-w-3xl">
        

        {/* Tutor Header */}
        <div className="flex items-center justify-between bg-secondary/40 p-4 rounded-xl border mb-6">
          <div className="flex items-center gap-4">
            <img
              src={tutor === "male" ? maleTutorImg : femaleTutorImg}
              alt="Tutor"
              className="w-16 h-16 rounded-full object-cover object-center border shadow overflow-hidden"
            />
            <div>
              <h2 className="text-xl font-bold">Your AI Tutor</h2>
              <p className="text-muted-foreground">
                {tutor === "male" ? "Mr. Star Mentor ⭐" : "Ms. Star Mentor ⭐"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleTutorChange}>
              {tutor === "male" ? <User2 size={18} /> : <User size={18} />}
            </Button>

            <Button variant="outline" onClick={toggleSpeak}>
              {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>

            <Button variant="outline" onClick={exportPDF}>
              <Download size={18} />
            </Button>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold gradient-text">Question</h2>
          <p className="text-foreground mt-2">{state.question}</p>
        </div>

        {/* Answer */}
        <div className="bg-secondary/50 p-6 rounded-xl border shadow">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Answer</h2>

          {loading ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="animate-spin h-5 w-5" /> Generating answer...
            </div>
          ) : (
            <div
  className="whitespace-pre-wrap text-foreground leading-relaxed"
  dangerouslySetInnerHTML={{
    __html: finalAnswer
      .split("\n")
      .map((line) => {
        // If the line looks like a heading (ends with ":" or is short and title-like)
        if (
          line.trim().endsWith(":") ||
          (line.trim().length <= 40 &&
            /^[A-Z][A-Za-z0-9\s]+$/.test(line.trim()))
        ) {
          return `<strong>${line}</strong>`;
        }
        return line;
      })
      .join("<br/>"),
  }}
/>

          )}
        </div>
           <div className="flex justify-end mt-6 mb-6">
  <Button
    onClick={() => navigate("/ask")}
    className="
      flex items-center gap-2
      px-4 py-2
      font-medium
      rounded-xl
      text-white
      bg-gradient-to-r from-violet-500 to-fuchsia-500
      shadow-md
      hover:shadow-violet-500/40
      hover:scale-[1.02]
      transition-all duration-300
      border-none
    "
  >
    <ArrowLeft className="h-4 w-4 text-white" />
    Back
  </Button>
</div>

      </main>

      <Footer />
    </div>
  );
};

export default Answer;
