export default function OurStoryPage() {
  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto px-7 md:px-9 py-7"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-[850px]">
        <div
          className="text-[32px] font-bold mb-4"
          style={{
            fontFamily: "var(--ff)",
            color: "var(--tx)",
          }}
        >
          Our Story
        </div>

        <div
          className="text-[14px] leading-relaxed space-y-5"
          style={{ color: "var(--mt)" }}
        >
          <p>
            Burmese Bistro began as a humble family street stall in Yangon,
            founded by Grandmother Aye in {new Date().getFullYear() - 32}.
          </p>

          <p>
            What started with a single pot of traditional Mohinga quickly became
            a gathering place for neighbors, travelers, and food lovers seeking
            authentic Myanmar flavors.
          </p>

          <p>
            Today, three generations later, we continue serving recipes passed
            down through our family — preserving tradition while creating warm
            dining experiences for everyone.
          </p>

          <p>
            Every dish is prepared with care, heritage, and the belief that food
            should bring people together.
          </p>
        </div>
      </div>
    </div>
  );
}
