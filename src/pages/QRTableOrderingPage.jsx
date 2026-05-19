import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, useInView } from "framer-motion";
import { BRAND } from "../data/siteData";

// ── Put your QR image here ────────────────────────────────────────────────
import authqr from "../assets/images/authqr.jpg";

// ── Data ──────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "📱",
    title: "Instant Ordering",
    desc: "Browse the full menu and place your order straight from your phone — no app download needed.",
  },
  {
    icon: "🍜",
    title: "Live Menu Updates",
    desc: "Sold-out items disappear in real time. Daily specials appear the moment the kitchen announces them.",
  },
  {
    icon: "⚡",
    title: "Faster Service",
    desc: "Your order goes directly to the kitchen the moment you confirm. No waiting for a staff member.",
  },
  {
    icon: "💳",
    title: "Easy Checkout",
    desc: "Pay at the table via KPay, Wave Money, card, or cash — all in one smooth checkout flow.",
  },
  {
    icon: "🔁",
    title: "Reorder Anytime",
    desc: "Want more? Scan again and add to your order at any point during your visit.",
  },
  {
    icon: "🌐",
    title: "Bilingual Menu",
    desc: "Switch between English and Myanmar at any time — every dish, description, and price in both languages.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Find the QR Code",
    desc: "Look for the QR code card on your table — or ask any staff member for one.",
  },
  {
    step: "02",
    title: "Scan with Your Phone",
    desc: "Open your camera app and point it at the code. No app download required.",
  },
  {
    step: "03",
    title: "Browse & Order",
    desc: "Explore the full menu, read descriptions, check prices, and add items to your cart.",
  },
  {
    step: "04",
    title: "Sit Back & Enjoy",
    desc: "Your order goes straight to the kitchen. We'll bring it to your table when it's ready.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="h-px w-8 bg-gold" />
      <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body font-medium">
        {children}
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function QRTableOrderingPage() {
  const navigate = useNavigate();
  const guest = JSON.parse(sessionStorage.getItem("guest") || "{}");

  const tableName = guest.table || "C07";
  const saveGuestToDB = async (guestData) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestData),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "API failed");
      }

      return data;
    } catch (err) {
      console.log("Backend failed, using local only", err);
      return null;
    }
  };
  useEffect(() => {
    const guest = JSON.parse(sessionStorage.getItem("guest") || "{}");

    if (guest.name) {
      saveGuestToDB(guest);
    }
  }, []);
  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto font-body transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {" "}
      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[200px] sm:h-[260px] md:h-[320px] overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#c8922a 1px, transparent 1px), linear-gradient(90deg, #c8922a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body font-medium mb-2">
              {BRAND.name} · Scan & Order
            </p>
            <h1
              className="mt-2 text-[13px] font-body"
              style={{ color: "var(--muted)" }}
            >
              QR Table <em className="italic text-gold-light">Ordering</em>
            </h1>
            <p className="mt-2 text-[13px] text-white/65 font-body max-w-[440px] leading-relaxed">
              Skip the wait. Scan the code on your table and order instantly
              from your phone.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto w-full px-4 sm:px-6 md:px-9 py-12 space-y-20">
        {/* ── QR Code hero section ── */}
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* QR card */}
            <div className="flex justify-center md:justify-start">
              <motion.div
                whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
                className="relative rounded-3xl p-6 shadow-xl border border-stone-200 dark:border-stone-800 w-fit"
                style={{ background: "var(--card)" }}
              >
                {/* Pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.15, 0.4] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-3xl border-2 border-gold pointer-events-none"
                />

                {/* Gold corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold rounded-br-lg" />

                <img
                  src={authqr}
                  alt="Burmese Bistro Table QR Code"
                  className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] object-contain rounded-xl"
                />

                {/* Table number badge */}
                <div className="mt-4 text-center">
                  <p
                    className="font-display text-[26px] font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    Table
                  </p>
                  <p
                    className="font-display text-[26px] font-semibold leading-none"
                    style={{ color: "var(--text)" }}
                  >
                    {tableName}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right text */}
            <div>
              <SectionLabel>How to Order</SectionLabel>
              <h2
                className="font-display text-[28px] sm:text-[34px] font-semibold leading-tight mb-3"
                style={{ color: "var(--text)" }}
              >
                Your table, your menu,{" "}
                <em className="italic text-gold">your pace.</em>
              </h2>
              <p
                className="text-[14px] leading-relaxed font-body mb-5"
                style={{ color: "var(--muted)" }}
              >
                Point your phone camera at the QR code above — no app download,
                no account needed. You'll be browsing our full menu in seconds.
                Add what you like, confirm your order, and we'll bring it
                straight to your table.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    sessionStorage.setItem(
                      "pendingTable",
                      JSON.stringify({ table: tableName }),
                    );
                    navigate("/auth");
                  }}
                  className="px-5 py-2.5 bg-gold hover:bg-gold-dark text-[13px] font-medium font-body tracking-wide rounded-xl transition-colors duration-200"
                  style={{
                    color: "var(--text)",
                  }}
                >
                  Start Booking?
                </button>
                <button
                  onClick={() => navigate("/support")}
                  className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-[13px] font-medium font-body rounded-xl hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  Need Help?
                </button>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── Features grid ── */}
        <div>
          <FadeUp>
            <SectionLabel>Features</SectionLabel>
            <h2
              className="font-display text-[30px] sm:text-[36px] font-semibold mb-8"
              style={{ color: "var(--text)" }}
            >
              Ordering made effortless.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group flex flex-col gap-3 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-gold/60 hover:shadow-lg transition-all duration-300"
                style={{ background: "var(--card)" }}
              >
                {/* Gold top accent */}
                <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 rounded-full transition-all duration-500 -mt-5 -mx-5 mb-3 self-stretch" />
                <span className="text-[28px]">{f.icon}</span>
                <h3
                  className="font-display text-[18px] font-semibold leading-tight"
                  style={{ color: "var(--text)" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed font-body"
                  style={{ color: "var(--muted)" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── How It Works ── */}
        <div>
          <FadeUp>
            <SectionLabel>Step by Step</SectionLabel>
            <h2
              className="font-display text-[30px] sm:text-[36px] font-semibold mb-8"
              style={{ color: "var(--text)" }}
            >
              Ready in four simple steps.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col gap-3 p-5 rounded-2xl border border-stone-200 dark:border-stone-800"
                style={{ background: "var(--card)" }}
              >
                <span className="font-display text-[44px] font-semibold text-gold/20 leading-none select-none">
                  {s.step}
                </span>
                <h3
                  className="font-display text-[17px] font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed font-body"
                  style={{ color: "var(--muted)" }}
                >
                  {s.desc}
                </p>
                {i < STEPS.length - 1 && (
                  <span className="hidden md:block absolute -right-3 top-8 text-stone-300 dark:text-stone-700 text-[18px] z-10">
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Info strip ── */}
        <FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: "🔒",
                title: "Secure & Private",
                desc: "Your order data is never stored or shared. Every session is fresh.",
              },
              {
                icon: "📶",
                title: "No App Needed",
                desc: "Works in any mobile browser. Just scan and go — iOS and Android.",
              },
              {
                icon: "🤝",
                title: "Staff Always Near",
                desc: "Prefer to order with a person? Our team is always happy to help.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-stone-200 dark:border-stone-800"
                style={{ background: "var(--card)" }}
              >
                <span className="text-[26px] flex-shrink-0">{item.icon}</span>
                <div>
                  <p
                    className="text-[13px] font-semibold font-body mb-1"
                    style={{ color: "var(--text)" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-[12px] leading-relaxed font-body"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* ── CTA ── */}
        <FadeUp>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-stone-900 to-stone-800">
            {/* Grid bg */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(#c8922a 1px, transparent 1px), linear-gradient(90deg, #c8922a 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8">
              <div>
                <h3 className="font-display text-[26px] sm:text-[30px] font-semibold italic text-white mb-2">
                  Ready to order?
                </h3>
                <p className="text-[13px] text-white/60 font-body max-w-[360px]">
                  Scan the QR code on your table or tap below to browse our full
                  menu right now.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <button
                  onClick={() => navigate("/menu")}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium font-body tracking-wide rounded-xl transition-colors duration-200"
                >
                  Open Menu
                </button>
                <button
                  onClick={() => navigate("/support")}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[13px] font-medium font-body tracking-wide rounded-xl transition-colors duration-200"
                >
                  Ask AI Assistant
                </button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
