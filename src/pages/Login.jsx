import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      // ── API placeholder ──────────────────────────────────────────
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: form.email, password: form.password, rememberMe }),
      // });
      // if (!res.ok) throw new Error((await res.json()).message || "Login failed.");
      // const data = await res.json();
      // localStorage.setItem("user", JSON.stringify(data.user));
      // ────────────────────────────────────────────────────────────

      // Simulated success for now
      await new Promise(r => setTimeout(r, 1400));
      if (rememberMe) localStorage.setItem("rememberedEmail", form.email);
      navigate("/");
    } catch (err) {
      setApiError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <div style={styles.page}>
      {/* Background decoration */}
      <div style={styles.bgGlow} />

      <div style={styles.card}>
        {/* Logo */}
        <Link to="/" style={styles.logoWrap}>
          <img
            src="/assets/logo/logo-main.jpeg"
            alt="Insta Printing"
            style={styles.logo}
          />
        </Link>

        {/* Heading */}
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to your Insta Printing account</p>

        {/* API error banner */}
        {apiError && (
          <div style={styles.errorBanner}>
            <span style={{ fontSize: 15 }}>⚠️</span> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>
          {/* Email */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
              </span>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                onFocus={e => e.target.style.borderColor = "var(--orange)"}
                onBlur={e => e.target.style.borderColor = errors.email ? "#f33" : "var(--border)"}
                autoComplete="email"
              />
            </div>
            {errors.email && <p style={styles.fieldError}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={styles.fieldWrap}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
              <label style={styles.label}>Password</label>
              <Link to="/forgot-password" style={styles.forgotLink}>Forgot Password?</Link>
            </div>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={set("password")}
                placeholder="Enter your password"
                style={{ ...styles.input, paddingRight: 44, ...(errors.password ? styles.inputError : {}) }}
                onFocus={e => e.target.style.borderColor = "var(--orange)"}
                onBlur={e => e.target.style.borderColor = errors.password ? "#f33" : "var(--border)"}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} style={styles.eyeBtn} tabIndex={-1}>
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            {errors.password && <p style={styles.fieldError}>{errors.password}</p>}
          </div>

          {/* Remember Me */}
          <div style={styles.rememberRow} onClick={() => setRememberMe(v => !v)}>
            <div style={{ ...styles.checkbox, ...(rememberMe ? styles.checkboxActive : {}) }}>
              {rememberMe && <span style={{ color: "white", fontSize: 11, lineHeight: 1 }}>✓</span>}
            </div>
            <span style={styles.rememberLabel}>Remember me for 30 days</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, ...(loading ? styles.submitBtnDisabled : {}) }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "var(--orange-dark)"; e.currentTarget.style.transform = loading ? "none" : "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.transform = "none"; }}
          >
            {loading ? (
              <span style={styles.spinnerRow}>
                <span style={styles.spinner} /> Signing in...
              </span>
            ) : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <span style={styles.dividerLine} />
        </div>

        {/* Register link */}
        <p style={styles.switchText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.switchLink}>Create one free</Link>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  bgGlow: {
    position: "absolute",
    top: -200,
    right: -200,
    width: 600,
    height: 600,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,92,0,.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    background: "white",
    borderRadius: 24,
    padding: "48px 44px",
    width: "100%",
    maxWidth: 460,
    boxShadow: "0 8px 60px rgba(0,0,0,.1)",
    border: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "fadeUp .5s ease both",
    position: "relative",
    zIndex: 1,
  },
  logoWrap: {
    display: "inline-block",
    marginBottom: 28,
  },
  logo: {
    height: 52,
    width: "auto",
    objectFit: "contain",
    display: "block",
  },
  title: {
    fontFamily: "Bebas Neue, sans-serif",
    fontSize: 36,
    letterSpacing: 1,
    color: "var(--dark)",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "var(--mid)",
    marginBottom: 30,
    textAlign: "center",
  },
  errorBanner: {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,51,51,.08)",
    border: "1px solid rgba(255,51,51,.2)",
    borderRadius: 10,
    fontSize: 13.5,
    color: "#c00",
    fontWeight: 600,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  fieldWrap: {
    width: "100%",
    marginBottom: 18,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: ".1em",
    color: "var(--dark)",
    marginBottom: 7,
  },
  inputWrap: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: 13,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#aaa",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "13px 16px 13px 42px",
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
  inputError: {
    borderColor: "#f33",
    background: "rgba(255,51,51,.02)",
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#aaa",
    display: "flex",
    alignItems: "center",
    padding: 4,
  },
  fieldError: {
    fontSize: 12,
    color: "#f33",
    fontWeight: 600,
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  forgotLink: {
    fontSize: 12.5,
    color: "var(--orange)",
    fontWeight: 700,
    textDecoration: "none",
  },
  rememberRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    marginBottom: 24,
    userSelect: "none",
    width: "100%",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    border: "2px solid var(--border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .2s",
    flexShrink: 0,
  },
  checkboxActive: {
    background: "var(--orange)",
    borderColor: "var(--orange)",
  },
  rememberLabel: {
    fontSize: 13.5,
    color: "var(--mid)",
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
  },
  submitBtnDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
    transform: "none",
  },
  spinnerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
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
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    margin: "24px 0 20px",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "var(--border)",
  },
  dividerText: {
    fontSize: 12,
    color: "#bbb",
    textTransform: "uppercase",
    letterSpacing: ".1em",
    fontWeight: 700,
  },
  switchText: {
    fontSize: 14,
    color: "var(--mid)",
    textAlign: "center",
  },
  switchLink: {
    color: "var(--orange)",
    fontWeight: 800,
    textDecoration: "none",
  },
};