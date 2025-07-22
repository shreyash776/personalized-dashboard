"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { toggleDarkMode } from "../../features/user/userSlice";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.user.darkMode);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const menuItems = [
    { name: "News", href: "/news" },
    { name: "Movies", href: "/movies" },
    { name: "Songs", href: "/music" },
    { name: "Favorites", href: "/favorites" },
    { name: "Settings", href: "/settings" },
    { name: "Trending", href: "/trending" },
  ];

  return (
    <nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg  rounded-2xl sm:rounded-full w-[90%] sm:w-[70%] md:w-[60%] max-w-4xl px-4 sm:px-6 py-3 transition-all"
      aria-label="Primary Navigation"
    >
      <div className="flex items-center justify-between">
        {/* Logo or Title */}
        <div className="text-lg font-semibold tracking-wide">Dashboard</div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-4 md:gap-6 items-center">
          {menuItems.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button with circular background */}
        <button
          className="sm:hidden text-2xl p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:hidden bg-white dark:bg-gray-800 px-4 py-4  border border-gray-200 dark:border-gray-700 shadow-inner transition-all text-center">
          {menuItems.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
