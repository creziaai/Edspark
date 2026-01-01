import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Index({ user }: { user: any }) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-hero">
      <div className="text-center max-w-xl mx-auto p-6">

        {/* Title */}
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Welcome to AskAI Mentor
        </h1>

        <p className="text-muted-foreground mb-8">
          Your AI-powered personal study assistant.  
          Ask questions, get explanations, and improve your learning.
        </p>

        {/* If user is logged in */}
        {user ? (
          <div className="flex flex-col items-center gap-4">

            <p className="text-lg">
              👋 Welcome, <span className="font-semibold">{user.email}</span>
            </p>

            <div className="flex gap-4">
              <Link
                to="/dashboard"
                className="px-6 py-2 rounded-lg bg-primary text-white shadow-md hover:opacity-90"
              >
                Go to Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-lg bg-destructive text-white shadow-md hover:opacity-90"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          // If user NOT logged in
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-6 py-2 rounded-lg bg-primary text-white shadow-md hover:opacity-90"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-6 py-2 rounded-lg bg-secondary text-foreground shadow-md hover:opacity-90"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
