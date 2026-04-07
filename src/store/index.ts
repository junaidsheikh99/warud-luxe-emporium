import { create } from "zustand";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface WishlistStore {
  items: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useWishlist = create<WishlistStore>((set, get) => ({
  items: [],
  toggle: (id) =>
    set((s) => ({
      items: s.items.includes(id)
        ? s.items.filter((i) => i !== id)
        : [...s.items, id],
    })),
  has: (id) => get().items.includes(id),
}));

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product, size) =>
    set((s) => {
      const existing = s.items.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.product.id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...s.items, { product, quantity: 1, size }] };
    }),
  removeItem: (productId, size) =>
    set((s) => ({
      items: s.items.filter(
        (i) => !(i.product.id === productId && i.size === size)
      ),
    })),
  updateQuantity: (productId, size, quantity) =>
    set((s) => ({
      items: quantity <= 0
        ? s.items.filter((i) => !(i.product.id === productId && i.size === size))
        : s.items.map((i) =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity }
              : i
          ),
    })),
  clearCart: () => set({ items: [] }),
  total: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
