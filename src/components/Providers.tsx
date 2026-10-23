"use client";

import { useEffect, type ReactNode } from "react";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { Analytics } from "@/components/Analytics";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PageLoader } from "@/components/PageLoader";
import { useCartStore } from "@/store/cartStore";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <LocaleProvider>
      <Analytics />
      <PageLoader />
      {children}
      <CartDrawer />
    </LocaleProvider>
  );
}
