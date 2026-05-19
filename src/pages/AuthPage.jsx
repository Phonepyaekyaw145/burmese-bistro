import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";

export default function AuthPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const tableFromQR = params.get("table");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    if (!validateEmail(form.email)) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);

    const guestData = {
      ...form,
      table: tableFromQR || "C07",
    };

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
        throw new Error("Backend save failed");
      }

      sessionStorage.setItem("guest", JSON.stringify(guestData));

      navigate("/booking");
    } catch (err) {
      console.error("Auth error:", err);

      sessionStorage.setItem("guest", JSON.stringify(guestData));

      navigate("/booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/20 blur-3xl rounded-full opacity-40" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 blur-3xl rounded-full opacity-40" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-3xl border backdrop-blur-xl shadow-2xl overflow-hidden"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Top Gradient */}
        <div className="h-2 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600" />

        <div className="p-8">
          {/* Heading */}
          <div className="text-center mb-7">
            <p className="text-gold uppercase tracking-[0.25em] text-[11px] font-medium mb-2">
              Burmese Bistro
            </p>

            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--text)" }}
            >
              Welcome Back
            </h1>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Enter your details to continue your dining experience.
            </p>
          </div>

          {/* Table Badge */}
          <div className="flex justify-center mb-6">
            <div className="px-4 py-2 rounded-full bg-gold/10 border border-gold/30">
              <span className="text-sm font-medium text-gold">
                Table {tableFromQR || "C07"}
              </span>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label
                className="text-sm mb-2 block"
                style={{ color: "var(--muted)" }}
              >
                Full Name
              </label>

              <input
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-500"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
            </div>

            <div>
              <label
                className="text-sm mb-2 block"
                style={{ color: "var(--muted)" }}
              >
                Email Address
              </label>

              <input
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-500"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
            </div>

            <div>
              <label
                className="text-sm mb-2 block"
                style={{ color: "var(--muted)" }}
              >
                Phone Number
              </label>

              <input
                name="phone"
                placeholder="Enter your phone"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-500"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-7 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:scale-[1.02] active:scale-[0.99] text-white font-semibold shadow-lg transition-all duration-300"
          >
            {loading ? "Saving..." : "Continue"}
          </button>

          {/* Footer */}
          <p
            className="text-center text-xs mt-5"
            style={{ color: "var(--muted)" }}
          >
            Your information is securely stored for booking and ordering.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
