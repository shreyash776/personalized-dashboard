"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
    <motion.nav
      aria-label="Primary Navigation"
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border shadow-lg rounded-2xl sm:rounded-full w-[90%] sm:w-[70%] md:w-[60%] max-w-4xl px-4 sm:px-6 py-3"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between ">
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide cursor-pointer select-none"
        >
          Dashboard
        </Link>

        <div className="hidden sm:flex gap-4 md:gap-6 items-center">
          {menuItems.map(({ name, href }) => (
            <motion.div
              key={href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={href}
                className="text-sm font-medium px-3 py-1 rounded hover:bg-black hover:text-white transition-colors"
              >
                {name}
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          className="sm:hidden text-2xl p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            className="mt-4 grid grid-cols-2 gap-4 sm:hidden bg-white px-4 py-4 border border-gray-200 shadow-inner transition-all text-center rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map(({ name, href }) => (
              <motion.div
                key={href}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
              >
                <Link
                  href={href}
                  className="block text-sm font-medium py-2 rounded hover:bg-gray-200 transition"
                >
                  {name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
