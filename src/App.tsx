import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AskQuestion from "./pages/AskQuestion";
import Dashboard from "./pages/Dashboard";
import Answer from "./pages/Answer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const queryClient = new QueryClient();

// 🌟 Protected Route
const ProtectedRoute = ({
  user,
  children,
}: {
  user: User | null | undefined;
  children: JSX.Element;
}) => {
  if (user === undefined) return <div>Loading...</div>; // fallback while auth state loads
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  // ⭐ Listen for login/logout state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Index user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected pages */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ask"
              element={
                <ProtectedRoute user={user}>
                  <AskQuestion user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/answer"
              element={
                <ProtectedRoute user={user}>
                  <Answer user={user} />
                </ProtectedRoute>
              }
            />

            {/* Not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
