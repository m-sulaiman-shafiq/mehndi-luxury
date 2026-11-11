"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  cartId: string;
  product: Product;
  stitching: "stitched" | "unstitched";
  age?: string;
  measurements?: Record<string, string>;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartId" | "quantity">) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("mehndi-luxury-cart");

      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch {
      localStorage.removeItem("mehndi-luxury-cart");
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("mehndi-luxury-cart", JSON.stringify(items));
    }
  }, [items, loaded]);

  function addItem(item: Omit<CartItem, "cartId" | "quantity">) {
    const cartId = `${item.product.id}-${item.stitching}-${item.stitching === "stitched" ? JSON.stringify(item.measurements) : "standard"}`;

    setItems((current) => {
      const existing = current.find((entry) => entry.cartId === cartId);

      if (existing) {
        return current.map((entry) =>
          entry.cartId === cartId
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        );
      }

      return [...current, { ...item, cartId, quantity: 1 }];
    });
  }

  function removeItem(cartId: string) {
    setItems((current) => current.filter((item) => item.cartId !== cartId));
  }

  function updateQuantity(cartId: string, quantity: number) {
    if (quantity < 1) return;

    setItems((current) =>
      current.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
