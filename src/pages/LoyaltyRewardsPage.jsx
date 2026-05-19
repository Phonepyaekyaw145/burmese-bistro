// LoyaltyRewardsPage.jsx

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    desc: "Redeem points for discounts, free dishes, and exclusive experiences. No expiry on points as long as your account is active.",
  },
  {
    step: "04",
    title: "Rise Through Tiers",
    desc: "Accumulate points to advance from Silver to Gold to Platinum — each level unlocking richer perks.",
  },
];

const BENEFITS = [
  {
    icon: "🎁",
    title: "Exclusive Discounts",
    desc: "Members receive automatic discounts on every order — from 5% at Silver up to 15% at Platinum tier.",
  },
  {
    icon: "⭐",
    title: "Points on Every Visit",
    desc: "Earn points each time you dine in, order takeaway, or book catering.",
  },
  {
    icon: "🍜",
    title: "Members-Only Dishes",
    desc: "Gold and Platinum members get first access to seasonal specials and members-only menu items.",
  },
  {
    icon: "🎉",
    title: "Birthday Rewards",
    desc: "Receive a personalised birthday reward every year — from desserts to full meals.",
  },
  {
    icon: "📅",
    title: "Priority Reservations",
    desc: "Gold and Platinum members can reserve tables ahead with priority seating.",
  },
  {
    icon: "🚚",
    title: "Free Delivery",
    desc: "Platinum members enjoy complimentary delivery within 5 km.",
  },
];

const FAQS = [
  {
    q: "How do I join the loyalty programme?",
    a: "Simply create a free account on our website or mobile app. Membership is completely free.",
  },
  {
    q: "How are points calculated?",
    a: "Silver earns 1 point per 1,000 MMK spent; Gold earns 2; Platinum earns 3.",
  },
  {
    q: "Do points expire?",
    a: "Points remain active as long as your account has activity within 12 months.",
  },
  {
    q: "How do I move to a higher tier?",
    a: "Reach 500 points for Gold and 1,500 points for Platinum.",
  },
  {
    q: "Can I use discounts and redeem points together?",
    a: "Yes — your member discount and point redemption can be combined.",
  },
];

// ── Components ────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
      <span className="h-px w-8 bg-gold" />
      <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-body font-medium">
        {children}
      </p>
    </div>
  );
}

function TierCard({ tier, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex flex-col rounded-3xl p-6 border-2 transition-all duration-300 bg-white dark:bg-stone-900 ${
        tier.color
      } ${tier.highlight ? "shadow-2xl shadow-gold/15" : "hover:shadow-lg"}`}
    >
      {tier.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <div className="flex items-center gap-3 mb-5">
        <span className="text-[34px]">{tier.icon}</span>

        <div>
          <h3 className="font-display text-[28px] font-semibold text-stone-900 dark:text-white">
            {tier.name}
          </h3>

          <span
            className={`inline-block mt-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full ${tier.badge}`}
          >
            {tier.maxPoints
              ? `${tier.minPoints} – ${tier.maxPoints} pts`
              : `${tier.minPoints}+ pts`}
          </span>
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-6">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex gap-2.5">
            <span className="text-gold text-[13px] mt-0.5">✓</span>

            <span className="text-[13px] leading-relaxed text-stone-600 dark:text-stone-400">
              {perk}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/signup")}
        className={`w-full py-3 rounded-2xl text-[13px] font-medium tracking-wide transition-all duration-300 ${
          tier.highlight
            ? "bg-gold hover:bg-gold-dark text-white"
            : "border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-gold hover:text-gold"
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
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="text-[14px] font-medium text-stone-800 dark:text-stone-200 hover:text-gold transition-colors">
          {item.q}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="text-[22px] text-stone-400"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PointsProgress() {
  return (
    <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6">
      <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-medium mb-4">
        Tier Progression
      </p>

      <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
        <div className="h-full w-[33%] bg-gold rounded-full" />
      </div>

      <div className="grid grid-cols-3 mt-5 text-center">
        {[
          { icon: "🥈", name: "Silver", points: "0 pts" },
          { icon: "🥇", name: "Gold", points: "500 pts" },
          { icon: "💎", name: "Platinum", points: "1500 pts" },
        ].map((tier) => (
          <div key={tier.name}>
            <p className="text-[22px]">{tier.icon}</p>

            <p className="font-display text-[15px] font-semibold text-stone-900 dark:text-white">
              {tier.name}
            </p>

            <p className="text-[11px] text-stone-400">{tier.points}</p>
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
          className="w-full h-full object-cover brightness-[0.45]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold font-medium mb-2">
              Burmese Bistro · Member Programme
            </p>

            <h1 className="font-display text-[44px] sm:text-[58px] md:text-[68px] font-semibold text-white leading-[1.02]">
              Loyalty <em className="italic text-gold-light">Rewards</em>
            </h1>

            <p className="mt-3 text-[14px] text-white/70 max-w-[520px] leading-relaxed">
              Earn points, unlock exclusive dining experiences, and enjoy
              special benefits every time you visit.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[950px] mx-auto w-full px-4 sm:px-6 md:px-9 py-12 space-y-20">
        {/* Intro */}
        <FadeUp>
          <SectionLabel>About the Programme</SectionLabel>

          <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-stone-900 dark:text-white mb-4">
            Dining that rewards you back.
          </h2>

          <p className="text-[14px] leading-relaxed text-stone-500 dark:text-stone-400 max-w-[700px]">
            Every visit earns you rewards. Join our loyalty programme for free
            and unlock exclusive discounts, priority reservations, members-only
            dishes, and more.
          </p>
        </FadeUp>

        {/* Stats */}
        <FadeUp>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "4,200+", label: "Active members" },
              { value: "1.2M", label: "Points redeemed" },
              { value: "8,500+", label: "Free dishes given" },
              { value: "12%", label: "Average savings" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5"
              >
                <p className="font-display text-[30px] font-semibold text-stone-900 dark:text-white">
                  {item.value}
                </p>

                <p className="text-[11px] text-stone-400 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Benefits */}
        <div>
          <FadeUp>
            <SectionLabel>Benefits</SectionLabel>

            <h2 className="font-display text-[32px] sm:text-[38px] font-semibold text-stone-900 dark:text-white mb-8">
              Everything that comes with membership.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {BENEFITS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                }}
                className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-[30px]">{item.icon}</span>

                <h3 className="mt-3 font-display text-[20px] font-semibold text-stone-900 dark:text-white">
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

            <h2 className="font-display text-[32px] sm:text-[38px] font-semibold text-stone-900 dark:text-white mb-2">
              Three tiers, richer rewards.
            </h2>

            <p className="text-[13px] text-stone-500 dark:text-stone-400 mb-8">
              Progress automatically as you collect points.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TIERS.map((tier, i) => (
              <TierCard key={tier.name} tier={tier} index={i} />
            ))}
          </div>
        </div>

        {/* Progress */}
        <FadeUp>
          <PointsProgress />
        </FadeUp>

        {/* How it works */}
        <div>
          <FadeUp>
            <SectionLabel>How It Works</SectionLabel>

            <h2 className="font-display text-[32px] sm:text-[38px] font-semibold text-stone-900 dark:text-white mb-8">
              Simple from the first visit.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5"
              >
                <span className="font-display text-[42px] text-gold/20 font-semibold">
                  {step.step}
                </span>

                <h3 className="mt-2 font-display text-[19px] font-semibold text-stone-900 dark:text-white">
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

            <h2 className="font-display text-[32px] sm:text-[38px] font-semibold text-stone-900 dark:text-white mb-6">
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
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80"
              alt="Join Loyalty Programme"
              className="w-full h-[240px] sm:h-[280px] object-cover brightness-[0.45]"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h3 className="font-display text-[32px] sm:text-[40px] italic font-semibold text-white mb-3">
                Ready to start earning?
              </h3>

              <p className="text-[13px] text-white/70 max-w-[420px] mb-6">
                Join thousands of members already enjoying rewards and exclusive
                dining benefits at Burmese Bistro.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 py-3 bg-gold hover:bg-gold-dark text-white rounded-2xl text-[13px] font-medium transition-all duration-300"
                >
                  Join for Free
                </button>

                <button
                  onClick={() => navigate("/menu")}
                  className="px-6 py-3 bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-sm text-white rounded-2xl text-[13px] font-medium transition-all duration-300"
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
