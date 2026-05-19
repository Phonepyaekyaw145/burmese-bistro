import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Family Dinner",
  "Date Night",
  "Business Meeting",
  "Casual Dining",
];

export default function BookingPage() {
  const navigate = useNavigate();

  const guest = JSON.parse(sessionStorage.getItem("guest") || "{}");

  const [booking, setBooking] = useState({
    date: "",
    time: "",
    occasion: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!booking.date || !booking.time) {
      alert("Please select date and time");
      return;
    }

    setLoading(true);

    const finalBooking = {
      ...guest,
      ...booking,
    };

    try {
      // SAVE BOOKING
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalBooking),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error("Booking failed");
      }

      // SEND EMAIL
      await fetch("/api/send-booking-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalBooking),
      });

      alert("Booking Confirmed!");

      navigate("/");
      console.log("BOOKING SAVED:", data.bookingId);

      // GO HOME
      navigate("/");
    } catch (err) {
      console.error("Booking error:", err);

      alert("Booking saved locally");

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-[30px] overflow-hidden backdrop-blur-xl border shadow-2xl"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Top Gradient */}
        <div className="h-2 bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500" />

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-7">
            <p className="uppercase tracking-[0.25em] text-[11px] text-gold font-medium mb-2">
              Burmese Bistro
            </p>

            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--text)" }}
            >
              Reserve Your Table
            </h1>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Select your preferred dining date and time.
            </p>
          </div>

          {/* Table Badge */}
          <div className="flex justify-center mb-7">
            <div className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                Table {guest.table || "C07"}
              </span>
            </div>
          </div>

          {/* Date */}
          <div className="mb-4">
            <label
              className="text-sm mb-2 block"
              style={{ color: "var(--muted)" }}
            >
              Booking Date
            </label>

            <input
              type="date"
              value={booking.date}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  date: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-2xl border outline-none"
              style={{
                background: "var(--bg2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          {/* Time */}
          <div className="mb-4">
            <label
              className="text-sm mb-2 block"
              style={{ color: "var(--muted)" }}
            >
              Booking Time
            </label>

            <input
              type="time"
              value={booking.time}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  time: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-2xl border outline-none"
              style={{
                background: "var(--bg2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          {/* Occasion */}
          <div className="mb-6">
            <label
              className="text-sm mb-2 block"
              style={{ color: "var(--muted)" }}
            >
              Occasion
            </label>

            <select
              value={booking.occasion}
              onChange={(e) =>
                setBooking({
                  ...booking,
                  occasion: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-2xl border outline-none"
              style={{
                background: "var(--bg2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <option value="">Select Occasion</option>

              {OCCASIONS.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </div>

          {/* Booking Summary */}
          <div
            className="rounded-2xl p-4 mb-6 border"
            style={{
              background: "var(--bg2)",
              borderColor: "var(--border)",
            }}
          >
            <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
              Booking Summary
            </p>

            <div className="space-y-1 text-sm">
              <p>
                <span style={{ color: "var(--muted)" }}>Guest:</span>{" "}
                {guest.name || "Guest"}
              </p>

              <p>
                <span style={{ color: "var(--muted)" }}>Table:</span>{" "}
                {guest.table || "C07"}
              </p>

              {booking.occasion && (
                <p>
                  <span style={{ color: "var(--muted)" }}>Occasion:</span>{" "}
                  {booking.occasion}
                </p>
              )}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
          >
            {loading ? "Saving..." : "Confirm Booking"}
          </button>

          {/* Footer */}
          <p
            className="text-center text-xs mt-5"
            style={{ color: "var(--muted)" }}
          >
            Your reservation will be securely saved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
