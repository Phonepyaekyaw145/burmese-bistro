import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { SUPPORT_CHIPS, SUPPORT_SYSTEM_PROMPT } from "../../data/siteData";

// Backend API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const INITIAL_MSG = {
  role: "bot",
  text: "Hello! 👋 Welcome to Burmese Bistro support. Ask me anything about our menu, hours, delivery, or reservations!",
};

export default function SupportChat() {
  const [messages, setMessages] = useState([INITIAL_MSG]);

  const [history, setHistory] = useState([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const msgsRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages]);

  // Send message
  async function sendMessage(text) {
    const msg = (text || input).trim();

    if (!msg || loading) return;

    setInput("");

    const updatedHistory = [
      ...history,
      {
        role: "user",
        content: msg,
      },
    ];

    // Add user message + typing indicator
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: msg,
      },
      {
        role: "bot",
        text: "•••",
      },
    ]);

    setHistory(updatedHistory);

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedHistory,
          systemPrompt: SUPPORT_SYSTEM_PROMPT,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));

        throw new Error(err.error || `Server error ${res.status}`);
      }

      const data = await res.json();

      const reply = data.reply || "Sorry, I couldn't get a response.";

      // Replace typing indicator
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "bot",
          text: reply,
        },
      ]);

      // Save assistant reply
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "bot",
          text: `⚠️ ${err.message || "Connection error. Please try again."}`,
        },
      ]);
    } finally {
      setLoading(false);

      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div
        className="px-5 sm:px-9 pt-5 pb-3.5 border-b shrink-0"
        style={{
          borderColor: "var(--bo)",
          background: "var(--bg)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
            style={{
              background: "rgba(192,57,43,0.1)",
            }}
          >
            🤖
          </div>

          <div>
            <div
              className="font-bold text-xl"
              style={{
                fontFamily: "var(--ff)",
                color: "var(--tx)",
              }}
            >
              Customer Support
            </div>

            <div
              className="flex items-center gap-1 text-[11px]"
              style={{ color: "var(--mt)" }}
            >
              <span className="w-[7px] h-[7px] rounded-full bg-green-500 inline-block" />
              Burmese Bistro AI Assistant
            </div>
          </div>
        </div>
      </div>

      {/* Quick Chips */}
      <div
        className="flex flex-wrap gap-1.5 px-5 sm:px-9 py-2.5 border-b shrink-0"
        style={{
          borderColor: "var(--bo)",
          background: "var(--bg)",
        }}
      >
        {SUPPORT_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => sendMessage(chip)}
            disabled={loading}
            className="px-3 py-1 rounded-full border text-[11px] font-medium transition-all cursor-pointer hover:bg-[var(--br)] hover:text-white hover:border-[var(--br)] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderColor: "var(--bo)",
              background: "var(--cd)",
              color: "var(--tx)",
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div
        ref={msgsRef}
        className="overflow-y-auto px-5 sm:px-9 py-4 flex flex-col gap-2.5"
        style={{
          minHeight: "340px",
          flex: "1 1 auto",
          scrollBehavior: "smooth",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${
              m.role === "user" ? "justify-end" : ""
            }`}
          >
            {/* Bot Avatar */}
            {m.role === "bot" && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
                style={{
                  background: "rgba(192,57,43,0.1)",
                }}
              >
                🤖
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[75%] px-3.5 py-2.5 text-xs leading-relaxed ${
                m.text === "•••" ? "animate-pulse" : ""
              }`}
              style={{
                borderRadius:
                  m.role === "user"
                    ? "16px 16px 3px 16px"
                    : "16px 16px 16px 3px",

                background: m.role === "user" ? "var(--br)" : "var(--cd)",

                border: m.role === "user" ? "none" : "1px solid var(--bo)",

                color: m.role === "user" ? "#fff" : "var(--tx)",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className="flex gap-2 px-5 sm:px-9 py-3 border-t shrink-0"
        style={{
          borderColor: "var(--bo)",
          background: "var(--bg)",
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question..."
          disabled={loading}
          className="flex-1 border rounded-full px-4 py-2 text-xs outline-none transition-colors disabled:opacity-60"
          style={{
            borderColor: "var(--bo)",
            background: "var(--cd)",
            color: "var(--tx)",
            fontFamily: "var(--fb)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--br)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--bo)")}
        />

        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "var(--br)",
          }}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
