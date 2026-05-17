import { useState } from "react";
import { useNavigate } from "react-router";
import Slideshow from "../components/home/Slideshow";

const TABLES = [
  "A01",
  "A02",
  "A03",
  "B01",
  "B02",
  "B03",
  "C01",
  "C02",
  "C03",
  "C07",
];

export default function WelcomePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [table, setTable] = useState("C07");

  const hour = new Date().getHours();

  let greeting = "Good Evening!";
  let subtitle = "Enjoy an authentic Myanmar dinner experience.";

  if (hour < 12) {
    greeting = "Good Morning!";
    subtitle = "Start your day with warm Myanmar flavours.";
  } else if (hour < 17) {
    greeting = "Good Afternoon!";
    subtitle = "Enjoy a delicious Myanmar lunch or afternoon treat.";
  }

  function handleEnter() {
    sessionStorage.setItem(
      "guest",
      JSON.stringify({
        name: name || "Guest",
        table,
      }),
    );

    navigate("/");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        <Slideshow />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[3px]" />

      {/* Center Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-5">
        <div
          className="w-full max-w-md rounded-[32px] p-7 md:p-9 border"
          style={{
            background: "rgba(255,255,255,0.12)",
            borderColor: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-6">
            <div
              className="text-[38px] md:text-[42px] font-bold leading-none"
              style={{
                fontFamily: "var(--ff)",
                color: "#fff",
              }}
            >
              Burmese Bistro
            </div>

            <div
              className="text-[11px] tracking-[4px] uppercase mt-1"
              style={{
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Authentic Myanmar Cuisine
            </div>
          </div>

          {/* Greeting */}
          <div className="text-center">
            <div className="text-6xl mb-4">☀️</div>

            <div
              className="text-[40px] md:text-[48px] leading-tight font-bold"
              style={{
                fontFamily: "var(--ff)",
                color: "#fff",
              }}
            >
              {greeting}
            </div>

            <div
              className="text-sm leading-relaxed mt-3 mb-6"
              style={{
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {subtitle}
            </div>

            <div className="w-14 h-[3px] bg-[var(--br)] rounded-full mx-auto mb-7" />
          </div>

          {/* Name */}
          <div className="text-sm font-semibold mb-2" style={{ color: "#fff" }}>
            What's your name?
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah"
            className="w-full h-12 rounded-2xl px-4 outline-none border mb-5"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.12)",
              color: "#fff",
            }}
          />

          {/* Table Selection */}
          <div className="text-sm font-semibold mb-3" style={{ color: "#fff" }}>
            Choose Your Table
          </div>

          <div className="grid grid-cols-5 gap-2 mb-6">
            {TABLES.map((t) => (
              <button
                key={t}
                onClick={() => setTable(t)}
                className="h-10 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background:
                    table === t ? "var(--br)" : "rgba(255,255,255,0.08)",

                  color: "#fff",

                  border:
                    table === t
                      ? "1px solid var(--br)"
                      : "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Enter */}
          <button
            onClick={handleEnter}
            className="w-full h-12 rounded-2xl text-white font-semibold transition-all hover:scale-[1.02]"
            style={{
              background: "var(--br)",
            }}
          >
            Enter Restaurant →
          </button>

          {/* Guest */}
          <button
            onClick={handleEnter}
            className="w-full mt-4 text-sm"
            style={{
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Continue as Guest
          </button>

          {/* Current Table */}
          <div className="flex justify-center mt-5">
            <div
              className="px-4 py-2 rounded-full text-sm"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              🍷 Table {table}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
