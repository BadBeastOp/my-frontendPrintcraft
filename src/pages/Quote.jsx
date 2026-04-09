import { useState } from "react";
import { Link } from "react-router-dom";

const PRODUCT_TYPES = [
  { id: "cards", icon: "🪪", name: "Business Cards", sub: "48+ styles" },
  { id: "banners", icon: "🖼️", name: "Banners & Signs", sub: "All sizes" },
  { id: "apparel", icon: "👕", name: "Apparel Print", sub: "T-shirts, hoodies" },
  { id: "stickers", icon: "🪟", name: "Stickers & Labels", sub: "Die-cut & more" },
  { id: "packaging", icon: "📦", name: "Packaging", sub: "Boxes & mailers" },
  { id: "flyers", icon: "📄", name: "Flyers & Leaflets", sub: "A5, A4, A3" },
  { id: "large", icon: "🖨️", name: "Large Format", sub: "Posters & prints" },
  { id: "calendars", icon: "📅", name: "Calendars", sub: "Wall & desk" },
  { id: "other", icon: "✨", name: "Other / Custom", sub: "Tell us more" },
];

const QTY_PRESETS = ["25","50","100","250","500","1000","2500","5000+"];
const FINISHES = ["Matte Laminate","Gloss Laminate","Soft Touch","UV Spot","Uncoated","Foil Stamp"];
const TIMELINES = [
  { icon: "🚀", name: "Same Day", days: "Before 2PM EST", price: "+$24.99" },
  { icon: "⚡", name: "Rush (1-2 days)", days: "Next business day", price: "+$14.99" },
  { icon: "📦", name: "Standard (3-5 days)", days: "Most popular", price: "Free" },
  { icon: "💰", name: "Economy (7-10 days)", days: "Best value", price: "Free" },
];
const COLORS = ["#FF5C00","#1a1a1a","#2563EB","#16A34A","#7B2FFF","#DC2626","#EAB308","#EC4899","#06B6D4","#ffffff"];

export default function Quote() {
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [customQty, setCustomQty] = useState("");
  const [finishes, setFinishes] = useState([]);
  const [timeline, setTimeline] = useState("standard");
  const [colors, setColors] = useState([]);
  const [files, setFiles] = useState([]);
  const [agree, setAgree] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const [contact, setContact] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", website: "", message: "", budget: "",
  });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3200); };

  const toggleFinish = (f) => setFinishes(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const toggleColor = (c) => setColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const valid = newFiles.filter(f => f.size <= 50 * 1024 * 1024);
    if (valid.length < newFiles.length) showToast("Some files exceeded 50MB and were skipped.");
    setFiles(prev => [...prev, ...valid]);
    e.target.value = "";
  };

  const handleSubmit = async () => {
    if (!product || !contact.firstName || !contact.email) {
      showToast("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
  };

  const refNum = `QT-${Date.now().toString().slice(-8)}`;

  return (
    <div style={{ background: "var(--white)" }}>
      {/* PAGE HERO */}
      <section style={{ background: "var(--dark)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 120% at 85% 50%,rgba(255,92,0,.18) 0%,transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ maxWidth: 1320, margin: "auto", padding: "0 28px", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="quote-hero-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555", marginBottom: 20 }}>
              <Link to="/" style={{ color: "#555", transition: "color .2s" }} onMouseEnter={e=>e.target.style.color="var(--orange)"} onMouseLeave={e=>e.target.style.color="#555"}>Home</Link>
              <span style={{ color: "#333" }}>›</span>
              <span style={{ color: "white" }}>Get a Quote</span>
            </div>
            <h1 style={{ fontFamily: "Bebas Neue", fontSize: "clamp(48px,6vw,80px)", color: "white", marginBottom: 16, animation: "fadeUp .8s ease both" }}>GET A CUSTOM QUOTE</h1>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8, maxWidth: 480, animation: "fadeUp .8s ease .15s both" }}>
              Tell us about your project and we'll send you a detailed quote within 2 hours. No commitment required.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28, animation: "fadeUp .8s ease .3s both" }}>
              {[{icon:"⚡",text:"2-Hour Response"},{icon:"💰",text:"No Hidden Fees"},{icon:"🎨",text:"Free Design Check"}].map(b => (
                <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 100, fontSize: 13, color: "#bbb" }}>
                  <span style={{ fontSize: 16 }}>{b.icon}</span> {b.text}
                </div>
              ))}
            </div>
          </div>

          {/* Stats card */}
          <div style={{ animation: "fadeUp .8s ease .2s both" }} className="quote-hero-right">
            <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 24, padding: 36, backdropFilter: "blur(10px)" }}>
              <div style={{ fontFamily: "Bebas Neue", fontSize: 22, color: "white", letterSpacing: 1, marginBottom: 24 }}>Why Get a Quote?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "💡", num: "Best Price", label: "Guaranteed lowest price for your volume" },
                  { icon: "⚡", num: "2 Hours", label: "Average quote response time" },
                  { icon: "🎨", num: "Free", label: "Design consultation included" },
                  { icon: "🔒", num: "No Commitment", label: "Quote is 100% obligation-free" },
                ].map(item => (
                  <div key={item.num} style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,92,0,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: "Bebas Neue", fontSize: 22, color: "var(--orange)", letterSpacing: 1, lineHeight: 1 }}>{item.num}</div>
                      <div style={{ fontSize: 13, color: "#666" }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS BAR */}
      <div style={{ background: "var(--orange)", padding: "20px 0" }}>
        <div style={{ maxWidth: 1320, margin: "auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          {[["1","Fill the form"],["2","Get your quote"],["3","Approve & pay"],["4","We print & ship"]].map(([n,t], i, arr) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.2)", color: "white", fontFamily: "Bebas Neue", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</div>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,.9)", fontWeight: 600 }}>{t}</span>
              {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,.3)", fontSize: 20, marginLeft: 12 }}>›</span>}
            </div>
          ))}
        </div>
      </div>

      {/* FORM BODY */}
      <div style={{ padding: "72px 0 96px", background: "var(--light)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 36, alignItems: "start" }} className="quote-layout-resp">

            {/* MAIN FORM */}
            <div>
              {/* STEP 1: Product */}
              <div className="form-card" style={{ transition: "box-shadow .3s" }} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 40px rgba(0,0,0,.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div className="form-card-head">
                  <div className="form-card-num">1</div>
                  <div>
                    <h3>Select Product Type</h3>
                    <p style={{ fontSize: 13, color: "var(--mid)", marginTop: 2 }}>What are you looking to print?</p>
                  </div>
                </div>
                <div className="form-card-body">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 8 }} className="product-sel-grid">
                    {PRODUCT_TYPES.map(p => (
                      <div key={p.id} onClick={() => setProduct(p.id)}
                        style={{ border: `2px solid ${product===p.id?"var(--orange)":"var(--border)"}`, borderRadius: 14, padding: "18px 14px", textAlign: "center", cursor: "pointer", transition: "all .28s", background: product===p.id?"rgba(255,92,0,.07)":"white" }}
                        onMouseEnter={e=>{ if(product!==p.id){ e.currentTarget.style.borderColor="var(--orange)"; e.currentTarget.style.background="rgba(255,92,0,.03)"; } }}
                        onMouseLeave={e=>{ if(product!==p.id){ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.background="white"; } }}>
                        <div style={{ fontSize: 34, marginBottom: 10 }}>{p.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: product===p.id?"var(--orange)":"var(--dark)", lineHeight: 1.3 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: "#bbb", marginTop: 4 }}>{p.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP 2: Specs */}
              <div className="form-card" onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 40px rgba(0,0,0,.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div className="form-card-head">
                  <div className="form-card-num">2</div>
                  <div>
                    <h3>Print Specifications</h3>
                    <p style={{ fontSize: 13, color: "var(--mid)", marginTop: 2 }}>Size, quantity, and finishing options</p>
                  </div>
                </div>
                <div className="form-card-body">
                  {/* Quantity */}
                  <div style={{ marginBottom: 20 }}>
                    <label className="form-label">Quantity <span style={{ color: "var(--orange)" }}>*</span></label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10, marginTop: 8 }}>
                      {QTY_PRESETS.map(q => (
                        <button key={q} onClick={() => { setQty(q); setCustomQty(""); }}
                          style={{ padding: "7px 14px", border: "1.5px solid", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .22s",
                            borderColor: qty===q?"var(--orange)":"var(--border)",
                            color: qty===q?"var(--orange)":"var(--dark)",
                            background: qty===q?"rgba(255,92,0,.07)":"white"
                          }}>{q}</button>
                      ))}
                    </div>
                    <input value={customQty} onChange={e=>{ setCustomQty(e.target.value); setQty(""); }}
                      placeholder="Or enter custom quantity..." className="form-input" type="number" />
                  </div>

                  {/* Size & Material */}
                  <div className="form-row cols-2">
                    <div className="form-group">
                      <label className="form-label">Size / Format</label>
                      <select className="form-select">
                        {["A5 (148×210mm)","A4 (210×297mm)","A3 (297×420mm)","Square 100×100mm","Business Card 85×55mm","Custom Size"].map(s=><option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Material / Stock</label>
                      <select className="form-select">
                        {["350gsm Silk Coated","400gsm Premium","170gsm Uncoated","250gsm Recycled","Custom Material"].map(s=><option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Finishing */}
                  <div style={{ marginBottom: 20 }}>
                    <label className="form-label" style={{ display: "block", marginBottom: 10 }}>Finishing Options (select all that apply)</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {FINISHES.map(f => (
                        <button key={f} onClick={() => toggleFinish(f)}
                          style={{ padding: "9px 16px", border: "2px solid", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .22s",
                            borderColor: finishes.includes(f)?"var(--orange)":"var(--border)",
                            color: finishes.includes(f)?"var(--orange)":"var(--dark)",
                            background: finishes.includes(f)?"rgba(255,92,0,.06)":"white"
                          }}>{f}</button>
                      ))}
                    </div>
                  </div>

                  {/* Sides */}
                  <div className="form-row cols-2">
                    <div className="form-group">
                      <label className="form-label">Print Sides</label>
                      <select className="form-select">
                        <option>Single Sided</option>
                        <option>Double Sided (same design)</option>
                        <option>Double Sided (different design)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Colour Mode</label>
                      <select className="form-select">
                        <option>Full Colour (CMYK)</option>
                        <option>Pantone Spot Colour</option>
                        <option>Black & White</option>
                        <option>1 Colour</option>
                        <option>2 Colour</option>
                      </select>
                    </div>
                  </div>

                  {/* Brand Colors */}
                  <div>
                    <label className="form-label" style={{ display: "block", marginBottom: 10 }}>Brand Colours (optional)</label>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {COLORS.map(c => (
                        <div key={c} onClick={() => toggleColor(c)}
                          style={{ width: 32, height: 32, borderRadius: "50%", cursor: "pointer", transition: "all .22s", background: c,
                            border: "3px solid",
                            borderColor: colors.includes(c)?"var(--orange)":"transparent",
                            boxShadow: colors.includes(c)?"0 0 0 2px white, 0 0 0 4px var(--orange)":"0 0 0 2px rgba(0,0,0,.1)",
                            transform: colors.includes(c)?"scale(1.15)":"scale(1)"
                          }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: Timeline */}
              <div className="form-card" onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 40px rgba(0,0,0,.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div className="form-card-head">
                  <div className="form-card-num">3</div>
                  <div>
                    <h3>Production Timeline</h3>
                    <p style={{ fontSize: 13, color: "var(--mid)", marginTop: 2 }}>When do you need it?</p>
                  </div>
                </div>
                <div className="form-card-body">
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {TIMELINES.map(t => (
                      <div key={t.name} onClick={() => setTimeline(t.name)}
                        style={{ flex: 1, minWidth: 130, border: `2px solid ${timeline===t.name?"var(--orange)":"var(--border)"}`, borderRadius: 12, padding: 16, textAlign: "center", cursor: "pointer", transition: "all .28s", background: timeline===t.name?"rgba(255,92,0,.07)":"white" }}
                        onMouseEnter={e=>{ if(timeline!==t.name) e.currentTarget.style.borderColor="var(--orange)"; }}
                        onMouseLeave={e=>{ if(timeline!==t.name) e.currentTarget.style.borderColor="var(--border)"; }}>
                        <div style={{ fontSize: 26, marginBottom: 8 }}>{t.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "var(--dark)" }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: "#bbb", marginTop: 3 }}>{t.days}</div>
                        <div style={{ fontSize: 12, color: "var(--orange)", fontWeight: 800, marginTop: 6 }}>{t.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP 4: Files */}
              <div className="form-card" onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 40px rgba(0,0,0,.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div className="form-card-head">
                  <div className="form-card-num">4</div>
                  <div>
                    <h3>Upload Design Files</h3>
                    <p style={{ fontSize: 13, color: "var(--mid)", marginTop: 2 }}>Optional — upload now or send later</p>
                  </div>
                </div>
                <div className="form-card-body">
                  <div style={{ border: "2px dashed var(--border)", borderRadius: 14, padding: 32, textAlign: "center", cursor: "pointer", transition: "all .25s", position: "relative" }}
                    onClick={() => document.getElementById("quote-file-input").click()}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--orange)"; e.currentTarget.style.background="rgba(255,92,0,.03)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.background="transparent"; }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "var(--dark)", marginBottom: 5 }}>Drop your files here or click to browse</p>
                    <p style={{ fontSize: 12.5, color: "#bbb", lineHeight: 1.6 }}>PDF, AI, PSD, EPS, PNG, JPG, SVG · Max 50MB per file<br />Multiple files allowed</p>
                    <span style={{ display: "inline-block", padding: "9px 20px", background: "var(--orange)", color: "white", borderRadius: 9, fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", marginTop: 14, transition: "background .2s" }}>Browse Files</span>
                    <input id="quote-file-input" type="file" multiple accept=".pdf,.ai,.psd,.eps,.png,.jpg,.jpeg,.svg" onChange={handleFileChange} style={{ display: "none" }} />
                  </div>
                  {files.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                      {files.map((f, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "var(--light)", borderRadius: 9, fontSize: 13 }}>
                          <span style={{ fontSize: 20 }}>📄</span>
                          <span style={{ flex: 1, fontWeight: 600, truncate: true }}>{f.name}</span>
                          <span style={{ fontSize: 11, color: "#bbb", whiteSpace: "nowrap" }}>{(f.size/1024/1024).toFixed(1)} MB</span>
                          <button onClick={() => setFiles(files.filter((_,j)=>j!==i))} style={{ color: "#bbb", background: "none", border: "none", cursor: "pointer", fontSize: 15, transition: "color .2s" }} onMouseEnter={e=>e.target.style.color="#f33"} onMouseLeave={e=>e.target.style.color="#bbb"}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 5: Contact */}
              <div className="form-card" onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 40px rgba(0,0,0,.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div className="form-card-head">
                  <div className="form-card-num">5</div>
                  <div>
                    <h3>Your Contact Details</h3>
                    <p style={{ fontSize: 13, color: "var(--mid)", marginTop: 2 }}>We'll send your quote to this email</p>
                  </div>
                </div>
                <div className="form-card-body">
                  <div className="form-row cols-2">
                    <div className="form-group">
                      <label className="form-label">First Name <span style={{ color: "var(--orange)" }}>*</span></label>
                      <input value={contact.firstName} onChange={e=>setContact({...contact,firstName:e.target.value})} placeholder="John" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name <span style={{ color: "var(--orange)" }}>*</span></label>
                      <input value={contact.lastName} onChange={e=>setContact({...contact,lastName:e.target.value})} placeholder="Smith" className="form-input" />
                    </div>
                  </div>
                  <div className="form-row cols-2">
                    <div className="form-group">
                      <label className="form-label">Email Address <span style={{ color: "var(--orange)" }}>*</span></label>
                      <input type="email" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} placeholder="you@company.com" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})} placeholder="+1 (555) 000-0000" className="form-input" />
                    </div>
                  </div>
                  <div className="form-row cols-2">
                    <div className="form-group">
                      <label className="form-label">Company / Business Name</label>
                      <input value={contact.company} onChange={e=>setContact({...contact,company:e.target.value})} placeholder="PrintCo Agency" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Estimated Budget</label>
                      <select value={contact.budget} onChange={e=>setContact({...contact,budget:e.target.value})} className="form-select">
                        <option value="">Select a range...</option>
                        <option>Under $100</option>
                        <option>$100 – $500</option>
                        <option>$500 – $1,000</option>
                        <option>$1,000 – $5,000</option>
                        <option>$5,000+</option>
                        <option>No budget set</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Project Details / Additional Notes</label>
                      <textarea value={contact.message} onChange={e=>setContact({...contact,message:e.target.value})} placeholder="Tell us about your project, any special requirements, brand guidelines, delivery address, or anything else that would help us prepare an accurate quote..." className="form-textarea" rows="5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* AGREE & SUBMIT */}
              <div onClick={() => setAgree(!agree)}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 16, background: "white", border: "1px solid var(--border)", borderRadius: 10, cursor: "pointer", marginBottom: 20 }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", transition: "all .22s", flexShrink: 0, marginTop: 1,
                  background: agree ? "var(--orange)" : "transparent",
                  borderColor: agree ? "var(--orange)" : "var(--border)"
                }}>{agree && "✓"}</div>
                <p style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.65 }}>
                 I agree to the <a href="#" style={{ color: "var(--orange)", fontWeight: 700 }}>Terms of Service</a> and <a href="#" style={{ color: "var(--orange)", fontWeight: 700 }}>Privacy Policy</a>. I understand Insta Printing will contact me regarding this quote request.
                </p>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                style={{ width: "100%", padding: 18, background: "var(--orange)", color: "white", borderRadius: 14, fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em", transition: "all .28s", boxShadow: "0 6px 22px rgba(255,92,0,.35)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                onMouseEnter={e=>{ if(!loading){ e.currentTarget.style.background="var(--orange-dark)"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 34px rgba(255,92,0,.45)"; } }}
                onMouseLeave={e=>{ e.currentTarget.style.background="var(--orange)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 6px 22px rgba(255,92,0,.35)"; }}>
                {loading ? (
                  <><span style={{ display: "inline-block", width: 16, height: 16, border: "2.5px solid rgba(255,255,255,.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> Submitting Quote...</>
                ) : (
                  <> 🚀 Submit Quote Request</>
                )}
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#bbb", marginTop: 14 }}>🔒 Your information is safe and will never be shared.</p>
            </div>

            {/* SIDEBAR */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 94 }} className="quote-sidebar-resp">

              {/* Contact Methods */}
              <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 20, padding: 28, transition: "box-shadow .3s" }} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <h4 style={{ fontFamily: "Bebas Neue", fontSize: 22, letterSpacing: 1, marginBottom: 18 }}>Prefer to Talk?</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { icon: "📞", label: "Call Us", value: "+1 (800) PRINT-IT", sub: "Mon-Fri, 8am-8pm EST" },
                    { icon: "✉️", label: "Email Us", value: "hello@printcraft.com", sub: "Reply within 2 hours" },
                    { icon: "💬", label: "Live Chat", value: "Chat with us now", sub: "Instant support available" },
                  ].map(method => (
                    <div key={method.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, background: "var(--light)", borderRadius: 12, transition: "all .25s", cursor: "pointer" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,92,0,.07)"; e.currentTarget.style.transform="translateX(4px)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="var(--light)"; e.currentTarget.style.transform="none"; }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--orange)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{method.icon}</div>
                      <div>
                        <div style={{ fontSize: 12, color: "#bbb", marginBottom: 2, textTransform: "uppercase", letterSpacing: ".07em" }}>{method.label}</div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--dark)" }}>{method.value}</div>
                        <div style={{ fontSize: 11.5, color: "#bbb" }}>{method.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 20, padding: 28, transition: "box-shadow .3s" }} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
               <h4 style={{ fontFamily: "Bebas Neue", fontSize: 22, letterSpacing: 1, marginBottom: 18 }}>Why Insta Printing?</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { icon: "✅", text: "Pantone-accurate colour matching on every job" },
                    { icon: "⚡", text: "Same-day production available before 2PM" },
                    { icon: "🌿", text: "FSC-certified sustainable materials available" },
                    { icon: "🔄", text: "Free reprints if quality doesn't meet standards" },
                    { icon: "🏭", text: "HP Indigo & Roland professional equipment" },
                    { icon: "📦", text: "Secure packaging for damage-free delivery" },
                  ].map(item => (
                    <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 13.5, color: "var(--mid)", lineHeight: 1.6 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(255,92,0,.1)", color: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, marginTop: 1, fontWeight: 900 }}>{item.icon}</div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 20, padding: 28, transition: "box-shadow .3s" }} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.07)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <h4 style={{ fontFamily: "Bebas Neue", fontSize: 22, letterSpacing: 1, marginBottom: 18 }}>What Clients Say</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { text: "Got our quote in under an hour. Prices were unbeatable and the quality blew us away.", name: "Alex T.", role: "Marketing Manager", color: "#FF5C00" },
                   { text: "Insta Printing handled our 5,000 piece rush order in 48 hours. Absolutely incredible service.", name: "Maria S.", role: "Event Coordinator", color: "#6C5CE7" },
                  ].map(t => (
                    <div key={t.name} style={{ padding: 16, background: "var(--light)", borderRadius: 12, borderLeft: "3px solid var(--orange)" }}>
                      <div style={{ color: "#FFC107", fontSize: 11, letterSpacing: 1, marginBottom: 6 }}>★★★★★</div>
                      <p style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 10 }}>"{t.text}"</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Bebas Neue", fontSize: 14, color: "white", flexShrink: 0 }}>{t.name[0]}</div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--dark)" }}>{t.name}</div>
                          <div style={{ fontSize: 11, color: "#bbb" }}>{t.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {success && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "white", borderRadius: 28, padding: "60px 50px", textAlign: "center", maxWidth: 520, width: "100%", animation: "popIn .5s var(--ease) both" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>📋</div>
            <h2 style={{ fontFamily: "Bebas Neue", fontSize: 46, color: "var(--dark)", marginBottom: 12 }}>QUOTE SUBMITTED!</h2>
            <p style={{ fontSize: 15, color: "var(--mid)", lineHeight: 1.75, marginBottom: 24 }}>
              Thank you, <strong>{contact.firstName}</strong>! We've received your quote request and our team will send a detailed quote to <strong>{contact.email}</strong> within 2 hours.
            </p>
            <div style={{ display: "inline-block", padding: "10px 24px", background: "rgba(255,92,0,.1)", border: "1.5px solid rgba(255,92,0,.25)", color: "var(--orange)", borderRadius: 100, fontSize: 14, fontWeight: 800, marginBottom: 28 }}>
              Quote Ref: {refNum}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/shop" style={{ padding: "14px 28px", background: "var(--orange)", color: "white", borderRadius: 12, fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".07em", transition: "all .25s" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="var(--orange-dark)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="var(--orange)"; e.currentTarget.style.transform="none"; }}>
                Browse Products
              </Link>
              <Link to="/" style={{ padding: "14px 28px", border: "2px solid var(--border)", color: "var(--mid)", borderRadius: 12, fontSize: 14, fontWeight: 800, textTransform: "uppercase", transition: "all .25s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--orange)"; e.currentTarget.style.color="var(--orange)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--mid)"; }}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className={`toast ${toast ? "show" : ""}`}><span>{toast}</span></div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:1100px) {
          .quote-hero-grid { grid-template-columns: 1fr !important; }
          .quote-hero-right { display: none !important; }
          .quote-layout-resp { grid-template-columns: 1fr !important; }
          .quote-sidebar-resp { position: static !important; }
        }
        @media(max-width:768px) {
          .product-sel-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
