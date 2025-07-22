"use client"
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { useEffect } from "react";

export default function ThemeBody({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector((state: RootState) => state.user.darkMode);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("DASHBOARD_DARK", "1");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("DASHBOARD_DARK", "");
      }
    }
  }, [darkMode]);

  return <>{children}</>;
}
