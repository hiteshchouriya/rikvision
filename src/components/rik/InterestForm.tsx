import { useState } from "react";
import { z } from "zod";

// TODO: Replace with the Google Apps Script webhook URL provided by the client.
const WEBHOOK_URL = "";

const schema = z.object({
  fullName: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().min(6, "Invalid").max(20),
  city: z.string().trim().min(1, "Required").max(80),
  vehicleType: z.string().min(1, "Select one"),
  favoriteFeature: z.string().min(1, "Select one"),
  driverType: z.string().min(1, "Select one"),
});

const vehicleTypes = ["Personal Car/SUV", "Motorcycle", "Commercial Truck", "Fleet Owner", "Other"];
const features = [
  "V2V Hazard Mesh",
  "India-First Road AI",
  "Fatigue Coach",
  "Dead Vehicle Beacon",
  "Auto Crash eCall",
  "Smart Cabin Hub",
];
const driverTypes = ["Personal", "Small Fleet 2–10", "Large Fleet 10+", "Logistics Business", "Just Exploring"];

const inputCls =
  "w-full bg-white/[0.03] border border-white/10 rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-primary/40 focus:bg-primary/[0.04]";

export function InterestForm() {
  const [data, setData] = useState({
    fullName: "", email: "", phone: "", city: "",
    vehicleType: "", favoriteFeature: "", driverType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const setField = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const payload = { ...parsed.data, timestamp: new Date().toISOString() };
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        console.log("[RIK] No webhook URL configured. Payload:", payload);
        await new Promise((r) => setTimeout(r, 600));
      }
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="early-access" className="relative py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <div className="label-tag mb-4">Early Access</div>
          <h2 className="font-display font-bold uppercase tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Get Notified <span className="text-primary">First.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            RIK is in active R&D. Register now to shape what we build and be first in line.
          </p>
        </div>

        <div className="glass p-8 md:p-10">
          {done ? (
            <div className="text-center py-12">
              <div className="font-display font-black text-primary text-glow uppercase"
                   style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}>
                You're In.
              </div>
              <p className="mt-4 text-muted-foreground">
                We'll be in touch as RIK gets closer to launch. Drive safe until then.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { k: "fullName", label: "Full Name", type: "text" },
                { k: "email", label: "Email Address", type: "email" },
                { k: "phone", label: "Phone Number", type: "tel" },
                { k: "city", label: "City", type: "text" },
              ].map((f) => (
                <label key={f.k} className="block">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{f.label}</span>
                  <input
                    type={f.type}
                    className={`${inputCls} mt-2`}
                    value={(data as any)[f.k]}
                    onChange={(e) => setField(f.k, e.target.value)}
                  />
                  {errors[f.k] && <span className="text-warning text-xs mt-1 block">{errors[f.k]}</span>}
                </label>
              ))}

              {[
                { k: "vehicleType", label: "Vehicle Type", opts: vehicleTypes },
                { k: "favoriteFeature", label: "Which feature excites you most?", opts: features },
                { k: "driverType", label: "Fleet owner or personal driver?", opts: driverTypes },
              ].map((f, idx) => (
                <label key={f.k} className={`block ${idx === 2 ? "md:col-span-2" : ""}`}>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{f.label}</span>
                  <select
                    className={`${inputCls} mt-2 appearance-none`}
                    value={(data as any)[f.k]}
                    onChange={(e) => setField(f.k, e.target.value)}
                  >
                    <option value="" className="bg-background">Select...</option>
                    {f.opts.map((o) => (
                      <option key={o} value={o} className="bg-background">{o}</option>
                    ))}
                  </select>
                  {errors[f.k] && <span className="text-warning text-xs mt-1 block">{errors[f.k]}</span>}
                </label>
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="md:col-span-2 w-full rounded-md bg-primary py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:cyan-glow disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Register My Interest →"}
              </button>

              <p className="md:col-span-2 text-center text-xs text-muted-foreground/70">
                We'll never spam. This helps us understand who needs RIK most.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
