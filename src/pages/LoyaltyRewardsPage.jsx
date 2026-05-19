// LoyaltyRewardsPage.jsx

import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "Silver",
    icon: "🥈",
    minPoints: 0,
    maxPoints: 499,
    color: "border-stone-300 dark:border-stone-700",
    badge: "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300",
    perks: [
      "5% discount on every dine-in order",
      "Birthday reward — free dessert",
      "Early access to seasonal menus",
      "1 point per 1,000 MMK spent",
    ],
  },
  {
    name: "Gold",
    icon: "🥇",
    minPoints: 500,
    maxPoints: 1499,
    highlight: true,
    color: "border-gold",
    badge: "bg-gold/10 text-gold-dark dark:text-gold-light",
    perks: [
      "10% discount on dine-in & takeaway",
      "Birthday reward — free main course",
      "Priority reservation booking",
      "2 points per 1,000 MMK spent",
      "Exclusive member-only dishes",
    ],
  },
  {
    name: "Platinum",
    icon: "💎",
    minPoints: 1500,
    maxPoints: null,
    color: "border-stone-400 dark:border-stone-500",
    badge: "bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200",
    perks: [
      "15% discount on all orders",
      "Birthday reward — full set meal for two",
      "Dedicated concierge for reservations",
      "3 points per 1,000 MMK spent",
      "Complimentary tasting invitations",
      "Free delivery within 5 km",
    ],
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Sign Up Free",
    desc: "Create your Burmese Bistro account in under a minute — in the app, on our website, or at the counter.",
  },
  {
    step: "02",
    title: "Dine & Earn",
    desc: "Points are added automatically every time you pay. Show your member QR code at checkout or log in online.",
  },
  {
    step: "03",
    title: "Unlock Rewards",
    desc: "Redeem points for discounts, free dishes, and exclusive experiences.",
  },
  {
    step: "04",
    title: "Rise Through Tiers",
    desc: "Advance from Silver to Gold to Platinum and unlock richer rewards.",
  },
];

const BENEFITS = [
  {
    icon: "🎁",
    title: "Exclusive Discounts",
    desc: "Automatic savings on every order.",
  },
  {
    icon: "⭐",
    title: "Points on Every Visit",
    desc: "Earn rewards every time you dine.",
  },
  {
    icon: "🍜",
    title: "Members-Only Dishes",
    desc: "Exclusive seasonal dishes for members.",
  },
  {
    icon: "🎉",
    title: "Birthday Rewards",
    desc: "Celebrate your birthday with free treats.",
  },
  {
    icon: "📅",
    title: "Priority Reservations",
    desc: "Book tables before everyone else.",
  },
  {
    icon: "🚚",
    title: "Free Delivery",
    desc: "Complimentary delivery for Platinum members.",
  },
];

const FAQS = [
  {
    q: "How do I join the loyalty programme?",
    a: "Simply create a free account online or at the restaurant.",
  },
  {
    q: "Do points expire?",
    a: "Points stay active as long as your account remains active.",
  },
  {
    q: "How do I move to a higher tier?",
    a: "Reach 500 points for Gold and 1,500 points for Platinum.",
  },
  {
    q: "Can I use discounts and redeem points together?",
    a: "Yes — discounts and rewards can both be applied.",
  },
];

// ── Components ────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
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
      <span className="w-8 h-px bg-gold" />
      <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-medium">
        {children}
      </p>
    </div>
  );
}

function TierCard({ tier, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className={`relative rounded-3xl border-2 p-6 bg-white dark:bg-stone-900 transition-all duration-300 ${
        tier.color
      } ${tier.highlight ? "shadow-2xl shadow-gold/20" : "hover:shadow-lg"}`}
    >
      {tier.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-gold text-white text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <span className="text-[34px]">{tier.icon}</span>

        <div>
          <h3 className="font-display text-[28px] font-semibold text-stone-900 dark:text-stone-100">
            {tier.name}
          </h3>

          <span
            className={`inline-block mt-1 px-2 py-1 rounded-full text-[10px] font-semibold tracking-wide ${tier.badge}`}
          >
            {tier.maxPoints
              ? `${tier.minPoints} - ${tier.maxPoints} pts`
              : `${tier.minPoints}+ pts`}
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2">
            <span className="text-gold text-[13px] mt-0.5">✓</span>

            <span className="text-[13px] text-stone-600 dark:text-stone-400 leading-relaxed">
              {perk}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/signup")}
        className={`w-full py-3 rounded-xl text-[13px] font-medium transition-all duration-200 ${
          tier.highlight
            ? "bg-gold hover:bg-gold-dark text-white"
            : "border border-stone-200 dark:border-stone-700 hover:border-gold text-stone-700 dark:text-stone-300 hover:text-gold"
        }`}
      >
        {tier.name === "Silver" ? "Join Free" : `Reach ${tier.name}`}
      </button>
    </motion.div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 dark:border-stone-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[14px] font-medium text-stone-800 dark:text-stone-200">
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="text-[22px] text-stone-400"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PointsProgress() {
  const tiers = [
    { name: "Silver", icon: "🥈", points: "0 pts" },
    { name: "Gold", icon: "🥇", points: "500 pts" },
    { name: "Platinum", icon: "💎", points: "1500 pts" },
  ];

  return (
    <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6">
      <p className="text-[11px] tracking-[0.18em] uppercase text-gold font-medium mb-5">
        Tier Progression
      </p>

      <div className="h-2 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <div className="h-full w-1/3 bg-gold rounded-full" />
      </div>

      <div className="flex justify-between mt-5">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex flex-col items-center gap-1">
            <span className="text-[20px]">{tier.icon}</span>

            <span className="font-display text-[14px] font-semibold text-stone-900 dark:text-stone-100">
              {tier.name}
            </span>

            <span className="text-[11px] text-stone-400 dark:text-stone-500">
              {tier.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function LoyaltyRewardsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-stone-50 dark:bg-stone-950 font-body">
      {/* Hero */}

      <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80"
          alt="Loyalty Rewards"
          className="w-full h-full object-cover brightness-[0.42]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold mb-2">
              Burmese Bistro · Loyalty Programme
            </p>

            <h1 className="font-display text-[42px] sm:text-[58px] md:text-[70px] text-white leading-[1.02] font-semibold">
              Loyalty <em className="italic text-gold-light">Rewards</em>
            </h1>

            <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-white/70">
              Earn points, unlock exclusive rewards, and enjoy premium benefits
              every time you dine with Burmese Bistro.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}

      <div className="max-w-[1100px] mx-auto w-full px-4 sm:px-6 md:px-8 py-14 space-y-24">
        {/* Intro */}

        <FadeUp>
          <SectionLabel>About the Programme</SectionLabel>

          <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-stone-900 dark:text-stone-100 mb-5">
            Dining that rewards you back.
          </h2>

          <p className="max-w-[700px] text-[14px] leading-relaxed text-stone-500 dark:text-stone-400">
            Every visit earns points that unlock discounts, exclusive dishes,
            priority reservations, birthday gifts, and premium experiences.
            Membership is free forever.
          </p>
        </FadeUp>

        {/* Stats */}

        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "4,200+", label: "Active members" },
              { value: "1.2M", label: "Points redeemed" },
              { value: "8,500+", label: "Free dishes given" },
              { value: "12%", label: "Average member savings" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5"
              >
                <h3 className="font-display text-[30px] font-semibold text-stone-900 dark:text-stone-100">
                  {item.value}
                </h3>

                <p className="mt-1 text-[11px] text-stone-400 dark:text-stone-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Benefits */}

        <div>
          <FadeUp>
            <SectionLabel>Benefits</SectionLabel>

            <h2 className="font-display text-[32px] sm:text-[38px] font-semibold text-stone-900 dark:text-stone-100 mb-8">
              Everything included with membership.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {BENEFITS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 hover:shadow-lg hover:border-gold/50 transition-all"
              >
                <span className="text-[30px]">{item.icon}</span>

                <h3 className="mt-4 font-display text-[20px] font-semibold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>

                <p className="mt-2 text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tier Cards */}

        <div>
          <FadeUp>
            <SectionLabel>Membership Tiers</SectionLabel>

            <h2 className="font-display text-[32px] sm:text-[38px] font-semibold text-stone-900 dark:text-stone-100 mb-3">
              Three tiers, richer rewards.
            </h2>

            <p className="text-[13px] text-stone-500 dark:text-stone-400 mb-8">
              Unlock better perks as your lifetime points increase.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TIERS.map((tier, i) => (
              <TierCard key={tier.name} tier={tier} index={i} />
            ))}
          </div>
        </div>

        {/* Progress */}

        <FadeUp>
          <PointsProgress />
        </FadeUp>

        {/* How It Works */}

        <div>
          <FadeUp>
            <SectionLabel>How It Works</SectionLabel>

            <h2 className="font-display text-[32px] sm:text-[38px] font-semibold text-stone-900 dark:text-stone-100 mb-8">
              Simple from the first visit.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6"
              >
                <span className="font-display text-[48px] text-gold/20 font-semibold">
                  {step.step}
                </span>

                <h3 className="mt-3 font-display text-[20px] font-semibold text-stone-900 dark:text-stone-100">
                  {step.title}
                </h3>

                <p className="mt-2 text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}

        <div>
          <FadeUp>
            <SectionLabel>Questions</SectionLabel>

            <h2 className="font-display text-[32px] sm:text-[38px] font-semibold text-stone-900 dark:text-stone-100 mb-6">
              Frequently Asked
            </h2>
          </FadeUp>

          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {FAQS.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* CTA */}

        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80"
              alt="Join loyalty"
              className="w-full h-[240px] sm:h-[300px] object-cover brightness-[0.45]"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="font-display italic text-[32px] sm:text-[42px] text-white font-semibold mb-4">
                Ready to start earning?
              </h3>

              <p className="max-w-[480px] text-[13px] leading-relaxed text-white/70 mb-7">
                Join thousands of Burmese Bistro members already enjoying
                rewards, discounts, and exclusive dining experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-white text-[13px] font-medium transition-colors"
                >
                  Join for Free
                </button>

                <button
                  onClick={() => navigate("/menu")}
                  className="px-6 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-[13px] font-medium transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
