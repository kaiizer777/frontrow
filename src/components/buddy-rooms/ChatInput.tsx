"use client";

import * as React from "react";
import {
  Send,
  Smile,
  Mic,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (
    content: string,
    attachment?: { type: "image" | "audio" | "link"; url: string; title?: string }
  ) => void;
  roomName: string;
}

const QUICK_TOOLBAR_EMOJIS = ["🔥", "🎸", "☕", "👏", "💡", "✨", "❤️", "📸"];

export function ChatInput({ onSendMessage, roomName }: ChatInputProps) {
  const [text, setText] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [isRecordingDummy, setIsRecordingDummy] = React.useState(false);
  const emojiRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    }
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    onSendMessage(text.trim());
    setText("");
    setShowEmojiPicker(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSendAudioDummy = () => {
    setIsRecordingDummy(true);
    setTimeout(() => {
      setIsRecordingDummy(false);
      onSendMessage("🎙️ Shared a 30s practice snippet playing over a backing track in A minor:", {
        type: "audio",
        url: "",
        title: "neo_soul_practice_take2.mp3",
      });
    }, 1000);
  };

  const handleSendImageDummy = () => {
    onSendMessage("📸 Check out my pedalboard wiring & new optical compressor setup:", {
      type: "image",
      url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      title: "pedalboard_setup.jpg",
    });
  };

  return (
    <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200/80 shrink-0 space-y-1.5 z-10">
      {/* Quick Emoji Toolbar (Tiny & clean) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
          Quick:
        </span>
        {QUICK_TOOLBAR_EMOJIS.map((em) => (
          <button
            key={em}
            type="button"
            onClick={() => setText((prev) => prev + em)}
            className="px-1.5 py-0.5 rounded-md text-xs bg-slate-50 hover:bg-slate-100 hover:scale-110 border border-slate-200/60 transition-all cursor-pointer select-none"
          >
            {em}
          </button>
        ))}
      </div>

      {/* Main Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 rounded-xl p-1 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 focus-within:bg-white transition-all shadow-2xs"
      >
        {/* Attachment Shortcuts */}
        <div className="flex items-center gap-0.5 pl-0.5">
          <button
            type="button"
            onClick={handleSendAudioDummy}
            className={cn(
              "p-1.5 rounded-lg text-slate-500 hover:text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer",
              isRecordingDummy && "text-rose-500 animate-pulse bg-rose-50"
            )}
            title="Attach live audio clip snippet"
          >
            <Mic className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={handleSendImageDummy}
            className="p-1.5 rounded-lg text-slate-500 hover:text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer hidden sm:flex"
            title="Attach gear photo or craft progress"
          >
            <ImageIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${roomName.toLowerCase().replace(/\s+/g, "-")}...`}
          className="flex-1 bg-transparent border-0 px-2 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden min-w-0"
        />

        {/* Emoji Trigger Menu */}
        <div className="relative" ref={emojiRef}>
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Emoji selector"
          >
            <Smile className="h-3.5 w-3.5" />
          </button>

          {showEmojiPicker && (
            <div className="absolute right-0 bottom-full mb-2 z-40 bg-white border border-slate-200 rounded-2xl shadow-xl p-2.5 w-60 animate-in fade-in zoom-in-95">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Hobby Reactions
              </div>
              <div className="grid grid-cols-6 gap-1 text-base">
                {[
                  "🎸", "🎹", "☕", "📸", "🏺", "🎨",
                  "🔥", "👏", "💡", "✨", "❤️", "🙌",
                  "🚀", "🤩", "💯", "🎯", "⚡", "🪵"
                ].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setText((prev) => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-transform hover:scale-125 cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!text.trim()}
          className="rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-bold gap-1 shadow-2xs shrink-0"
        >
          <span className="hidden sm:inline">Send</span>
          <Send className="h-3 w-3" />
        </Button>
      </form>
    </div>
  );
}
