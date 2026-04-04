"use client";

import { LanguageProvider } from "./components/LanguageProvider";

export default function Providers({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
