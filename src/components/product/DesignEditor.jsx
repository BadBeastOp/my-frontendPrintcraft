import { useState, useRef, useEffect, useCallback } from "react";
import { X, Type, ImageIcon, Palette, Undo, Redo, Bold, Italic,
         AlignCenter, AlignLeft, AlignRight, ZoomIn, ZoomOut,
         Save, Check, Trash2, RotateCw } from "lucide-react";

const FONTS = ["Arial", "Georgia", "Impact", "Courier New", "Trebuchet MS", "Verdana", "Times New Roman"];
const TEXT_COLORS = ["#ffffff", "#1a1a1a", "#FF5C00", "#2563EB", "#16A34A", "#DC2626", "#7B2FFF", "#EAB308", "#EC4899"];
const BG_COLORS  = ["#ffffff", "#1a1a1a", "#f5f5f5", "#FF5C00", "#2563EB", "#f5f0e8", "#0f172a", "#16A34A"];

export default function DesignEditor({ open, onClose, productName, productIcon, productBg, onSave }) {
  const canvasRef    = useRef(null);
  const fabricRef    = useRef(null);   // fabric.Canvas instance
  const imgInputRef  = useRef(null);
  const historyRef   = useRef([]);
  const histIdxRef   = useRef(-1);
  const isRestoringRef = useRef(false);

  const [bgColor, setBgColor]   = useState("#ffffff");
  const [activeTool, setActiveTool] = useState("select");
  const [selObj, setSelObj]     = useState(null);   // currently selected fabric object
  const [zoom, setZoom]         = useState(1);
  const [saved, setSaved]       = useState(false);
  const [fabricLoaded, setFabricLoaded] = useState(false);

  // ── Load Fabric.js from CDN ────────────────────────────────────
  useEffect(() => {
    if (window.fabric) { setFabricLoaded(true); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
    script.onload = () => setFabricLoaded(true);
    document.head.appendChild(script);
  }, []);

  // ── Init Fabric canvas when editor opens ──────────────────────
  useEffect(() => {
    if (!open || !fabricLoaded || !canvasRef.current) return;
    if (fabricRef.current) { fabricRef.current.dispose(); }

    const canvas = new window.fabric.Canvas(canvasRef.current, {
      width: 500, height: 500,
      backgroundColor: bgColor,
      selection: true,
    });
    fabricRef.current = canvas;

    // Track selected object for properties panel
    canvas.on("selection:created", e => setSelObj(e.selected?.[0] || null));
    canvas.on("selection:updated", e => setSelObj(e.selected?.[0] || null));
    canvas.on("selection:cleared", () => setSelObj(null));

    // Save to history on each modification
    const saveHistory = () => {
      if (isRestoringRef.current) return;
      const json = canvas.toJSON();
      historyRef.current = historyRef.current.slice(0, histIdxRef.current + 1);
      historyRef.current.push(json);
      histIdxRef.current = historyRef.current.length - 1;
    };
    canvas.on("object:added", saveHistory);
    canvas.on("object:modified", saveHistory);
    canvas.on("object:removed", saveHistory);

    saveHistory(); // initial empty state

    return () => { canvas.dispose(); fabricRef.current = null; };
  }, [open, fabricLoaded]);

  // ── Update bg color ──────────────────────────────────────────
  useEffect(() => {
    if (!fabricRef.current) return;
    fabricRef.current.setBackgroundColor(bgColor, () => fabricRef.current.renderAll());
  }, [bgColor]);

  // ── Undo / Redo ──────────────────────────────────────────────
  const undo = useCallback(() => {
    const canvas = fabricRef.current;
    if (!canvas || histIdxRef.current <= 0) return;
    histIdxRef.current--;
    isRestoringRef.current = true;
    canvas.loadFromJSON(historyRef.current[histIdxRef.current], () => {
      canvas.renderAll();
      isRestoringRef.current = false;
      setSelObj(null);
    });
  }, []);

  const redo = useCallback(() => {
    const canvas = fabricRef.current;
    if (!canvas || histIdxRef.current >= historyRef.current.length - 1) return;
    histIdxRef.current++;
    isRestoringRef.current = true;
    canvas.loadFromJSON(historyRef.current[histIdxRef.current], () => {
      canvas.renderAll();
      isRestoringRef.current = false;
      setSelObj(null);
    });
  }, []);

  // ── Add text ─────────────────────────────────────────────────
  const addText = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const text = new window.fabric.IText("Your Text Here", {
      left: 100, top: 100,
      fontFamily: "Arial", fontSize: 32,
      fill: "#1a1a1a", fontWeight: "normal",
      editable: true,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setActiveTool("select");
  };

  // ── Add image from upload ────────────────────────────────────
  const onImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !fabricRef.current) return;
    const reader = new FileReader();
    reader.onload = ev => {
      window.fabric.Image.fromURL(ev.target.result, img => {
        img.scaleToWidth(180);
        img.set({ left: 80, top: 80 });
        fabricRef.current.add(img);
        fabricRef.current.setActiveObject(img);
        fabricRef.current.renderAll();
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // ── Delete selected ──────────────────────────────────────────
  const deleteSelected = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObjects();
    active.forEach(obj => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.renderAll();
    setSelObj(null);
  };

  // ── Zoom ─────────────────────────────────────────────────────
  const handleZoom = (delta) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const newZoom = Math.min(2, Math.max(0.5, canvas.getZoom() + delta));
    canvas.setZoom(newZoom);
    setZoom(newZoom);
  };

  // ── Update selected text properties ─────────────────────────
  const updateTextProp = (prop, val) => {
    const obj = fabricRef.current?.getActiveObject();
    if (!obj || obj.type !== "i-text") return;
    obj.set(prop, val);
    fabricRef.current.renderAll();
    setSelObj({ ...obj }); // trigger re-render of panel
  };

  // ── Save ─────────────────────────────────────────────────────
  const handleSave = () => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const json = canvas.toJSON();
    const dataUrl = canvas.toDataURL({ format: "png", multiplier: 2 });
    onSave({ json, dataUrl, bgColor, productName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!open) return null;

  const isText = selObj?.type === "i-text";
  const isImg  = selObj?.type === "image";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0f0f0f", display: "flex", flexDirection: "column" }}>
      {/* TOP BAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", background: "#1a1a1a", borderBottom: "1px solid #2e2e2e", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✏️</div>
          <div>
            <p style={{ color: "white", fontFamily: "Bebas Neue", fontSize: 16, letterSpacing: 1, lineHeight: 1 }}>Design Editor</p>
            <p style={{ color: "#666", fontSize: 11, marginTop: 2 }}>{productName}</p>
          </div>
        </div>

        {/* History + zoom */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button onClick={undo} title="Undo" style={iconBtnStyle}><Undo size={16} /></button>
          <button onClick={redo} title="Redo" style={iconBtnStyle}><Redo size={16} /></button>
          <div style={{ width: 1, height: 20, background: "#333", margin: "0 4px" }} />
          <button onClick={() => handleZoom(-0.1)} style={iconBtnStyle}><ZoomOut size={16} /></button>
          <span style={{ color: "#888", fontSize: 12, minWidth: 40, textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
          <button onClick={() => handleZoom(0.1)} style={iconBtnStyle}><ZoomIn size={16} /></button>
        </div>

        {/* Save + Close */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={handleSave}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 22px", background: saved ? "#00b090" : "var(--orange)", color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 800, textTransform: "uppercase", cursor: "pointer", transition: "all .25s" }}>
            {saved ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Design</>}
          </button>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 8, background: "#2a2a2a", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", cursor: "pointer" }}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* LEFT TOOLBAR */}
        <div style={{ width: 60, background: "#1a1a1a", borderRight: "1px solid #2e2e2e", display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0", gap: 4, flexShrink: 0 }}>
          {[
            { id: "select", icon: "↖", label: "Select" },
            { id: "text",   icon: "T",  label: "Text",  action: addText },
            { id: "image",  icon: "🖼",  label: "Image", action: () => imgInputRef.current?.click() },
          ].map(tool => (
            <button key={tool.id}
              onClick={() => { setActiveTool(tool.id); tool.action?.(); }}
              title={tool.label}
              style={{ width: 44, height: 44, borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, border: "none", cursor: "pointer", fontSize: tool.id === "text" ? 16 : 18, fontWeight: 900, transition: "all .2s",
                background: activeTool === tool.id ? "rgba(255,92,0,.2)" : "transparent",
                color: activeTool === tool.id ? "var(--orange)" : "#888"
              }}>
              {tool.icon}
              <span style={{ fontSize: 9 }}>{tool.label}</span>
            </button>
          ))}
          <input ref={imgInputRef} type="file" accept="image/*" onChange={onImageUpload} style={{ display: "none" }} />
        </div>

        {/* CANVAS AREA */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#262626", overflow: "auto", padding: 32 }}>
          {fabricLoaded ? (
            <div style={{ boxShadow: "0 8px 60px rgba(0,0,0,.7)", borderRadius: 4 }}>
              <canvas ref={canvasRef} />
            </div>
          ) : (
            <div style={{ color: "#666", fontSize: 14 }}>Loading editor...</div>
          )}
        </div>

        {/* RIGHT PROPERTIES PANEL */}
        <div style={{ width: 240, background: "#1a1a1a", borderLeft: "1px solid #2e2e2e", overflow: "y-auto", flexShrink: 0, padding: "16px 14px" }}>

          {/* Background */}
          <PanelSection label="Background">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {BG_COLORS.map(c => (
                <button key={c} onClick={() => setBgColor(c)} title={c}
                  style={{ width: 28, height: 28, borderRadius: 7, background: c, border: `2px solid ${bgColor === c ? "var(--orange)" : "#333"}`, cursor: "pointer", transition: "all .2s", transform: bgColor === c ? "scale(1.15)" : "scale(1)" }} />
              ))}
            </div>
          </PanelSection>

          {/* Text properties */}
          {isText && (
            <>
              <PanelSection label="Text Content">
                <input defaultValue={selObj?.text || ""}
                  onChange={e => updateTextProp("text", e.target.value)}
                  style={inputStyle} placeholder="Enter text..." />
              </PanelSection>

              <PanelSection label="Font Family">
                <select defaultValue={selObj?.fontFamily || "Arial"} onChange={e => updateTextProp("fontFamily", e.target.value)} style={inputStyle}>
                  {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </PanelSection>

              <PanelSection label={`Font Size: ${Math.round(selObj?.fontSize || 32)}px`}>
                <input type="range" min={8} max={120} defaultValue={selObj?.fontSize || 32}
                  onChange={e => updateTextProp("fontSize", parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--orange)" }} />
              </PanelSection>

              <PanelSection label="Style & Align">
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {[
                    { icon: <Bold size={14} />, prop: "fontWeight", on: "bold", off: "normal" },
                    { icon: <Italic size={14} />, prop: "fontStyle", on: "italic", off: "normal" },
                    { icon: <AlignLeft size={14} />, prop: "textAlign", val: "left" },
                    { icon: <AlignCenter size={14} />, prop: "textAlign", val: "center" },
                    { icon: <AlignRight size={14} />, prop: "textAlign", val: "right" },
                  ].map((btn, i) => (
                    <button key={i} onClick={() => {
                      if (btn.val !== undefined) updateTextProp(btn.prop, btn.val);
                      else {
                        const cur = fabricRef.current?.getActiveObject()?.[btn.prop];
                        updateTextProp(btn.prop, cur === btn.on ? btn.off : btn.on);
                      }
                    }}
                      style={{ flex: 1, minWidth: 32, height: 32, borderRadius: 6, border: "1px solid #333", background: "#2a2a2a", color: "#aaa", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {btn.icon}
                    </button>
                  ))}
                </div>
              </PanelSection>

              <PanelSection label="Text Color">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {TEXT_COLORS.map(c => (
                    <button key={c} onClick={() => updateTextProp("fill", c)} title={c}
                      style={{ width: 28, height: 28, borderRadius: 7, background: c, border: `2px solid ${selObj?.fill === c ? "var(--orange)" : "#333"}`, cursor: "pointer", transition: "transform .2s", transform: selObj?.fill === c ? "scale(1.15)" : "scale(1)" }} />
                  ))}
                </div>
              </PanelSection>
            </>
          )}

          {/* Image properties */}
          {isImg && (
            <PanelSection label="Image Scale">
              <input type="range" min={10} max={200} defaultValue={Math.round((selObj?.scaleX || 1) * 100)}
                onChange={e => {
                  const s = parseInt(e.target.value) / 100;
                  const obj = fabricRef.current?.getActiveObject();
                  if (obj) { obj.set({ scaleX: s, scaleY: s }); fabricRef.current.renderAll(); }
                }}
                style={{ width: "100%", accentColor: "var(--orange)" }} />
            </PanelSection>
          )}

          {/* Delete */}
          {(isText || isImg) && (
            <button onClick={deleteSelected}
              style={{ width: "100%", padding: "9px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 8, background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", color: "#f87171", fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
              <Trash2 size={13} /> Delete Element
            </button>
          )}

          {!selObj && (
            <p style={{ fontSize: 11, color: "#555", textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>Click an element on the canvas to edit it</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Panel helpers ───────────────────────────────────────────────
function PanelSection({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "#555", marginBottom: 8 }}>{label}</p>
      {children}
    </div>
  );
}

const iconBtnStyle = {
  width: 30, height: 30, borderRadius: 6, background: "transparent", border: "none",
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "#888", cursor: "pointer"
};

const inputStyle = {
  width: "100%", padding: "8px 10px", background: "#2a2a2a", border: "1px solid #333",
  borderRadius: 7, color: "white", fontSize: 13, outline: "none"
};