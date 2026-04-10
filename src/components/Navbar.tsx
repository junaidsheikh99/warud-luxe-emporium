import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { useCart, useWishlist } from "@/store";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/shop?category=men" },
  { label: "Women", href: "/shop?category=women" },
  { label: "Accessories", href: "/shop?category=accessories" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const cartCount = useCart((s) => s.count());
  const wishlistCount = useWishlist((s) => s.items.length);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top banner */}
      <div className="gold-bg text-center py-1.5">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-foreground">
          Free shipping on orders above ₹2,999
        </p>
      </div>

      <nav className="container-luxury flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Brand Store" className="h-14 w-auto" width={120} height={56} />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to="/shop" className="p-2 hover:opacity-70 transition-opacity" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/wishlist" className="p-2 hover:opacity-70 transition-opacity relative" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full gold-bg text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="p-2 hover:opacity-70 transition-opacity relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full gold-bg text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <ul className="container-luxury py-4 space-y-3 px-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="block text-sm font-medium tracking-[0.1em] uppercase py-2"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
