"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heart, Edit, Trash2, Copy, Clock } from "lucide-react";
import type { Prompt } from "@/lib/types";
import { useState } from "react";

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
}

export default function PromptCard({
  prompt,
  onEdit,
  onDelete,
  onToggleFavorite,
}: PromptCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className="relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-xl group hover:border-white/20 transition-all"
        style={{
          boxShadow: isHovered
            ? `0 20px 60px -15px ${prompt.color}30, 0 0 0 1px ${prompt.color}15`
            : "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Gradient Accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, ${prompt.color}, transparent)`,
          }}
        />

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <h3
              className="text-xl font-bold text-white line-clamp-2 flex-1"
            >
              {prompt.title}
            </h3>
            <button
              onClick={() => onToggleFavorite(prompt.id, !prompt.is_favorite)}
              className="ml-2 transition-transform hover:scale-110"
            >
              <Heart
                className={`w-5 h-5 ${
                  prompt.is_favorite
                    ? "fill-rose-400 text-rose-400"
                    : "text-slate-400 hover:text-rose-400"
                }`}
              />
            </button>
          </div>

          {/* Description */}
          {prompt.description && (
            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
              {prompt.description}
            </p>
          )}

          {/* Preview */}
          <div className="bg-black/20 rounded-lg p-4 mb-4 border border-white/5 backdrop-blur-sm">
            <p className="text-sm text-slate-300 line-clamp-3 font-mono">
              {prompt.content}
            </p>
          </div>

          {/* Tags */}
          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {prompt.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs rounded-full bg-white/5 text-slate-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              {formatDate(prompt.updated_at)}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 transition-colors"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(prompt)}
                className="p-2 rounded-lg text-white border transition-colors"
                style={{
                  background: `${prompt.color}20`,
                  borderColor: `${prompt.color}40`,
                }}
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(prompt.id)}
                className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
