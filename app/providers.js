"use client";

import CookieBanner from "./components/CookieBanner";
import { LanguageProvider } from "./components/LanguageProvider";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      {children}
      <CookieBanner />
    </LanguageProvider>
  );
}
