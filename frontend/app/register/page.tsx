"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, UserPlus } from "lucide-react";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });
      localStorage.setItem("token", response.token);
      router.push("/");
    } catch (err: any) {
      console.error("Registration error:", err);
      const errorMsg = err?.message || "Registration failed. Username or email may already exist.";
      setError(errorMsg);
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
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-slate-400">Join and start building your prompt library</p>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 hover:bg-white/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 hover:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 hover:bg-white/10 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 hover:bg-white/10 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
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
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
