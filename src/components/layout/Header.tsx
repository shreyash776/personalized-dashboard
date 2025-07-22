"use client";
import { useState } from "react";
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
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-full w-[60%] max-w-4xl px-6 py-4"
      aria-label="Primary Navigation"
    >
      <div className="flex items-center justify-between">
       

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {[
            { name: "News", href: "/news" },
            { name: "Movies", href: "/movies" },
            { name: "Songs", href: "/music" },
            { name: "Favorites", href: "/favourite" },
            { name: "Settings", href: "/settings" },
          ].map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={() => setIsOpen(false)}
            >
              {name}
            </Link>
          ))}
          <button
            onClick={handleToggle}
            className="px-3 py-1 rounded text-sm font-medium border bg-gray-100 dark:bg-gray-700 dark:text-white"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "🌙 Dark" : "🌞 Light"}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-2xl p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-3 md:hidden">
          {[
            { name: "News", href: "/news" },
            { name: "Movies", href: "/movies" },
            { name: "Songs", href: "/music" },
            { name: "Favorites", href: "/favourite" },
            { name: "Settings", href: "/settings" },
          ].map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className="block text-center px-3 py-2 rounded text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={() => setIsOpen(false)}
            >
              {name}
            </Link>
          ))}

          <button
            onClick={() => {
              handleToggle();
              setIsOpen(false);
            }}
            className="px-3 py-2 rounded text-sm font-medium border bg-gray-100 dark:bg-gray-700 dark:text-white"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "🌙 Dark" : "🌞 Light"}
          </button>
        </div>
      )}
    </nav>
  );
}
