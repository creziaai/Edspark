import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { auth } from "@/firebase";

const Header = ({ user }: { user?: { displayName?: string | null } | null }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const logout = () => {
    auth.signOut();
  };

  // Hide login button only on the answer page
  const isAnswerPage = location.pathname === "/answer";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg shadow-md group-hover:shadow-glow transition-all duration-300">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Ed<span className="gradient-text">Spark</span>
          </span>
        </Link>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {/* ⭐ Welcome Name */}
              <span className="text-sm font-medium text-foreground">
                Welcome, {user.displayName || "User"}
              </span>

              {/* ⭐ Logout */}
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            !isAnswerPage && (
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
            )
          )}

          {/* ⭐ Ask Question */}
          <Button variant="hero" asChild>
            <Link to="/ask">Ask a Question</Link>
          </Button>
        </div>

        {/* Mobile Menu (optional) */}
      </div>
    </header>
  );
};

export default Header;
