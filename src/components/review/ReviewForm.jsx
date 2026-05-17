import { useState, useRef } from "react";
import { REVIEW_SAMPLES, REVIEW_SYSTEM_PROMPT } from "../../data/siteData";

// Proxy server URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function ReviewForm() {
  const [stars, setStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const textareaRef = useRef(null);

  async function submitReview() {
    const cleanedText = text.trim();

    // Validation
    if (!cleanedText || stars === 0) {
      setError("Please write a review and select a rating.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim() || "Anonymous",
          rating: stars,
          text: cleanedText,
          systemPrompt: REVIEW_SYSTEM_PROMPT,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));

        throw new Error(err.error || `Server error ${res.status}`);
      }

      const data = await res.json();

      setResult({
        sentiment: data.sentiment || "Neutral",
        score: Number(data.score) || stars,
        themes: Array.isArray(data.themes) ? data.themes : [],
        summary: data.summary || "Thank you for sharing your experience.",
        ownerReply: data.ownerReply || "Thank you for your feedback!",
        reviewerName: name.trim() || "valued guest",
      });
    } catch (err) {
      console.error("Review submit error:", err);

      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // RESULT SCREEN
  // =========================

  if (result) {
    const SENTIMENT_STYLES = {
      Positive: {
        bg: "#eaf3de",
        color: "#3b6d11",
        emoji: "😊",
      },
      Neutral: {
        bg: "#f1efea",
        color: "#5f5e5a",
        emoji: "😐",
      },
      Negative: {
        bg: "#fcebeb",
        color: "#a32d2d",
        emoji: "😞",
      },
    };

    const s = SENTIMENT_STYLES[result.sentiment] || SENTIMENT_STYLES.Neutral;

    return (
      <div className="animate-fade-in">
        {/* Thank you hero */}
        <div
          className="rounded-2xl p-5 text-center text-white mb-4"
          style={{
            background: "linear-gradient(135deg,#c0392b,#e05a2b)",
          }}
        >
          <div className="text-4xl mb-2">🙏</div>

          <div
            className="font-bold text-xl mb-1"
            style={{ fontFamily: "var(--ff)" }}
          >
            Thank you, {result.reviewerName}!
          </div>

          <div className="text-xs opacity-90">
            Your review has been analyzed by our AI assistant.
          </div>
        </div>

        {/* AI Analysis */}
        <div
          className="rounded-xl p-4 border mb-3"
          style={{
            background: "var(--cd)",
            borderColor: "var(--bo)",
          }}
        >
          <div
            className="text-[10px] font-semibold uppercase tracking-wide mb-2.5"
            style={{ color: "var(--mt)" }}
          >
            AI Analysis
          </div>

          <div className="flex items-center justify-between mb-3">
            {/* Stars */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className="text-lg"
                  style={{
                    color: n <= result.score ? "#e8a020" : "var(--bo)",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Sentiment */}
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full"
              style={{
                background: s.bg,
                color: s.color,
              }}
            >
              {s.emoji} {result.sentiment}
            </span>
          </div>

          {/* Summary */}
          <p
            className="text-xs leading-relaxed mb-3"
            style={{ color: "var(--tx)" }}
          >
            {result.summary}
          </p>

          {/* Themes */}
          <div className="flex flex-wrap gap-1.5">
            {(result.themes || []).map((theme) => (
              <span
                key={theme}
                className="text-[10px] px-2.5 py-0.5 rounded-full border"
                style={{
                  borderColor: "var(--bo)",
                  color: "var(--mt)",
                  background: "var(--bg2)",
                }}
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Owner reply */}
        <div
          className="rounded-xl p-4 border mb-3"
          style={{
            background: "var(--cd)",
            borderColor: "var(--bo)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <div
              className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-base"
              style={{
                background: "rgba(192,57,43,0.1)",
              }}
            >
              👨‍🍳
            </div>

            <div>
              <div
                className="text-xs font-semibold"
                style={{ color: "var(--tx)" }}
              >
                Owner&apos;s Reply
              </div>

              <div className="text-[10px]" style={{ color: "var(--mt)" }}>
                Burmese Bistro
              </div>
            </div>
          </div>

          <p className="text-xs leading-relaxed" style={{ color: "var(--tx)" }}>
            {result.ownerReply}
          </p>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setResult(null);
            setStars(0);
            setHoverStar(0);
            setName("");
            setText("");
            setError("");

            textareaRef.current?.focus();
          }}
          className="w-full py-2.5 rounded-xl border text-xs font-semibold transition-all hover:border-[var(--br)] hover:text-[var(--br)]"
          style={{
            background: "var(--bg)",
            color: "var(--tx)",
            borderColor: "var(--bo)",
          }}
        >
          ✍️ Write Another Review
        </button>
      </div>
    );
  }

  // =========================
  // FORM SCREEN
  // =========================

  return (
    <div className="flex flex-col gap-3.5">
      {/* Name */}
      <div>
        <div
          className="text-[10px] font-semibold uppercase tracking-wide mb-1.5"
          style={{ color: "var(--mt)" }}
        >
          Your Name (optional)
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sarah M."
          className="w-full border rounded-xl px-3.5 py-2 text-xs outline-none transition-colors"
          style={{
            borderColor: "var(--bo)",
            background: "var(--cd)",
            color: "var(--tx)",
            fontFamily: "var(--fb)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--br)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--bo)")}
        />
      </div>

      {/* Rating */}
      <div>
        <div
          className="text-[10px] font-semibold uppercase tracking-wide mb-1.5"
          style={{ color: "var(--mt)" }}
        >
          Star Rating
        </div>

        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className="text-[26px] cursor-pointer transition-transform hover:scale-110"
              style={{
                color: n <= (hoverStar || stars) ? "#e8a020" : "var(--bo)",
              }}
              onClick={() => setStars(n)}
              onMouseEnter={() => setHoverStar(n)}
              onMouseLeave={() => setHoverStar(0)}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Review */}
      <div>
        <div
          className="text-[10px] font-semibold uppercase tracking-wide mb-1.5"
          style={{ color: "var(--mt)" }}
        >
          Your Review
        </div>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell us about your experience — food, service, atmosphere..."
          className="w-full border rounded-xl px-3.5 py-2 text-xs outline-none resize-none min-h-[90px] transition-colors"
          style={{
            borderColor: "var(--bo)",
            background: "var(--cd)",
            color: "var(--tx)",
            fontFamily: "var(--fb)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--br)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--bo)")}
        />
      </div>

      {/* Sample reviews */}
      <div>
        <div
          className="text-[10px] font-semibold uppercase tracking-wide mb-1.5"
          style={{ color: "var(--mt)" }}
        >
          Try a sample review
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {REVIEW_SAMPLES.map((sample, i) => (
            <button
              key={i}
              onClick={() => {
                setText(sample);
                textareaRef.current?.focus();
              }}
              className="border rounded-lg px-3 py-2.5 text-[10px] text-left leading-relaxed transition-all cursor-pointer hover:border-[var(--br)] hover:translate-y-[-1px]"
              style={{
                background: "var(--cd)",
                borderColor: "var(--bo)",
                color: "var(--mt)",
                fontFamily: "var(--fb)",
              }}
            >
              "{sample}"
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="text-[11px] px-3 py-2 rounded-lg"
          style={{
            background: "rgba(192,57,43,0.08)",
            color: "var(--br)",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={submitReview}
        disabled={loading}
        className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "var(--br)",
          fontFamily: "var(--fb)",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.background = "var(--brd)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--br)";
        }}
      >
        {loading ? "🤖 Analyzing Review..." : "✨ Submit Review"}
      </button>
    </div>
  );
}
