import { Link } from "react-router-dom";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-dark-800 rounded-3xl overflow-hidden border border-dark-600/50 card-hover hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-dark-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link to={`/shop/${product.slug}`}
            className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-brand-orange transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => addToCart(product, 1, product.colors[0] || null, product.sizes[0] || null)}
            className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white hover:bg-brand-orange-light transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Badges */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              product.badge === "New"
                ? "bg-brand-purple/15 text-brand-purple-light border-brand-purple/20"
                : "bg-brand-orange/15 text-brand-orange border-brand-orange/20"
            }`}>
              {product.badge}
            </span>
          </div>
        )}
        {discount && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              -{discount}%
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-neutral-500 mb-1 font-medium">{product.category}</p>
        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-display font-semibold text-white text-base leading-tight mb-2 hover:text-brand-orange transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-brand-orange text-brand-orange" : "text-dark-500"}`} />
            ))}
          </div>
          <span className="text-xs text-neutral-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-white text-lg">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-neutral-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
