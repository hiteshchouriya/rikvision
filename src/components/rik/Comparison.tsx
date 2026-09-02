import { IconCheck, IconMinus, IconX } from "@tabler/icons-react";

type Cell = "yes" | "partial" | "no";

const rows: { label: string; rik: Cell; community: Cell; dashcam: Cell; tracker: Cell }[] = [
  { label: "Direct vehicle-to-vehicle alerts (no internet)", rik: "yes", community: "no", dashcam: "no", tracker: "no" },
  { label: "Works in cellular dead zones", rik: "yes", community: "no", dashcam: "partial", tracker: "no" },
  { label: "Sees hazards beyond line of sight (1.5 km mesh)", rik: "yes", community: "partial", dashcam: "no", tracker: "no" },
  { label: "Warns about hidden braking & blind intersections", rik: "yes", community: "no", dashcam: "partial", tracker: "no" },
  { label: "India-first road AI (cattle, tractors, unmarked roads)", rik: "yes", community: "no", dashcam: "partial", tracker: "no" },
  { label: "Driver fatigue & micro-sleep detection", rik: "yes", community: "no", dashcam: "partial", tracker: "no" },
  { label: "Broadcasts even when the car is dead (supercapacitor)", rik: "yes", community: "no", dashcam: "no", tracker: "no" },
  { label: "Automatic crash detection + emergency calling", rik: "yes", community: "no", dashcam: "partial", tracker: "no" },
  { label: "Fully offline, on-device processing (privacy by design)", rik: "yes", community: "no", dashcam: "partial", tracker: "no" },
  { label: "No subscription required for core safety", rik: "yes", community: "partial", dashcam: "partial", tracker: "no" },
];

const columns: { key: "rik" | "community" | "dashcam" | "tracker"; name: string; sub: string; highlight?: boolean }[] = [
  { key: "rik", name: "RIK", sub: "Connected safety platform", highlight: true },
  { key: "community", name: "Community alert apps", sub: "e.g. ooono-style co-drivers" },
  { key: "dashcam", name: "AI dashcams / ADAS kits", sub: "Camera-only add-ons" },
  { key: "tracker", name: "GPS fleet trackers", sub: "Location telematics" },
];

function Mark({ v }: { v: Cell }) {
  if (v === "yes")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "rgba(0,212,255,0.12)", color: "var(--color-primary)" }}>
        <IconCheck size={14} stroke={2.5} />
      </span>
    );
  if (v === "partial")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "rgba(255,107,43,0.1)", color: "var(--color-warning)" }}>
        <IconMinus size={14} stroke={2.5} />
      </span>
    );
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/4 text-muted-foreground">
      <IconX size={14} stroke={2.5} />
    </span>
  );
}

const advantages = [
  {
    t: "Not an app. A network.",
    d: "Community apps depend on phone connectivity and crowd reports. RIK vehicles talk directly to each other over C-V2X — sub-second alerts, no towers, no crowd needed.",
  },
  {
    t: "Not a camera. A guardian.",
    d: "Dashcams and ADAS kits only see what the lens sees. RIK sees around corners, through fog and beyond the vehicle ahead — because other vehicles tell it what's coming.",
  },
  {
    t: "Not a tracker. A shield.",
    d: "Fleet trackers tell owners where a vehicle was. RIK protects the driver while it's moving — collision warnings, fatigue detection and crash eCall built in.",
  },
  {
    t: "Built for Indian roads.",
    d: "Stray cattle, unmarked speed breakers, dark state highways, patchy networks. RIK's models and offline-first design are trained and engineered for exactly this.",
  },
];

export function Comparison() {
  return (
    <section id="compare" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:py-36">
      <p className="section-label">WHY RIK</p>
      <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight md:text-5xl">
        A category of <span className="text-gradient">its own</span>.
      </h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Other devices track, record or rely on the cloud. RIK is the only aftermarket platform that lets vehicles protect each other — directly, instantly and offline.
      </p>

      {/* Comparison table */}
      <div className="glass mt-14 overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr>
              <th className="p-5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Capability</th>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="p-5 text-center"
                  style={c.highlight ? { background: "rgba(0,212,255,0.06)", boxShadow: "inset 0 2px 0 var(--color-primary)" } : undefined}
                >
                  <span className={`block font-display text-sm font-bold uppercase tracking-wide ${c.highlight ? "text-primary" : "text-foreground"}`}>
                    {c.name}
                  </span>
                  <span className="mt-1 block text-[11px] font-normal normal-case text-muted-foreground">{c.sub}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-white/6 transition-colors hover:bg-white/2">
                <td className="p-5 text-sm text-foreground/90">{r.label}</td>
                {columns.map((c) => (
                  <td key={c.key} className="p-5 text-center" style={c.highlight ? { background: "rgba(0,212,255,0.06)" } : undefined}>
                    <Mark v={r[c.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        <span className="text-primary">●</span> Full capability &nbsp;·&nbsp; <span style={{ color: "var(--color-warning)" }}>●</span> Partial / variant-dependent &nbsp;·&nbsp; Based on publicly available product information for comparable aftermarket categories.
      </p>

      {/* Advantage cards */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {advantages.map((a) => (
          <div key={a.t} className="glass glass-hover rounded-2xl p-7">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-primary">{a.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
