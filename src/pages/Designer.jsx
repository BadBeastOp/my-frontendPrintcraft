import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Check, Download } from "lucide-react";
import DesignEditor from "../components/product/DesignEditor.jsx";

const DEMO_PRODUCTS = [
  { id: "1", name: "Classic Tee", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { id: "2", name: "Pullover Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80" },
  { id: "3", name: "Ceramic Mug", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80" },
  { id: "4", name: "Tote Bag", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80" },
  { id: "5", name: "Poster", image: "https://images.unsplash.com/photo-1606482221401-7082dab6db7d?w=800&q=80" },
  { id: "6", name: "Embroidered Cap", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80" },
];

export default function Designer() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [savedDesign, setSavedDesign] = useState(null);

  const handleSave = (data) => {
    setSavedDesign(data);
    setEditorOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 border border-dark-600/50 text-sm text-neutral-300 mb-6">
            <Zap className="w-4 h-4 text-brand-orange" />
            <span>Free online design tool</span>
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white mb-4">
            Design <span className="text-gradient">Your Product</span>
          </h1>
          <p className="text-neutral-400 text-xl max-w-2xl mx-auto">
            Choose a product below, then use our editor to add text, upload your logo, pick colors, and create your perfect custom print.
          </p>
        </div>

        {/* Saved design banner */}
        {savedDesign && (
          <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-8">
            <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="text-emerald-300 text-sm font-medium">Design saved for <strong>{savedDesign.productType}</strong>! Add it to your cart from the product page.</p>
            <Link to="/shop" className="ml-auto text-xs text-emerald-400 hover:underline flex-shrink-0">Go to Shop →</Link>
          </div>
        )}

        {/* Step 1: Pick a product */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-brand-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
            <h2 className="font-display font-semibold text-white text-2xl">Choose a Product</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {DEMO_PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`group relative aspect-square rounded-3xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  selectedProduct?.id === p.id
                    ? "border-brand-orange shadow-glow-orange"
                    : "border-dark-600 hover:border-dark-400"
                }`}
              >
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
                <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-semibold">{p.name}</p>
                {selectedProduct?.id === p.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Open Editor */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 transition-colors ${selectedProduct ? "bg-brand-orange" : "bg-dark-700 text-neutral-500"}`}>2</div>
            <h2 className={`font-display font-semibold text-2xl transition-colors ${selectedProduct ? "text-white" : "text-neutral-600"}`}>Open the Editor</h2>
          </div>

          <div className="bg-dark-800 border border-dark-600/50 rounded-3xl p-8 text-center">
            {selectedProduct ? (
              <div>
                <div className="w-20 h-20 rounded-3xl overflow-hidden mx-auto mb-4 border-2 border-brand-orange">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-white font-semibold mb-2">Ready to design: <span className="text-brand-orange">{selectedProduct.name}</span></p>
                <p className="text-neutral-500 text-sm mb-6">Add text, images, change colors, and preview your product in real time.</p>
                <button
                  onClick={() => setEditorOpen(true)}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-brand-orange hover:bg-brand-orange-light btn-glow text-white font-semibold rounded-2xl transition-all text-lg"
                >
                  <Zap className="w-5 h-5" /> Open Design Editor
                </button>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 rounded-3xl bg-dark-700 border border-dark-600 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-neutral-600" />
                </div>
                <p className="text-neutral-600 font-semibold mb-1">Select a product above first</p>
                <p className="text-neutral-700 text-sm">Then the editor will be ready to open.</p>
              </div>
            )}
          </div>
        </div>

        {/* Features grid */}
        <div>
          <h2 className="font-display font-bold text-3xl text-white text-center mb-10">Editor Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: "✏️", title: "Add Text", desc: "Custom fonts, sizes, colors, bold, italic, and alignment controls." },
              { emoji: "🖼️", title: "Upload Logo", desc: "Upload your own PNG, JPG or SVG and drag it anywhere on the product." },
              { emoji: "🎨", title: "Change Colors", desc: "Pick background colors and text colors from our curated palette." },
              { emoji: "↩️", title: "Undo / Redo", desc: "Full history so you can freely experiment and backtrack any change." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-dark-800 border border-dark-600/50 rounded-3xl p-5 hover:border-brand-orange/30 transition-colors">
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="font-display font-semibold text-white mb-1">{title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Design Editor Modal */}
      {selectedProduct && (
        <DesignEditor
          open={editorOpen}
          onClose={() => setEditorOpen(false)}
          productName={selectedProduct.name}
          productImage={selectedProduct.image}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
