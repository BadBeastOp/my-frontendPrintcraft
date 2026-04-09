import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

const CATS = ["All Categories","Business Cards","Banners","Apparel","Stickers","Packaging","Flyers"];
const SORT_OPTS = [
  { v: "featured", l: "Featured" },
  { v: "price-asc", l: "Price: Low to High" },
  { v: "price-desc", l: "Price: High to Low" },
  { v: "rating", l: "Top Rated" },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [cat, setCat] = useState("All Categories");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [gridView, setGridView] = useState(4);
  const [toast, setToast] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const c = searchParams.get("category");
    const q = searchParams.get("search");
    if (c) setCat(c);
    if (q) setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: .1 });
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => io.observe(el));
    return () => io.disconnect();
  });

  const filtered = useMemo(() => {
    let r = [...PRODUCTS];
    if (cat !== "All Categories") r = r.filter(p => p.cat.includes(cat) || p.f === cat.toLowerCase());
    if (search.trim()) { const q = search.toLowerCase(); r = r.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)); }
    if (minPrice) r = r.filter(p => p.price >= parseFloat(minPrice));
    if (maxPrice) r = r.filter(p => p.price <= parseFloat(maxPrice));
    if (sort === "price-asc") r.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") r.sort((a, b) => b.price - a.price);
    return r;
  }, [cat, search, sort, minPrice, maxPrice]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3200); };

  const handleAdd = (p) => {
    addToCart(p, 1, null, null);
    showToast(`"${p.name}" added to cart!`);
  };

  return (
    <div style={{ background: "var(--white)" }}>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="ph-glow" /><div className="ph-grid" />
        <div style={{ maxWidth: 1320, margin: "auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555", marginBottom: 16 }}>
                <Link to="/" style={{ color: "#555" }} onMouseEnter={e=>e.target.style.color="var(--orange)"} onMouseLeave={e=>e.target.style.color="#555"}>Home</Link>
                <span style={{ color: "#333" }}>›</span>
                <span style={{ color: "white" }}>Shop</span>
              </div>
              <h1 style={{ fontFamily: "Bebas Neue", fontSize: "clamp(46px,6vw,78px)", color: "white", marginBottom: 12, animation: "fadeUp .8s ease both" }}>ALL PRODUCTS</h1>
              <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, animation: "fadeUp .8s ease .15s both" }}>Premium custom printing, delivered fast. Browse {PRODUCTS.length} products.</p>
            </div>
            <div style={{ display: "flex", gap: 32, animation: "fadeUp .8s ease .3s both" }}>
              {[["500+","Products"],["48H","Turnaround"],["FREE","Shipping $75+"]].map(([n,l])=>(
                <div key={l} style={{ textAlign: "center" }}>
                  <strong style={{ color: "var(--orange)", fontFamily: "Bebas Neue", fontSize: 22, letterSpacing: 1, display: "block" }}>{n}</strong>
                  <span style={{ fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: ".08em" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BODY */}
      <div style={{ padding: "52px 0 96px" }}>
        <div style={{ maxWidth: 1320, margin: "auto", padding: "0 28px", display: "grid", gridTemplateColumns: "288px 1fr", gap: 36, alignItems: "start" }} className="shop-layout-resp">

          {/* SIDEBAR */}
          <div style={{ position: "sticky", top: 94, display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Search */}
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 18, padding: 24 }}>
              <div style={{ fontFamily: "Bebas Neue", fontSize: 19, letterSpacing: 1, marginBottom: 18 }}>Search</div>
              <div style={{ position: "relative" }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                  style={{ width: "100%", padding: "11px 40px 11px 14px", border: "1.5px solid var(--border)", borderRadius: 10, fontSize: 13.5, outline: "none", transition: "border-color .2s" }}
                  onFocus={e => e.target.style.borderColor = "var(--orange)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                <button style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--mid)", background: "none", border: "none", fontSize: 14, cursor: "pointer" }}>🔍</button>
              </div>
            </div>

            {/* Categories */}
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 18, padding: 24 }}>
              <div style={{ fontFamily: "Bebas Neue", fontSize: 19, letterSpacing: 1, marginBottom: 18 }}>Categories</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {CATS.map(c => (
                  <div key={c} onClick={() => setCat(c)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px",
                    borderRadius: 9, cursor: "pointer", fontSize: 13.5, fontWeight: 500, transition: "all .22s",
                    background: cat === c ? "rgba(255,92,0,.08)" : "transparent",
                    color: cat === c ? "var(--orange)" : "var(--dark)",
                    fontWeight: cat === c ? 700 : 500
                  }}>
                    <span>{c}</span>
                    <span style={{ background: cat === c ? "var(--orange)" : "var(--light)", color: cat === c ? "white" : "var(--mid)", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>
                      {c === "All Categories" ? PRODUCTS.length : PRODUCTS.filter(p => p.cat.toLowerCase().includes(c.toLowerCase())).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 18, padding: 24 }}>
              <div style={{ fontFamily: "Bebas Neue", fontSize: 19, letterSpacing: 1, marginBottom: 18 }}>Price Range</div>
              <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                {[["Min",minPrice,setMinPrice],["Max",maxPrice,setMaxPrice]].map(([label,val,set]) => (
                  <div key={label} style={{ flex: 1, position: "relative" }}>
                    <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--mid)", fontSize: 13, pointerEvents: "none" }}>$</span>
                    <input type="number" value={val} onChange={e => set(e.target.value)} placeholder={label}
                      style={{ width: "100%", padding: "9px 10px 9px 22px", border: "1.5px solid var(--border)", borderRadius: 9, fontSize: 13.5, outline: "none", transition: "border-color .2s" }}
                      onFocus={e => e.target.style.borderColor = "var(--orange)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                ))}
              </div>
            </div>

            {/* Clear */}
            <button onClick={() => { setCat("All Categories"); setSearch(""); setMinPrice(""); setMaxPrice(""); setSort("featured"); }}
              style={{ width: "100%", padding: 11, border: "2px solid var(--border)", color: "var(--mid)", borderRadius: 10, fontSize: 13, fontWeight: 700, background: "white", cursor: "pointer", transition: "all .22s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#f55"; e.currentTarget.style.color = "#f55"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--mid)"; }}>
              Clear All Filters
            </button>
          </div>

          {/* PRODUCTS */}
          <div>
            {/* Toolbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26, padding: "14px 18px", background: "var(--light)", borderRadius: 14, flexWrap: "wrap" }}>
              <div style={{ fontSize: 14, color: "var(--mid)", flex: 1, whiteSpace: "nowrap" }}>
                Showing <strong style={{ color: "var(--dark)" }}>{filtered.length}</strong> products
              </div>
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ padding: "9px 32px 9px 14px", border: "1.5px solid var(--border)", borderRadius: 9, fontSize: 13.5, color: "var(--dark)", outline: "none", cursor: "pointer", background: "white", appearance: "none" }}>
                {SORT_OPTS.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
              <div style={{ display: "flex", gap: 4, background: "white", border: "1.5px solid var(--border)", borderRadius: 9, padding: 4 }}>
                {[4, 2].map(n => (
                  <button key={n} onClick={() => setGridView(n)}
                    style={{ width: 34, height: 34, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, transition: "all .22s", border: "none", cursor: "pointer",
                      background: gridView === n ? "var(--orange)" : "none", color: gridView === n ? "white" : "var(--mid)" }}>
                    {n === 4 ? "⊞" : "⊟"}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontFamily: "Bebas Neue", fontSize: 32, marginBottom: 10 }}>No products found</h3>
                <p style={{ color: "var(--mid)" }}>Try adjusting your filters.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${gridView},1fr)`, gap: 22, transition: "all .4s" }} className="shop-prod-grid">
                {filtered.map((p, i) => (
                  <div key={p.id} className={`reveal d${(i%4)+1}`}
                    style={{ borderRadius: 18, overflow: "hidden", background: "white", border: "1px solid var(--border)", transition: "all .38s var(--ease)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-10px)"; e.currentTarget.style.boxShadow = "0 26px 65px rgba(0,0,0,.12)"; e.currentTarget.style.borderColor = "var(--orange)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
                  >
                    <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 68, background: p.bg }}>{p.icon}</div>
                      {p.badge && <span style={{ position: "absolute", top: 12, left: 12, background: p.bc === "gb" ? "#00b090" : "var(--orange)", color: "white", fontSize: 10.5, fontWeight: 900, padding: "4px 12px", borderRadius: 100 }}>{p.badge}</span>}
                      <div style={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 6, opacity: 0, transition: "all .3s" }} className="pactions">
                        <div style={{ width: 34, height: 34, background: "white", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, boxShadow: "0 2px 12px rgba(0,0,0,.12)", cursor: "pointer" }}>♡</div>
                        <Link to={`/shop/${p.slug}`} style={{ width: 34, height: 34, background: "white", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, boxShadow: "0 2px 12px rgba(0,0,0,.12)" }}>👁</Link>
                      </div>
                    </div>
                    <div style={{ padding: "18px 20px 22px" }}>
                      <div style={{ fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 6 }}>{p.cat}</div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "var(--dark)", marginBottom: 14, lineHeight: 1.35 }}>{p.name}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ fontSize: 20, fontWeight: 900, color: "var(--orange)" }}>
                          ${p.price.toFixed(2)}{p.old && <del style={{ fontSize: 13, color: "#ccc", fontWeight: 400, marginLeft: 6 }}>${p.old.toFixed(2)}</del>}
                        </div>
                        <button onClick={() => handleAdd(p)}
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--orange)", color: "white", borderRadius: 8, fontSize: 12, fontWeight: 800, textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all .22s" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/></svg> Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOAST */}
      <div className={`toast ${toast ? "show" : ""}`}><span>{toast}</span></div>

      <style>{`
        .pactions { opacity: 0 !important; }
        .reveal:hover .pactions { opacity: 1 !important; }
        @media(max-width:1100px) { .shop-layout-resp { grid-template-columns: 1fr !important; } }
        @media(max-width:768px) { .shop-prod-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </div>
  );
}
