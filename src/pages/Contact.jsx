import { useState } from "react";
import { Link } from "react-router-dom";

const CONTACT_INFO = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    label: "Phone",
    value: "(403) 480-4020",
    sub: "Mon – Fri, 9am – 6pm MST",
    href: "tel:4034804020",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-10 7L2 7"/>
      </svg>
    ),
    label: "Email",
    value: "info@instaPrinting.CA",
    sub: "We reply within 24 hours",
    href: "mailto:info@instaPrinting.CA",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "Calgary, Alberta, Canada",
    sub: "Walk-ins welcome by appointment",
    href: "https://maps.google.com/?q=Calgary,Alberta,Canada",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: "Business Hours",
    value: "Mon – Fri: 9am – 6pm",
    sub: "Saturday: 10am – 4pm",
    href: null,
  },
];

const SUBJECTS = [
  "General Enquiry",
  "Request a Quote",
  "Order Status / Tracking",
  "Design Assistance",
  "Bulk / Corporate Orders",
  "Complaints & Feedback",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  // ── Validation ─────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.fullName.trim())      e.fullName = "Full name is required.";
    if (!form.email.trim())         e.email    = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                    e.email    = "Please enter a valid email address.";
    if (!form.message.trim())       e.message  = "Message is required.";
    else if (form.message.trim().length < 10)
                                    e.message  = "Message must be at least 10 characters.";
    return e;
  };

  // ── Submit ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      // ── API placeholder ────────────────────────────────────────
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Submission failed. Please try again.");
      // ──────────────────────────────────────────────────────────

      console.log("Contact form submitted:", form);
      await new Promise(r => setTimeout(r, 1500)); // simulate API
      setSuccess(true);
      setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  // ── Field component ─────────────────────────────────────────────
  const Field = ({ label, field, type = "text", placeholder, required = false, children }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={S.label}>
        {label}{required && <span style={{ color: "var(--orange)" }}> *</span>}
      </label>
      {children ?? (
        <input
          type={type}
          value={form[field]}
          onChange={set(field)}
          placeholder={placeholder}
          style={{ ...S.input, ...(errors[field] ? S.inputErr : {}) }}
          onFocus={e => { e.target.style.borderColor = "var(--orange)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,92,0,.08)"; }}
          onBlur={e  => { e.target.style.borderColor = errors[field] ? "#f33" : "var(--border)"; e.target.style.boxShadow = "none"; }}
        />
      )}
      {errors[field] && <p style={S.fieldErr}>⚠ {errors[field]}</p>}
    </div>
  );

  return (
    <div style={{ background: "var(--white)" }}>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="page-hero" style={{ padding: "80px 0" }}>
        <div className="ph-glow" />
        <div className="ph-grid" />
        <div style={{ maxWidth: 1320, margin: "auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555", marginBottom: 20 }}>
            <Link to="/" style={{ color: "#555", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "var(--orange)"}
              onMouseLeave={e => e.target.style.color = "#555"}>Home</Link>
            <span style={{ color: "#333" }}>›</span>
            <span style={{ color: "white" }}>Contact Us</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 28 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,92,0,.12)", border: "1px solid rgba(255,92,0,.3)", color: "var(--orange)", padding: "7px 16px", borderRadius: 100, fontSize: 11.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--orange)", animation: "pd 1.8s infinite" }} />
                Get In Touch
              </div>
              <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(52px, 7vw, 88px)", color: "white", lineHeight: .95, marginBottom: 20, animation: "fadeUp .8s ease both" }}>
                CONTACT<br /><span style={{ color: "var(--orange)" }}>US</span>
              </h1>
              <p style={{ fontSize: 17, color: "#aaa", lineHeight: 1.8, maxWidth: 520, animation: "fadeUp .8s ease .15s both" }}>
                We'd love to hear from you. Whether you have a question about an order, need a custom quote, or just want to talk print — our team is ready to help.
              </p>
            </div>

            {/* Response time badge */}
            <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 18, padding: "24px 28px", animation: "fadeUp .8s ease .25s both" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["⚡", "Typical response within 24 hours"], ["📞", "Phone support Mon–Fri 9am–6pm"], ["✅", "Free quotes, no obligation"]].map(([ico, txt]) => (
                  <div key={txt} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#bbb" }}>
                    <span style={{ fontSize: 18 }}>{ico}</span> {txt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ─────────────────────────────────── */}
      <section style={{ padding: "72px 0 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="info-cards-resp">
            {CONTACT_INFO.map((card) => {
              const inner = (
                <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 18, padding: "28px 24px", height: "100%", transition: "all .35s", cursor: card.href ? "pointer" : "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(255,92,0,.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ width: 50, height: 50, borderRadius: 13, background: "rgba(255,92,0,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)", marginBottom: 18 }}>
                    {card.icon}
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--mid)", marginBottom: 6 }}>{card.label}</p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "var(--dark)", marginBottom: 4, lineHeight: 1.4 }}>{card.value}</p>
                  <p style={{ fontSize: 12.5, color: "#bbb" }}>{card.sub}</p>
                </div>
              );
              return card.href ? (
                <a key={card.label} href={card.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "block" }} className="reveal">
                  {inner}
                </a>
              ) : (
                <div key={card.label} className="reveal">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ─────────────────────────────────────── */}
      <section style={{ padding: "72px 0 96px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 40, alignItems: "start" }} className="contact-layout-resp">

            {/* ── CONTACT FORM ─────────────────────────────────── */}
            <div>
              <div style={{ marginBottom: 32 }}>
                <div className="eyebrow">Send a Message</div>
                <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(30px,4vw,46px)", color: "var(--dark)", marginBottom: 10 }}>
                  LET'S START A CONVERSATION
                </h2>
                <p style={{ fontSize: 14.5, color: "var(--mid)", lineHeight: 1.75 }}>
                  Fill in the form below and a member of our team will get back to you as soon as possible.
                </p>
              </div>

              {/* Success message */}
              {success && (
                <div style={{ padding: "20px 24px", background: "rgba(0,176,144,.08)", border: "1px solid rgba(0,176,144,.3)", borderRadius: 14, marginBottom: 28, display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>🎉</span>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 15, color: "#00b090", marginBottom: 4 }}>Message Sent Successfully!</p>
                    <p style={{ fontSize: 13.5, color: "var(--mid)", lineHeight: 1.6 }}>
                      Thank you for reaching out! A member of our team will respond to your message within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* API error */}
              {apiError && (
                <div style={{ padding: "14px 18px", background: "rgba(255,51,51,.08)", border: "1px solid rgba(255,51,51,.2)", borderRadius: 12, marginBottom: 24, fontSize: 13.5, color: "#c00", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>⚠️</span> {apiError}
                </div>
              )}

              <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 22, padding: "36px 36px" }}>
                <form onSubmit={handleSubmit} noValidate>
                  {/* Row: Name + Email */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row-resp">
                    <Field label="Full Name" field="fullName" placeholder="John Smith" required />
                    <Field label="Email Address" field="email" type="email" placeholder="you@example.com" required />
                  </div>

                  {/* Row: Phone + Subject */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row-resp">
                    <Field label="Phone Number" field="phone" type="tel" placeholder="(403) 000-0000" />
                    <Field label="Subject" field="subject">
                      <select
                        value={form.subject}
                        onChange={set("subject")}
                        style={{ ...S.input, appearance: "none", cursor: "pointer" }}
                        onFocus={e => { e.target.style.borderColor = "var(--orange)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,92,0,.08)"; }}
                        onBlur={e  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}>
                        <option value="">Select a subject...</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label="Your Message" field="message" required>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Tell us about your project, questions, or anything else we can help with..."
                      rows={5}
                      style={{ ...S.input, resize: "vertical", minHeight: 130, ...(errors.message ? S.inputErr : {}) }}
                      onFocus={e => { e.target.style.borderColor = "var(--orange)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,92,0,.08)"; }}
                      onBlur={e  => { e.target.style.borderColor = errors.message ? "#f33" : "var(--border)"; e.target.style.boxShadow = "none"; }}
                    />
                    {errors.message && <p style={S.fieldErr}>⚠ {errors.message}</p>}
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ ...S.submitBtn, ...(loading ? S.submitDisabled : {}) }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "var(--orange-dark)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 34px rgba(255,92,0,.45)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(255,92,0,.35)"; }}>
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <span style={S.spinner} /> Sending Message...
                      </span>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 8 }}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        Send Message
                      </>
                    )}
                  </button>

                  <p style={{ fontSize: 12, color: "#bbb", marginTop: 14, textAlign: "center" }}>
                    🔒 Your information is kept private and never shared.
                  </p>
                </form>
              </div>
            </div>

            {/* ── SIDEBAR ──────────────────────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "sticky", top: 94 }}>

              {/* Response time card */}
              <div style={{ background: "var(--dark)", borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,92,0,.2) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 34, marginBottom: 14 }}>⚡</div>
                  <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 24, color: "white", letterSpacing: 1, marginBottom: 10 }}>FAST RESPONSE TIMES</h3>
                  <p style={{ fontSize: 13.5, color: "#666", lineHeight: 1.75, marginBottom: 20 }}>
                    Our team is available Monday through Friday. We aim to respond to every enquiry within 24 hours or less — often much sooner.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[["📧", "Email", "Within 24 hours"], ["📞", "Phone", "Immediate during hours"], ["💬", "Quote Request", "Within 2 hours"]].map(([ico, channel, time]) => (
                      <div key={channel} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "rgba(255,255,255,.05)", borderRadius: 10, fontSize: 13 }}>
                        <span style={{ color: "#bbb", display: "flex", alignItems: "center", gap: 6 }}><span>{ico}</span>{channel}</span>
                        <span style={{ color: "var(--orange)", fontWeight: 700, fontSize: 12 }}>{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 20, padding: "28px 24px" }}>
                <h4 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 20, letterSpacing: 1, color: "var(--dark)", marginBottom: 16 }}>QUICK ACTIONS</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "📋", label: "Get a Custom Quote", href: "/quote", primary: true },
                    { icon: "🛒", label: "Browse All Products", href: "/shop", primary: false },
                    { icon: "✏️", label: "Design Your Product", href: "/designer", primary: false },
                    { icon: "ℹ️", label: "About Insta Printing", href: "/about", primary: false },
                  ].map(item => (
                    <Link key={item.label} to={item.href}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 10, fontSize: 13.5, fontWeight: 700, textDecoration: "none", transition: "all .2s",
                        background: item.primary ? "var(--orange)" : "var(--light)",
                        color: item.primary ? "white" : "var(--dark)",
                      }}
                      onMouseEnter={e => { if (!item.primary) { e.currentTarget.style.background = "rgba(255,92,0,.08)"; e.currentTarget.style.color = "var(--orange)"; } else { e.currentTarget.style.background = "var(--orange-dark)"; } }}
                      onMouseLeave={e => { e.currentTarget.style.background = item.primary ? "var(--orange)" : "var(--light)"; e.currentTarget.style.color = item.primary ? "white" : "var(--dark)"; }}>
                      <span style={{ fontSize: 18 }}>{item.icon}</span> {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div style={{ background: "var(--light)", borderRadius: 20, padding: "24px" }}>
                <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--mid)", marginBottom: 14 }}>Follow Us</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[["f","Facebook","#1877f2"],["in","LinkedIn","#0077b5"],["ig","Instagram","#e1306c"],["yt","YouTube","#ff0000"]].map(([s, label, color]) => (
                    <a key={s} href="#" title={label}
                      style={{ width: 42, height: 42, borderRadius: 10, background: "white", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "var(--mid)", textDecoration: "none", transition: "all .25s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-3px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--mid)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}>
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ────────────────────────────────────────── */}
      <section style={{ padding: "0 0 96px" }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <div className="eyebrow">Find Us</div>
            <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(28px,4vw,44px)", color: "var(--dark)", marginBottom: 8 }}>OUR LOCATION</h2>
            <p style={{ fontSize: 14.5, color: "var(--mid)" }}>Based in Calgary, Alberta — serving businesses and individuals across Canada.</p>
          </div>
          <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 4px 30px rgba(0,0,0,.08)", position: "relative" }}>
            <iframe
              title="Insta Printing Location — Calgary, AB"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d160715.8185396!2d-114.2712!3d51.0447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170039f843fd5%3A0x266d3bb1b652b63a!2sCalgary%2C%20AB!5e0!3m2!1sen!2sca!4v1699000000000!5m2!1sen!2sca"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map overlay card */}
            <div style={{ position: "absolute", bottom: 20, left: 20, background: "white", borderRadius: 14, padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,.15)", border: "1px solid var(--border)", minWidth: 220 }}>
              <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 18, letterSpacing: 1, color: "var(--dark)", marginBottom: 4 }}>Insta Printing Inc.</p>
              <p style={{ fontSize: 12.5, color: "var(--mid)", lineHeight: 1.6 }}>Calgary, Alberta, Canada</p>
              <a href="https://maps.google.com/?q=Calgary,Alberta,Canada" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 800, color: "var(--orange)", textDecoration: "none", marginTop: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ / SUPPORT TEXT ─────────────────────────────────── */}
      <section style={{ padding: "72px 0 96px", background: "var(--light)" }}>
        <div className="container">
          <div className="sec-head center" style={{ marginBottom: 44 }}>
            <div className="eyebrow reveal">Common Questions</div>
            <h2 className="sec-title reveal d1">BEFORE YOU REACH OUT</h2>
            <p className="sec-sub reveal d2">You might find your answer here — we've covered the most frequently asked questions below.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, maxWidth: 920, margin: "0 auto" }} className="faq-grid-resp">
            {[
              { q: "How quickly will I receive a quote?", a: "Most custom quotes are prepared and sent within 2 business hours. For larger bulk orders, we may need up to 24 hours." },
              { q: "What file formats do you accept?", a: "We accept PDF, AI, PSD, EPS, PNG, and JPG files. For the sharpest results, supply print-ready PDFs at 300 DPI with bleed." },
              { q: "Do you offer rush or same-day printing?", a: "Yes! Rush production is available on select products. Place your order before 12PM MST and contact us to confirm availability." },
              { q: "Can I make changes after placing my order?", a: "Changes may be possible if your order hasn't gone to production yet. Contact us immediately and we'll do our best to accommodate." },
              { q: "Do you ship across Canada?", a: "Absolutely. We ship to all provinces and territories. Delivery times vary by location — most orders arrive within 3–7 business days." },
              { q: "Is there a minimum order quantity?", a: "Minimums vary by product. Business cards start at 100 pieces, while some products like stickers have no minimum. Check the product page for details." },
            ].map(({ q, a }) => (
              <div key={q} className="reveal"
                style={{ background: "white", borderRadius: 16, padding: "24px 22px", border: "1px solid var(--border)", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(255,92,0,.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <p style={{ fontWeight: 800, fontSize: 14.5, color: "var(--dark)", marginBottom: 8, lineHeight: 1.4 }}>{q}</p>
                <p style={{ fontSize: 13.5, color: "var(--mid)", lineHeight: 1.75 }}>{a}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <p style={{ fontSize: 14.5, color: "var(--mid)", marginBottom: 16 }}>Still have questions? We're happy to help.</p>
            <a href="mailto:info@instaPrinting.CA"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "var(--orange)", color: "white", borderRadius: 10, fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".07em", textDecoration: "none", boxShadow: "0 6px 22px rgba(255,92,0,.3)", transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--orange-dark)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.transform = "none"; }}>
              📧 Email Us Directly
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @keyframes pd { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(1.7)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:1100px) {
          .contact-layout-resp { grid-template-columns: 1fr !important; }
          .info-cards-resp     { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:768px) {
          .info-cards-resp   { grid-template-columns: 1fr !important; }
          .form-row-resp     { grid-template-columns: 1fr !important; }
          .faq-grid-resp     { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── Shared styles ──────────────────────────────────────────────────
const S = {
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: ".1em",
    color: "var(--dark)",
    marginBottom: 7,
  },
  input: {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid var(--border)",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "Outfit, sans-serif",
    color: "var(--dark)",
    outline: "none",
    transition: "border-color .2s, box-shadow .2s",
    boxSizing: "border-box",
    background: "white",
  },
  inputErr: {
    borderColor: "#f33",
    background: "rgba(255,51,51,.02)",
  },
  fieldErr: {
    fontSize: 12,
    color: "#f33",
    fontWeight: 600,
    marginTop: 5,
  },
  submitBtn: {
    width: "100%",
    padding: "15px",
    background: "var(--orange)",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: ".08em",
    cursor: "pointer",
    transition: "all .25s",
    boxShadow: "0 6px 22px rgba(255,92,0,.35)",
    fontFamily: "Outfit, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submitDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
    transform: "none !important",
  },
  spinner: {
    display: "inline-block",
    width: 16,
    height: 16,
    border: "2.5px solid rgba(255,255,255,.35)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin .7s linear infinite",
  },
};