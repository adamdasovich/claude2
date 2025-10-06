"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, LogIn } from "lucide-react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.login({ username, password });
      localStorage.setItem("token", response.token);
      router.push("/");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/[0.02] backdrop-blur-2xl border-white/10 shadow-2xl">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <div className="w-16 h-16 rounded-2xl bg-pink-500 flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-400">Sign in to access your prompt library</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 hover:bg-white/10 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 hover:bg-white/10 transition-all"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 gap-2 bg-pink-500 hover:bg-pink-600 border-0"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
