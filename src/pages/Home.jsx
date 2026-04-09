import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCTS, categories, testimonials } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -36px 0px" });
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [typedText, setTypedText] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const typedRef = useRef({ wi: 0, ci: 0, del: false });
  useReveal();

  const words = ["IDEAS", "DESIGNS", "VISION", "BRAND", "STORY"];
  useEffect(() => {
    let timer;
    function type() {
      const { wi, ci, del } = typedRef.current;
      const w = words[wi];
      if (!del) {
        const newCi = ci + 1;
        setTypedText(w.slice(0, newCi));
        if (newCi === w.length) { typedRef.current = { wi, ci: newCi, del: true }; timer = setTimeout(type, 1900); }
        else { typedRef.current = { wi, ci: newCi, del: false }; timer = setTimeout(type, 115); }
      } else {
        const newCi = ci - 1;
        setTypedText(w.slice(0, newCi));
        if (newCi === 0) { typedRef.current = { wi: (wi + 1) % words.length, ci: 0, del: false }; timer = setTimeout(type, 115); }
        else { typedRef.current = { wi, ci: newCi, del: true }; timer = setTimeout(type, 65); }
      }
    }
    timer = setTimeout(type, 1100);
    return () => clearTimeout(timer);
  }, []);

  const filtered = activeFilter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.f === activeFilter);

  return (
    <div style={{ background: "var(--white)" }}>
      {/* HERO */}
      <section style={{ background: "var(--dark)", minHeight: 700, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 90% at 90% 50%, rgba(255,92,0,.16) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 8% 90%, rgba(255,92,0,.07) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ maxWidth: 1320, margin: "auto", padding: "80px 28px", display: "grid", gridTemplateColumns: "1fr 500px", gap: 64, alignItems: "center", position: "relative", zIndex: 1, width: "100%" }} className="hero-inner-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,92,0,.12)", border: "1px solid rgba(255,92,0,.3)", color: "var(--orange)", padding: "7px 16px", borderRadius: 100, fontSize: 11.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 22 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--orange)", animation: "pd 1.8s infinite" }} /> Premium Printing Services
            </div>
            <h1 style={{ fontSize: "clamp(54px, 6.5vw, 96px)", color: "white", lineHeight: .97, marginBottom: 22 }}>
              BRING YOUR<br />
              <span style={{ color: "var(--orange)", display: "inline-block", position: "relative" }}>
                {typedText}<span style={{ animation: "blink .7s infinite" }}>|</span>
              </span><br />
              TO LIFE
            </h1>
            <p style={{ color: "#aaa", fontSize: 17, lineHeight: 1.77, maxWidth: 500, marginBottom: 40 }}>
              Professional custom printing for brands that demand quality. From business cards to massive banners — precision, speed, and craftsmanship every single time.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 34px", background: "var(--orange)", color: "white", borderRadius: 10, fontSize: 14.5, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".07em", transition: "all .28s", boxShadow: "0 8px 30px rgba(255,92,0,.42)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3z" /></svg>
                Start Printing
              </Link>
              <a href="#howitworks" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 34px", color: "white", border: "2px solid rgba(255,255,255,.2)", borderRadius: 10, fontSize: 14.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", transition: "all .28s" }}>
                <span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>▶</span>
                See How It Works
              </a>
            </div>
            <div style={{ display: "flex", gap: 38, marginTop: 52, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,.08)" }}>
              {[["50K+","Orders Delivered"],["98%","Satisfaction Rate"],["24H","Rush Turnaround"]].map(([n,l]) => (
                <div key={l}><div style={{ fontFamily: "Bebas Neue", fontSize: 40, color: "var(--orange)", lineHeight: 1 }}>{n}</div><div style={{ fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: ".1em", marginTop: 4 }}>{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-visual" style={{ position: "relative", height: 440 }}>
            <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", width: 280, background: "linear-gradient(145deg,#1e1e1e,#141414)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 24, padding: 30, textAlign: "center", boxShadow: "0 30px 80px rgba(0,0,0,.55)" }}>
              <div style={{ width: 182, height: 182, margin: "0 auto 20px", background: "linear-gradient(135deg,var(--orange),#ff8c42)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, boxShadow: "0 12px 42px rgba(255,92,0,.42)" }}>🖨️</div>
              <div style={{ fontFamily: "Bebas Neue", fontSize: 22, color: "white", letterSpacing: 2, marginBottom: 5 }}>Insta Printing</div>
              <div style={{ fontSize: 12, color: "#444" }}>Custom Print Preview</div>
            </div>
            {[{top:0,right:0,style:{},items:[{ico:"⭐",num:"4.9",lbl:"Avg Rating"}]},
              {bottom:60,left:0,style:{background:"var(--orange)"},items:[{ico:"⚡",num:"24H",lbl:"Rush Print"}]},
              {bottom:0,right:8,style:{},items:[{ico:"✅",num:"50K+",lbl:"Happy Clients"}]}
            ].map((pill,i)=>(
              <div key={i} style={{ position:"absolute",background:"white",borderRadius:14,padding:"13px 18px",boxShadow:"0 16px 50px rgba(0,0,0,.22)",display:"flex",alignItems:"center",gap:12,...pill.style,top:pill.top,bottom:pill.bottom,left:pill.left,right:pill.right,width:162 }}>
                <div style={{fontSize:26,flexShrink:0}}>{pill.items[0].ico}</div>
                <div>
                  <div style={{fontFamily:"Bebas Neue",fontSize:22,lineHeight:1,color:pill.style.background?"white":"var(--dark)"}}>{pill.items[0].num}</div>
                  <div style={{fontSize:10,color:pill.style.background?"rgba(255,255,255,.65)":"#aaa",textTransform:"uppercase",letterSpacing:".07em"}}>{pill.items[0].lbl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "96px 0", background: "var(--white)" }}>
        <div className="container">
          <div className="sec-head center">
            <div className="eyebrow reveal">Product Categories</div>
            <h2 className="sec-title reveal d1">BROWSE BY CATEGORY</h2>
            <p className="sec-sub reveal d2">Explore our full range of custom print products — built for every business need and budget.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }} className="cat-grid-resp">
            {categories.map((cat, i) => (
              <Link key={cat.name} to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className={`reveal d${(i%4)+1}`}
                style={{ background: "var(--light)", borderRadius: 18, padding: "38px 20px", textAlign: "center", cursor: "pointer", transition: "all .38s var(--ease)", position: "relative", overflow: "hidden", border: "2px solid transparent", display: "block" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 22px 55px rgba(255,92,0,.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: 68, height: 68, background: "white", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 30, boxShadow: "0 4px 16px rgba(0,0,0,.08)" }}>{cat.icon}</div>
                <div style={{ fontFamily: "Bebas Neue", fontSize: 22, letterSpacing: 1, marginBottom: 6 }}>{cat.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--mid)" }}>{cat.count} Products</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howitworks" style={{ background: "var(--dark)", padding: "96px 0" }}>
        <div className="container">
          <div className="sec-head center">
            <div className="eyebrow reveal" style={{ color: "rgba(255,92,0,.8)" }}>Simple Process</div>
            <h2 className="sec-title reveal d1" style={{ color: "white" }}>HOW IT WORKS</h2>
            <p className="sec-sub reveal d2" style={{ color: "#555" }}>Order your custom prints in 4 easy steps. We handle everything from design to doorstep.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }} className="steps-grid-resp">
            <div style={{ position: "absolute", top: 56, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg,var(--orange),rgba(255,92,0,.12))" }} className="steps-line-hide" />
            {[{icon:"🎨",n:"01",name:"Choose Product",desc:"Browse hundreds of print products. Pick your size, material, quantity, and finishing options."},
              {icon:"📤",n:"02",name:"Upload Design",desc:"Upload your artwork or use our free online design tool to create something beautiful from scratch."},
              {icon:"✅",n:"03",name:"Review & Approve",desc:"Receive a digital proof before printing. Approve your design and we go to press immediately."},
              {icon:"🚚",n:"04",name:"Fast Delivery",desc:"We print, pack, and ship to your door. Real-time tracking available on every order."}
            ].map((step, i) => (
              <div key={step.n} className={`reveal d${i+1}`} style={{ textAlign: "center", padding: "0 18px" }}>
                <div style={{ width: 112, height: 112, borderRadius: "50%", background: "#1a1a1a", border: "2px solid rgba(255,92,0,.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 26px", fontSize: 34, position: "relative", zIndex: 1, transition: "all .42s" }}>{step.icon}</div>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: "var(--orange)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 10 }}>Step {step.n}</div>
                <div style={{ fontFamily: "Bebas Neue", fontSize: 22, color: "white", letterSpacing: 1, marginBottom: 12 }}>{step.name}</div>
                <p style={{ fontSize: 13.5, color: "#555", lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTERS BAR */}
      <div style={{ background: "var(--orange)", padding: "70px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} className="count-grid-resp">
            {[["50","K+","Orders Delivered"],["98","%","Satisfaction Rate"],["12","+","Years of Experience"],["500","+","Print Products"]].map(([n,s,l],i) => (
              <div key={l} className={`reveal d${i+1}`} style={{ textAlign: "center", padding: "0 20px", borderRight: i < 3 ? "1px solid rgba(255,255,255,.2)" : "none" }}>
                <div style={{ fontFamily: "Bebas Neue", fontSize: 70, color: "white", lineHeight: 1 }}>{n}<span style={{ fontSize: 52 }}>{s}</span></div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".13em", marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section id="products" style={{ padding: "96px 0" }}>
        <div className="container">
          <div className="sec-head split">
            <div>
              <div className="eyebrow reveal">Our Products</div>
              <h2 className="sec-title reveal d1">FEATURED PRODUCTS</h2>
            </div>
            <Link to="/shop" className="view-all reveal">View All Products →</Link>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 38 }} className="reveal">
            {[{v:"all",l:"All Products"},{v:"cards",l:"Business Cards"},{v:"banners",l:"Banners"},{v:"apparel",l:"Apparel"},{v:"stickers",l:"Stickers"}].map(tab => (
              <button key={tab.v} onClick={() => setActiveFilter(tab.v)}
                style={{ padding: "9px 20px", borderRadius: 100, fontSize: 13, fontWeight: 700, border: "2px solid", transition: "all .22s", cursor: "pointer",
                  borderColor: activeFilter === tab.v ? "var(--orange)" : "var(--border)",
                  color: activeFilter === tab.v ? "white" : "var(--mid)",
                  background: activeFilter === tab.v ? "var(--orange)" : "white"
                }}>
                {tab.l}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22, transition: "opacity .4s" }} className="prod-grid-resp">
            {filtered.map((p, i) => (
              <div key={p.id} className={`reveal d${(i%4)+1}`}
                style={{ borderRadius: 18, overflow: "hidden", background: "white", border: "1px solid var(--border)", transition: "all .38s var(--ease)", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 26px 65px rgba(0,0,0,.12)"; e.currentTarget.style.borderColor = "var(--orange)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 68, background: p.bg, transition: "transform .5s" }}>{p.icon}</div>
                  {p.badge && <span style={{ position: "absolute", top: 12, left: 12, background: p.bc === "gb" ? "#00b090" : "var(--orange)", color: "white", fontSize: 10.5, fontWeight: 900, padding: "4px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: ".07em" }}>{p.badge}</span>}
                </div>
                <div style={{ padding: "18px 20px 22px" }}>
                  <div style={{ fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 6 }}>{p.cat}</div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "var(--dark)", marginBottom: 14, lineHeight: 1.35 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "var(--orange)" }}>
                      ${p.price.toFixed(2)}{p.old && <del style={{ fontSize: 13, color: "#ccc", fontWeight: 400, marginLeft: 6 }}>${p.old.toFixed(2)}</del>}
                    </div>
                    <button onClick={() => addToCart(p, 1, null, null)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--orange)", color: "white", borderRadius: 8, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", transition: "all .22s", border: "none", cursor: "pointer" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/></svg> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <div style={{ padding: "0 0 96px" }}>
        <div className="container">
          <div className="reveal scale-up" style={{ background: "linear-gradient(130deg,#0f0f0f 0%,#1a0900 100%)", borderRadius: 28, padding: 80, display: "grid", gridTemplateColumns: "1fr 300px", gap: 50, alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -80, top: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,92,0,.22) 0%,transparent 70%)" }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "var(--orange)", textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 14 }}>🔥 Limited Time Offer</div>
              <h2 style={{ fontSize: "clamp(36px,4vw,58px)", color: "white", marginBottom: 18 }}>FIRST ORDER SPECIAL DISCOUNT</h2>
              <p style={{ fontSize: 16, color: "#666", lineHeight: 1.77, maxWidth: 480, marginBottom: 32 }}>New to Insta Printing? Get a massive discount on your first order. Valid for all products — no minimum order required.</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "13px 22px", fontSize: 14, color: "white", cursor: "pointer" }}
                onClick={() => navigator.clipboard.writeText("FIRST30").catch(()=>{})}>
                <span>Use code:</span>
                <span style={{ background: "var(--orange)", color: "white", padding: "5px 13px", borderRadius: 7, fontFamily: "monospace", fontSize: 16, fontWeight: 900, letterSpacing: 3 }}>FIRST30</span>
                <span style={{ fontSize: 11.5, color: "#555" }}>Click to copy</span>
              </div>
              <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 34px", background: "var(--orange)", color: "white", borderRadius: 10, fontSize: 14.5, fontWeight: 900, textTransform: "uppercase", marginTop: 28 }}>
                Claim Discount Now →
              </Link>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 220, height: 220, borderRadius: "50%", border: "3px solid rgba(255,92,0,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", position: "relative" }}>
                <div style={{ width: 182, height: 182, borderRadius: "50%", background: "linear-gradient(135deg,var(--orange),#ff8c42)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 44px rgba(255,92,0,.52)" }}>
                  <div style={{ fontFamily: "Bebas Neue", fontSize: 72, color: "white", lineHeight: 1 }}>30%</div>
                  <div style={{ fontFamily: "Bebas Neue", fontSize: 26, color: "rgba(255,255,255,.75)", letterSpacing: 3 }}>OFF</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#444", textTransform: "uppercase", letterSpacing: ".1em", marginTop: 14 }}>First Order Only</div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section style={{ padding: "96px 0", background: "var(--light)" }}>
        <div className="container">
          <div className="sec-head center">
            <div className="eyebrow reveal">Customer Reviews</div>
            <h2 className="sec-title reveal d1">WHAT OUR CLIENTS SAY</h2>
            <p className="sec-sub reveal d2">Real words from real customers who trust Insta Printing for all their business printing needs.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="testi-grid-resp">
            {testimonials.map((t, i) => (
              <div key={t.id} className={`reveal d${i+1}`} style={{ background: "white", borderRadius: 18, padding: "36px 32px", border: "1px solid var(--border)", transition: "all .38s", position: "relative" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 22px 55px rgba(0,0,0,.09)"; e.currentTarget.style.borderColor = "var(--orange)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <div style={{ position: "absolute", top: 20, right: 26, fontFamily: "Georgia,serif", fontSize: 90, color: "var(--orange)", opacity: .1, lineHeight: 1, userSelect: "none" }}>"</div>
                <div style={{ color: "#FFC107", letterSpacing: 3, fontSize: 14, marginBottom: 16 }}>{"★".repeat(t.rating)}</div>
                <p style={{ fontSize: 14.5, color: "var(--mid)", lineHeight: 1.8, marginBottom: 26 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Bebas Neue", fontSize: 22, color: "white", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: "var(--dark)", marginBottom: 3 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#aaa" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <div style={{ padding: "60px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <p style={{ textAlign: "center", fontSize: 12, color: "#c0c0c0", textTransform: "uppercase", letterSpacing: ".16em", marginBottom: 38 }}>Trusted by Leading Brands Across the US</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 56, flexWrap: "wrap" }}>
            {["NEXATECH","BLUERIDGE","VORTEX CO.","MERIDIAN","STARFORM","AXLECO"].map((b,i) => (
              <div key={b} className={`reveal d${i+1}`} style={{ fontFamily: "Bebas Neue", fontSize: 28, letterSpacing: 4, color: "#ccc", transition: "color .3s, transform .3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--orange)"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.transform = "none"; }}
              >{b}</div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <section style={{ background: "var(--dark)", padding: "96px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="nl-grid-resp">
            <div className="reveal from-left">
              <div className="eyebrow" style={{ color: "rgba(255,92,0,.8)" }}>Stay Updated</div>
              <h2 style={{ fontFamily: "Bebas Neue", fontSize: "clamp(32px,3.5vw,50px)", color: "white", marginBottom: 16 }}>GET EXCLUSIVE DEALS & PRINT TIPS</h2>
              <p style={{ fontSize: 16, color: "#555", lineHeight: 1.77, maxWidth: 480 }}>Subscribe and be first to know about promotions, new products, and expert design tips.</p>
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 13 }}>
                {["Early access to seasonal discounts","Free design templates every month","Printing tips & industry insights"].map(perk => (
                  <div key={perk} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#777" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(255,92,0,.15)", color: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>✓</div>
                    {perk}
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal from-right">
              <p style={{ marginBottom: 10, fontSize: 13, color: "#555", textTransform: "uppercase", letterSpacing: ".1em" }}>Your email address</p>
              <div style={{ display: "flex", borderRadius: 14, overflow: "hidden", boxShadow: "0 12px 44px rgba(0,0,0,.35)" }}>
                <input type="email" placeholder="Enter your email address..."
                  style={{ flex: 1, padding: "18px 22px", border: "none", background: "#1a1a1a", fontSize: 15, color: "white", outline: "none" }} />
                <button style={{ padding: "18px 26px", background: "var(--orange)", color: "white", border: "none", fontSize: 13.5, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em", cursor: "pointer" }}>Subscribe</button>
              </div>
              <p style={{ fontSize: 12, color: "#444", marginTop: 12 }}>🔒 No spam, ever. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pd { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(1.7)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media(max-width:1100px) {
          .hero-inner-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
          .cat-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
          .prod-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
          .steps-grid-resp { grid-template-columns: repeat(2,1fr) !important; gap: 40px !important; }
          .steps-line-hide { display: none !important; }
          .testi-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
          .nl-grid-resp { grid-template-columns: 1fr !important; gap: 48px !important; }
          .count-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:768px) {
          .cat-grid-resp { grid-template-columns: repeat(2,1fr) !important; gap: 14px !important; }
          .prod-grid-resp { grid-template-columns: repeat(2,1fr) !important; gap: 14px !important; }
          .testi-grid-resp { grid-template-columns: 1fr !important; }
          .steps-grid-resp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
