import { useState, useEffect, useRef } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUpRight,
  Laptop,
  Briefcase,
  Zap,
  BarChart2,
  Layers,
  Cpu,
  Palette,
  Rocket,
  X,
} from "lucide-react";
import { SiPython } from "react-icons/si";

/* ─── types ─────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = React.ComponentType<any>;

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  gradient: { from: string; to: string };
  Icon: IconComponent;
  github: string;
  live: string;
  active: boolean;
}

type PanelKey = "tanishaa" | "sinha" | null;

/* ─── icon wrappers ─────────────────────────────────────── */

function PythonLogoIcon({ size, color }: { size?: number; color?: string }) {
  return <SiPython size={size} color={color} />;
}

/* ─── data ─────────────────────────────────────────────── */

const projects: Project[] = [
  {
    id: "python-project",
    name: "Python Project",           // TODO: replace with project name
    tagline: "Coming soon",           // TODO: replace
    description: "Description coming soon.", // TODO: replace
    stack: ["Python"],                // TODO: replace
    gradient: { from: "#4facfe", to: "#ffd32a" },
    Icon: PythonLogoIcon,
    github: "#",                      // TODO: replace
    live: "#",                        // TODO: replace
    active: true,
  },
  {
    id: "briefcase-project",
    name: "Briefcase Project",        // TODO: replace with project name
    tagline: "Coming soon",           // TODO: replace
    description: "Description coming soon.", // TODO: replace
    stack: ["TBD"],                   // TODO: replace
    gradient: { from: "#11998e", to: "#38ef7d" },
    Icon: Briefcase,
    github: "#",                      // TODO: replace
    live: "#",                        // TODO: replace
    active: true,
  },
  {
    id: "inside-the-machine",
    name: "Inside the Machine",
    tagline: "Tech & consumer behaviour",
    description:
      "A personal exploration of how technology shapes the way consumers think, decide, and live — peeling back the interface to understand what's really going on underneath.",
    stack: ["React", "Next.js", "Vercel"],
    gradient: { from: "#f953c6", to: "#b91d73" },
    Icon: Laptop,
    github: "#",   // TODO: replace
    live: "#",     // TODO: replace
    active: true,
  },
  { id: "p4", name: "Coming Soon", tagline: "", description: "", stack: [], gradient: { from: "#43e97b", to: "#38f9d7" }, Icon: Zap,      github: "#", live: "#", active: false },
  { id: "p5", name: "Coming Soon", tagline: "", description: "", stack: [], gradient: { from: "#667eea", to: "#764ba2" }, Icon: BarChart2, github: "#", live: "#", active: false },
  { id: "p6", name: "Coming Soon", tagline: "", description: "", stack: [], gradient: { from: "#f093fb", to: "#f5576c" }, Icon: Layers,   github: "#", live: "#", active: false },
  { id: "p7", name: "Coming Soon", tagline: "", description: "", stack: [], gradient: { from: "#4776e6", to: "#8e54e9" }, Icon: Cpu,      github: "#", live: "#", active: false },
  { id: "p8", name: "Coming Soon", tagline: "", description: "", stack: [], gradient: { from: "#fe6b8b", to: "#ff8e53" }, Icon: Palette,  github: "#", live: "#", active: false },
  { id: "p9", name: "Coming Soon", tagline: "", description: "", stack: [], gradient: { from: "#0fd850", to: "#f9f047" }, Icon: Rocket,   github: "#", live: "#", active: false },
];

const socials = [
  { icon: Github,   label: "GitHub",   href: "#" },
  { icon: Twitter,  label: "Twitter",  href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail,     label: "Email",    href: "mailto:sinhatan2002@gmail.com" },
];

/* ─── panel content ─────────────────────────────────────── */

const TERRACOTTA = "#C1654A";

const panelContent: Record<
  "tanishaa" | "sinha",
  { title: string; sections: { heading: string; body: string }[] }
> = {
  tanishaa: {
    title: "hi, i'm tanishaa.",
    sections: [
      { heading: "who i am",        body: "Someone who thinks too much about why people click on things. Consumer by nature, curious by choice." },
      { heading: "why i'm here",    body: "To make sense of the overlap between products and people — and to have somewhere to put those thoughts." },
      { heading: "when i'm offline", body: "Reading, overanalyzing films, building side projects, and probably listening to something lo-fi." },
      { heading: "into",             body: "Consumer psychology · Product thinking · Behaviour design · Music · Cinema" },
    ],
  },
  sinha: {
    title: "Sinha.",
    sections: [
      { heading: "studying",  body: "Focused on the intersection of business, technology, and consumer behaviour." }, // TODO: add degree / school
      { heading: "building",  body: "Inside the Machine — writing through the ways tech shapes how we live and decide." },
      { heading: "areas",     body: "Product thinking · Consumer tech · Behaviour research · Writing in public" },
      { heading: "open to",   body: "Internships, collaborations, and good conversations." },
    ],
  },
};

/* ─── hooks ─────────────────────────────────────────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

/* ─── InfoPanel ─────────────────────────────────────────── */

function InfoPanel({ type, onClose }: { type: PanelKey; onClose: () => void }) {
  const open = type !== null;
  const isMobile = useIsMobile();

  const lastDataRef = useRef<(typeof panelContent)["tanishaa"] | null>(null);
  if (type) lastDataRef.current = panelContent[type];
  const data = lastDataRef.current;

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.07)",
          backdropFilter: open ? "blur(3px)" : "none",
          WebkitBackdropFilter: open ? "blur(3px)" : "none",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
          zIndex: 100,
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          zIndex: 110,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          overflowY: "auto",
          transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
          ...(isMobile
            ? {
                bottom: 0,
                left: 0,
                right: 0,
                height: "72vh",
                maxHeight: "72vh",
                borderRadius: "22px 22px 0 0",
                borderTop: `3px solid ${TERRACOTTA}`,
                transform: open ? "translateY(0)" : "translateY(100%)",
                padding: "32px 24px 48px",
              }
            : {
                top: 0,
                right: 0,
                bottom: 0,
                width: "360px",
                borderLeft: `3px solid ${TERRACOTTA}`,
                transform: open ? "translateX(0)" : "translateX(100%)",
                padding: "56px 40px 48px",
              }),
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close panel"
          style={{
            position: "absolute",
            top: isMobile ? 18 : 24,
            right: isMobile ? 20 : 24,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#bbb",
            padding: 6,
            display: "flex",
            alignItems: "center",
            lineHeight: 1,
          }}
        >
          <X size={18} strokeWidth={2} />
        </button>

        {data && (
          <>
            <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "22px", fontWeight: 700, color: "#111", lineHeight: 1.1, marginBottom: "40px" }}>
              {data.title}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {data.sections.map((s) => (
                <div key={s.heading}>
                  <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "9px", fontWeight: 700, color: TERRACOTTA, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "7px" }}>
                    {s.heading}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#444", lineHeight: 1.72 }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─── ProjectCard ───────────────────────────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal();
  const isMobile = useIsMobile();
  const col = index % 3;
  const ProjectIcon = project.Icon;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? (project.active ? 1 : 0.35) : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${index * 55}ms, transform 0.55s ease ${index * 55}ms`,
        position: "relative",
        filter: project.active ? "none" : "saturate(0.3)",
      }}
      onMouseEnter={() => { if (project.active && !isMobile) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tile */}
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: "24px 12px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: hovered ? "0 6px 28px rgba(0,0,0,0.08)" : "0 1px 6px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease",
      }}>
        <div style={{
          width: 68,
          height: 68,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${project.gradient.from}, ${project.gradient.to})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered ? `0 14px 40px ${project.gradient.from}55` : `0 6px 20px ${project.gradient.from}38`,
          transform: hovered ? "scale(1.16)" : "scale(1)",
          transition: "transform 0.45s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease",
          flexShrink: 0,
        }}>
          <ProjectIcon size={28} color="rgba(255,255,255,0.92)" />
        </div>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: project.active ? "#222" : "#bbb", textAlign: "center", lineHeight: 1.3 }}>
          {project.name}
        </span>
      </div>

      {/* Glassmorphism hover popup — desktop only */}
      {project.active && !isMobile && (
        <div style={{
          position: "absolute",
          top: "50%",
          zIndex: 50,
          width: 260,
          ...(col === 2 ? { right: "calc(100% + 12px)" } : { left: "calc(100% + 12px)" }),
          transform: hovered
            ? "translateY(-50%) translateX(0)"
            : col === 2
              ? "translateY(-50%) translateX(10px)"
              : "translateY(-50%) translateX(-10px)",
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? "auto" : "none",
          transition: "opacity 0.22s ease, transform 0.32s cubic-bezier(.22,1,.36,1)",
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: 16,
          padding: "18px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.95)",
        }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700, color: "#111", lineHeight: 1.2, marginBottom: 3 }}>{project.name}</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#aaa", marginBottom: 9 }}>{project.tagline}</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#555", lineHeight: 1.65, marginBottom: 12 }}>{project.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
            {project.stack.map((t) => (
              <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: project.gradient.from, background: `${project.gradient.from}1c`, padding: "2px 8px", borderRadius: 999, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <a href={project.github} style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#222", fontWeight: 500 }}>
              <Github size={12} strokeWidth={2} /> GitHub
            </a>
            <a href={project.live} style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "Inter, sans-serif", fontSize: "11px", color: project.gradient.from, fontWeight: 600 }}>
              <ArrowUpRight size={12} strokeWidth={2} /> Live
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── RevealSection ─────────────────────────────────────── */

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── App ───────────────────────────────────────────────── */

export default function App() {
  const [panel, setPanel] = useState<PanelKey>(null);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .name-word {
          cursor: pointer;
          display: inline-block;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          user-select: none;
          -webkit-user-select: none;
          text-decoration: underline;
          text-decoration-color: transparent;
          text-decoration-thickness: 1px;
          text-underline-offset: 8px;
          transition: opacity 0.18s ease, text-decoration-color 0.18s ease;
        }
        .name-word:hover {
          opacity: 0.58;
          text-decoration-color: currentColor;
        }
        .nav-icon {
          display: flex;
          align-items: center;
          color: #aaa;
          transition: color 0.15s ease;
        }
        .nav-icon:hover { color: #111; }
      `}</style>

      <InfoPanel type={panel} onClose={() => setPanel(null)} />

      {/* ── Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px",
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#111", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
          Tanishaa Sinha
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {socials.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} title={label} className="nav-icon">
              <Icon size={20} strokeWidth={1.8} />
            </a>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ paddingTop: "120px", paddingBottom: "64px", paddingLeft: "24px", paddingRight: "24px", width: "100%" }}>
        <div style={{ animation: "heroIn 0.8s cubic-bezier(.22,1,.36,1) forwards" }}>
          <h1 style={{
            fontFamily: "'Chakra Petch', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(44px, 8vw, 96px)",
            lineHeight: 0.95,
            color: "#111",
            letterSpacing: "-0.02em",
            marginBottom: "28px",
          }}>
            <span className="name-word" onClick={() => setPanel("tanishaa")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setPanel("tanishaa")}>
              Tanishaa
            </span>
            {" "}
            <span className="name-word" onClick={() => setPanel("sinha")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setPanel("sinha")}>
              Sinha
            </span>
          </h1>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            fontWeight: 400,
            color: "#888",
            maxWidth: "560px",
            lineHeight: 1.55,
          }}>
            A consumer trying to understand consumers — while exploring the black box known as technology.
          </p>
        </div>
      </section>

      {/* ── Projects ── */}
      <section style={{ padding: "0 24px 80px", width: "100%" }}>
        <RevealSection>
          <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "11px", fontWeight: 600, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "28px" }}>
            Projects
          </p>
        </RevealSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}
          className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section style={{ padding: "0 24px 96px", width: "100%" }}>
        <RevealSection>
          <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "11px", fontWeight: 600, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "28px" }}>
            About
          </p>
          <div className="about-grid">
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(14px, 1.5vw, 16px)", color: "#222", lineHeight: 1.75, marginBottom: "16px" }}>
                I'm curious about the systems behind everyday technology — how products are built, how they influence behaviour, and what happens inside the machine most people never see.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(13px, 1.5vw, 15px)", color: "#999", lineHeight: 1.75 }}>
                When I'm not building, I'm usually breaking something apart to understand how it works — or thinking about why people use technology the way they do.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Projects shipped", value: "3" },
                { label: "GitHub",           value: "tan-sinha" },
                { label: "Status",           value: "Building" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0", paddingBottom: "14px" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#aaa" }}>{s.label}</span>
                  <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "18px", fontWeight: 700, color: "#111" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── Footer ── */}
      <RevealSection>
        <footer style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px", borderTop: "1px solid #f0f0f0" }}>
          <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "12px", color: "#ccc" }}>
            © 2026 Tanishaa Sinha
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} title={label} className="nav-icon" style={{ color: "#ccc" }}>
                <Icon size={18} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </footer>
      </RevealSection>

    </div>
  );
}
