import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  // ── Password strength ─────────────────────────────────────────
  const getStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const map = [
      { label: "", color: "" },
      { label: "Weak", color: "#f33" },
      { label: "Fair", color: "#f90" },
      { label: "Good", color: "#2563eb" },
      { label: "Strong", color: "#00b090" },
    ];
    return { score, ...map[score] };
  };

  const strength = getStrength(form.password);

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 2) e.fullName = "Name must be at least 2 characters.";

    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";

    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";

    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";

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
      // const res = await fetch("/api/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     fullName: form.fullName,
      //     email: form.email,
      //     password: form.password,
      //   }),
      // });
      // if (!res.ok) throw new Error((await res.json()).message || "Registration failed.");
      // const data = await res.json();
      // localStorage.setItem("user", JSON.stringify(data.user));
      // ────────────────────────────────────────────────────────────

      await new Promise(r => setTimeout(r, 1600));
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2200);
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

  // ── Success state ─────────────────────────────────────────────
  if (success) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.successIcon}>🎉</div>
          <h2 style={{ ...styles.title, marginBottom: 10 }}>Account Created!</h2>
          <p style={{ ...styles.subtitle, marginBottom: 0 }}>
            Welcome to Insta Printing! Redirecting you to login...
          </p>
        </div>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }`}</style>
      </div>
    );
  }

  return (
    <div style={styles.page}>
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
        <h1 style={styles.title}>Create Your Account</h1>
        <p style={styles.subtitle}>Join Insta Printing — it's free to get started</p>

        {/* API error */}
        {apiError && (
          <div style={styles.errorBanner}>
            <span style={{ fontSize: 15 }}>⚠️</span> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>
          {/* Full Name */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Full Name</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input
                type="text"
                value={form.fullName}
                onChange={set("fullName")}
                placeholder="John Smith"
                style={{ ...styles.input, ...(errors.fullName ? styles.inputError : {}) }}
                onFocus={e => e.target.style.borderColor = "var(--orange)"}
                onBlur={e => e.target.style.borderColor = errors.fullName ? "#f33" : "var(--border)"}
                autoComplete="name"
              />
            </div>
            {errors.fullName && <p style={styles.fieldError}>⚠ {errors.fullName}</p>}
          </div>

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
            {errors.email && <p style={styles.fieldError}>⚠ {errors.email}</p>}
          </div>

          {/* Password */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={set("password")}
                placeholder="At least 8 characters"
                style={{ ...styles.input, paddingRight: 44, ...(errors.password ? styles.inputError : {}) }}
                onFocus={e => e.target.style.borderColor = "var(--orange)"}
                onBlur={e => e.target.style.borderColor = errors.password ? "#f33" : "var(--border)"}
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} style={styles.eyeBtn} tabIndex={-1}>
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            {errors.password && <p style={styles.fieldError}>⚠ {errors.password}</p>}

            {/* Password strength bar */}
            {form.password && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} style={{
                      flex: 1, height: 3, borderRadius: 2,
                      background: n <= strength.score ? strength.color : "var(--border)",
                      transition: "background .3s",
                    }} />
                  ))}
                </div>
                {strength.label && (
                  <p style={{ fontSize: 11.5, fontWeight: 700, color: strength.color }}>{strength.label} password</p>
                )}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                placeholder="Re-enter your password"
                style={{ ...styles.input, paddingRight: 44, ...(errors.confirmPassword ? styles.inputError : {}) }}
                onFocus={e => e.target.style.borderColor = "var(--orange)"}
                onBlur={e => e.target.style.borderColor = errors.confirmPassword ? "#f33" : "var(--border)"}
                autoComplete="new-password"
              />
              <button type="button" onClick={() => setShowConfirm(v => !v)} style={styles.eyeBtn} tabIndex={-1}>
                {showConfirm ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
              {/* Match indicator */}
              {form.confirmPassword && form.password && (
                <span style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>
                  {form.password === form.confirmPassword ? "✅" : "❌"}
                </span>
              )}
            </div>
            {errors.confirmPassword && <p style={styles.fieldError}>⚠ {errors.confirmPassword}</p>}
          </div>

          {/* Terms note */}
          <p style={styles.termsNote}>
            By creating an account you agree to our{" "}
            <a href="#" style={styles.termsLink}>Terms of Service</a> and{" "}
            <a href="#" style={styles.termsLink}>Privacy Policy</a>.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, ...(loading ? styles.submitBtnDisabled : {}) }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "#D94C00"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.transform = "none"; }}
          >
            {loading ? (
              <span style={styles.spinnerRow}>
                <span style={styles.spinner} /> Creating Account...
              </span>
            ) : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <span style={styles.dividerLine} />
        </div>

        {/* Login link */}
        <p style={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.switchLink}>Sign in</Link>
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
    padding: "44px 44px",
    width: "100%",
    maxWidth: 480,
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
    marginBottom: 24,
  },
  logo: {
    height: 50,
    width: "auto",
    objectFit: "contain",
    display: "block",
  },
  title: {
    fontFamily: "Bebas Neue, sans-serif",
    fontSize: 34,
    letterSpacing: 1,
    color: "var(--dark)",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "var(--mid)",
    marginBottom: 26,
    textAlign: "center",
  },
  successIcon: {
    fontSize: 72,
    marginBottom: 20,
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
    marginBottom: 16,
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
  },
  termsNote: {
    fontSize: 12.5,
    color: "var(--mid)",
    lineHeight: 1.6,
    marginBottom: 20,
    width: "100%",
  },
  termsLink: {
    color: "var(--orange)",
    fontWeight: 700,
    textDecoration: "none",
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
    margin: "22px 0 18px",
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