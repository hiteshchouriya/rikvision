import { useState } from "react";

const pillars = [
  {
    k: "Connect",
    d: "C-V2X PC5 enables direct communication between nearby vehicles and roadside infrastructure — no internet required.",
  },
  {
    k: "Understand",
    d: "GNSS, CAN, IMU and intelligent algorithms transform raw vehicle and road data into meaningful risk information.",
  },
  {
    k: "Protect",
    d: "Real-time visual and audio warnings help drivers respond to hazards before they become critical.",
  },
];

type Phase = "core" | "advanced" | "ecosystem";

const phases: Record<
  Phase,
  { label: string; status: string; note: string; dot: string; features: { t: string; d: string }[] }
> = {
  core: {
    label: "Core",
    status: "Launch",
    dot: "var(--color-primary)",
    note: "Targeted for the first commercial release.",
    features: [
      { t: "Direct V2V Communication", d: "C-V2X PC5 broadcast of position, speed, heading, acceleration, braking status, vehicle type and safety events." },
      { t: "Multi-Vehicle Broadcast", d: "One vehicle warns many. No pairing required — every compatible unit in range receives the event." },
      { t: "360° Cooperative Awareness", d: "A live awareness layer built from messages received from surrounding connected vehicles." },
      { t: "Forward Collision Warning", d: "Relative position, speed, heading and trajectory fused into a time-to-collision estimate with threshold alerts." },
      { t: "Emergency Electronic Brake Light", d: "Hard-braking events propagate instantly — even when the braking vehicle is hidden from view." },
      { t: "Blind Intersection Warning", d: "Crossing-path detection between vehicles that cannot see each other around buildings and blind corners." },
      { t: "Emergency Vehicle Alert", d: "Authenticated ambulance, fire and police broadcasts with direction, distance and warning priority." },
      { t: "Road Hazard Warning", d: "Potholes, debris, stalled vehicles, flooding and obstructions shared with nearby vehicles." },
      { t: "GNSS Positioning", d: "Continuous positioning underpinning V2X messages, hazard location and trip context." },
      { t: "CAN / Vehicle Data Integration", d: "Speed, RPM, engine and braking parameters where the vehicle's CAN implementation supports it." },
      { t: "IMU Motion Intelligence", d: "Acceleration, braking, cornering and impact detection fused with GNSS for robust motion data." },
      { t: "Local Edge Processing", d: "Safety-critical computation runs on-device and keeps working in cellular dead zones." },
      { t: "Intelligent Risk Engine", d: "V2X + GNSS + CAN + IMU combined into a live risk level: Safe, Caution, High Risk, Critical." },
      { t: "Driver HMI & Voice Alerts", d: "Screen, tone, spoken warning and LED indicator — understandable in under a second." },
      { t: "Event Data Recording", d: "Local timeline of braking, warnings, risk escalation and vehicle state for later analysis." },
    ],
  },
  advanced: {
    label: "Advanced",
    status: "Product Roadmap",
    dot: "var(--color-warning)",
    note: "Planned capability, subject to validation and partnerships.",
    features: [
      { t: "Fleet Management Platform", d: "Live vehicle locations, status, trips, diagnostics and safety alerts in one cloud console." },
      { t: "Live Fleet Dashboard", d: "Fleet-wide view of online vehicles, active alerts, harsh events and reported hazards." },
      { t: "Driver Behaviour & Safety Score", d: "Harsh braking, acceleration, cornering, overspeed and idling turned into a per-trip score." },
      { t: "Accident / Impact Detection", d: "IMU, CAN and GNSS fusion identifies probable collisions and preserves the surrounding event data." },
      { t: "Automatic Emergency Reporting", d: "Significant events pushed to fleet managers, emergency contacts and operations teams over cellular." },
      { t: "Cooperative Hazard Validation", d: "Multiple independent reports raise confidence and create verified road-risk events." },
      { t: "Road Risk Map", d: "Aggregated hazards revealing risky intersections, pothole clusters and hard-braking hotspots." },
      { t: "Vehicle-to-Infrastructure", d: "Signal state, lane closures, speed restrictions and intersection data from compatible roadside units." },
      { t: "Smart Traffic Signal Information", d: "Signal phase and countdown delivered to approaching vehicles." },
      { t: "Green Light Optimal Speed Advisory", d: "Recommended speed to meet the next green — less braking, idling and fuel burn." },
      { t: "V2X Road Works Warning", d: "Temporary lane restrictions and construction zones broadcast ahead of the driver." },
      { t: "OTA Software Updates", d: "Secure remote updates to V2X applications, risk algorithms and security components." },
      { t: "Remote Diagnostics", d: "Device health: GNSS, V2X, CAN, cellular, temperature, storage and firmware version." },
      { t: "Configurable Warning Levels", d: "Thresholds tuned per profile — personal car, commercial fleet, heavy truck or emergency vehicle." },
      { t: "Fleet APIs", d: "Integration hooks for telematics, logistics, ERP, insurance and smart-city systems." },
    ],
  },
  ecosystem: {
    label: "Ecosystem",
    status: "Future Vision",
    dot: "var(--color-accent)",
    note: "Long-term direction — not committed functionality.",
    features: [
      { t: "RSU Infrastructure Network", d: "Roadside units broadcasting signals, hazards, construction and emergency warnings at scale." },
      { t: "Emergency & Public Safety Network", d: "Ambulances, fire, police, highway patrol and maintenance fleets on one cooperative layer." },
      { t: "Public Transport Safety", d: "City, intercity and school buses with braking, intersection and passenger safety events." },
      { t: "Heavy Vehicle Safety", d: "Warnings modelled on truck mass, stopping distance and blind-spot geometry." },
      { t: "Two-Wheeler V2X", d: "A compact unit bringing motorcycles into the mesh — critical for Indian road reality." },
      { t: "Pedestrian & Cyclist V2X", d: "Vulnerable road users made visible to connected vehicles." },
      { t: "Predictive Road Risk", d: "Models that flag rising risk by location and time of day before incidents occur." },
      { t: "AI Fleet Intelligence", d: "Patterns, not just counts — recurring risk locations correlated across the whole fleet." },
      { t: "AI Safety Assistant", d: "Ask the fleet questions in plain language and get actionable safety answers." },
      { t: "Smartphone Companion App", d: "Setup, trip history, driver score, hazard reports and diagnostics — never the safety path itself." },
      { t: "Insurance & Smart-City Integration", d: "Verified driving and road-risk data shared with authorised third-party platforms." },
      { t: "Cooperative Intelligence Network", d: "Every participating vehicle improves the warnings every other vehicle receives." },
    ],
  },
};

const order: Phase[] = ["core", "advanced", "ecosystem"];

export function Platform() {
  const [phase, setPhase] = useState<Phase>("core");
  const active = phases[phase];

  return (
    <section id="platform" className="relative py-32 px-6">
      <div className="perspective-grid absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-6xl">
        <div className="label-tag mb-4">The Platform</div>
        <h2
          className="font-display font-bold uppercase tracking-tight max-w-4xl"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Vehicles that see <span className="text-primary">beyond their sensors.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
          A connected safety platform that lets vehicles, infrastructure and road networks share
          real-time intelligence — helping drivers detect risks earlier and respond faster.
        </p>

        {/* pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <div key={p.k} className="glass glass-hover p-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
                0{i + 1}
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide">
                {p.k}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>

        {/* phase switcher */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="label-tag mb-3">Capability Roadmap</div>
              <h3
                className="font-display font-bold uppercase tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
              >
                Built in phases. <span className="text-primary">Stated honestly.</span>
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {order.map((k) => {
                const p = phases[k];
                const on = k === phase;
                return (
                  <button
                    key={k}
                    onClick={() => setPhase(k)}
                    className={`glass px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-all ${
                      on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={
                      on
                        ? { borderColor: p.dot, boxShadow: `0 0 24px color-mix(in oklab, ${p.dot} 25%, transparent)` }
                        : undefined
                    }
                  >
                    <span
                      className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                      style={{ background: p.dot }}
                    />
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="glass px-3 py-1.5" style={{ color: active.dot }}>
              {active.status}
            </span>
            <span>{active.note}</span>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.features.map((f) => (
              <div key={f.t} className="glass glass-hover p-6 relative overflow-hidden">
                <span
                  className="absolute left-0 top-0 h-full w-[2px]"
                  style={{ background: active.dot, opacity: 0.6 }}
                />
                <h4 className="font-display text-base font-bold uppercase tracking-wide leading-tight">
                  {f.t}
                </h4>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* architecture */}
        <div className="mt-24 glass p-7 md:p-10">
          <div className="label-tag mb-4">System Architecture</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="rounded-md border border-white/10 p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Cloud Layer</div>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>Fleet management</li>
                <li>Road risk map</li>
                <li>Analytics &amp; AI</li>
                <li>Partner APIs</li>
              </ul>
            </div>
            <div className="rounded-md border border-white/10 p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary">In-Vehicle Unit</div>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>C-V2X PC5 radio</li>
                <li>GNSS + IMU</li>
                <li>CAN interface</li>
                <li>Edge risk engine</li>
              </ul>
            </div>
            <div className="rounded-md border border-white/10 p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Driver Layer</div>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li>Visual HMI</li>
                <li>Voice warnings</li>
                <li>LED indicator</li>
                <li>Configurable thresholds</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Vehicle → V2X → Vehicle. Safety never waits for the cloud.
          </p>
        </div>

        {/* security */}
        <div className="mt-10 glass p-7 md:p-10">
          <div className="label-tag mb-4">Privacy &amp; Security by Design</div>
          <div className="flex flex-wrap gap-2">
            {[
              "Device authentication",
              "Message authentication",
              "Certificate & key management",
              "Replay protection",
              "Secure firmware",
              "Secure OTA",
              "Access control",
              "Data minimization",
            ].map((s) => (
              <span
                key={s}
                className="glass px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            The commercial implementation is designed to follow applicable Indian V2X, telecom,
            automotive and cybersecurity requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
