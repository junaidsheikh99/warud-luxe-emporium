import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingBag, Minus, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { products } from "@/data/products";
import { useCart, useWishlist } from "@/store";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();
  const wishlist = useWishlist();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-section mb-4">Product Not Found</h1>
            <Link to="/shop" className="btn-luxury">Back to Shop</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isWished = wishlist.has(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      cart.addItem(product, selectedSize);
    }
    toast({ title: "Added to cart", description: `${product.name} (${selectedSize}) × ${quantity}` });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-luxury px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <div className="aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                width={640}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <p className="text-label mb-2">{product.category}</p>
              <h1 className="heading-display text-3xl sm:text-4xl mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {Array(5).fill(null).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-semibold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1">{discount}% OFF</span>
                  </>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Size */}
              <div className="mb-6">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-10 px-3 text-sm border transition-colors ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3">Quantity</p>
                <div className="inline-flex border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex items-center justify-center w-12 text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button onClick={handleAddToCart} className="btn-luxury flex-1 gap-2">
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>
                <button
                  onClick={() => {
                    wishlist.toggle(product.id);
                    toast({ title: isWished ? "Removed from wishlist" : "Added to wishlist" });
                  }}
                  className={`btn-luxury-outline !px-4 ${isWished ? "gold-border gold-accent" : ""}`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`h-5 w-5 ${isWished ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>✦ Free shipping on orders above ₹2,999</p>
                <p>✦ Easy 15-day returns</p>
                <p>✦ Cash on Delivery available</p>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="heading-section mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
