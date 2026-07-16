import React, { useState } from "react";
import { Grip } from "lucide-react";
interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onGoToRegister: () => void;
}
export default function LoginScreen({ onLoginSuccess, onGoToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    const storedEmail = localStorage.getItem("specter_email") || "alexander@gmail.com";
    const storedPassword = localStorage.getItem("specter_password") || "password123";
    if (email !== storedEmail || password !== storedPassword) {
      setError("Incorrect email or password.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 1500);
  };
  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess("alexander@gmail.com");
    }, 1500);
  };
  return (
    <div className="dark min-h-screen flex items-center justify-center p-6 bg-canvas-bg dark:bg-[#09090b] relative overflow-hidden animate-fade-in select-none">
      { }
      <div className="hidden dark:block absolute top-[-5%] right-[10%] w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[100px] pointer-events-none"></div>
      <main className="w-full max-w-[400px] px-8 py-10 rounded-[32px] bg-white dark:bg-white/[0.02] dark:backdrop-blur-3xl border border-black/[0.05] dark:border-white/[0.06] shadow-xl relative z-10 transition-colors duration-300">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-10 h-10 flex items-center justify-center text-on-background dark:text-white mb-4">
            <Grip className="w-8 h-8 opacity-90" />
          </div>
          <h1 className="font-sans font-bold text-3xl text-on-background tracking-tight mb-2">
            Sign In
          </h1>
          <p className="font-sans text-sm font-medium text-outline">
            Please enter your details to sign in.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-error-container/40 text-error rounded-xl text-sm font-medium text-center border border-error-container">
              {error}
            </div>
          )}
          <div>
            <input
              id="email"
              className="w-full h-12 px-5 rounded-2xl bg-[#F4F4F6] dark:bg-white/[0.04] border border-transparent dark:border-white/[0.03] font-sans text-sm text-on-background placeholder:text-outline outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="Enter your email address"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <input
              id="password"
              className="w-full h-12 px-5 rounded-2xl bg-[#F4F4F6] dark:bg-white/[0.04] border border-transparent dark:border-white/[0.03] font-sans text-sm text-on-background placeholder:text-outline outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="Password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => alert("Reset link sent.")}
              className="block ml-auto mt-3 font-sans text-[11px] font-semibold text-outline hover:text-on-background dark:hover:text-white transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
          <div className="pt-2">
            <button
              id="login-submit-btn"
              className="w-full h-12 bg-on-background dark:bg-white text-white dark:text-black rounded-full font-sans text-[13px] font-bold hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <p className="text-center font-sans text-[11px] font-semibold text-outline mt-8 mb-2">
          Don't have an account?{" "}
          <button
            onClick={onGoToRegister}
            className="text-on-background hover:underline decoration-1 underline-offset-4 transition-all cursor-pointer ml-1"
          >
            Sign up
          </button>
        </p>
      </main>
    </div>
  );
}
