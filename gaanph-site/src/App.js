import { useState, useEffect, useRef } from "react";

const APP_URL = "https://gaanph.onrender.com";

/* ── Palette ── */
const G = {
  dark:    "#05201a",
  darker:  "#03130f",
  primary: "#0f6e56",
  mid:     "#1d9e75",
  light:   "#34d399",
  pale:    "#ecfdf5",
  white:   "#ffffff",
  gray:    "#6b7280",
  text:    "#e2f5ed",
  muted:   "#9bcfbc",
};

/* ── Tiny hook for intersection observer ── */
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useVisible();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ── Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: "64px",
      background: scrolled ? "rgba(3,19,15,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(29,158,117,0.15)` : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "22px" }}>🌿</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "20px", color: G.white, letterSpacing: "-0.5px" }}>
          Gaan<span style={{ color: G.light }}>PH</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {["About", "Features", "How It Works", "Team"].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} style={{
            color: G.muted, fontSize: "14px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.target.style.color = G.light}
          onMouseLeave={e => e.target.style.color = G.muted}
          >{l}</a>
        ))}
        <a href={APP_URL} target="_blank" rel="noreferrer" style={{
          background: G.primary, color: G.white, padding: "8px 20px",
          borderRadius: "10px", fontSize: "14px", fontWeight: 600,
          textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.target.style.background = G.mid}
        onMouseLeave={e => e.target.style.background = G.primary}
        >Launch App →</a>
      </div>
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "100px 40px 60px",
      background: `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(29,158,117,0.12) 0%, transparent 70%),
                   radial-gradient(ellipse 40% 40% at 20% 80%, rgba(15,110,86,0.08) 0%, transparent 60%),
                   ${G.darker}`,
      position: "relative", overflow: "hidden",
    }}>
      {/* grid overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(29,158,117,0.04) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(29,158,117,0.04) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "80px", position: "relative", zIndex: 1 }}>
        {/* Left */}
        <div style={{ flex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(15,110,86,0.15)", border: "1px solid rgba(52,211,153,0.25)",
            borderRadius: "20px", padding: "5px 14px", marginBottom: "28px",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: G.light, display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "12px", color: G.light, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.05em" }}>FREE CHILD HEALTH SCREENING TOOL</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1.05, margin: "0 0 24px", color: G.white, letterSpacing: "-2px" }}>
            Child Nutrition.<br />
            <span style={{ color: G.light }}>Data-Driven.</span><br />
            Filipino.
          </h1>

          <p style={{ fontSize: "18px", color: G.muted, lineHeight: 1.7, maxWidth: "480px", margin: "0 0 40px", fontFamily: "'DM Sans', sans-serif" }}>
            GaanPH uses WHO growth standards and machine learning to screen Filipino children aged 0–5 for malnutrition — free, fast, and purpose-built for barangay health workers across the Philippines.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a href={APP_URL} target="_blank" rel="noreferrer" style={{
              background: `linear-gradient(135deg, ${G.primary}, ${G.mid})`,
              color: G.white, padding: "14px 32px", borderRadius: "12px",
              fontSize: "16px", fontWeight: 700, textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 8px 32px rgba(15,110,86,0.35)`,
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-flex", alignItems: "center", gap: "8px",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 40px rgba(15,110,86,0.45)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 32px rgba(15,110,86,0.35)`; }}
            >
              🌿 Launch GaanPH
            </a>
            <a href="#how-it-works" style={{
              background: "rgba(255,255,255,0.06)", color: G.text,
              padding: "14px 32px", borderRadius: "12px",
              fontSize: "16px", fontWeight: 600, textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            >
              How does it work?
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "40px", marginTop: "56px", paddingTop: "40px", borderTop: "1px solid rgba(29,158,117,0.15)" }}>
            {[["91%", "Accuracy"], ["5", "WHO Classes"], ["17", "Regions"], ["0–5", "Years Old"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "28px", color: G.light }}>{n}</div>
                <div style={{ fontSize: "12px", color: G.muted, fontFamily: "'DM Sans', sans-serif", marginTop: "2px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — App mockup */}
        <div style={{ flex: "0 0 400px", position: "relative" }}>
          {/* Glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "320px", height: "320px", borderRadius: "50%",
            background: `radial-gradient(circle, rgba(29,158,117,0.25) 0%, transparent 70%)`,
            filter: "blur(20px)", zIndex: 0,
          }} />
          {/* Phone frame */}
          <div style={{
            position: "relative", zIndex: 1,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: "28px", overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
            padding: "32px 28px",
          }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "36px", marginBottom: "6px" }}>🌿</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: G.white }}>GaanPH</div>
              <div style={{ fontSize: "11px", color: G.muted, fontFamily: "'DM Sans', sans-serif" }}>Child Nutrition Screening</div>
            </div>
            {/* Mock form */}
            {[
              ["👶 Age", "1 year, 6 months"],
              ["⚖️ Weight", "9.5 kg"],
              ["📏 Height", "75.0 cm"],
              ["📍 Region", "Region III"],
            ].map(([l, v]) => (
              <div key={l} style={{ marginBottom: "10px" }}>
                <div style={{ fontSize: "10px", color: G.muted, fontFamily: "'DM Sans', sans-serif", marginBottom: "3px" }}>{l}</div>
                <div style={{ background: "rgba(15,110,86,0.12)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", color: G.text, fontFamily: "'DM Sans', sans-serif" }}>{v}</div>
              </div>
            ))}
            {/* Result preview */}
            <div style={{
              marginTop: "16px", background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.3)", borderRadius: "10px",
              padding: "12px 14px", textAlign: "center",
            }}>
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>✅</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "15px", color: G.light }}>Normal / Healthy</div>
              <div style={{ fontSize: "11px", color: G.muted, fontFamily: "'DM Sans', sans-serif", marginTop: "2px" }}>Katumpakan: 94.2%</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </section>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" style={{ background: G.dark, padding: "100px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: G.light, fontFamily: "'DM Sans', sans-serif", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", padding: "4px 12px", borderRadius: "20px", marginBottom: "16px" }}>THE PROBLEM</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: G.white, letterSpacing: "-1px", margin: "0 0 20px", lineHeight: 1.1 }}>
            1 in 3 Filipino children<br />
            <span style={{ color: G.light }}>are stunted.</span>
          </h2>
          <p style={{ fontSize: "17px", color: G.muted, lineHeight: 1.8, maxWidth: "600px", fontFamily: "'DM Sans', sans-serif", margin: "0 0 60px" }}>
            According to the 2023 National Nutrition Survey (NNS) by FNRI-DOST, malnutrition remains one of the most severe child health problems in the Philippines — especially in rural provinces and BARMM. Health workers urgently need a simple, reliable tool to detect it early.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { icon: "📊", stat: "31.8%", label: "of children under 5 are stunted", source: "NNS 2023 · FNRI-DOST" },
            { icon: "🏥", stat: "~6,500", label: "barangay health centers lack a digital screening tool", source: "DOH data" },
            { icon: "⏱️", stat: "<2 min", label: "to screen a child using GaanPH", source: "GaanPH" },
          ].map(({ icon, stat, label, source }) => (
            <Reveal key={stat} delay={0.1}>
              <div style={{
                background: "rgba(15,110,86,0.08)", border: "1px solid rgba(29,158,117,0.15)",
                borderRadius: "20px", padding: "32px 28px",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(29,158,117,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>{icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "40px", color: G.light, lineHeight: 1 }}>{stat}</div>
                <div style={{ fontSize: "14px", color: G.muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: "8px 0 12px" }}>{label}</div>
                <div style={{ fontSize: "11px", color: "rgba(155,207,188,0.5)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>{source}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ── */
function Features() {
  const features = [
    { icon: "🤖", title: "Machine Learning", sub: "Powered by Random Forest", desc: "Trained on 8,000 records modeled on 2023 NNS (FNRI-DOST) regional malnutrition patterns. BARMM, Regions VIII, V, and XII carry higher risk weighting that mirrors real DOH survey data." },
    { icon: "📐", title: "WHO Z-Score Standards", sub: "HAZ · WAZ · WHZ", desc: "Computes all three WHO growth indicators simultaneously: Height-for-Age, Weight-for-Age, and Weight-for-Height — the same metrics used by the DOH and UNICEF." },
    { icon: "🇵🇭", title: "Filipino-First Design", sub: "Bilingual interface", desc: "Every label, result, and recommendation is bilingual. Designed specifically for barangay health workers and rural health units who serve Filipino families." },
    { icon: "🏥", title: "5 Nutritional Classes", sub: "Normal to Severe", desc: "Classifies into Normal, Stunted, Underweight, Wasted, and Severely Malnourished — each with a plain-language explanation and specific recommended action steps." },
    { icon: "📍", title: "All Regions", sub: "17 Philippine Regions", desc: "Region-aware risk modeling from NCR to BARMM. The model understands that a child in Tawi-Tawi faces different baseline nutritional risks than one in Metro Manila." },
    { icon: "⚡", title: "91% Accuracy", sub: "Balanced across all classes", desc: "Trained with class balancing so that minority cases like Wasted and Severely Malnourished are detected reliably — not just the majority Normal class." },
  ];

  return (
    <section id="features" style={{ background: G.darker, padding: "100px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: G.light, fontFamily: "'DM Sans', sans-serif", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", padding: "4px 12px", borderRadius: "20px", marginBottom: "16px" }}>FEATURES</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: G.white, letterSpacing: "-1px", margin: "0 0 16px" }}>
              Built for <span style={{ color: G.light }}>real-world needs.</span>
            </h2>
            <p style={{ fontSize: "16px", color: G.muted, fontFamily: "'DM Sans', sans-serif", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
              Not just another screening tool — a practical instrument designed for barangay health workers and rural health units across the Philippines.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {features.map(({ icon, title, sub, desc }, i) => (
            <Reveal key={title} delay={i * 0.07}>
              <div style={{
                background: "rgba(15,110,86,0.06)", border: "1px solid rgba(29,158,117,0.12)",
                borderRadius: "18px", padding: "28px 24px", height: "100%",
                transition: "all 0.25s ease", cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(15,110,86,0.12)"; e.currentTarget.style.borderColor = "rgba(52,211,153,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(15,110,86,0.06)"; e.currentTarget.style.borderColor = "rgba(29,158,117,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "28px", marginBottom: "16px" }}>{icon}</div>
                <div style={{ fontSize: "11px", color: G.light, fontWeight: 700, letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif", marginBottom: "6px" }}>{sub.toUpperCase()}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "18px", color: G.white, marginBottom: "10px" }}>{title}</div>
                <div style={{ fontSize: "13px", color: G.muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How it works ── */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Enter the child's information", desc: "Age, sex, height, weight, region, and a few additional inputs like birth weight and daily meal frequency." },
    { n: "02", title: "WHO Z-scores are computed", desc: "GaanPH automatically calculates HAZ, WAZ, and WHZ using the WHO Child Growth Standards (0–5 years)." },
    { n: "03", title: "The Random Forest model analyzes", desc: "The model — trained on 8,000 records reflecting 2023 NNS regional patterns — assesses nutritional status based on all inputs including regional risk factors." },
    { n: "04", title: "See results and recommendations", desc: "The nutritional status, z-score breakdown, plain-language explanation, and concrete next steps appear instantly for the health worker or parent." },
  ];

  return (
    <section id="how-it-works" style={{ background: G.dark, padding: "100px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: G.light, fontFamily: "'DM Sans', sans-serif", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", padding: "4px 12px", borderRadius: "20px", marginBottom: "16px" }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: G.white, letterSpacing: "-1px", margin: "0 0 64px", lineHeight: 1.1 }}>
            Simple. Fast.<br /><span style={{ color: G.light }}>Reliable.</span>
          </h2>
        </Reveal>

        <div style={{ position: "relative" }}>
          {/* Connecting line */}
          <div style={{ position: "absolute", left: "27px", top: "40px", bottom: "40px", width: "2px", background: `linear-gradient(to bottom, ${G.primary}, transparent)`, zIndex: 0 }} />

          {steps.map(({ n, title, desc }, i) => (
            <Reveal key={n} delay={i * 0.1}>
              <div style={{ display: "flex", gap: "28px", marginBottom: "48px", position: "relative", zIndex: 1 }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%", flexShrink: 0,
                  background: i === 0 ? `linear-gradient(135deg, ${G.primary}, ${G.mid})` : "rgba(15,110,86,0.15)",
                  border: `2px solid ${i === 0 ? G.mid : "rgba(29,158,117,0.25)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "14px",
                  color: i === 0 ? G.white : G.muted,
                }}>
                  {n}
                </div>
                <div style={{ paddingTop: "12px" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "20px", color: G.white, marginBottom: "8px" }}>{title}</div>
                  <div style={{ fontSize: "15px", color: G.muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, maxWidth: "560px" }}>{desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WHO classes ── */
function Classes() {
  const classes = [
    { label: "Normal", fil: "Healthy", color: "#34d399", bg: "rgba(52,211,153,0.08)", desc: "All z-scores are above −2. Continue current feeding practices and schedule regular checkups." },
    { label: "Stunted", fil: "Short for age", color: "#fbbf24", bg: "rgba(251,191,36,0.08)", desc: "HAZ < −2. Likely caused by long-term insufficient nutrition. Refer to BHW for dietary counseling." },
    { label: "Underweight", fil: "Low weight for age", color: "#fb923c", bg: "rgba(251,146,60,0.08)", desc: "WAZ < −2. Insufficient calorie and protein intake. Increase nutrient-dense foods and visit the RHU." },
    { label: "Wasted", fil: "Thin for height", color: "#f87171", bg: "rgba(248,113,113,0.08)", desc: "WHZ < −2. Acute malnutrition requiring prompt attention. Seek care at the nearest health center." },
    { label: "Severely Malnourished", fil: "Severe Acute Malnutrition", color: "#ef4444", bg: "rgba(239,68,68,0.08)", desc: "Any z-score < −3. Medical emergency. Bring the child to a hospital immediately for therapeutic feeding." },
  ];

  return (
    <section style={{ background: G.darker, padding: "100px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: G.light, fontFamily: "'DM Sans', sans-serif", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", padding: "4px 12px", borderRadius: "20px", marginBottom: "16px" }}>WHO CLASSIFICATION</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: G.white, letterSpacing: "-1px", margin: 0 }}>
              5 <span style={{ color: G.light }}>Nutritional Status</span> Classes
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {classes.map(({ label, fil, color, bg, desc }, i) => (
            <Reveal key={label} delay={i * 0.07}>
              <div style={{
                background: bg, border: `1px solid ${color}30`,
                borderRadius: "14px", padding: "20px 24px",
                display: "flex", alignItems: "center", gap: "20px",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateX(8px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
              >
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                <div style={{ flex: "0 0 220px" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: G.white }}>{label}</div>
                  <div style={{ fontSize: "12px", color, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>{fil}</div>
                </div>
                <div style={{ fontSize: "14px", color: G.muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ── Team ── */
function Team() {
  return (
    <section id="team" style={{ background: G.dark, padding: "100px 40px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: G.light, fontFamily: "'DM Sans', sans-serif", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", padding: "4px 12px", borderRadius: "20px", marginBottom: "16px" }}>THE BUILDER</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: G.white, letterSpacing: "-1px", margin: 0 }}>
              Behind <span style={{ color: G.light }}>GaanPH</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{
            background: "rgba(15,110,86,0.07)", border: "1px solid rgba(29,158,117,0.18)",
            borderRadius: "24px", padding: "48px", display: "flex", gap: "48px", alignItems: "center",
            transition: "border-color 0.3s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(52,211,153,0.35)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(29,158,117,0.18)"}
          >
            {/* Avatar */}
            <div style={{ flexShrink: 0, textAlign: "center" }}>
              <div style={{
                width: "120px", height: "120px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${G.primary}, ${G.mid})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "48px", marginBottom: "16px",
                boxShadow: `0 0 40px rgba(29,158,117,0.3)`,
              }}>
                🌿
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)",
                borderRadius: "20px", padding: "4px 12px",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: G.light, display: "inline-block", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: "11px", color: G.light, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Open to opportunities</span>
              </div>
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", color: G.white, letterSpacing: "-0.5px", marginBottom: "4px" }}>Kian Andrei James</div>
              <div style={{ fontSize: "14px", color: G.light, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: "20px", letterSpacing: "0.05em" }}>ML Engineer · Full-Stack Developer · Central Luzon, PH</div>
              <p style={{ fontSize: "15px", color: G.muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8, marginBottom: "28px", maxWidth: "480px" }}>
                Built GaanPH from scratch — from the WHO z-score model and Random Forest classifier to the Streamlit UI and Render deployment. Passionate about using machine learning to solve real health problems in the Philippines.
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                {["Python", "Scikit-learn", "Machine Learning", "Streamlit", "WHO Standards", "Filipino Health Tech"].map(tag => (
                  <span key={tag} style={{
                    background: "rgba(15,110,86,0.15)", border: "1px solid rgba(29,158,117,0.2)",
                    borderRadius: "20px", padding: "4px 12px", fontSize: "12px",
                    color: G.muted, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                  }}>{tag}</span>
                ))}
              </div>

              {/* Built with */}
              <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(29,158,117,0.12)" }}>
                <div style={{ fontSize: "11px", color: "rgba(155,207,188,0.4)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "12px" }}>WHAT WAS BUILT</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  {[
                    { icon: "🤖", label: "ML Model", val: "Random Forest, 91% acc." },
                    { icon: "📊", label: "Training Data", val: "8,000 records · NNS 2023" },
                    { icon: "🌿", label: "UI", val: "Streamlit, bilingual" },
                  ].map(({ icon, label, val }) => (
                    <div key={label} style={{ background: "rgba(15,110,86,0.1)", borderRadius: "10px", padding: "12px" }}>
                      <div style={{ fontSize: "18px", marginBottom: "4px" }}>{icon}</div>
                      <div style={{ fontSize: "11px", color: G.light, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.05em" }}>{label}</div>
                      <div style={{ fontSize: "12px", color: G.muted, fontFamily: "'DM Sans', sans-serif", marginTop: "2px" }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  return (
    <section style={{
      padding: "100px 40px",
      background: `radial-gradient(ellipse 70% 80% at 50% 50%, rgba(15,110,86,0.2) 0%, transparent 70%), ${G.dark}`,
    }}>
      <Reveal>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🌿</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", color: G.white, letterSpacing: "-1.5px", margin: "0 0 20px", lineHeight: 1.1 }}>
            Start screening<br /><span style={{ color: G.light }}>right now.</span>
          </h2>
          <p style={{ fontSize: "17px", color: G.muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, marginBottom: "40px" }}>
            Free. No download required. Works on any browser or mobile device. Built for BHWs, RHUs, and parents across the Philippines.
          </p>
          <a href={APP_URL} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: `linear-gradient(135deg, ${G.primary}, ${G.mid})`,
            color: G.white, padding: "18px 44px", borderRadius: "14px",
            fontSize: "18px", fontWeight: 700, textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: `0 12px 48px rgba(15,110,86,0.4)`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 20px 60px rgba(15,110,86,0.5)`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 12px 48px rgba(15,110,86,0.4)`; }}
          >
            🔍 Screen a Child — Free
          </a>
          <div style={{ marginTop: "24px", fontSize: "13px", color: "rgba(155,207,188,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
            Based on WHO Child Growth Standards · Data: 2023 NNS (FNRI-DOST) · For children aged 0–5 years
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{ background: G.darker, borderTop: "1px solid rgba(29,158,117,0.1)", padding: "40px", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
        <span style={{ fontSize: "18px" }}>🌿</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "16px", color: G.white }}>Gaan<span style={{ color: G.light }}>PH</span></span>
      </div>
      <p style={{ fontSize: "13px", color: "rgba(155,207,188,0.4)", fontFamily: "'DM Sans', sans-serif", margin: "0 0 8px" }}>
        Child Nutrition Screening · WHO Growth Standards · 2023 NNS (FNRI-DOST) · Made for the Philippines
      </p>
      <p style={{ fontSize: "12px", color: "rgba(155,207,188,0.25)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
        ⚕️ Screening tool only. Not a substitute for professional medical diagnosis. DOH Hotline: 1-800-10-364-4364
      </p>
    </footer>
  );
}

/* ── App ── */
export default function App() {
  return (
    <div style={{ background: G.darker, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${G.darker}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${G.darker}; }
        ::-webkit-scrollbar-thumb { background: ${G.primary}; border-radius: 3px; }
      `}</style>
      <Nav />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Classes />
      <Team />
      <CTA />
      <Footer />
    </div>
  );
}