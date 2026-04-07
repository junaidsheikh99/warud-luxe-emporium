import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useCart } from "@/store";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Checkout() {
  const cart = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const subtotal = cart.total();
  const shipping = subtotal >= 2999 ? 0 : 149;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    cart.clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-slide-up max-w-md px-4">
            <CheckCircle className="h-16 w-16 mx-auto gold-accent mb-6" />
            <h1 className="heading-display text-3xl mb-3">Order Confirmed!</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            <button onClick={() => navigate("/")} className="btn-luxury">
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-luxury section-padding">
          <h1 className="heading-display text-3xl mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "name", label: "Full Name", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "phone", label: "Phone", type: "tel" },
                    { name: "pincode", label: "PIN Code", type: "text" },
                    { name: "city", label: "City", type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">{field.label}</label>
                      <input
                        type={field.type}
                        required
                        value={form[field.name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                        className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Address</label>
                  <textarea
                    required
                    rows={3}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                {/* Payment */}
                <div>
                  <h2 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4">Payment Method</h2>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("online")}
                      className={`flex-1 py-3 border text-sm font-medium transition-colors ${
                        paymentMethod === "online"
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      Pay Online (Razorpay)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex-1 py-3 border text-sm font-medium transition-colors ${
                        paymentMethod === "cod"
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-secondary p-6 sm:p-8 h-fit">
                <h2 className="text-sm font-semibold tracking-[0.15em] uppercase mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.name} ({item.size}) × {item.quantity}
                      </span>
                      <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button type="submit" className="btn-gold w-full mt-6 text-center">
                  Place Order — ₹{total.toLocaleString()}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
