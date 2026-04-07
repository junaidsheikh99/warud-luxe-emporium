import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useWishlist } from "@/store";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function Wishlist() {
  const wishlist = useWishlist();
  const wished = products.filter((p) => wishlist.items.includes(p.id));

  if (wished.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h1 className="heading-section mb-2">Your Wishlist is Empty</h1>
            <p className="text-sm text-muted-foreground mb-6">Save items you love for later.</p>
            <Link to="/shop" className="btn-luxury">Browse Collection</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-luxury section-padding">
          <h1 className="heading-display text-3xl mb-8">Wishlist ({wished.length})</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {wished.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
