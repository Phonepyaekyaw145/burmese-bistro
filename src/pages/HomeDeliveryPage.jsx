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

const ZONES = [
  {
    zone: "Zone A",
    area: "Yangon Downtown, Pabedan, Latha",
    fee: "Free",
    time: "25–35 min",
  },
  {
    zone: "Zone B",
    area: "Dagon, Sanchaung, Kamaryut",
    fee: "1,500 MMK",
    time: "30–45 min",
  },
  {
    zone: "Zone C",
    area: "Hlaing, Mayangone, Insein",
    fee: "3,000 MMK",
    time: "40–55 min",
  },
  {
    zone: "Zone D",
    area: "Thaketa, Dawbon, Thingangyun",
    fee: "3,500 MMK",
    time: "45–60 min",
  },
];

const FAQS = [
  {
    q: "What are your delivery hours?",
    a: "We deliver daily from 10:00 AM to 9:30 PM. Last orders are accepted at 9:00 PM. During peak hours (12–2 PM and 6–8 PM) delivery times may be slightly longer.",
  },
  {
    q: "Is there a minimum order amount?",
    a: "Yes — a minimum order of 10,000 MMK applies for delivery. For orders over 30,000 MMK, delivery is free within Zone A and B.",
  },
  {
    q: "Can I schedule a delivery in advance?",
    a: "Absolutely. You can schedule up to 2 days in advance. Just select your preferred date and time at checkout.",
  },
  {
    q: "What if my food arrives cold or incorrect?",
    a: "We take quality seriously. If anything isn't right, contact us within 30 minutes of delivery and we'll make it right — a free replacement or a full refund.",
  },
  {
    q: "Do you deliver to offices and hotels?",
    a: "Yes! We deliver to offices, hotels, and serviced apartments across all four zones. Just enter the full address including floor and room number at checkout.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
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
    <div className="border-b border-stone-200 dark:border-stone-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="text-[14px] font-medium font-body text-stone-800 dark:text-stone-200 group-hover:text-gold transition-colors">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[20px] text-stone-400 dark:text-stone-600 flex-shrink-0 leading-none"
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body pb-4">
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
    <div className="flex flex-col flex-1 overflow-y-auto bg-stone-50 dark:bg-stone-950 font-body">
      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1400&q=80"
          alt="Food delivery on scooter"
          className="w-full h-full object-cover brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body font-medium mb-2">
              Burmese Bistro · Delivered Fresh
            </p>
            <h1 className="font-display text-[40px] sm:text-[54px] md:text-[64px] font-semibold text-white leading-[1.02]">
              Home <em className="italic text-gold-light">Delivery</em>
            </h1>
            <p className="mt-3 text-[14px] text-white/70 font-body max-w-[480px] leading-relaxed">
              Authentic Burmese flavours, freshly cooked and delivered hot to
              your door — in 45 minutes or less.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto w-full px-4 sm:px-6 md:px-9 py-12 space-y-20">
        {/* ── Intro ── */}
        <FadeUp>
          <SectionLabel>About Our Delivery</SectionLabel>
          <h2 className="font-display text-[30px] sm:text-[38px] font-semibold text-stone-900 dark:text-stone-100 leading-tight mb-4">
            Restaurant quality, at home.
          </h2>
          <p className="text-[14px] leading-relaxed text-stone-500 dark:text-stone-400 max-w-[640px]">
            We believe great food shouldn't be limited to the dining room. Our
            delivery service brings Grandmother Aye's original recipes directly
            to your kitchen table — packed carefully, dispatched quickly, and
            always prepared fresh. No reheating, no shortcuts. Just the same
            Burmese Bistro quality you know and love.
          </p>
        </FadeUp>

        {/* ── Benefits ── */}
        <div>
          <FadeUp>
            <SectionLabel>Why Deliver With Us</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-8">
              Every order, done right.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                ref={undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col gap-3 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-gold/60 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-[30px]">{b.icon}</span>
                <h3 className="font-display text-[19px] font-semibold text-stone-900 dark:text-stone-100">
                  {b.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── How It Works ── */}
        <div>
          <FadeUp>
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-8">
              Four simple steps.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((s, i) => (
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
                className="relative flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
              >
                <span className="font-display text-[42px] font-semibold text-gold/20 leading-none select-none">
                  {s.step}
                </span>
                <h3 className="font-display text-[18px] font-semibold text-stone-900 dark:text-stone-100">
                  {s.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-stone-500 dark:text-stone-400 font-body">
                  {s.desc}
                </p>
                {/* Connector arrow for desktop */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-stone-300 dark:text-stone-700 text-[18px] z-10">
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Popular Delivery Items ── */}
        <div>
          <FadeUp>
            <SectionLabel>Top Picks</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-8">
              Most ordered for delivery.
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {POPULAR_ITEMS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate("/menu")}
              >
                <div className="relative h-[160px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 right-3 text-[10px] font-semibold font-body px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                    {item.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 font-display text-[20px] font-semibold text-white leading-none">
                    {item.price}
                    <span className="text-[10px] font-body ml-1 opacity-80">
                      MMK
                    </span>
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-[20px] font-semibold text-stone-900 dark:text-stone-100">
                    {item.name}
                  </h3>
                  <p className="text-[11px] tracking-widest uppercase text-gold font-body font-medium mb-2">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[12px] text-stone-400 dark:text-stone-500 font-body">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
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
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/menu")}
              className="px-6 py-2.5 border border-gold text-gold text-[13px] font-medium font-body rounded-full hover:bg-gold hover:text-white transition-all duration-200"
            >
              View Full Menu →
            </button>
          </div>
        </div>

        {/* ── Delivery Zones ── */}
        <div>
          <FadeUp>
            <SectionLabel>Coverage</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Delivery zones & fees.
            </h2>
            <p className="text-[13px] text-stone-500 dark:text-stone-400 font-body mb-6">
              Free delivery on orders over 30,000 MMK within Zone A & B.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800">
              {/* Table header */}
              <div className="grid grid-cols-4 gap-0 bg-stone-100 dark:bg-stone-800/60 px-5 py-3">
                {["Zone", "Areas Covered", "Fee", "Est. Time"].map((h) => (
                  <span
                    key={h}
                    className="text-[11px] tracking-widest uppercase font-medium text-stone-500 dark:text-stone-400 font-body"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {ZONES.map((z, i) => (
                <div
                  key={z.zone}
                  className={`grid grid-cols-4 gap-0 px-5 py-4 items-center border-t border-stone-100 dark:border-stone-800 ${
                    i % 2 === 0
                      ? "bg-white dark:bg-stone-900"
                      : "bg-stone-50/60 dark:bg-stone-900/50"
                  }`}
                >
                  <span className="text-[13px] font-semibold text-gold font-body">
                    {z.zone}
                  </span>
                  <span className="text-[12px] text-stone-600 dark:text-stone-400 font-body col-span-1 pr-2">
                    {z.area}
                  </span>
                  <span
                    className={`text-[13px] font-medium font-body ${z.fee === "Free" ? "text-emerald-600 dark:text-emerald-400" : "text-stone-700 dark:text-stone-300"}`}
                  >
                    {z.fee}
                  </span>
                  <span className="text-[12px] text-stone-500 dark:text-stone-400 font-body">
                    {z.time}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* ── FAQ ── */}
        <div>
          <FadeUp>
            <SectionLabel>Questions</SectionLabel>
            <h2 className="font-display text-[30px] sm:text-[36px] font-semibold text-stone-900 dark:text-stone-100 mb-6">
              Frequently Asked
            </h2>
          </FadeUp>
          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {FAQS.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <FadeUp>
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
              alt="Burmese food spread"
              className="w-full h-[220px] sm:h-[260px] object-cover brightness-[0.45]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="font-display text-[28px] sm:text-[36px] font-semibold italic text-white mb-3">
                Hungry right now?
              </h3>
              <p className="text-[13px] text-white/70 font-body mb-6 max-w-[400px]">
                Browse our full menu and get your order in. Fresh food at your
                door in under 45 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/menu")}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium font-body tracking-wide rounded-xl transition-colors duration-200"
                >
                  Order Now
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white text-[13px] font-medium font-body tracking-wide rounded-xl transition-colors duration-200"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
