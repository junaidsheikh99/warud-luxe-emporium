import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useWishlist } from "@/store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const wishlist = useWishlist();
  const isWished = wishlist.has(product.id);

  return (
    <div className="group relative">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={640}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        {product.isNew && (
          <span className="gold-bg text-foreground text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-1">
            New
          </span>
        )}
        {product.originalPrice && (
          <span className="bg-destructive text-destructive-foreground text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-1">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => wishlist.toggle(product.id)}
        className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Toggle wishlist"
      >
        <Heart className={`h-4 w-4 ${isWished ? "fill-destructive text-destructive" : ""}`} />
      </button>

      {/* Info */}
      <div className="pt-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
