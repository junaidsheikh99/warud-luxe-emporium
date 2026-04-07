import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useCart } from "@/store";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const cart = useCart();
  const { toast } = useToast();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.total();
  const shipping = subtotal >= 2999 ? 0 : 149;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "WARUD20") {
      const d = Math.round(subtotal * 0.2);
      setDiscount(d);
      toast({ title: "Coupon applied!", description: `You saved ₹${d.toLocaleString()}` });
    } else {
      toast({ title: "Invalid coupon", variant: "destructive" });
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h1 className="heading-section mb-2">Your Cart is Empty</h1>
            <p className="text-sm text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="btn-luxury">Continue Shopping</Link>
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
          <h1 className="heading-display text-3xl mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4 sm:gap-6 border-b border-border pb-6">
                  <Link to={`/product/${item.product.id}`} className="w-24 sm:w-32 aspect-[4/5] bg-secondary flex-shrink-0 overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} loading="lazy" width={128} height={160} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`} className="text-sm font-medium hover:underline">
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>
                    <p className="text-sm font-semibold mt-2">₹{item.product.price.toLocaleString()}</p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="inline-flex border border-border">
                        <button onClick={() => cart.updateQuantity(item.product.id, item.size, item.quantity - 1)} className="p-2 hover:bg-secondary">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex items-center justify-center w-10 text-sm">{item.quantity}</span>
                        <button onClick={() => cart.updateQuantity(item.product.id, item.size, item.quantity + 1)} className="p-2 hover:bg-secondary">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => cart.removeItem(item.product.id, item.size)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-secondary p-6 sm:p-8 h-fit">
              <h2 className="text-sm font-semibold tracking-[0.15em] uppercase mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mt-6">
                <p className="text-xs text-muted-foreground mb-2">Have a coupon?</p>
                <div className="flex">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-border bg-background text-sm focus:outline-none focus:border-gold"
                  />
                  <button onClick={applyCoupon} className="btn-luxury !py-2 !px-4 text-xs">
                    Apply
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Try: WARUD20</p>
              </div>

              <Link to="/checkout" className="btn-luxury w-full mt-6 text-center">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
