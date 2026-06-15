import { useState, useEffect, useRef } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowUpRight,
  Laptop,
} from "lucide-react";

/* ─── data ─────────────────────────────────────────────── */

const projects = [
  {
    id: "inside-the-machine",
    name: "Inside the Machine",
    tagline: "Tech & consumer behaviour",
    description:
      "A personal exploration of how technology shapes the way consumers think, decide, and live — peeling back the interface to understand what's really going on underneath.",
    stack: ["React", "Next.js", "Vercel"],
    icon: { from: "#1c1c3a", to: "#3d5a80" },
    github: "#",  // TODO: replace with your GitHub repo URL
    live: "#",    // TODO: replace with your Vercel deployment URL
  },
];

const socials = [
  { icon: Github,   label: "GitHub",   href: "#" },   // TODO: replace with your GitHub profile URL
  { icon: Twitter,  label: "Twitter",  href: "#" },   // TODO: replace with your Twitter/X URL
  { icon: Linkedin, label: "LinkedIn", href: "#" },   // TODO: replace with your LinkedIn URL
  { icon: Mail,     label: "Email",    href: "mailto:sinhatan2002@gmail.com" },
];

/* ─── scroll-reveal hook ───────────────────────────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── components ───────────────────────────────────────── */

type Project = (typeof projects)[0];

function LaptopIcon({ size, color }: { size: number; color: string }) {
  return <Laptop size={size} strokeWidth={1.5} color={color} />;
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.55s ease, transform 0.55s ease, border-color 0.2s ease, background 0.2s ease",
        border: `1px solid ${hovered ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.07)"}`,
        borderRadius: 20,
        padding: "24px",
        background: hovered ? "rgba(250,250,252,0.9)" : "rgba(255,255,255,0.6)",
        cursor: "default",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: `linear-gradient(145deg, ${project.icon.from}, ${project.icon.to})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: hovered
              ? `0 10px 30px ${project.icon.from}50`
              : `0 4px 16px ${project.icon.from}30`,
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease",
          }}
        >
          <LaptopIcon size={28} color="rgba(255,255,255,0.88)" />
        </div>
        <div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#111",
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "#999",
              fontWeight: 400,
              marginTop: 3,
            }}
          >
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          color: "#555",
          lineHeight: 1.7,
          marginBottom: 16,
        }}
      >
        {project.description}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'DM Mono', 'SF Mono', monospace",
              fontSize: "11px",
              color: project.icon.from,
              background: `${project.icon.from}14`,
              padding: "3px 10px",
              borderRadius: 999,
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        <a
          href={project.github}
          className="flex items-center gap-1.5 hover:opacity-60 transition-opacity"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: "#111",
            fontWeight: 500,
          }}
        >
          <Github size={14} strokeWidth={2} />
          GitHub
        </a>
        <a
          href={project.live}
          className="flex items-center gap-1.5 hover:opacity-60 transition-opacity"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: project.icon.from,
            fontWeight: 500,
          }}
        >
          <ArrowUpRight size={14} strokeWidth={2} />
          Live
        </a>
      </div>
    </div>
  );
}

function RevealSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── main ─────────────────────────────────────────────── */

export default function App() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            color: "#111",
            letterSpacing: "0.01em",
          }}
        >
          Tanishaa Sinha
        </span>
        <div className="flex items-center gap-5">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              title={label}
              className="text-gray-400 hover:text-gray-800 transition-colors"
            >
              <Icon size={16} strokeWidth={1.8} />
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 px-8 max-w-4xl mx-auto">
        <div
          style={{
            animation: "heroIn 0.8s cubic-bezier(.22,1,.36,1) forwards",
          }}
        >
          <style>{`
            @keyframes heroIn {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <h1
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(48px, 9vw, 88px)",
              lineHeight: 0.95,
              color: "#111",
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Tanishaa Sinha
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              fontWeight: 400,
              color: "#888",
              maxWidth: "460px",
              lineHeight: 1.65,
            }}
          >
            A consumer trying to understand consumers — while exploring the
            black box known as technology.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="px-8 pb-24 max-w-4xl mx-auto">
        <RevealSection>
          <p
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "#bbb",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "32px",
            }}
          >
            Projects
          </p>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-8 pb-28 max-w-4xl mx-auto">
        <RevealSection>
          <p
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "#bbb",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "28px",
            }}
          >
            About
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  color: "#222",
                  lineHeight: 1.75,
                  fontWeight: 400,
                  marginBottom: "16px",
                }}
              >
                I'm curious about the systems behind everyday technology —
                how products are built, how they influence behaviour, and
                what happens inside the machine most people never see.
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  color: "#999",
                  lineHeight: 1.75,
                  fontWeight: 400,
                }}
              >
                When I'm not building, I'm usually breaking something apart
                to understand how it works — or thinking about why people
                use technology the way they do.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {[
                { label: "Projects shipped", value: "1" },
                { label: "GitHub", value: "tan-sinha" },
                { label: "Status", value: "Building" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between"
                  style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "16px" }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#aaa",
                      fontWeight: 400,
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#111",
                    }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Footer */}
      <RevealSection>
        <footer
          className="px-8 py-8 flex items-center justify-between max-w-4xl mx-auto"
          style={{ borderTop: "1px solid #f0f0f0" }}
        >
          <span
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: "13px",
              color: "#ccc",
              fontWeight: 400,
            }}
          >
            © 2026 Tanishaa Sinha
          </span>
          <div className="flex items-center gap-5">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                title={label}
                className="text-gray-300 hover:text-gray-700 transition-colors"
              >
                <Icon size={15} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </footer>
      </RevealSection>

    </div>
  );
}
