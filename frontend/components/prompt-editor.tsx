"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Save, X } from "lucide-react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface PromptEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialDescription?: string;
  initialColor?: string;
  onSave: (data: {
    title: string;
    content: string;
    description: string;
    color: string;
  }) => void;
  onOptimize?: () => void;
  onCancel?: () => void;
  isOptimizing?: boolean;
}

const PRESET_COLORS = [
  "#ff0080", // hot pink
  "#ff1493", // deep pink
  "#ff6b9d", // light pink
  "#facc15", // bright yellow
  "#fb923c", // coral orange
  "#ff4500", // orange red
  "#22c55e", // lime green
  "#10b981", // emerald
];

export default function PromptEditor({
  initialTitle = "",
  initialContent = "",
  initialDescription = "",
  initialColor = "#6366f1",
  onSave,
  onOptimize,
  onCancel,
  isOptimizing = false,
}: PromptEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [description, setDescription] = useState(initialDescription);
  const [selectedColor, setSelectedColor] = useState(initialColor);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({ title, content, description, color: selectedColor });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="bg-white/[0.02] backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div
          className="px-8 py-6 border-b border-white/10"
          style={{
            background: `linear-gradient(135deg, ${selectedColor}10, transparent)`,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Prompt Editor</h2>
            <div className="flex gap-2">
              {onOptimize && (
                <Button
                  onClick={onOptimize}
                  disabled={!content || isOptimizing}
                  className="gap-2 border-0 hover:opacity-90"
                  style={{
                    backgroundColor: selectedColor,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  {isOptimizing ? "Optimizing..." : "Optimize"}
                </Button>
              )}
              <Button
                onClick={handleSave}
                disabled={!title.trim() || !content.trim()}
                variant="default"
                className="gap-2 bg-pink-500 hover:bg-pink-600 border-0"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
              {onCancel && (
                <Button
                  onClick={onCancel}
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Prompt Title"
            className="mb-3 text-lg font-semibold bg-white/5 border-white/10 text-white placeholder:text-slate-500 hover:bg-white/10 transition-all"
          />

          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description (optional)"
            className="mb-3 bg-white/5 border-white/10 text-white placeholder:text-slate-500 hover:bg-white/10 transition-all"
          />

          {/* Color Picker */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Color:</span>
            <div className="flex gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-all border ${
                    selectedColor === color
                      ? "ring-2 ring-white/50 ring-offset-2 ring-offset-slate-900 scale-110 border-white/20"
                      : "hover:scale-105 border-white/10"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="p-8" data-color-mode="dark">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || "")}
            height={500}
            preview="edit"
            hideToolbar={false}
            enableScroll={true}
            className="rounded-lg overflow-hidden border border-gray-700"
          />
        </div>
      </div>
    </motion.div>
  );
}
