"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { useEffect, useState } from "react";

export default function ThemeBody({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector((state: RootState) => state.user.darkMode);

  // Delay rendering children until mounted on client to avoid hydration mismatches / flicker
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("DASHBOARD_DARK", "1");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.removeItem("DASHBOARD_DARK");
      }
    }
  }, [darkMode]);

  if (!mounted) {
    
    return null;
  }

  return <>{children}</>;
}
