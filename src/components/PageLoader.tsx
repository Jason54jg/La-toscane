"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

const MIN_MS = 1100;

export function PageLoader() {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const started = performance.now();
    let leaveTimer: number | undefined;
    let hideTimer: number | undefined;

    const finish = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_MS - elapsed);
      leaveTimer = window.setTimeout(() => {
        setLeaving(true);
        hideTimer = window.setTimeout(() => setVisible(false), 520);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      document.documentElement.classList.add("loader-lock");
    } else {
      document.documentElement.classList.remove("loader-lock");
    }
    return () => document.documentElement.classList.remove("loader-lock");
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`page-loader ${leaving ? "page-loader--out" : ""}`}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="page-loader__glow" aria-hidden />
      <div className="page-loader__inner">
        <p className="page-loader__eyebrow">Neufchâteau</p>
        <h1 className="font-display page-loader__brand">La Toscane</h1>
        <div className="page-loader__bar" aria-hidden>
          <span />
        </div>
        <p className="page-loader__caption">
          {locale === "fr" ? "Préparation de la carte…" : "Preparing the menu…"}
        </p>
      </div>
    </div>
  );
}
