"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PageLoader } from "@/components/PageLoader";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <PageLoader />
      {children}
      <CartDrawer />
    </LocaleProvider>
  );
}
