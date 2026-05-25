import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let trigger: ScrollTrigger | undefined;

    const setupScrub = () => {
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          const t = self.progress * duration;
          if (!isNaN(t)) video.currentTime = t;
        },
      });

      gsap.fromTo(
        headlineRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "60% top",
            scrub: 1,
          },
        }
      );
    };

    if (video.readyState >= 1) setupScrub();
    else video.addEventListener("loadedmetadata", setupScrub, { once: true });

    return () => {
      trigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/rik_hero.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* gradient + grid overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="absolute inset-0 perspective-grid opacity-30" />
        <div className="scan-line" />

        {/* top badges */}
        <div className="absolute top-6 left-6 flex items-center gap-2.5 z-10">
          <span className="h-2.5 w-2.5 rounded-full bg-primary cyan-glow" />
          <span className="font-display text-xl font-bold tracking-widest">RIK</span>
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
          <span className="glass px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-primary">
            R&D · Early Access
          </span>
        </div>

        {/* headline */}
        <div
          ref={headlineRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10"
        >
          <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight text-glow"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}>
            The Road Has Never
            <br />
            Had A <span className="text-primary">Guardian</span>.
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground">
            Offline vehicle-to-vehicle protection. Built for Indian roads. Works
            when nothing else does.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#early-access"
              className="group relative overflow-hidden rounded-md bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-all hover:cyan-glow"
            >
              Register Interest
            </a>
            <a
              href="#technology"
              className="rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition-all hover:border-primary hover:text-primary"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll to explore
          </span>
          <span className="scroll-indicator text-primary text-lg">↓</span>
        </div>
      </div>
    </section>
  );
}
