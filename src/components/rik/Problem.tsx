import { IconAlertTriangle, IconMoonStars, IconCar, IconBolt } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

const problems = [
  { icon: IconAlertTriangle, title: "Blind curve pile-ups", desc: "Mountain bends and overtakes you can't see around." },
  { icon: IconMoonStars, title: "Highway fatigue & micro-sleep", desc: "Long-haul drivers lose seconds — and lives." },
  { icon: IconCar, title: "Unmapped hazards", desc: "Cattle, tractors, potholes — no map will warn you." },
  { icon: IconBolt, title: "Dark breakdowns", desc: "Stranded vehicles on unlit state highways at night." },
];

const stats = [
  { value: 1.5, suffix: "km", label: "Hazard radius" },
  { value: 20, prefix: "<", suffix: "ms", label: "Response time" },
  { value: 100, suffix: "%", label: "Offline" },
];

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  const display = to % 1 === 0 ? Math.round(n) : n.toFixed(1);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

export function Problem() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="label-tag mb-4">The Problem</div>
        <h2 className="font-display font-bold uppercase tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Roads shouldn't be a <span className="text-primary">gamble.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <div
              key={i}
              className="glass glass-hover p-7 group"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p.icon className="h-7 w-7 text-primary mb-5" stroke={1.5} />
              <h3 className="font-display text-xl font-bold uppercase tracking-wide">{p.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass mt-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-8 text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-primary text-glow">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
