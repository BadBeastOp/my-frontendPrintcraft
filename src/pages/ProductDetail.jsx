import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS, getPriceForQty } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import DesignEditor from "../components/product/DesignEditor.jsx";

const QTY_PRESETS = [100, 250, 500, 1000, 2500, 5000];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const { addToCart } = useCart();

  const [qty, setQty] = useState(product.pricingTiers?.[0]?.qty || 1);
  const [customQty, setCustomQty] = useState("");
  const [selSize, setSelSize] = useState(product.sizes?.[0] || "");
  const [selFinish, setSelFinish] = useState(product.finishes?.[0] || "");
  const [activeTab, setActiveTab] = useState("description");

  // Design / Upload state
  const [editorOpen, setEditorOpen] = useState(false);
  const [designData, setDesignData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [cartError, setCartError] = useState(false);
  const [toast, setToast] = useState("");
  const fileRef = useRef(null);

  const related = PRODUCTS.filter(p => p.id !== product.id && p.cat === product.cat).slice(0, 4);
  const unitPrice = getPriceForQty(product.pricingTiers || [{ qty: 1, price: product.price }], qty);
  const lineTotal = (unitPrice * qty).toFixed(2);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3200); };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    setUploadError("");
    if (!file) return;
    const accepted = ["image/png", "image/jpeg", "image/svg+xml", "application/pdf"];
    if (!accepted.includes(file.type)) { setUploadError("Only PNG, JPG, SVG or PDF accepted."); return; }
    if (file.size > 10 * 1024 * 1024) { setUploadError("File too large. Max 10MB."); return; }
    const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
    setUploadedFile({ file, preview, name: file.name, size: (file.size / (1024 * 1024)).toFixed(1) + " MB" });
    e.target.value = "";
  };

  const handleAddToCart = () => {
    if (!designData && !uploadedFile) {
      setCartError(true);
      setTimeout(() => setCartError(false), 3000);
      return;
    }
    addToCart({ ...product, price: unitPrice }, qty, selFinish, selSize);
    showToast(`"${product.name}" added to cart!`);
  };

  return (
    <div style={{ background: "var(--white)" }}>
      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb">
          <Link to="/" onMouseEnter={e => e.target.style.color = "var(--orange)"} onMouseLeave={e => e.target.style.color = "#999"}>Home</Link>
          <span className="bc-sep">›</span>
          <Link to="/shop" onMouseEnter={e => e.target.style.color = "var(--orange)"} onMouseLeave={e => e.target.style.color = "#999"}>Shop</Link>
          <span className="bc-sep">›</span>
          <Link to={`/shop?category=${encodeURIComponent(product.cat)}`} onMouseEnter={e => e.target.style.color = "var(--orange)"} onMouseLeave={e => e.target.style.color = "#999"}>{product.cat}</Link>
          <span className="bc-sep">›</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* PRODUCT BODY */}
      <div style={{ maxWidth: 1320, margin: "auto", padding: "52px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="product-layout-resp">

        {/* LEFT: Visual */}
        <div>
          <div style={{ background: product.bg, borderRadius: 24, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 160, border: "1px solid var(--border)", marginBottom: 20, position: "relative", overflow: "hidden" }}>
            {product.icon}
            {product.badge && <span style={{ position: "absolute", top: 20, left: 20, background: product.bc === "gb" ? "#00b090" : "var(--orange)", color: "white", fontSize: 11, fontWeight: 900, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase" }}>{product.badge}</span>}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ flex: 1, background: product.bg, borderRadius: 12, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, cursor: "pointer", border: i === 1 ? "2px solid var(--orange)" : "2px solid var(--border)", opacity: i === 1 ? 1 : 0.5 }}>
                {product.icon}
              </div>
            ))}
          </div>

          {/* Pricing Tiers Table */}
          {product.pricingTiers && (
            <div style={{ marginTop: 28, background: "var(--light)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}>
              <div style={{ padding: "14px 20px", background: "var(--dark)", fontFamily: "Bebas Neue", fontSize: 18, letterSpacing: 1, color: "white" }}>Quantity Pricing</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(255,92,0,.06)" }}>
                    <th style={{ padding: "10px 20px", textAlign: "left", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--mid)" }}>Qty</th>
                    <th style={{ padding: "10px 20px", textAlign: "left", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--mid)" }}>Unit Price</th>
                    <th style={{ padding: "10px 20px", textAlign: "left", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--mid)" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {product.pricingTiers.map((tier, i) => (
                    <tr key={tier.qty}
                      onClick={() => setQty(tier.qty)}
                      style={{ cursor: "pointer", borderTop: "1px solid var(--border)", background: qty === tier.qty ? "rgba(255,92,0,.07)" : "white", transition: "background .2s" }}>
                      <td style={{ padding: "12px 20px", fontSize: 14, fontWeight: qty === tier.qty ? 800 : 500, color: qty === tier.qty ? "var(--orange)" : "var(--dark)" }}>
                        {qty === tier.qty && <span style={{ marginRight: 6 }}>›</span>}{tier.qty.toLocaleString()}
                      </td>
                      <td style={{ padding: "12px 20px", fontSize: 14, fontWeight: 700, color: "var(--orange)" }}>${tier.price.toFixed(2)}/ea</td>
                      <td style={{ padding: "12px 20px", fontSize: 14, color: "var(--mid)" }}>${(tier.price * tier.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RIGHT: Info + Actions */}
        <div>
          <div style={{ fontSize: 12, color: "var(--orange)", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>{product.cat}</div>
          <h1 style={{ fontFamily: "Bebas Neue", fontSize: "clamp(32px,4vw,50px)", color: "var(--dark)", marginBottom: 14, lineHeight: 1.05 }}>{product.name}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ color: "#FFC107", fontSize: 14, letterSpacing: 2 }}>★★★★★</div>
            <span style={{ fontSize: 13, color: "var(--mid)" }}>4.9 · 124 reviews</span>
            {product.badge && <span style={{ padding: "3px 10px", background: product.bc === "gb" ? "rgba(0,176,144,.1)" : "rgba(255,92,0,.1)", color: product.bc === "gb" ? "#00b090" : "var(--orange)", borderRadius: 100, fontSize: 11, fontWeight: 800 }}>{product.badge}</span>}
          </div>

          {/* Price display */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "Bebas Neue", fontSize: 44, color: "var(--orange)", lineHeight: 1 }}>${unitPrice.toFixed(2)}</span>
            <span style={{ fontSize: 14, color: "var(--mid)" }}>per unit</span>
            <span style={{ fontSize: 14, color: "var(--dark)", fontWeight: 700 }}>· ${lineTotal} total for {qty.toLocaleString()}</span>
          </div>

          {/* Size selector */}
          {product.sizes?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>Size</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelSize(s)}
                    style={{ padding: "8px 14px", borderRadius: 9, fontSize: 12.5, fontWeight: 700, border: "2px solid", transition: "all .22s", cursor: "pointer",
                      borderColor: selSize === s ? "var(--orange)" : "var(--border)",
                      color: selSize === s ? "white" : "var(--dark)",
                      background: selSize === s ? "var(--orange)" : "white"
                    }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Finish selector */}
          {product.finishes?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>Finish</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {product.finishes.map(f => (
                  <button key={f} onClick={() => setSelFinish(f)}
                    style={{ padding: "8px 16px", borderRadius: 9, fontSize: 12.5, fontWeight: 700, border: "2px solid", transition: "all .22s", cursor: "pointer",
                      borderColor: selFinish === f ? "var(--orange)" : "var(--border)",
                      color: selFinish === f ? "white" : "var(--dark)",
                      background: selFinish === f ? "var(--orange)" : "white"
                    }}>{f}</button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>Quantity</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              {(product.pricingTiers || []).map(t => (
                <button key={t.qty} onClick={() => { setQty(t.qty); setCustomQty(""); }}
                  style={{ padding: "8px 14px", borderRadius: 9, fontSize: 12.5, fontWeight: 700, border: "2px solid", transition: "all .22s", cursor: "pointer",
                    borderColor: qty === t.qty ? "var(--orange)" : "var(--border)",
                    color: qty === t.qty ? "var(--orange)" : "var(--dark)",
                    background: qty === t.qty ? "rgba(255,92,0,.07)" : "white"
                  }}>{t.qty.toLocaleString()}</button>
              ))}
            </div>
            <input type="number" value={customQty} onChange={e => { setCustomQty(e.target.value); setQty(parseInt(e.target.value) || 1); }}
              placeholder="Or enter custom quantity"
              style={{ width: "100%", padding: "11px 16px", border: "1.5px solid var(--border)", borderRadius: 10, fontSize: 14, outline: "none", transition: "border-color .2s" }}
              onFocus={e => e.target.style.borderColor = "var(--orange)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
          </div>

          {/* ── CHANGE 1: Edit Design + Upload File buttons ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {/* Edit Design button */}
            <div>
              <button onClick={() => setEditorOpen(true)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 16px",
                  background: designData ? "#00b090" : "var(--orange)",
                  color: "white", borderRadius: 12, fontSize: 14, fontWeight: 900, textTransform: "uppercase",
                  letterSpacing: ".07em", border: "none", cursor: "pointer",
                  boxShadow: designData ? "0 4px 16px rgba(0,176,144,.3)" : "0 6px 22px rgba(255,92,0,.3)",
                  transition: "all .25s"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                {designData ? (
                  <><span>✅</span> Design Saved</>
                ) : (
                  <><span>✏️</span> Edit Design</>
                )}
              </button>
              <p style={{ fontSize: 11, color: "var(--mid)", textAlign: "center", marginTop: 6 }}>Customize your design online</p>
            </div>

            {/* Upload File button */}
            <div>
              <button onClick={() => setShowUpload(v => !v)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 16px",
                  background: uploadedFile ? "rgba(0,176,144,.08)" : "white",
                  color: uploadedFile ? "#00b090" : "var(--dark)",
                  borderRadius: 12, fontSize: 14, fontWeight: 900, textTransform: "uppercase",
                  letterSpacing: ".07em",
                  border: `2px solid ${uploadedFile ? "#00b090" : "var(--border)"}`,
                  cursor: "pointer", transition: "all .25s"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = uploadedFile ? "#00b090" : "var(--border)"; e.currentTarget.style.transform = "none"; }}>
                {uploadedFile ? (
                  <><span>✅</span> File Ready</>
                ) : (
                  <><span>📤</span> Upload File</>
                )}
              </button>
              <p style={{ fontSize: 11, color: "var(--mid)", textAlign: "center", marginTop: 6 }}>Upload your ready-made design</p>
            </div>
          </div>

          {/* Upload box */}
          {showUpload && (
            <div style={{ marginBottom: 14, animation: "fadeIn .3s ease" }}>
              {uploadedFile ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: "rgba(0,176,144,.07)", border: "1px solid rgba(0,176,144,.3)", borderRadius: 12 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 10, background: "var(--light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, overflow: "hidden", flexShrink: 0 }}>
                    {uploadedFile.preview ? <img src={uploadedFile.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "📄"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{uploadedFile.name}</p>
                    <p style={{ fontSize: 11, color: "#aaa" }}>{uploadedFile.size} · Ready to print</p>
                  </div>
                  <button onClick={() => fileRef.current?.click()} style={{ fontSize: 12, padding: "5px 10px", borderRadius: 7, border: "1px solid var(--border)", background: "white", cursor: "pointer", flexShrink: 0 }}>Change</button>
                  <button onClick={() => setUploadedFile(null)} style={{ color: "#bbb", background: "none", border: "none", cursor: "pointer", fontSize: 16, flexShrink: 0 }} onMouseEnter={e => e.target.style.color = "#f33"} onMouseLeave={e => e.target.style.color = "#bbb"}>✕</button>
                </div>
              ) : (
                <div onClick={() => fileRef.current?.click()}
                  style={{ border: "2px dashed var(--border)", borderRadius: 12, padding: 28, textAlign: "center", cursor: "pointer", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.background = "rgba(255,92,0,.03)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>📤</div>
                  <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Click to browse or drag & drop</p>
                  <p style={{ fontSize: 12, color: "#bbb" }}>PNG, JPG, SVG, PDF · Max 10MB</p>
                </div>
              )}
              <input ref={fileRef} type="file" accept=".png,.jpg,.jpeg,.svg,.pdf" onChange={handleUpload} style={{ display: "none" }} />
              {uploadError && <p style={{ fontSize: 12, color: "#f33", marginTop: 8, fontWeight: 600 }}>⚠️ {uploadError}</p>}
            </div>
          )}

          {/* Validation error */}
          {cartError && (
            <div style={{ padding: "12px 16px", background: "rgba(255,51,51,.08)", border: "1px solid rgba(255,51,51,.2)", borderRadius: 10, fontSize: 13, color: "#f33", marginBottom: 12, fontWeight: 600 }}>
              ⚠️ Please <strong>edit your design</strong> or <strong>upload a file</strong> before adding to cart.
            </div>
          )}

          {/* Add to Cart */}
          <button onClick={handleAddToCart}
            style={{ width: "100%", padding: 16, background: "var(--dark)", color: "white", borderRadius: 14, fontSize: 15, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,.2)", transition: "all .28s", marginBottom: 16 }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(255,92,0,.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--dark)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.2)"; }}>
            🛒 Add to Cart — ${lineTotal}
          </button>

          {/* Trust badges */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
            {[["🚚", "Free Shipping", "On orders $75+"], ["🔄", "Free Reprints", "Quality guaranteed"], ["⚡", "Fast Turnaround", "As fast as same-day"]].map(([ico, t, s]) => (
              <div key={t} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{ico}</div>
                <p style={{ fontWeight: 700, fontSize: 11.5, marginBottom: 2 }}>{t}</p>
                <p style={{ fontSize: 11, color: "var(--mid)" }}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ maxWidth: 1320, margin: "auto", padding: "0 28px 80px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: "2px solid var(--border)" }}>
          {["description", "features", "specifications", "shipping"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: "14px 22px", fontFamily: "Bebas Neue", fontSize: 17, letterSpacing: 1, transition: "all .22s", border: "none", cursor: "pointer", background: "none", textTransform: "capitalize",
                color: activeTab === tab ? "var(--orange)" : "var(--mid)",
                borderBottom: activeTab === tab ? "3px solid var(--orange)" : "3px solid transparent",
                marginBottom: -2
              }}>
              {tab}
            </button>
          ))}
        </div>

        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 20, padding: "36px 40px" }}>
          {activeTab === "description" && (
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--mid)", maxWidth: 720 }}>{product.description}</p>
          )}
          {activeTab === "features" && (
            <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(product.features || []).map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14.5, color: "var(--dark)" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,92,0,.1)", color: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, fontWeight: 900 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "specifications" && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Category", product.cat],
                  ["Available Sizes", (product.sizes || []).join(", ")],
                  ["Finish Options", (product.finishes || []).join(", ")],
                  ["Min. Quantity", product.pricingTiers?.[0]?.qty?.toLocaleString() || "1"],
                  ["Max. Quantity", product.pricingTiers?.[product.pricingTiers.length - 1]?.qty?.toLocaleString() || "Custom"],
                  ["Turnaround", "2-3 business days standard"],
                  ["File Formats", "PDF, AI, PSD, PNG, JPG (300 DPI)"],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "13px 0", fontWeight: 800, fontSize: 13.5, width: "40%", color: "var(--dark)" }}>{k}</td>
                    <td style={{ padding: "13px 0", fontSize: 13.5, color: "var(--mid)" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "shipping" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[["📦", "Standard (3-5 days)", "Free on orders over $75. $9.99 otherwise."],
                ["⚡", "Express (1-2 days)", "$14.99 — guaranteed next-business-day production."],
                ["🚀", "Same Day", "Available on orders placed before 2PM EST. $24.99."]].map(([ico, t, s]) => (
                <div key={t} style={{ display: "flex", gap: 16, padding: "18px 20px", background: "var(--light)", borderRadius: 14 }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{ico}</span>
                  <div><div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 4 }}>{t}</div><div style={{ fontSize: 13.5, color: "var(--mid)" }}>{s}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div style={{ background: "var(--light)", padding: "60px 0 80px" }}>
          <div className="container">
            <h2 style={{ fontFamily: "Bebas Neue", fontSize: "clamp(28px,4vw,42px)", color: "var(--dark)", marginBottom: 32 }}>Related Products</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }} className="related-grid-resp">
              {related.map(p => (
                <Link key={p.id} to={`/shop/${p.slug}`}
                  style={{ borderRadius: 16, overflow: "hidden", background: "white", border: "1px solid var(--border)", transition: "all .38s", display: "block" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 44px rgba(0,0,0,.1)"; e.currentTarget.style.borderColor = "var(--orange)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                  <div style={{ aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, background: p.bg }}>{p.icon}</div>
                  <div style={{ padding: "14px 16px 18px" }}>
                    <div style={{ fontSize: 10.5, color: "#bbb", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 4 }}>{p.cat}</div>
                    <div style={{ fontWeight: 800, fontSize: 13.5, color: "var(--dark)", marginBottom: 8 }}>{p.name}</div>
                    <div style={{ fontSize: 17, fontWeight: 900, color: "var(--orange)" }}>From ${p.pricingTiers?.[0]?.price?.toFixed(2) || p.price?.toFixed(2)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`toast ${toast ? "show" : ""}`}><span>{toast}</span></div>

      {/* Design Editor Modal */}
      <DesignEditor
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        productName={product.name}
        productIcon={product.icon}
        productBg={product.bg}
        onSave={(data) => { setDesignData(data); setEditorOpen(false); showToast("Design saved!"); }}
      />

      <style>{`
        @media(max-width:900px) {
          .product-layout-resp { grid-template-columns: 1fr !important; gap: 40px !important; }
          .related-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}