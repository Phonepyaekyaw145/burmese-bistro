import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: "🛵",
    title: "Fast Delivery",
    desc: "Average delivery time of 30–45 minutes from the moment your order leaves our kitchen.",
  },
  {
    icon: "🔥",
    title: "Freshly Prepared",
    desc: "Every dish is cooked to order. We never reheat — your meal is prepared fresh when you place your order.",
  },
  {
    icon: "📍",
    title: "Real-Time Tracking",
    desc: "Follow your rider live on the map from our kitchen straight to your door.",
  },
  {
    icon: "🍱",
    title: "Secure Packaging",
    desc: "Eco-friendly, spill-proof containers keep soups hot and salads crisp — even on longer routes.",
  },
  {
    icon: "💳",
    title: "Easy Payment",
    desc: "Pay online via card, KPay, Wave, or cash on delivery — whatever works best for you.",
  },
  {
    icon: "🎁",
    title: "Loyalty Rewards",
    desc: "Earn points on every order. Redeem for free dishes, upgrades, or exclusive tasting events.",
  },
];

const POPULAR_ITEMS = [
  {
    name: "Mohinga",
    subtitle: "Fish Noodle Soup",
    price: "8,500",
    time: "20 min",
    tag: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80",
  },
  {
    name: "Ohn No Khao Swe",
    subtitle: "Coconut Chicken Noodle",
    price: "9,000",
    time: "25 min",
    tag: "Popular",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
  },
  {
    name: "Lahpet Thoke",
    subtitle: "Tea Leaf Salad",
    price: "6,000",
    time: "15 min",
    tag: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Browse the Menu",
    desc: "Explore our full menu and pick your favourite dishes. Filter by category, spice level, or dietary need.",
  },
  {
    step: "02",
    title: "Place Your Order",
    desc: "Add items to your cart, choose your delivery time, and check out securely in under a minute.",
  },
  {
    step: "03",
    title: "We Prepare Fresh",
    desc: "Our kitchen gets to work the moment your order is confirmed — cooked fresh, never reheated.",
  },
  {
    step: "04",
    title: "Track & Enjoy",
    desc: "Follow your rider in real-time and get ready to enjoy authentic Burmese flavours at home.",
  },
];

const FAQS = [
  {
    q: "What are your delivery hours?",
    a: "We deliver daily from 10:00 AM to 9:30 PM.",
  },
  {
    q: "Can I schedule delivery?",
    a: "Yes. You can schedule up to 2 days ahead.",
  },
];

// ── Components ────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
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

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span
          className="text-[14px] font-medium font-body group-hover:text-gold transition-colors"
          style={{ color: "var(--text)" }}
        >
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[20px] flex-shrink-0 leading-none"
          style={{ color: "var(--muted)" }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p
              className="text-[13px] leading-relaxed font-body pb-4"
              style={{ color: "var(--muted)" }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function HomeDeliveryPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto font-body transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Hero */}
      <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1400&q=80"
          alt="Food delivery"
          className="w-full h-full object-cover brightness-[0.5]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body font-medium mb-2">
              Burmese Bistro · Delivered Fresh
            </p>

            <h1 className="font-display text-[40px] sm:text-[54px] md:text-[64px] font-semibold text-white leading-[1.02]">
              Home <em className="italic text-gold-light">Delivery</em>
            </h1>

            <p className="mt-3 text-[14px] text-white/70 font-body max-w-[480px] leading-relaxed">
              Authentic Burmese flavours delivered to your door.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto w-full px-4 sm:px-6 md:px-9 py-12 space-y-20">
        {/* Intro */}
        <FadeUp>
          <SectionLabel>About Delivery</SectionLabel>

          <h2
            className="font-display text-[30px] sm:text-[38px] font-semibold leading-tight mb-4"
            style={{ color: "var(--text)" }}
          >
            Restaurant quality, at home.
          </h2>

          <p
            className="text-[14px] leading-relaxed max-w-[640px]"
            style={{ color: "var(--muted)" }}
          >
            We bring authentic Burmese flavours directly to your home —
            carefully packed and freshly prepared every single time.
          </p>
        </FadeUp>

        {/* Benefits */}
        <div>
          <FadeUp>
            <SectionLabel>Benefits</SectionLabel>

            <h2
              className="font-display text-[30px] sm:text-[36px] font-semibold mb-8"
              style={{ color: "var(--text)" }}
            >
              Every order, done right.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                }}
                className="flex flex-col gap-3 p-5 rounded-2xl border hover:shadow-lg transition-all duration-300"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <span className="text-[30px]">{b.icon}</span>

                <h3
                  className="font-display text-[19px] font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {b.title}
                </h3>

                <p
                  className="text-[13px] leading-relaxed font-body"
                  style={{ color: "var(--muted)" }}
                >
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div>
          <FadeUp>
            <SectionLabel>How It Works</SectionLabel>

            <h2
              className="font-display text-[30px] sm:text-[36px] font-semibold mb-8"
              style={{ color: "var(--text)" }}
            >
              Four simple steps.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="relative flex flex-col gap-3 p-5 rounded-2xl border"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <span className="font-display text-[42px] font-semibold text-gold/20 leading-none">
                  {s.step}
                </span>

                <h3
                  className="font-display text-[18px] font-semibold"
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular items */}
        <div>
          <FadeUp>
            <SectionLabel>Top Picks</SectionLabel>

            <h2
              className="font-display text-[30px] sm:text-[36px] font-semibold mb-8"
              style={{ color: "var(--text)" }}
            >
              Most ordered for delivery.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {POPULAR_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl overflow-hidden border hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
                onClick={() => navigate("/menu")}
              >
                <div className="relative h-[160px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-4">
                  <h3
                    className="font-display text-[20px] font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {item.name}
                  </h3>

                  <p className="text-[11px] tracking-widest uppercase text-gold font-body font-medium mb-2">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-[12px] font-body"
                      style={{ color: "var(--muted)" }}
                    >
                      {item.time}
                    </span>

                    <span className="text-[12px] font-medium text-gold font-body">
                      Order →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <FadeUp>
            <SectionLabel>Questions</SectionLabel>

            <h2
              className="font-display text-[30px] sm:text-[36px] font-semibold mb-6"
              style={{ color: "var(--text)" }}
            >
              Frequently Asked
            </h2>
          </FadeUp>

          <div>
            {FAQS.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
