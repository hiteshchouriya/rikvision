import { useEffect, useState } from "react";

export function Nav() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="glass mx-4 mt-4 flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary cyan-glow" />
          <span className="font-display text-lg font-bold tracking-widest">RIK</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6">
          <a href="#technology" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">Technology</a>
          <a href="#platform" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">Platform</a>
        </nav>
        <a
          href="#early-access"
          className="text-xs uppercase tracking-[0.2em] text-primary hover:text-glow transition-all"
        >
          Early Access →
        </a>
      </div>
    </header>
  );
}
