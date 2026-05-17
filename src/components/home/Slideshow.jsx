import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import { SLIDES, STATS } from "../../data/siteData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CHIPS = [
  { label: "🍜 Foods", to: "/menu/foods" },
  { label: "🥤 Drinks", to: "/menu/drinks" },
  { label: "🍡 Desserts", to: "/menu/desserts" },
  { label: "🤖 AI Support", to: "/support" },
];

export default function Slideshow() {
  const navigate = useNavigate();

  const plugin = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));

  const [api, setApi] = useState(null);

  return (
    <div className="relative w-full h-full group">
      {/* Carousel */}
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full ml-0">
          {SLIDES.map((slide, i) => (
            <CarouselItem key={i} className="relative h-full pl-0">
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.12) 100%)",
                }}
              />

              {/* Text */}
              <div className="absolute bottom-[148px] sm:bottom-[168px] left-5 sm:left-11 text-white max-w-[90%] sm:max-w-[360px] z-10">
                <span className="inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-2 bg-[rgba(192,57,43,0.88)]">
                  {slide.tag}
                </span>

                <div
                  className="font-bold leading-tight mb-1.5"
                  style={{
                    fontFamily: "var(--ff)",
                    fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
                  }}
                >
                  {slide.title}
                </div>

                <div className="text-[11px] sm:text-xs opacity-90">
                  {slide.subtitle}
                </div>
              </div>

              {/* Bottom stats + chips */}
              <div
                className="absolute bottom-0 left-0 right-0 z-10 px-5 pt-6 pb-4"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                }}
              >
                {/* Stats */}
                <div className="flex gap-3 sm:gap-4 justify-start sm:justify-end mb-3 overflow-x-auto pb-0.5">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="text-center text-white shrink-0"
                    >
                      <div
                        className="font-bold text-lg sm:text-[22px]"
                        style={{ fontFamily: "var(--ff)" }}
                      >
                        {s.value}
                      </div>
                      <div className="text-[8px] sm:text-[9px] uppercase tracking-wide opacity-80">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chips */}
                <div className="flex gap-2 overflow-x-auto pb-0.5 sm:flex-wrap sm:justify-end">
                  {CHIPS.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => navigate(c.to)}
                      className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium text-white border whitespace-nowrap"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        borderColor: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* LEFT ARROW (Modern Premium Style) */}
      <button
        onClick={() => api?.scrollPrev()}
        className="
          absolute left-5 top-1/2 -translate-y-1/2 z-20

          w-12 h-14 flex items-center justify-center

          text-white
          opacity-0 group-hover:opacity-100

          transition-all duration-300

          bg-gradient-to-r from-black/50 to-transparent

          hover:from-black/70 hover:scale-105
          active:scale-95
        "
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT ARROW (Modern Premium Style) */}
      <button
        onClick={() => api?.scrollNext()}
        className="
          absolute right-5 top-1/2 -translate-y-1/2 z-20

          w-12 h-14 flex items-center justify-center

          text-white
          opacity-0 group-hover:opacity-100

          transition-all duration-300

          bg-gradient-to-l from-black/50 to-transparent

          hover:from-black/70 hover:scale-105
          active:scale-95
        "
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
