import { Link } from "react-router-dom";

const WHY_CARDS = [
  { icon: "🏆", title: "Premium Quality", desc: "We use advanced printing technology and carefully selected materials to ensure every job meets the highest standard — from the first proof to final delivery." },
  { icon: "⚡", title: "Fast Turnaround", desc: "Time is critical for your business. That's why we offer same-day and next-day production on most products without ever cutting corners on quality." },
  { icon: "💰", title: "Competitive Pricing", desc: "Professional print quality shouldn't break the bank. We offer transparent, volume-based pricing so you get the best value whether you order 50 or 50,000 pieces." },
  { icon: "🎨", title: "Design Support", desc: "Not a designer? No problem. Our team provides free file checks and guidance to ensure your artwork is print-ready and looks exactly how you envisioned." },
  { icon: "📦", title: "Wide Product Range", desc: "From business cards and flyers to large-format banners and custom stickers — we offer hundreds of print products under one roof to cover every need." },
  { icon: "🤝", title: "Reliable Partnership", desc: "Businesses of all sizes count on us for repeat orders. We remember your preferences, maintain consistency, and deliver on our promises every single time." },
];

const SERVICES = [
  { icon: "🪪", name: "Business Cards", desc: "Matte, gloss, kraft — professional cards that make a lasting impression.", href: "/shop?category=Business+Cards" },
  { icon: "📄", name: "Flyers & Leaflets", desc: "Full-colour flyers in all sizes, perfect for promotions and events.", href: "/shop?category=Flyers" },
  { icon: "🖼️", name: "Banners & Signs", desc: "Indoor and outdoor vinyl banners, retractable stands, and mesh prints.", href: "/shop?category=Banners" },
  { icon: "⭐", name: "Stickers & Labels", desc: "Die-cut, circle, and roll labels for branding, packaging, and more.", href: "/shop?category=Stickers" },
  { icon: "📋", name: "Brochures", desc: "Tri-fold and bi-fold brochures that tell your brand story with impact.", href: "/shop?category=Brochures" },
  { icon: "💌", name: "Postcards", desc: "High-quality postcards for direct mail campaigns and announcements.", href: "/shop?category=Postcards" },
];

const STATS = [
  { value: "10+", label: "Years of Experience" },
  { value: "5,000+", label: "Happy Clients" },
  { value: "1M+", label: "Items Printed" },
  { value: "500+", label: "Print Products" },
];

export default function About() {
  return (
    <div style={{ background: "var(--white)" }}>

      {/* ── PAGE HERO ─────────────────────────────────────────────── */}
      <section className="page-hero" style={{ padding: "80px 0" }}>
        <div className="ph-glow" />
        <div className="ph-grid" />
        <div style={{ maxWidth: 1320, margin: "auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555", marginBottom: 20 }}>
            <a href="/" style={{ color: "#555", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "var(--orange)"}
              onMouseLeave={e => e.target.style.color = "#555"}>Home</a>
            <span style={{ color: "#333" }}>›</span>
            <span style={{ color: "white" }}>About Us</span>
          </div>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,92,0,.12)", border: "1px solid rgba(255,92,0,.3)", color: "var(--orange)", padding: "7px 16px", borderRadius: 100, fontSize: 11.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--orange)" }} />
              Insta Printing
            </div>
            <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(52px, 7vw, 90px)", color: "white", lineHeight: .95, marginBottom: 22, animation: "fadeUp .8s ease both" }}>
              About<br /><span style={{ color: "var(--orange)" }}>Insta Printing</span>
            </h1>
            <p style={{ fontSize: 17, color: "#aaa", lineHeight: 1.8, maxWidth: 580, animation: "fadeUp .8s ease .15s both" }}>
              We are a full-service print studio dedicated to delivering high-quality custom printing for businesses and individuals across Canada. From a single business card to a full campaign — we handle it all with precision and care.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap", animation: "fadeUp .8s ease .3s both" }}>
              <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "var(--orange)", color: "white", borderRadius: 10, fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".07em", boxShadow: "0 8px 28px rgba(255,92,0,.4)", textDecoration: "none", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--orange-dark)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.transform = "none"; }}>
                🖨️ Browse Products
              </Link>
              <Link to="/quote" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", color: "white", border: "2px solid rgba(255,255,255,.2)", borderRadius: 10, fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", textDecoration: "none", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.6)"; e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.background = "transparent"; }}>
                Get a Quote →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <div style={{ background: "var(--orange)", padding: "60px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} className="stats-grid-resp">
            {STATS.map((s, i) => (
              <div key={s.label} style={{ textAlign: "center", padding: "0 20px", borderRight: i < 3 ? "1px solid rgba(255,255,255,.25)" : "none" }}>
                <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 56, color: "white", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.7)", textTransform: "uppercase", letterSpacing: ".13em", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHO WE ARE ────────────────────────────────────────────── */}
      <section style={{ padding: "96px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="split-layout-resp">
            {/* Text */}
            <div className="reveal from-left">
              <div className="eyebrow">Our Story</div>
              <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(34px,4vw,54px)", color: "var(--dark)", marginBottom: 20, lineHeight: 1.05 }}>
                YOUR ALL-IN-ONE<br />PRINT PARTNER
              </h2>
              <p style={{ fontSize: 15.5, color: "var(--mid)", lineHeight: 1.85, marginBottom: 18 }}>
                Insta Printing was founded on a simple belief: every business deserves access to professional-quality printing at a fair price. What started as a small local print shop has grown into a comprehensive print studio trusted by thousands of clients across Canada.
              </p>
              <p style={{ fontSize: 15.5, color: "var(--mid)", lineHeight: 1.85, marginBottom: 28 }}>
                We specialize in custom printing solutions — from quick-turnaround business cards and marketing flyers to large-format banners, vehicle wraps, and branded signage. No matter the size of your project, our team brings the same dedication and attention to detail to every single order.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Custom Printing & Wide Format","Wraps, Decals & Signage","Graphic Design Support","Bulk & Rush Orders Available"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14.5, color: "var(--dark)", fontWeight: 600 }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,92,0,.12)", color: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="reveal from-right">
              <div style={{ background: "var(--dark)", borderRadius: 28, padding: 48, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,92,0,.2) 0%, transparent 70%)" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>🖨️</div>
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 32, color: "white", letterSpacing: 1, marginBottom: 14 }}>Proud of Our Past,<br />Printing for the Future</h3>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75, marginBottom: 28 }}>
                    With over a decade of experience in the printing industry, we have built a reputation that our clients trust. Every project we take on reflects our commitment to craftsmanship, reliability, and your complete satisfaction.
                  </p>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {[["🏅","Award-Winning Quality"],["🚚","Fast Canada-Wide Shipping"],["💬","Dedicated Support"]].map(([ico, label]) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 100, fontSize: 12.5, color: "#bbb" }}>
                        <span>{ico}</span>{label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────── */}
      <section style={{ padding: "96px 0", background: "var(--light)" }}>
        <div className="container">
          <div className="sec-head center">
            <div className="eyebrow reveal">Why Choose Us</div>
            <h2 className="sec-title reveal d1">WE PRINT IT.<br />YOU LOVE IT.</h2>
            <p className="sec-sub reveal d2">
              Here's what sets Insta Printing apart from the rest — quality, speed, and service you can count on every time.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="why-grid-resp">
            {WHY_CARDS.map((card, i) => (
              <div key={card.title}
                className={`reveal d${(i % 3) + 1}`}
                style={{ background: "white", borderRadius: 18, padding: "34px 28px", border: "2px solid transparent", transition: "all .38s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(255,92,0,.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,92,0,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 18 }}>{card.icon}</div>
                <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 22, letterSpacing: 1, marginBottom: 10, color: "var(--dark)" }}>{card.title}</h3>
                <p style={{ fontSize: 13.5, color: "var(--mid)", lineHeight: 1.72 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION ──────────────────────────────────────── */}
      <section style={{ padding: "96px 0", background: "var(--dark)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="mission-grid-resp">
            {/* Mission */}
            <div className="reveal d1" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 22, padding: "44px 40px" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,92,0,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>🎯</div>
              <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 28, color: "white", letterSpacing: 1, marginBottom: 16 }}>OUR MISSION</h3>
              <p style={{ fontSize: 15, color: "#777", lineHeight: 1.8 }}>
                Our mission is to make professional-grade printing accessible to every business and individual — regardless of size or budget. We believe great print quality drives real results, and we're here to help our clients stand out in a competitive market.
              </p>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                {["Customer satisfaction first — always","Consistent quality on every order","Transparent pricing, no surprises"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#888" }}>
                    <span style={{ color: "var(--orange)", fontWeight: 900, fontSize: 13 }}>→</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="reveal d2" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 22, padding: "44px 40px" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,92,0,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>🚀</div>
              <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 28, color: "white", letterSpacing: 1, marginBottom: 16 }}>OUR VISION</h3>
              <p style={{ fontSize: 15, color: "#777", lineHeight: 1.8 }}>
                We envision a future where every printed piece is a powerful brand touchpoint. By continuously investing in technology, materials, and our people, we aim to be the most trusted print partner for Canadian businesses — from local startups to national brands.
              </p>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                {["Leading innovation in print technology","Expanding our product range constantly","Building lasting client relationships"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#888" }}>
                    <span style={{ color: "var(--orange)", fontWeight: 900, fontSize: 13 }}>→</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginTop: 32 }} className="values-grid-resp">
            {[["⚙️","Precision","We obsess over every detail — colour accuracy, cut lines, and finish quality."],["💡","Innovation","We embrace new printing technology to give clients options they can't find elsewhere."],["🌿","Sustainability","Eco-friendly stocks and responsible production practices wherever possible."],["❤️","Care","We treat every order — big or small — as if it were our own brand on the line."]].map(([ico, title, desc]) => (
              <div key={title} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 16, padding: "28px 22px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{ico}</div>
                <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 20, color: "white", letterSpacing: 1, marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 12.5, color: "#555", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES ──────────────────────────────────────────── */}
      <section style={{ padding: "96px 0" }}>
        <div className="container">
          <div className="sec-head center">
            <div className="eyebrow reveal">What We Offer</div>
            <h2 className="sec-title reveal d1">OUR CORE SERVICES</h2>
            <p className="sec-sub reveal d2">
              A wide range of custom print products crafted to help your brand make a lasting impression — online ordering, fast production, and reliable delivery.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="services-grid-resp">
            {SERVICES.map((svc, i) => (
              <Link key={svc.name} to={svc.href}
                className={`reveal d${(i % 3) + 1}`}
                style={{ display: "block", textDecoration: "none", borderRadius: 18, overflow: "hidden", background: "white", border: "1px solid var(--border)", transition: "all .38s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,.1)"; e.currentTarget.style.borderColor = "var(--orange)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                <div style={{ padding: "32px 28px 24px", display: "flex", flexDirection: "column", gap: 0 }}>
                  <div style={{ width: 58, height: 58, borderRadius: 14, background: "rgba(255,92,0,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 18 }}>{svc.icon}</div>
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 22, letterSpacing: 1, color: "var(--dark)", marginBottom: 8 }}>{svc.name}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--mid)", lineHeight: 1.7, marginBottom: 20 }}>{svc.desc}</p>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "var(--orange)", display: "flex", alignItems: "center", gap: 6, textTransform: "uppercase", letterSpacing: ".07em" }}>
                    Shop Now <span style={{ fontSize: 16 }}>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", border: "2px solid var(--border)", color: "var(--dark)", borderRadius: 10, fontSize: 13.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", textDecoration: "none", transition: "all .22s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--orange)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--dark)"; }}>
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE / PROCESS ──────────────────────────────────── */}
      <section style={{ padding: "96px 0", background: "var(--light)" }}>
        <div className="container">
          <div className="sec-head center">
            <div className="eyebrow reveal">How We Work</div>
            <h2 className="sec-title reveal d1">FROM ORDER TO DELIVERY</h2>
            <p className="sec-sub reveal d2">A simple, streamlined process designed to get your print in your hands as fast as possible.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }} className="steps-grid-resp">
            <div style={{ position: "absolute", top: 56, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg,var(--orange),rgba(255,92,0,.1))" }} className="steps-line-hide" />
            {[{icon:"🖱️",n:"01",name:"Order Online",desc:"Choose your product, select your specs, upload your artwork, and place your order in minutes."},
              {icon:"🎨",n:"02",name:"We Review & Proof",desc:"Our team checks your files and prepares a digital proof so you know exactly what you'll receive."},
              {icon:"⚙️",n:"03",name:"Production",desc:"Your job goes straight to press using professional-grade equipment and premium materials."},
              {icon:"🚚",n:"04",name:"Fast Delivery",desc:"We pack and ship your order across Canada with real-time tracking on every shipment."}
            ].map((step, i) => (
              <div key={step.n} className={`reveal d${i + 1}`} style={{ textAlign: "center", padding: "0 18px" }}>
                <div style={{ width: 112, height: 112, borderRadius: "50%", background: "white", border: "2px solid rgba(255,92,0,.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 26px", fontSize: 34, position: "relative", zIndex: 1, boxShadow: "0 4px 20px rgba(0,0,0,.07)", transition: "all .4s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.boxShadow = "0 0 0 10px rgba(255,92,0,.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,92,0,.25)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.07)"; }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--orange)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 8 }}>Step {step.n}</div>
                <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 21, color: "var(--dark)", letterSpacing: 1, marginBottom: 10 }}>{step.name}</div>
                <p style={{ fontSize: 13.5, color: "var(--mid)", lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────────── */}
      <section style={{ padding: "96px 0", background: "linear-gradient(130deg, var(--dark) 0%, #1a0900 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -120, top: -120, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,92,0,.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "30%", bottom: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,92,0,.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,92,0,.15)", border: "1px solid rgba(255,92,0,.3)", color: "var(--orange)", padding: "7px 18px", borderRadius: 100, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 24 }}>
            🔥 Ready to Print?
          </div>
          <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(42px,6vw,72px)", color: "white", lineHeight: .97, marginBottom: 20 }}>
            START YOUR CUSTOM<br /><span style={{ color: "var(--orange)" }}>PRINTING TODAY</span>
          </h2>
          <p style={{ fontSize: 17, color: "#666", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.8 }}>
            Thousands of businesses trust Insta Printing for their print needs. Join them — get your first order started in minutes.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", background: "var(--orange)", color: "white", borderRadius: 12, fontSize: 15, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".07em", boxShadow: "0 8px 32px rgba(255,92,0,.45)", textDecoration: "none", transition: "all .28s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--orange-dark)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(255,92,0,.52)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,92,0,.45)"; }}>
              🛒 Shop Now
            </Link>
            <Link to="/quote" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", color: "white", border: "2px solid rgba(255,255,255,.2)", borderRadius: 12, fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", textDecoration: "none", transition: "all .28s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.6)"; e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.background = "transparent"; }}>
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @media(max-width:1100px) {
          .split-layout-resp  { grid-template-columns: 1fr !important; gap: 48px !important; }
          .why-grid-resp      { grid-template-columns: repeat(2,1fr) !important; }
          .services-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
          .mission-grid-resp  { grid-template-columns: 1fr !important; }
          .stats-grid-resp    { grid-template-columns: repeat(2,1fr) !important; }
          .values-grid-resp   { grid-template-columns: repeat(2,1fr) !important; }
          .steps-grid-resp    { grid-template-columns: repeat(2,1fr) !important; gap: 40px !important; }
          .steps-line-hide    { display: none !important; }
        }
        @media(max-width:768px) {
          .why-grid-resp      { grid-template-columns: 1fr !important; }
          .services-grid-resp { grid-template-columns: 1fr !important; }
          .stats-grid-resp    { grid-template-columns: repeat(2,1fr) !important; }
          .values-grid-resp   { grid-template-columns: repeat(2,1fr) !important; }
          .steps-grid-resp    { grid-template-columns: 1fr !important; }
          .mission-grid-resp  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}