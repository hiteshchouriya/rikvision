const shields = [
  { n: "01", title: "V2V Hazard Mesh", desc: "Broadcasts hazard alerts up to 1.5km. Zero internet required.", tag: "C-V2X · Offline" },
  { n: "02", title: "India-First Road AI", desc: "Trained on stray cattle, tractors, unmarked rural roads.", tag: "Edge NPU · Local" },
  { n: "03", title: "Fatigue Coach", desc: "Detects micro-sleep before it happens. Voice + LED alert.", tag: "NIR Camera · AI" },
  { n: "04", title: "Dead Vehicle Beacon", desc: "Supercapacitor keeps broadcasting even if your car dies.", tag: "Supercap · V2X" },
  { n: "05", title: "Auto Crash eCall", desc: "IMU detects crash, calls contacts, speaks your NavIC coordinates.", tag: "IMU · NavIC" },
  { n: "06", title: "Smart Cabin Hub", desc: "Offline voice control. Auto-mutes audio on hazard alerts.", tag: "Voice UI · BT/AUX" },
];

export function Shields() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="label-tag mb-4">Six Shields</div>
        <h2 className="font-display font-bold uppercase tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Always watching. <span className="text-primary">Always offline.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shields.map((s) => (
            <div key={s.n} className="glass glass-hover relative p-7 overflow-hidden min-h-[240px]">
              <span
                className="absolute -top-4 -right-2 font-display font-black select-none pointer-events-none"
                style={{ fontSize: "9rem", color: "rgba(255,255,255,0.03)", lineHeight: 1 }}
              >
                {s.n}
              </span>
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">{s.n}</div>
                <h3 className="font-display text-xl font-bold uppercase tracking-wide leading-tight">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-6 inline-block text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-t border-white/10 pt-3">
                  {s.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
