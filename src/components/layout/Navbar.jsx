import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Products", href: "/shop",
    children: [
      { label: "🪪 Business Cards", href: "/shop?category=Business+Cards" },
      { label: "🖼️ Banners & Signs", href: "/shop?category=Banners" },
      { label: "👕 Apparel Printing", href: "/shop?category=Apparel" },
      { label: "📦 Packaging", href: "/shop?category=Packaging" },
      { label: "🪟 Stickers & Labels", href: "/shop?category=Stickers" },
      { label: "📄 Flyers & Leaflets", href: "/shop?category=Flyers" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/#howitworks" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, count, total, removeFromCart, updateQty } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setCartOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal("");
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span>📞 <a href="tel:18005555555">+1 (800) PRINT-IT</a></span>
            <div className="topbar-divider" />
            <span>✉️ <a href="mailto:hello@instaprinting.ca">hello@instaprinting.ca</a></span>
          </div>
          <div className="topbar-right">
            <a href="#">Track Order</a>
            <a href="#">Upload Files</a>
           <Link to="/login">Login</Link>
           <Link to="/register">Register</Link>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header id="site-header" style={{
        position: "sticky", top: 0, zIndex: 1000,
        background: "rgba(255,255,255,.97)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: scrolled ? "0 4px 28px rgba(0,0,0,.09)" : "none",
        transition: "box-shadow .3s"
      }}>
        <div style={{ maxWidth: 1320, margin: "auto", padding: "0 28px", height: 74, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28 }}>

          {/* ── Insta Printing Logo ── */}
          <Link to="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
            <img
              src="/assets/logo/logo-main-transparent.png"
              alt="Insta Printing"
              style={{ height: 46, width: "auto", objectFit: "contain", display: "block" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: 2, alignItems: "center", flex: 1, justifyContent: "center" }} className="desktop-nav">
            {navLinks.map((link) => (
              <div key={link.href} className="nav-item" style={{ position: "relative" }}>
                <Link to={link.href} style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "8px 13px",
                  borderRadius: 8, fontSize: 13, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: ".07em", transition: "all .2s",
                  color: location.pathname === link.href ? "var(--orange)" : "var(--dark)",
                  background: location.pathname === link.href ? "rgba(255,92,0,.07)" : "transparent"
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                  onMouseLeave={e => e.currentTarget.style.color = location.pathname === link.href ? "var(--orange)" : "var(--dark)"}
                >
                  {link.label}
                  {link.children && <span style={{ fontSize: 9 }}>▾</span>}
                </Link>
                {link.children && (
                  <div className="dropdown" style={{
                    position: "absolute", top: "calc(100% + 10px)", left: "50%",
                    transform: "translateX(-50%)", background: "white",
                    borderRadius: 14, border: "1px solid var(--border)",
                    boxShadow: "0 20px 60px rgba(0,0,0,.13)", padding: 8,
                    minWidth: 200, zIndex: 300
                  }}>
                    {link.children.map((child) => (
                      <Link key={child.href} to={child.href} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "9px 13px",
                        borderRadius: 8, fontSize: 13, fontWeight: 500, color: "var(--dark)", transition: "all .18s"
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,92,0,.07)"; e.currentTarget.style.color = "var(--orange)"; e.currentTarget.style.paddingLeft = "18px"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--dark)"; e.currentTarget.style.paddingLeft = "13px"; }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={() => { setSearchOpen(true); setCartOpen(false); }}
              style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dark)", transition: "all .2s", background: "none", border: "none", cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </button>

            <button onClick={() => { setCartOpen(true); setSearchOpen(false); }}
              style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dark)", position: "relative", transition: "all .2s", background: "none", border: "none", cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
              {count > 0 && (
                <span style={{ position: "absolute", top: 4, right: 4, background: "var(--orange)", color: "white", fontSize: 9, fontWeight: 900, width: 17, height: 17, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            <Link to="/quote" style={{ padding: "9px 17px", border: "2px solid var(--orange)", color: "var(--orange)", borderRadius: 9, fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", transition: "all .22s", display: "none" }}
              className="btn-quote-hdr">
              Get Quote
            </Link>
            <Link to="/shop" style={{ padding: "9px 19px", background: "var(--orange)", color: "white", borderRadius: 9, fontSize: 12.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", transition: "all .22s", boxShadow: "0 4px 16px rgba(255,92,0,.3)" }}>
              Order Now
            </Link>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              style={{ display: "none", flexDirection: "column", gap: 5, padding: 8, background: "none", border: "none", cursor: "pointer" }}
              className="hamburger-btn">
              <span style={{ display: "block", width: 24, height: 2, background: "var(--dark)", borderRadius: 2 }} />
              <span style={{ display: "block", width: 24, height: 2, background: "var(--dark)", borderRadius: 2 }} />
              <span style={{ display: "block", width: 24, height: 2, background: "var(--dark)", borderRadius: 2 }} />
            </button>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div onClick={() => setSearchOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,.88)", zIndex: 1200,
          display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 120
        }}>
          <span onClick={() => setSearchOpen(false)} style={{
            position: "fixed", top: 28, right: 28, width: 46, height: 46, background: "rgba(255,255,255,.1)",
            color: "white", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, cursor: "pointer"
          }}>✕</span>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 660, margin: "0 20px" }}>
            <form onSubmit={handleSearch} style={{ position: "relative" }}>
              <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
                autoFocus placeholder="Search for products..."
                style={{ width: "100%", padding: "22px 60px 22px 24px", background: "white", border: "none", borderRadius: 16, fontSize: 19, fontFamily: "Outfit", outline: "none", color: "var(--dark)", boxShadow: "0 20px 60px rgba(0,0,0,.35)" }}
              />
              <button type="submit" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, background: "var(--orange)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white", border: "none", cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </button>
            </form>
            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Business Cards", "Banners", "T-Shirts", "Stickers", "Flyers"].map(t => (
                <div key={t} onClick={() => { setSearchVal(t); }} style={{ padding: "7px 15px", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "white", borderRadius: 100, fontSize: 12.5, cursor: "pointer" }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 1100 }}>
          <div onClick={e => e.stopPropagation()} style={{
            position: "fixed", right: 0, top: 0, bottom: 0, width: 420, background: "white",
            zIndex: 1101, display: "flex", flexDirection: "column", boxShadow: "-12px 0 70px rgba(0,0,0,.18)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 28px", borderBottom: "1px solid var(--border)" }}>
              <h3 style={{ fontFamily: "Bebas Neue", fontSize: 26, letterSpacing: 1 }}>Shopping Cart</h3>
              <button onClick={() => setCartOpen(false)} style={{ width: 36, height: 36, borderRadius: 8, background: "var(--light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, border: "none", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "18px 28px" }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "70px 20px", color: "var(--mid)" }}>
                  <div style={{ fontSize: 58, marginBottom: 16 }}>🛒</div>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>Your cart is empty</h4>
                  <p style={{ fontSize: 14 }}>Browse our products and add something!</p>
                </div>
              ) : cartItems.map(item => (
                <div key={item.key} style={{ display: "flex", gap: 14, alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 68, height: 68, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, border: "1px solid var(--border)", background: item.bg || "#fff5f0" }}>
                    {item.icon || "🛒"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 13.5, marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 9 }}>{item.cat || item.category}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => updateQty(item.key, item.qty - 1)} style={{ width: 26, height: 26, borderRadius: 6, background: "var(--light)", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>−</button>
                      <span style={{ fontWeight: 800, fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} style={{ width: 26, height: 26, borderRadius: 6, background: "var(--light)", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}>+</button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: 16, color: "var(--orange)", flexShrink: 0 }}>${(item.price * item.qty).toFixed(2)}</div>
                  <button onClick={() => removeFromCart(item.key)} style={{ fontSize: 17, color: "#ddd", flexShrink: 0, border: "none", background: "none", cursor: "pointer" }}>✕</button>
                </div>
              ))}
            </div>

            {cartItems.length > 0 && (
              <div style={{ padding: "20px 28px", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--mid)", marginBottom: 6 }}><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--mid)", marginBottom: 6 }}><span>Shipping</span><span style={{ color: "#00b090", fontWeight: 700 }}>FREE</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 900, color: "var(--dark)", marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                  <span>Total</span><span style={{ color: "var(--orange)" }}>${total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" onClick={() => setCartOpen(false)} style={{ display: "block", width: "100%", padding: 16, background: "var(--orange)", color: "white", borderRadius: 12, fontSize: 15, fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em", textAlign: "center", marginTop: 18, boxShadow: "0 6px 22px rgba(255,92,0,.35)" }}>
                  Proceed to Checkout →
                </Link>
                <button onClick={() => setCartOpen(false)} style={{ display: "block", width: "100%", padding: 13, border: "2px solid var(--border)", color: "var(--mid)", borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: "center", marginTop: 10, background: "none", cursor: "pointer" }}>
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, background: "white", zIndex: 999, padding: "90px 28px 24px", overflowY: "auto" }}>
          {/* Mobile Logo */}
          <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
            <img
              src="/assets/logo/logo-main-transparent.png"
              alt="Insta Printing"
              style={{ height: 40, width: "auto", objectFit: "contain" }}
            />
          </div>
          {navLinks.map(link => (
            <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "15px 0", borderBottom: "1px solid var(--border)", fontFamily: "Bebas Neue", fontSize: 24, letterSpacing: 1.5, color: "var(--dark)", transition: "color .2s" }}>
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
            <Link to="/quote" onClick={() => setMobileOpen(false)} style={{ padding: "11px 18px", border: "2px solid var(--orange)", color: "var(--orange)", borderRadius: 9, fontSize: 13, fontWeight: 800, textTransform: "uppercase" }}>Get Quote</Link>
            <Link to="/shop" onClick={() => setMobileOpen(false)} style={{ padding: "11px 18px", background: "var(--orange)", color: "white", borderRadius: 9, fontSize: 13, fontWeight: 800, textTransform: "uppercase" }}>Order Now</Link>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav .dropdown { display: none; }
        .desktop-nav .nav-item:hover .dropdown { display: block; }
        .btn-quote-hdr { display: none; }
        @media(min-width:769px) { .btn-quote-hdr { display: inline-block !important; } }
        @media(max-width:768px) { .desktop-nav { display: none !important; } .hamburger-btn { display: flex !important; } }
      `}</style>
    </>
  );
}
