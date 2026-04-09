/**
 * Logo.jsx — Reusable Insta Printing brand component
 *
 * Props:
 *   variant  — "full" (default) | "icon"
 *   height   — number in px (default 44 for full, 40 for icon)
 *   dark     — bool: true = white text fallback if image fails (for dark backgrounds)
 *   style    — extra inline styles on wrapper
 */
export default function Logo({ variant = "full", height = 44, dark = false, style = {} }) {
  if (variant === "icon") {
    return (
      <img
        src="/assets/logo/logo-icon.svg"
        alt="Insta Printing Icon"
        height={height}
        width={height}
        style={{
          height,
          width: height,
          objectFit: "contain",
          borderRadius: "50%",
          display: "block",
          ...style,
        }}
      />
    );
  }

  // Full wordmark logo
  return (
    <img
      src={dark ? "/assets/logo/logo-main-dark.png" : "/assets/logo/logo-main-transparent.png"}
      alt="Insta Printing"
      height={height}
      style={{
        height,
        width: "auto",
        objectFit: "contain",
        display: "block",
        ...style,
      }}
    />
  );
}
