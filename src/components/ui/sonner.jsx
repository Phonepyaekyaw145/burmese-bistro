import { Toaster } from "sonner";
import { useCart } from "../../context/CartContext";

export default function Sonner() {
  const { dark } = useCart();

  return (
    <Toaster
      theme={dark ? "dark" : "light"}
      position="bottom-center"
      toastOptions={{
        style: {
          fontFamily: "var(--fb)",
          fontSize: "12px",
          borderRadius: "999px",
          padding: "8px 18px",
          border: "1px solid var(--bo)",
          background: "var(--cd)",
          color: "var(--tx)",
        },
        // Override success icon colour to match brand red
        classNames: {
          icon: "text-[var(--br)]",
        },
      }}
    />
  );
}
