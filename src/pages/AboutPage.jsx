import { Heart, Leaf, MapPin, Clock } from "lucide-react";
import { BRAND, ABOUT_FEATURES } from "../data/siteData";
import logo from "../assets/images/logo.png";
import { Link } from "react-router";
const ICONS = { Heart, Leaf, MapPin, Clock };

export default function AboutPage() {
  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full px-7 md:px-9 pt-7 pb-4">
        <div
          className="font-bold text-[28px] mb-1.5"
          style={{ fontFamily: "var(--ff)", color: "var(--tx)" }}
        >
          About Us
        </div>
        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Three generations of authentic Myanmar cooking, served with love since{" "}
          {BRAND.founded}.
        </div>

        {/* Hero */}
        <Link to="/" className="block">
          <div
            className="rounded-2xl p-7 text-white mb-5 flex items-center gap-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg cursor-pointer"
            style={{ background: "linear-gradient(135deg,#c0392b,#e05a2b)" }}
          >
            <img
              src={logo}
              alt="Burmese Bistro Logo"
              className="w-[60px] h-[60px] object-cover rounded-full"
            />

            <div>
              <div
                className="font-bold text-[26px] mb-1"
                style={{ fontFamily: "var(--ff)" }}
              >
                {BRAND.name}
              </div>

              <div className="text-[13px] opacity-90 leading-relaxed">
                Family-owned since {BRAND.founded}. From Grandmother Aye's
                street stall to a beloved Yangon institution.
              </div>
            </div>
          </div>
        </Link>
        {/* Feature Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          }}
        >
          {ABOUT_FEATURES.map((f) => {
            const Icon = ICONS[f.icon];

            const Card = (
              <div
                className="
          rounded-2xl p-4 border
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:border-[var(--br)]/40
          group
          h-full
        "
                style={{
                  background: "var(--cd)",
                  borderColor: "var(--bo)",
                }}
              >
                {/* Icon */}
                {Icon && (
                  <div
                    className="
              w-10 h-10 rounded-xl
              flex items-center justify-center
              mb-3
              transition-all duration-300
              group-hover:scale-110
            "
                    style={{
                      background: "var(--bg2)",
                    }}
                  >
                    <Icon size={20} style={{ color: "var(--br)" }} />
                  </div>
                )}

                {/* Title */}
                <div
                  className="text-[14px] font-semibold mb-1.5"
                  style={{ color: "var(--tx)" }}
                >
                  {f.title}
                </div>

                {/* Description */}
                {f.desc && (
                  <div
                    className="text-[12px] leading-relaxed"
                    style={{ color: "var(--mt)" }}
                  >
                    {f.desc}
                  </div>
                )}

                {/* Hours */}
                {f.hours && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {f.hours.map((h) => (
                      <div
                        key={h.day}
                        className="rounded-xl px-3 py-2"
                        style={{
                          background: "var(--bg2)",
                        }}
                      >
                        <div
                          className="text-[9px] uppercase tracking-wide"
                          style={{ color: "var(--mt)" }}
                        >
                          {h.day}
                        </div>

                        <div
                          className="text-[11px] font-semibold mt-0.5"
                          style={{ color: "var(--tx)" }}
                        >
                          {h.time}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );

            return f.link ? (
              <Link key={f.title} to={f.link} className="block">
                {Card}
              </Link>
            ) : (
              <div key={f.title}>{Card}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
