import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, Send, X, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WELCOME = {
  id: "welcome",
  role: "assistant",
  content: "Hey there! 👋 I'm **PrintBot**, your personal design assistant at Insta Printing.\n\nI can help you pick the perfect product, brainstorm design ideas, and guide you through ordering. What are we creating today?",
  actions: [
    { label: "Browse Shop", href: "/shop" },
    { label: "Open Designer", href: "/designer" },
  ],
};

const QUICK_PROMPTS = [
  "Custom mug as a gift 🎁",
  "Hoodie for my team 👕",
  "Design a tote bag 👜",
  "Poster for my room 🖼️",
];

function renderText(text) {
  return text.split(/(\*\*[^*]+\*\*|\n)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    if (part === "\n") return <br key={i} />;
    return <span key={i}>{part}</span>;
  });
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg = { id: `user-${Date.now()}`, role: "user", content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server error (${res.status})`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.message || "Sorry, I couldn't process that. Please try again!",
        actions: data.actions || [],
      }]);
      if (!open) setUnread(true);
    } catch (err) {
      setMessages((prev) => [...prev, {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `⚠️ ${err.message}\n\nMake sure your backend server is running and your API key is in the .env file.`,
        error: true,
      }]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, open]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-glow-orange flex items-center justify-center transition-all duration-300 ${
          open ? "bg-dark-700 border border-dark-500" : "bg-brand-orange hover:bg-brand-orange-light"
        }`}
        aria-label="Toggle PrintBot"
      >
        {open ? <X className="w-5 h-5 text-neutral-300" /> : <MessageCircle className="w-6 h-6 text-white" fill="currentColor" />}
        {unread && !open && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-dark-950 animate-pulse" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] flex flex-col rounded-3xl border border-dark-600/60 shadow-card overflow-hidden bg-dark-900"
          style={{ height: "520px" }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-dark-800 border-b border-dark-600/50 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-white text-sm leading-none mb-0.5">PrintBot</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-[11px] text-emerald-400">Online · AI Design Assistant</p>
              </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
            <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={`flex flex-col gap-2 max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`px-4 py-2.5 text-sm leading-relaxed break-words rounded-2xl ${
                    msg.role === "user"
                      ? "bg-brand-orange text-white rounded-tr-sm"
                      : msg.error
                      ? "bg-red-900/30 text-red-300 border border-red-700/40 rounded-tl-sm"
                      : "bg-dark-700 text-neutral-200 border border-dark-600/50 rounded-tl-sm"
                  }`}>
                    {renderText(msg.content)}
                  </div>
                  {msg.actions?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.actions.map((action, i) => (
                        <Link key={i} to={action.href} onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-dark-700 hover:bg-brand-orange/20 border border-dark-600 hover:border-brand-orange/50 text-neutral-300 hover:text-brand-orange text-xs font-medium rounded-xl transition-all duration-200"
                        >
                          {action.label} <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="px-4 py-3 bg-dark-700 rounded-2xl rounded-tl-sm border border-dark-600/50">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((j) => (
                      <span key={j} className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce"
                        style={{ animationDelay: `${j * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length === 1 && !loading && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {QUICK_PROMPTS.map((p) => (
                <button key={p} onClick={() => sendMessage(p)}
                  className="text-xs px-3 py-1.5 bg-dark-700 hover:bg-dark-600 border border-dark-500 hover:border-brand-orange/40 text-neutral-300 hover:text-white rounded-xl transition-all duration-200"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-dark-600/50 bg-dark-900 flex-shrink-0">
            <div className={`flex items-center gap-2 bg-dark-700 border rounded-2xl px-4 py-2.5 transition-colors ${
              loading ? "border-dark-600 opacity-70" : "border-dark-600 focus-within:border-brand-orange/50"
            }`}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                placeholder={loading ? "PrintBot is typing…" : "Ask about products, design ideas…"}
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 outline-none disabled:cursor-not-allowed"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  input.trim() && !loading ? "bg-brand-orange hover:bg-brand-orange-light text-white" : "bg-dark-600 text-neutral-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
           <p style={{ textAlign: "center", fontSize: 10, color: "#aaa", marginTop: 8 }}>Powered by Insta Printing AI · Press Enter to send</p>
          </div>
        </div>
      )}
    </>
  );
}
