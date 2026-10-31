"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartSelection, LocalizedString } from "@/types/menu";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (payload: {
    menuItemId: string;
    name: LocalizedString;
    unitPrice: number;
    quantity: number;
    selection: CartSelection;
    summary: string;
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (payload) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              ...payload,
            },
          ],
          isOpen: true,
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      total: () =>
        get().items.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0,
        ),
      count: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "la-toscane-cart",
      partialize: (state) => ({ items: state.items }),
      // Réhydraté après montage (Providers) : 1er rendu client = rendu serveur
      skipHydration: true,
    },
  ),
);
