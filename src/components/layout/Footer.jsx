import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* MARQUEE */}
      <div className="marquee-bar">
        <div className="marquee-track">
          {["BUSINESS CARDS","BANNERS & SIGNS","T-SHIRT PRINTING","BROCHURES","FLYERS","STICKERS","PACKAGING","LARGE FORMAT",
            "BUSINESS CARDS","BANNERS & SIGNS","T-SHIRT PRINTING","BROCHURES","FLYERS","STICKERS","PACKAGING","LARGE FORMAT"].map((item, i) => (
            <div key={i} className="mi"><span className="mstar">★</span> {item}</div>
          ))}
        </div>
      </div>

      <footer>
        <div className="foot-top">
          <div className="container">
            <div className="foot-grid">
              <div className="foot-brand">
                {/* ── Insta Printing Logo ── */}
                <Link to="/" style={{ display: "inline-block", marginBottom: 18 }}>
                  <img
                    src="/assets/logo/logo-main-dark.png"
                    alt="Insta Printing"
                    style={{ height: 44, width: "auto", objectFit: "contain", display: "block" }}
                  />
                </Link>
                <p>Your trusted partner for premium custom printing. Quality you can see, service you can feel, and prices that work for every business size.</p>
                <div className="foot-socials">
                  {["f", "in", "tw", "ig", "yt"].map(s => <a key={s} href="#" className="fsoc">{s}</a>)}
                </div>
              </div>
              <div>
                <div className="fcol-title">Quick Links</div>
                <div className="flinks">
                  {[["Home","/"],["Products","/shop"],["Designer","/designer"],["Get Quote","/quote"],["Contact","/contact"]].map(([l,h]) => (
                    <Link key={l} to={h}>{l}</Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="fcol-title">Products</div>
                <div className="flinks">
                  {["Business Cards","Banners & Signs","T-Shirt Printing","Flyers & Leaflets","Stickers","Packaging","Large Format"].map(item => (
                    <Link key={item} to={`/shop?category=${encodeURIComponent(item)}`}>{item}</Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="fcol-title">Contact Us</div>
                <div className="fcon-row"><span className="fcon-icon">📍</span><span>1420 Print Ave, Suite 200<br />New York, NY 10001</span></div>
                <div className="fcon-row"><span className="fcon-icon">📞</span><span>+1 (800) PRINT-IT</span></div>
                <div className="fcon-row"><span className="fcon-icon">✉️</span><span>hello@instaprinting.ca</span></div>
                <div className="fcon-row"><span className="fcon-icon">🕐</span><span>Mon–Fri: 8am – 8pm EST<br />Sat: 9am – 5pm EST</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="foot-bottom">
            {/* ── Updated copyright ── */}
            <span className="fbot-copy">© {new Date().getFullYear()} Insta Printing. All rights reserved.</span>
            <div className="fbot-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
