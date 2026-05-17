import { Smartphone, Truck, Users, ChefHat, Bot, Gift } from "lucide-react";
import { SERVICES } from "../data/siteData";
import { Link } from "react-router";

const ICONS = { Smartphone, Truck, Users, ChefHat, Bot, Gift };

const ROUTES = {
  "QR Table Ordering": "/services/qr-table-ordering",
  "Home Delivery": "/services/home-delivery",
  "Private Dining": "/services/private-dining",
  "Catering Service": "/services/catering-service",
  "AI Food Assistant": "/support",
  "Loyalty Rewards": "/services/loyalty-rewards",
};

export default function ServicePage() {
  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full px-7 md:px-9 pt-7 pb-4">
        {/* Title */}
        <div
          className="font-bold text-[28px] mb-1.5"
          style={{ fontFamily: "var(--ff)", color: "var(--tx)" }}
        >
          Our Services
        </div>

        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Everything we do to make your experience exceptional — from table to
          door.
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((svc) => {
            const Icon = ICONS[svc.icon];

            return (
              <Link key={svc.name} to={ROUTES[svc.name]} className="block">
                <div
                  className="rounded-xl p-4 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--br)]/40 cursor-pointer"
                  style={{
                    background: "var(--cd)",
                    borderColor: "var(--bo)",
                  }}
                >
                  {/* Icon */}
                  {Icon && (
                    <Icon
                      size={24}
                      className="mb-2"
                      style={{ color: "var(--br)" }}
                    />
                  )}

                  {/* Service Name */}
                  <div
                    className="text-[13px] font-semibold mb-1"
                    style={{ color: "var(--tx)" }}
                  >
                    {svc.name}
                  </div>

                  {/* Description */}
                  <div
                    className="text-[11px] leading-relaxed"
                    style={{ color: "var(--mt)" }}
                  >
                    {svc.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
