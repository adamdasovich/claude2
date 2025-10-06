"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Sparkles, LogOut, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PromptCard from "@/components/prompt-card";
import PromptEditor from "@/components/prompt-editor";
import { api } from "@/lib/api";
import type { Prompt } from "@/lib/types";

export default function Home() {
  const router = useRouter();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadPrompts();
  }, []);

  useEffect(() => {
    let filtered = prompts;

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterFavorites) {
      filtered = filtered.filter((p) => p.is_favorite);
    }

    setFilteredPrompts(filtered);
  }, [searchQuery, prompts, filterFavorites]);

  const loadPrompts = async () => {
    try {
      const data = await api.getPrompts();
      setPrompts(data);
      setFilteredPrompts(data);
    } catch (error) {
      console.error("Failed to load prompts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePrompt = async (data: {
    title: string;
    content: string;
    description: string;
    color: string;
  }) => {
    try {
      const newPrompt = await api.createPrompt({
        ...data,
        tags: [],
        is_favorite: false,
      });
      setPrompts([newPrompt, ...prompts]);
      setIsEditing(false);
      setEditingPrompt(null);
    } catch (error) {
      console.error("Failed to create prompt:", error);
    }
  };

  const handleUpdatePrompt = async (data: {
    title: string;
    content: string;
    description: string;
    color: string;
  }) => {
    if (!editingPrompt) return;

    try {
      const updated = await api.updatePrompt(editingPrompt.id, data);
      setPrompts(prompts.map((p) => (p.id === updated.id ? updated : p)));
      setIsEditing(false);
      setEditingPrompt(null);
    } catch (error) {
      console.error("Failed to update prompt:", error);
    }
  };

  const handleDeletePrompt = async (id: number) => {
    try {
      await api.deletePrompt(id);
      setPrompts(prompts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete prompt:", error);
    }
  };

  const handleToggleFavorite = async (id: number, isFavorite: boolean) => {
    try {
      const updated = await api.updatePrompt(id, { is_favorite: isFavorite });
      setPrompts(prompts.map((p) => (p.id === updated.id ? updated : p)));
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handleOptimize = async () => {
    if (!editingPrompt) return;

    setIsOptimizing(true);
    try {
      const { optimized_content } = await api.optimizePrompt(editingPrompt.id);
      setEditingPrompt({ ...editingPrompt, content: optimized_content });
    } catch (error) {
      console.error("Failed to optimize prompt:", error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center">
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-pink-500 blur-xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-16 h-16 rounded-full bg-orange-400 blur-xl"
          />
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4">
        <PromptEditor
          key={editingPrompt?.content || 'new'}
          initialTitle={editingPrompt?.title}
          initialContent={editingPrompt?.content}
          initialDescription={editingPrompt?.description}
          initialColor={editingPrompt?.color}
          onSave={editingPrompt ? handleUpdatePrompt : handleCreatePrompt}
          onOptimize={editingPrompt ? handleOptimize : undefined}
          onCancel={() => {
            setIsEditing(false);
            setEditingPrompt(null);
          }}
          isOptimizing={isOptimizing}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-pink-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-orange-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-pink-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">
                Prompt Library
              </h1>
              <p className="text-slate-400 text-lg">
                Your collection of AI prompts, organized beautifully
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-white/5 backdrop-blur-sm"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12 backdrop-blur-xl hover:bg-white/10 transition-all"
              />
            </div>
            <Button
              onClick={() => setFilterFavorites(!filterFavorites)}
              variant={filterFavorites ? "default" : "outline"}
              className={`h-12 gap-2 backdrop-blur-xl transition-all ${
                filterFavorites
                  ? "bg-pink-500 hover:bg-pink-600 border-0 text-white"
                  : "border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Filter className="w-5 h-5" />
              Favorites
            </Button>
            <Button
              onClick={() => {
                setEditingPrompt(null);
                setIsEditing(true);
              }}
              className="h-12 gap-2 bg-pink-500 hover:bg-pink-600 text-white border-0"
            >
              <Plus className="w-5 h-5" />
              New Prompt
            </Button>
          </div>
        </motion.div>

        {/* Prompts Grid */}
        {filteredPrompts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">
              {searchQuery || filterFavorites
                ? "No prompts found"
                : "No prompts yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || filterFavorites
                ? "Try adjusting your filters"
                : "Create your first prompt to get started"}
            </p>
            {!searchQuery && !filterFavorites && (
              <Button
                onClick={() => setIsEditing(true)}
                className="gap-2 bg-pink-500 hover:bg-pink-600 border-0"
              >
                <Plus className="w-5 h-5" />
                Create Prompt
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  onEdit={(p) => {
                    setEditingPrompt(p);
                    setIsEditing(true);
                  }}
                  onDelete={handleDeletePrompt}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
