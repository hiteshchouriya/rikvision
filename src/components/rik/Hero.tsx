import { useEffect, useRef } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!video || !section || !pin) return;

    let cancelled = false;
    let cleanup = () => {};

    const initScrollVideo = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      let isReady = false;
      let trigger: ReturnType<typeof ScrollTrigger.create> | undefined;
      let headlineTween: ReturnType<typeof gsap.fromTo> | undefined;

      const setVideoTime = (time: number) => {
        try {
          video.currentTime = time;
        } catch {
          // Some browsers reject seeks until the first frame is decoded.
        }
      };

      const setupScrub = () => {
        const duration = video.duration;
        if (isReady || !duration || !isFinite(duration)) return;
        isReady = true;

        video.pause();
        setVideoTime(0.001);

        trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          pin,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * duration;
            if (!isNaN(t)) setVideoTime(Math.min(duration, Math.max(0, t)));
          },
        });

        if (headlineRef.current) {
          headlineTween = gsap.fromTo(
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
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
      const onMetadata = () => setupScrub();

      if (video.readyState >= 1) {
        setupScrub();
      } else {
        video.load();
        video.addEventListener("loadedmetadata", onMetadata, { once: true });
      }

      video.addEventListener("loadeddata", refresh);
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      cleanup = () => {
        video.removeEventListener("loadedmetadata", onMetadata);
        video.removeEventListener("loadeddata", refresh);
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        headlineTween?.kill();
        trigger?.kill();
      };
    };

    initScrollVideo();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[240vh]">
      <div ref={pinRef} className="h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/rik_hero.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="watermark-mask watermark-mask--hero" />
        {/* gradient + grid overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="absolute inset-0 perspective-grid opacity-30" />
        <div className="scan-line" />

        {/* top badges */}
        <div className="absolute top-6 left-6 flex items-baseline gap-2.5 z-10">
          <span className="h-2.5 w-2.5 rounded-full bg-primary cyan-glow" />
          <span className="font-display text-xl font-bold tracking-widest">RIK</span>
          <span className="hidden sm:inline text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70">
            by V2X Vision
          </span>
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
