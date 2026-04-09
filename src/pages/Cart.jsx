import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { PRODUCTS } from "../data/products.js";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, total, addToCart } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState("free");
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3200); };

  const COUPONS = { "FIRST30": 30, "SAVE10": 10, "VIP20": 20 };

  const applyCoupon = () => {
    const c = coupon.toUpperCase().trim();
    if (COUPONS[c]) {
      setDiscount(COUPONS[c]);
      setCouponStatus({ type: "success", msg: `✅ "${c}" applied — ${COUPONS[c]}% off!` });
    } else {
      setDiscount(0);
      setCouponStatus({ type: "error", msg: "❌ Invalid coupon code." });
    }
  };

  const shippingCost = shipping === "free" ? 0 : shipping === "express" ? 12.99 : 24.99;
  const discountAmt = total * (discount / 100);
  const orderTotal = total - discountAmt + shippingCost;

  const upsells = PRODUCTS.filter(p => !cartItems.find(ci => ci.id === p.id)).slice(0, 3);

  if (cartItems.length === 0) {
    return (
      <div style={{ background: "var(--white)" }}>
        {/* PROGRESS */}
        <div className="progress-bar">
          <div className="progress-inner">
            <div className="prog-step active"><div className="prog-num">1</div><span>Cart</span></div>
            <div className="prog-line" />
            <div className="prog-step"><div className="prog-num">2</div><span>Checkout</span></div>
            <div className="prog-line" />
            <div className="prog-step"><div className="prog-num">3</div><span>Confirm</span></div>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <div style={{ fontSize: 80, marginBottom: 24, animation: "wobble 2s ease-in-out infinite" }}>🛒</div>
          <h2 style={{ fontFamily: "Bebas Neue", fontSize: 40, letterSpacing: 1, marginBottom: 12 }}>Your Cart is Empty</h2>
          <p style={{ fontSize: 16, color: "var(--mid)", marginBottom: 32, lineHeight: 1.7 }}>Browse our premium print products and add something great!</p>
          <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 34px", background: "var(--orange)", color: "white", borderRadius: 12, fontSize: 15, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".07em", boxShadow: "0 6px 22px rgba(255,92,0,.35)" }}>
            Browse Products →
          </Link>
        </div>
        <style>{`@keyframes wobble{0%,100%{transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--white)" }}>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="ph-glow" /><div className="ph-grid" />
        <div className="ph-inner">
          <h1>YOUR CART</h1>
          <p>{cartItems.reduce((s,i)=>s+i.qty,0)} items · Ready to checkout</p>
        </div>
      </section>

      {/* PROGRESS */}
      <div className="progress-bar">
        <div className="progress-inner">
          <div className="prog-step active"><div className="prog-num">1</div><span>Cart</span></div>
          <div className="prog-line" />
          <div className="prog-step"><div className="prog-num">2</div><span>Checkout</span></div>
          <div className="prog-line" />
          <div className="prog-step"><div className="prog-num">3</div><span>Confirm</span></div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: "52px 0 96px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 36, alignItems: "start" }} className="cart-layout-resp">

            {/* CART TABLE */}
            <div>
              <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
                {/* Head */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 16, padding: "16px 28px", background: "var(--light)", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--mid)", borderBottom: "1px solid var(--border)" }} className="cart-head-hide">
                  {["Product","Unit Price","Quantity","Total",""].map(h => <span key={h}>{h}</span>)}
                </div>

                {cartItems.map(item => (
                  <div key={item.key} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 16, padding: "24px 28px", borderBottom: "1px solid var(--border)", alignItems: "center", transition: "background .2s", animation: "itemIn .4s ease" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 72, height: 72, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0, border: "1px solid var(--border)", background: item.bg || "#fff5f0" }}>{item.icon || "🛒"}</div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 14.5, marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: "#bbb" }}>{item.cat || item.category}</div>
                        <a href="#" style={{ fontSize: 12, color: "var(--orange)", fontWeight: 700 }} onClick={e=>{ e.preventDefault(); removeFromCart(item.key); showToast("Item removed"); }}>Remove</a>
                      </div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--mid)" }}>${item.price.toFixed(2)}</div>
                    <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--border)", borderRadius: 10, overflow: "hidden", width: "fit-content" }}>
                      <button onClick={() => updateQty(item.key, item.qty - 1)} style={{ width: 36, height: 38, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", fontSize: 16, transition: "all .2s" }} onMouseEnter={e=>{ e.currentTarget.style.background="var(--orange)"; e.currentTarget.style.color="white"; }} onMouseLeave={e=>{ e.currentTarget.style.background="none"; e.currentTarget.style.color="inherit"; }}>−</button>
                      <span style={{ width: 40, textAlign: "center", fontWeight: 800, fontSize: 14 }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} style={{ width: 36, height: 38, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", fontSize: 16, transition: "all .2s" }} onMouseEnter={e=>{ e.currentTarget.style.background="var(--orange)"; e.currentTarget.style.color="white"; }} onMouseLeave={e=>{ e.currentTarget.style.background="none"; e.currentTarget.style.color="inherit"; }}>+</button>
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 900, color: "var(--orange)" }}>${(item.price * item.qty).toFixed(2)}</div>
                    <button onClick={() => { removeFromCart(item.key); showToast("Item removed"); }} style={{ width: 34, height: 34, borderRadius: 8, background: "var(--light)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 16, border: "none", cursor: "pointer", transition: "all .22s" }} onMouseEnter={e=>{ e.currentTarget.style.color="#f33"; e.currentTarget.style.background="rgba(255,51,51,.1)"; }} onMouseLeave={e=>{ e.currentTarget.style.color="#ccc"; e.currentTarget.style.background="var(--light)"; }}>✕</button>
                  </div>
                ))}

                {/* Actions bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderTop: "1px solid var(--border)", background: "var(--light)", flexWrap: "wrap", gap: 14 }}>
                  <Link to="/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", border: "2px solid var(--border)", borderRadius: 10, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--dark)", transition: "all .22s" }} onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--orange)"; e.currentTarget.style.color="var(--orange)"; }} onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--dark)"; }}>← Continue Shopping</Link>
                  <button onClick={() => showToast("Cart updated!")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", background: "var(--dark)", color: "white", borderRadius: 10, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", border: "none", cursor: "pointer", transition: "background .22s" }} onMouseEnter={e=>e.currentTarget.style.background="var(--orange)"} onMouseLeave={e=>e.currentTarget.style.background="var(--dark)"}>Update Cart</button>
                </div>
              </div>

              {/* COUPON */}
              <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 18, padding: "24px 28px", marginTop: 20 }}>
                <h4 style={{ fontFamily: "Bebas Neue", fontSize: 20, letterSpacing: 1, marginBottom: 14 }}>🏷️ Have a Coupon?</h4>
                <div style={{ display: "flex", gap: 10 }}>
                  <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter coupon code"
                    onKeyDown={e => e.key === "Enter" && applyCoupon()}
                    style={{ flex: 1, padding: "12px 16px", border: "1.5px solid var(--border)", borderRadius: 10, fontSize: 14, outline: "none", transition: "border-color .2s" }}
                    onFocus={e=>e.target.style.borderColor="var(--orange)"} onBlur={e=>e.target.style.borderColor="var(--border)"} />
                  <button onClick={applyCoupon} style={{ padding: "12px 22px", background: "var(--dark)", color: "white", borderRadius: 10, fontSize: 13, fontWeight: 800, textTransform: "uppercase", border: "none", cursor: "pointer", transition: "background .22s" }} onMouseEnter={e=>e.currentTarget.style.background="var(--orange)"} onMouseLeave={e=>e.currentTarget.style.background="var(--dark)"}>Apply</button>
                </div>
                {couponStatus && <p style={{ marginTop: 12, fontSize: 13.5, fontWeight: 700, color: couponStatus.type === "success" ? "#00b090" : "#f33" }}>{couponStatus.msg}</p>}
                <p style={{ fontSize: 12, color: "#bbb", marginTop: 8 }}>Try: FIRST30, SAVE10, VIP20</p>
              </div>

              {/* UPSELLS */}
              {upsells.length > 0 && (
                <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 18, padding: "24px 28px", marginTop: 20 }}>
                  <h4 style={{ fontFamily: "Bebas Neue", fontSize: 20, letterSpacing: 1, marginBottom: 16 }}>You Might Also Need</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {upsells.map(p => (
                      <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, border: "1.5px solid var(--border)", borderRadius: 12, transition: "all .25s", cursor: "pointer" }}
                        onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--orange)"; e.currentTarget.style.background="rgba(255,92,0,.03)"; }}
                        onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.background="transparent"; }}>
                        <div style={{ width: 52, height: 52, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, background: p.bg }}>{p.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 13.5 }}>{p.name}</div>
                          <div style={{ fontSize: 13, color: "var(--orange)", fontWeight: 800 }}>${p.price.toFixed(2)}</div>
                        </div>
                        <button onClick={() => { addToCart(p, 1, null, null); showToast(`"${p.name}" added!`); }}
                          style={{ padding: "8px 14px", background: "var(--orange)", color: "white", borderRadius: 8, fontSize: 12, fontWeight: 800, textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ORDER SUMMARY */}
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", position: "sticky", top: 94 }}>
              <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--border)", background: "var(--dark)" }}>
                <h3 style={{ fontFamily: "Bebas Neue", fontSize: 24, letterSpacing: 1, color: "white" }}>Order Summary</h3>
              </div>
              <div style={{ padding: "24px 28px" }}>
                {/* Shipping options */}
                <p style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>Shipping Method</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {[{v:"free",n:"Standard Shipping",d:"3-5 business days",p:"FREE"},
                    {v:"express",n:"Express Shipping",d:"1-2 business days",p:"$12.99"},
                    {v:"sameday",n:"Same-Day Rush",d:"Order before 2PM EST",p:"$24.99"}
                  ].map(opt => (
                    <div key={opt.v} onClick={() => setShipping(opt.v)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", border: `2px solid ${shipping===opt.v?"var(--orange)":"var(--border)"}`, borderRadius: 12, cursor: "pointer", transition: "all .25s", background: shipping===opt.v?"rgba(255,92,0,.04)":"white" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${shipping===opt.v?"var(--orange)":"var(--border)"}`, position: "relative", flexShrink: 0 }}>
                        {shipping===opt.v && <div style={{ position: "absolute", inset: 2, borderRadius: "50%", background: "var(--orange)" }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{opt.n}</div>
                        <div style={{ fontSize: 12, color: "#bbb" }}>{opt.d}</div>
                      </div>
                      <div style={{ fontWeight: 900, fontSize: 15, color: opt.v==="free"?"#00b090":"var(--dark)" }}>{opt.p}</div>
                    </div>
                  ))}
                </div>

                <div style={{ height: 1, background: "var(--border)", margin: "18px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--mid)", marginBottom: 8 }}><span>Subtotal ({cartItems.reduce((s,i)=>s+i.qty,0)} items)</span><span>${total.toFixed(2)}</span></div>
                {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#00b090", fontWeight: 700, marginBottom: 8 }}><span>Discount ({discount}%)</span><span>-${discountAmt.toFixed(2)}</span></div>}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--mid)", marginBottom: 8 }}><span>Shipping</span><span style={{ color: shippingCost===0?"#00b090":"var(--dark)", fontWeight: shippingCost===0?700:400 }}>{shippingCost===0?"FREE":`$${shippingCost.toFixed(2)}`}</span></div>
                <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 900, color: "var(--dark)", marginBottom: 0 }}>
                  <span>Total</span><span style={{ color: "var(--orange)" }}>${orderTotal.toFixed(2)}</span>
                </div>

                <Link to="/checkout" style={{ display: "block", width: "100%", padding: 17, background: "var(--orange)", color: "white", borderRadius: 14, fontSize: 15, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em", textAlign: "center", marginTop: 20, boxShadow: "0 6px 22px rgba(255,92,0,.35)", transition: "all .28s" }} onMouseEnter={e=>{ e.currentTarget.style.background="var(--orange-dark)"; e.currentTarget.style.transform="translateY(-2px)"; }} onMouseLeave={e=>{ e.currentTarget.style.background="var(--orange)"; e.currentTarget.style.transform="none"; }}>
                  Proceed to Checkout →
                </Link>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: "#bbb", marginTop: 14 }}>
                  🔒 Secure checkout · SSL encrypted
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  {["VISA","MC","AMEX","PayPal","ApplePay"].map(pm => (
                    <span key={pm} style={{ padding: "4px 8px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 10.5, fontWeight: 800, color: "var(--mid)" }}>{pm}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`toast ${toast?"show":""}`}><span>{toast}</span></div>
      <style>{`@media(max-width:1100px){.cart-layout-resp{grid-template-columns:1fr!important}} @media(max-width:768px){.cart-head-hide{display:none!important}}`}</style>
    </div>
  );
}
