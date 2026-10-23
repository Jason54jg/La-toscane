import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Toscane — Pizzeria à Neufchâteau",
  description:
    "Pizzas, tacos, burgers, tex-mex à Neufchâteau. Livraison gratuite dès 12 €, ouvert 7j/7. 65 Rue Saint-Jean.",
  openGraph: {
    title: "La Toscane — Pizzeria à Neufchâteau",
    description:
      "Pizzas généreuses, tacos & burgers. Livraison gratuite dès 12 € à Neufchâteau.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
