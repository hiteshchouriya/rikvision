import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const layers = [
  { at: 0.15, side: "left", title: "Road Camera", role: "Forward vision · 60fps · low-light HDR" },
  { at: 0.32, side: "right", title: "Cabin NIR Camera", role: "Driver fatigue detection in any light" },
  { at: 0.5, side: "left", title: "Edge NPU", role: "On-device AI · zero cloud latency" },
  { at: 0.68, side: "right", title: "C-V2X Radio", role: "1.5km mesh broadcast · no internet" },
  { at: 0.82, side: "left", title: "NavIC + 4G Modem", role: "Indian satellite positioning + LTE" },
  { at: 0.94, side: "right", title: "OBD-II Harness", role: "Plug-in install · vehicle telemetry" },
];

const specs = ["C-V2X PC5", "Edge NPU 8 TOPS", "NavIC + GPS", "NIR Vision", "Supercap Backup", "IMU 9-axis", "BT 5.3", "OBD-II"];

export function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeLayer, setActiveLayer] = useState<number>(-1);

  useEffect(() => {
    const v = videoRef.current;
    const s = sectionRef.current;
    if (!v || !s) return;

    let trigger: ScrollTrigger | undefined;

    const setup = () => {
      const duration = v.duration;
      if (!duration || !isFinite(duration)) return;

      trigger = ScrollTrigger.create({
        trigger: s,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          const t = p * duration;
          if (!isNaN(t)) v.currentTime = t;

          // determine active layer
          let active = -1;
          for (let i = 0; i < layers.length; i++) {
            if (p >= layers[i].at - 0.06 && p <= layers[i].at + 0.08) {
              active = i;
              break;
            }
          }
          setActiveLayer(active);
        },
      });
    };

    if (v.readyState >= 1) setup();
    else v.addEventListener("loadedmetadata", setup, { once: true });

    return () => { trigger?.kill(); };
  }, []);

  return (
    <section id="technology" ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <div className="perspective-grid absolute inset-0 opacity-30" />

        <div className="relative z-10 px-6 pt-20 mx-auto max-w-6xl w-full">
          <div className="label-tag mb-3">The Technology</div>
          <h2 className="font-display font-bold uppercase tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            One device. <span className="text-primary">Six shields.</span>
          </h2>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <video
            ref={videoRef}
            src="/videos/rik_explode.mp4"
            muted
            playsInline
            preload="metadata"
            className="w-[85vw] max-w-5xl h-auto"
          />

          {/* floating labels */}
          {layers.map((l, i) => (
            <div
              key={i}
              className={`absolute glass px-5 py-3 max-w-[240px] transition-all duration-500 ${
                activeLayer === i ? "opacity-100 translate-x-0" : "opacity-0 pointer-events-none"
              } ${l.side === "left"
                  ? "left-4 md:left-12 " + (activeLayer === i ? "" : "-translate-x-4")
                  : "right-4 md:right-12 " + (activeLayer === i ? "" : "translate-x-4")
              }`}
              style={{
                top: `${30 + i * 8}%`,
                borderLeft: l.side === "left" ? "2px solid var(--color-primary)" : undefined,
                borderRight: l.side === "right" ? "2px solid var(--color-primary)" : undefined,
                boxShadow: activeLayer === i ? "0 0 30px rgba(0,212,255,0.2)" : undefined,
              }}
            >
              <div className="font-display text-sm font-bold uppercase tracking-wider text-primary">
                {l.title}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{l.role}</div>
            </div>
          ))}
        </div>

        <div className="relative z-10 px-6 pb-10 mx-auto max-w-6xl w-full">
          <div className="flex flex-wrap gap-2 justify-center">
            {specs.map((s) => (
              <span key={s} className="glass px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
