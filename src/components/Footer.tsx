import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({ title: "Subscribed!", description: "Welcome to Brand Store Warud." });
      setEmail("");
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-luxury section-padding text-center">
          <h3 className="heading-section text-primary-foreground mb-3">Join the Club</h3>
          <p className="text-primary-foreground/60 text-sm mb-6 max-w-md mx-auto">
            Subscribe for exclusive drops, early access & members-only offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-gold"
              required
            />
            <button type="submit" className="btn-gold !py-3 !px-6">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/shop?category=men" className="hover:text-primary-foreground transition-colors">Men</Link></li>
              <li><Link to="/shop?category=women" className="hover:text-primary-foreground transition-colors">Women</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-primary-foreground transition-colors">Accessories</Link></li>
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Shipping</span></li>
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Returns</span></li>
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Size Guide</span></li>
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">FAQ</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">About Us</span></li>
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Careers</span></li>
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Contact</span></li>
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Terms</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-primary-foreground/40 mt-4">Warud, Maharashtra, India</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Brand Store Warud. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
