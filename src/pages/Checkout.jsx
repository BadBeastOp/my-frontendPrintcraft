import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const STRIPE_PK = "pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE";
const STEPS = ["Shipping", "Payment", "Review & Place Order"];

// ── Stripe card input component ────────────────────────────────────
function StripeCardForm({ onReady, onError, onSuccess, amount }) {
  const mountRef = useRef(null);
  const elementsRef = useRef(null);
  const cardRef = useRef(null);
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);

  // Dynamically load Stripe.js
  useEffect(() => {
    if (window.Stripe) { setStripeLoaded(true); return; }
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.onload = () => setStripeLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!stripeLoaded || !mountRef.current) return;
    const stripe = window.Stripe(STRIPE_PK);
    const elements = stripe.elements();
    const card = elements.create("card", {
      style: {
        base: {
          fontSize: "15px",
          fontFamily: "'Outfit', sans-serif",
          color: "#0f0f0f",
          "::placeholder": { color: "#bbb" },
        },
        invalid: { color: "#f33" },
      },
    });
    card.mount(mountRef.current);
    card.on("change", e => setCardError(e.error ? e.error.message : ""));
    elementsRef.current = elements;
    cardRef.current = { stripe, card };
    onReady?.();
    return () => card.destroy();
  }, [stripeLoaded]);

  const handlePay = async () => {
    if (!cardRef.current) return;
    setProcessing(true);
    setCardError("");
    const { stripe, card } = cardRef.current;
    // In production: fetch clientSecret from your server
    // const { clientSecret } = await fetch("/api/create-payment-intent", {...}).then(r => r.json());
    // const result = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } });
    // Simulated success for demo:
    await new Promise(r => setTimeout(r, 1800));
    setProcessing(false);
    onSuccess?.();
  };

  // Expose handlePay to parent
  useEffect(() => { onReady?.(handlePay); }, [stripeLoaded]);

  return (
    <div>
      {/* Secure badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(0,176,144,.07)", border: "1px solid rgba(0,176,144,.2)", borderRadius: 10, marginBottom: 20 }}>
        <span>🔒</span>
        <span style={{ fontSize: 12.5, color: "#00b090", fontWeight: 600 }}>Secured by Stripe · 256-bit SSL encryption</span>
      </div>

      {/* Accepted cards */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "var(--mid)", marginRight: 4 }}>Accepted:</span>
        {["VISA", "Mastercard", "Amex", "Discover"].map(c => (
          <span key={c} style={{ padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11.5, fontWeight: 800, color: "var(--mid)", background: "white" }}>{c}</span>
        ))}
      </div>

      {/* Card element */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--dark)", marginBottom: 8 }}>
          Card Details <span style={{ color: "var(--orange)" }}>*</span>
        </label>
        <div ref={mountRef}
          style={{ padding: "14px 16px", border: `1.5px solid ${cardError ? "#f33" : "var(--border)"}`, borderRadius: 10, background: "white", transition: "border-color .2s" }} />
        {cardError && (
          <p style={{ fontSize: 12, color: "#f33", marginTop: 6, fontWeight: 600 }}>⚠️ {cardError}</p>
        )}
      </div>

      <p style={{ fontSize: 12, color: "#bbb", marginBottom: 20 }}>
        Your card details are processed securely by Stripe and are never stored on our servers.
      </p>
    </div>
  );
}

// Need useRef inside StripeCardForm — import it:
import { useRef } from "react";

// ── Main Checkout component ────────────────────────────────────────
export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const [step, setStep]       = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const payHandlerRef         = useRef(null); // will hold StripeCardForm's pay fn

  const [ship, setShip] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", address: "", city: "", state: "", zip: "", country: "US"
  });
  const [shipMethod, setShipMethod] = useState("standard");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);

  const shippingCost = shipMethod === "standard" ? 0 : shipMethod === "express" ? 12.99 : 24.99;
  const orderTotal   = total + shippingCost;
  const refNum       = `IP-${Date.now().toString().slice(-8)}`;

  const shipValid = ship.firstName && ship.lastName && ship.email && ship.address && ship.city && ship.zip;

  if (cartItems.length === 0 && !success) {
    return (
      <div style={{ textAlign: "center", padding: "120px 20px" }}>
        <h2 style={{ fontFamily: "Bebas Neue", fontSize: 40 }}>Nothing to checkout</h2>
        <Link to="/shop" style={{ display: "inline-block", marginTop: 20, padding: "14px 30px", background: "var(--orange)", color: "white", borderRadius: 12, fontWeight: 900 }}>Go to Shop</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--light)" }}>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="ph-glow" /><div className="ph-grid" />
        <div className="ph-inner">
          <h1>CHECKOUT</h1>
          <p>🔒 Secure, encrypted checkout powered by Stripe.</p>
        </div>
      </section>

      {/* PROGRESS */}
      <div className="progress-bar">
        <div className="progress-inner">
          {STEPS.map((s, i) => (
            <span key={s} style={{ display: "contents" }}>
              <div className={`prog-step ${i < step ? "done" : i === step ? "active" : ""}`}>
                <div className="prog-num">{i < step ? "✓" : i + 1}</div>
                <span className="prog-label">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`prog-line ${i < step ? "done" : ""}`} />}
            </span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: "52px 0 96px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 32, alignItems: "start" }} className="checkout-layout-resp">

            {/* FORM */}
            <div>

              {/* ── STEP 0: SHIPPING ── */}
              {step === 0 && (
                <>
                  <div className="form-card">
                    <div className="form-card-head">
                      <div className="form-card-num">1</div>
                      <div><h3>Contact & Shipping Details</h3></div>
                    </div>
                    <div className="form-card-body">
                      <div className="form-row cols-2">
                        <FormField label="First Name" val={ship.firstName} onChange={v => setShip({ ...ship, firstName: v })} placeholder="John" />
                        <FormField label="Last Name" val={ship.lastName} onChange={v => setShip({ ...ship, lastName: v })} placeholder="Smith" />
                      </div>
                      <div className="form-row cols-2">
                        <FormField label="Email" val={ship.email} onChange={v => setShip({ ...ship, email: v })} placeholder="you@company.com" type="email" />
                        <FormField label="Phone" val={ship.phone} onChange={v => setShip({ ...ship, phone: v })} placeholder="+1 (555) 000-0000" req={false} />
                      </div>
                      <div className="form-row">
                        <FormField label="Company (Optional)" val={ship.company} onChange={v => setShip({ ...ship, company: v })} placeholder="Your Business Name" req={false} />
                      </div>
                      <div className="form-row">
                        <FormField label="Street Address" val={ship.address} onChange={v => setShip({ ...ship, address: v })} placeholder="123 Print Avenue" />
                      </div>
                      <div className="form-row cols-3">
                        <FormField label="City" val={ship.city} onChange={v => setShip({ ...ship, city: v })} placeholder="Toronto" />
                        <FormField label="Province/State" val={ship.state} onChange={v => setShip({ ...ship, state: v })} placeholder="ON" />
                        <FormField label="Postal/ZIP" val={ship.zip} onChange={v => setShip({ ...ship, zip: v })} placeholder="M5V 2H1" />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="form-card">
                    <div className="form-card-head">
                      <div className="form-card-num">2</div>
                      <h3>Shipping Method</h3>
                    </div>
                    <div className="form-card-body">
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                          { v: "standard", n: "Standard (3-5 days)", d: "Most popular", p: "FREE", free: true },
                          { v: "express",  n: "Express (1-2 days)",   d: "Next-day production", p: "$12.99", free: false },
                          { v: "sameday",  n: "Same-Day Rush",        d: "Order before 2PM", p: "$24.99", free: false },
                        ].map(opt => (
                          <div key={opt.v} onClick={() => setShipMethod(opt.v)}
                            style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", border: `2px solid ${shipMethod === opt.v ? "var(--orange)" : "var(--border)"}`, borderRadius: 12, cursor: "pointer", transition: "all .25s", background: shipMethod === opt.v ? "rgba(255,92,0,.04)" : "white" }}>
                            <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${shipMethod === opt.v ? "var(--orange)" : "var(--border)"}`, position: "relative", flexShrink: 0 }}>
                              {shipMethod === opt.v && <div style={{ position: "absolute", inset: 2, borderRadius: "50%", background: "var(--orange)" }} />}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, fontSize: 14 }}>{opt.n}</div>
                              <div style={{ fontSize: 12, color: "#bbb" }}>{opt.d}</div>
                            </div>
                            <div style={{ fontWeight: 900, fontSize: 15, color: opt.free ? "#00b090" : "var(--dark)" }}>{opt.p}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button onClick={() => { if (shipValid) setStep(1); }}
                    disabled={!shipValid}
                    style={{ width: "100%", padding: 17, background: shipValid ? "var(--orange)" : "#ccc", color: "white", borderRadius: 12, fontSize: 15, fontWeight: 900, textTransform: "uppercase", border: "none", cursor: shipValid ? "pointer" : "not-allowed", boxShadow: shipValid ? "0 6px 22px rgba(255,92,0,.3)" : "none", transition: "all .28s" }}>
                    Continue to Payment →
                  </button>
                </>
              )}

              {/* ── STEP 1: STRIPE PAYMENT ── */}
              {step === 1 && (
                <>
                  <div className="form-card">
                    <div className="form-card-head">
                      <div className="form-card-num">3</div>
                      <div>
                        <h3>Payment</h3>
                        <p style={{ fontSize: 12, color: "var(--mid)", marginTop: 2 }}>Card payment only — powered by Stripe</p>
                      </div>
                    </div>
                    <div className="form-card-body">
                      <StripeCardForm
                        amount={orderTotal}
                        onReady={(payFn) => { payHandlerRef.current = payFn; }}
                        onSuccess={() => { setSuccess(true); clearCart(); }}
                      />
                    </div>
                  </div>

                  {/* Order notes */}
                  <div className="form-card">
                    <div className="form-card-head">
                      <div className="form-card-num">4</div>
                      <h3>Order Notes (Optional)</h3>
                    </div>
                    <div className="form-card-body">
                      <textarea value={notes} onChange={e => setNotes(e.target.value)}
                        placeholder="Special instructions, colour preferences, or delivery notes..."
                        className="form-textarea" rows={4} />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setStep(0)} style={{ padding: "14px 22px", border: "2px solid var(--border)", borderRadius: 12, fontSize: 14, fontWeight: 800, background: "white", cursor: "pointer", transition: "all .22s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--orange)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>← Back</button>
                    <button onClick={() => setStep(2)} style={{ flex: 1, padding: 17, background: "var(--orange)", color: "white", borderRadius: 12, fontSize: 15, fontWeight: 900, textTransform: "uppercase", border: "none", cursor: "pointer", boxShadow: "0 6px 22px rgba(255,92,0,.3)", transition: "all .28s" }}>
                      Review Order →
                    </button>
                  </div>
                </>
              )}

              {/* ── STEP 2: REVIEW & PAY ── */}
              {step === 2 && (
                <div className="form-card">
                  <div className="form-card-head">
                    <div className="form-card-num">✓</div>
                    <h3>Review & Place Order</h3>
                  </div>
                  <div className="form-card-body">
                    {/* Shipping summary */}
                    <div style={{ background: "var(--light)", borderRadius: 12, padding: "14px 18px", marginBottom: 18 }}>
                      <p style={{ fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>Shipping to:</p>
                      <p style={{ fontSize: 14, color: "var(--mid)", lineHeight: 1.7 }}>
                        {ship.firstName} {ship.lastName}<br />
                        {ship.address}, {ship.city} {ship.state} {ship.zip}<br />
                        {ship.email}
                      </p>
                    </div>

                    {/* Items */}
                    {cartItems.map(item => (
                      <div key={item.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ width: 50, height: 50, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, background: item.bg || "#fff5f0", border: "1px solid var(--border)", position: "relative" }}>
                          {item.icon || "🛒"}
                          <span style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, background: "var(--orange)", color: "white", borderRadius: "50%", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>{item.qty}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 700, fontSize: 13.5 }}>{item.name}</p>
                          <p style={{ fontSize: 11.5, color: "#bbb" }}>{item.cat || item.category}</p>
                        </div>
                        <span style={{ fontWeight: 900, fontSize: 14, color: "var(--orange)" }}>${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}

                    {/* Agree */}
                    <div onClick={() => setAgree(!agree)}
                      style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 14, background: "var(--light)", borderRadius: 10, cursor: "pointer", marginTop: 18 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", flexShrink: 0, marginTop: 1, transition: "all .22s",
                        background: agree ? "var(--orange)" : "transparent", borderColor: agree ? "var(--orange)" : "var(--border)" }}>
                        {agree && "✓"}
                      </div>
                      <p style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.65 }}>
                        I agree to the <a href="#" style={{ color: "var(--orange)", fontWeight: 700 }}>Terms of Service</a> and confirm my order details are correct.
                      </p>
                    </div>

                    {/* Pay button — triggers Stripe */}
                    <button
                      onClick={async () => {
                        setLoading(true);
                        if (payHandlerRef.current) {
                          await payHandlerRef.current();
                        } else {
                          // Fallback simulation
                          await new Promise(r => setTimeout(r, 1500));
                          setSuccess(true);
                          clearCart();
                        }
                        setLoading(false);
                      }}
                      disabled={!agree || loading}
                      style={{ width: "100%", padding: 18, marginTop: 18, background: agree ? "var(--orange)" : "#ccc", color: "white", borderRadius: 14, fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em", border: "none", cursor: agree ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: agree ? "0 6px 22px rgba(255,92,0,.35)" : "none", transition: "all .28s" }}>
                      {loading ? (
                        <><span style={{ display: "inline-block", width: 16, height: 16, border: "2.5px solid rgba(255,255,255,.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> Processing Payment...</>
                      ) : (
                        <>🔒 Pay ${orderTotal.toFixed(2)} — Place Order</>
                      )}
                    </button>

                    <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                      <button onClick={() => setStep(1)} style={{ flex: 1, padding: "12px", border: "2px solid var(--border)", borderRadius: 10, fontSize: 13, fontWeight: 700, background: "white", cursor: "pointer" }}>← Edit Payment</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ORDER SUMMARY SIDEBAR */}
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", position: "sticky", top: 94 }}>
              <div style={{ padding: "22px 26px", background: "var(--dark)", borderBottom: "1px solid var(--border)" }}>
                <h3 style={{ fontFamily: "Bebas Neue", fontSize: 22, letterSpacing: 1, color: "white" }}>Order Summary</h3>
              </div>
              <div style={{ padding: "22px 26px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid var(--border)" }}>
                  {cartItems.map(item => (
                    <div key={item.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: item.bg || "#fff5f0", border: "1px solid var(--border)", flexShrink: 0, position: "relative" }}>
                        {item.icon || "🛒"}
                        <span style={{ position: "absolute", top: -5, right: -5, width: 17, height: 17, background: "var(--orange)", color: "white", borderRadius: "50%", fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>{item.qty}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 700, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                        <p style={{ fontSize: 11, color: "#bbb" }}>{item.cat || item.category}</p>
                      </div>
                      <span style={{ fontWeight: 800, fontSize: 13, color: "var(--orange)", flexShrink: 0 }}>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <SummaryRow label="Subtotal" value={`$${total.toFixed(2)}`} />
                <SummaryRow label="Shipping" value={shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`} green={shippingCost === 0} />
                <div style={{ height: 1, background: "var(--border)", margin: "12px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 900 }}>
                  <span>Total</span><span style={{ color: "var(--orange)" }}>${orderTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
                  {[["🔒", "Stripe-secured payment"], ["🚚", "Free shipping over $75"], ["🔄", "30-day return policy"], ["✅", "Quality guarantee"]].map(([ico, t]) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "var(--mid)" }}>
                      <span style={{ fontSize: 16 }}>{ico}</span> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS */}
      {success && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "white", borderRadius: 28, padding: "60px 50px", textAlign: "center", maxWidth: 500, width: "100%", animation: "fadeIn .4s ease" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
            <h2 style={{ fontFamily: "Bebas Neue", fontSize: 44, marginBottom: 12 }}>Payment Successful!</h2>
            <p style={{ fontSize: 15, color: "var(--mid)", lineHeight: 1.75, marginBottom: 24 }}>
              Thank you, <strong>{ship.firstName}</strong>! Your payment was processed successfully. A confirmation has been sent to <strong>{ship.email}</strong>.
            </p>
            <div style={{ display: "inline-block", padding: "10px 24px", background: "rgba(255,92,0,.1)", border: "1.5px solid rgba(255,92,0,.25)", color: "var(--orange)", borderRadius: 100, fontSize: 14, fontWeight: 800, marginBottom: 28 }}>
              Order Ref: {refNum}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link to="/shop" style={{ padding: "14px 28px", background: "var(--orange)", color: "white", borderRadius: 12, fontSize: 14, fontWeight: 900, textTransform: "uppercase" }}>Continue Shopping</Link>
              <Link to="/" style={{ padding: "14px 28px", border: "2px solid var(--border)", color: "var(--mid)", borderRadius: 12, fontSize: 14, fontWeight: 800, textTransform: "uppercase" }}>Back to Home</Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .prog-label { display: inline; }
        @media(max-width:1100px) { .checkout-layout-resp { grid-template-columns: 1fr !important; } }
        @media(max-width:768px)  { .prog-label { display: none; } }
      `}</style>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────
function FormField({ label, val, onChange, placeholder, type = "text", req = true }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}{req && <span className="req"> *</span>}</label>
      <input type={type} value={val} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="form-input" />
    </div>
  );
}

function SummaryRow({ label, value, green = false }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--mid)", marginBottom: 8 }}>
      <span>{label}</span>
      <span style={green ? { color: "#00b090", fontWeight: 700 } : {}}>{value}</span>
    </div>
  );
}