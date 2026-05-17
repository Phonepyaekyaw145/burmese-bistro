import Slideshow from "../components/home/Slideshow";

export default function HomePage() {
  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Hero slideshow — tall on desktop, shorter on mobile */}
      <div className="relative w-full h-[calc(100svh-56px)] min-h-[480px] max-h-[820px]">
        <Slideshow />
      </div>
    </div>
  );
}
