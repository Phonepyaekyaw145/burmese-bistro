import SupportChat from "../components/support/SupportChat";

export default function SupportPage() {
  return (
    // min-h makes the chat fill the viewport, so footer is pushed below on tall screens
    // but on short screens / mobile you can scroll down to reach the footer
    <div
      className="flex flex-col"
      style={{ background: "var(--bg)", minHeight: "calc(100svh - 56px)" }}
    >
      <SupportChat />
    </div>
  );
}
