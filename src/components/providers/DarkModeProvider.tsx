"use client";

import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useAppStore((state) => state.darkMode);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
}
