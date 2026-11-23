"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { name: "Home", href: "/#hero", active: true },
  { name: "Services", href: "/#services" },
  { name: "Projects", href: "/#projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "About Me", href: "/#about" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 pt-5">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6 sm:px-8 py-3.5 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border border-[#4A90A4]/20 shadow-2xl shadow-[#4A90A4]/10"
            : "bg-white/70 backdrop-blur-md border border-[#4A90A4]/15"
        }`}
      >
        {/* Brand Logo - Icon + Full Name + Title */}
        <a
          href="#"
          id="nav-logo"
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-full bg-[#4A90A4] flex items-center justify-center text-white shadow-md shadow-[#4A90A4]/30 group-hover:scale-105 transition-transform shrink-0">
            <svg
              className="w-4 h-4 fill-white text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-[#2C4A5A] text-sm sm:text-base tracking-tight">
              Arooba Alam <span className="text-[#4A90A4]">Khan</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#4A90A4]/70 font-semibold tracking-widest uppercase">
              Full Stack Web Developer
            </span>
          </div>
        </a>

        {/* Center Nav Pill Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                link.active
                  ? "text-[#4A90A4] font-bold bg-[#4A90A4]/10 border border-[#4A90A4]/25"
                  : "text-[#4A6B7A] hover:text-[#2C4A5A] hover:bg-[#4A90A4]/5"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle Icon */}
          <ThemeToggle />

          {/* Let's Talk Pill Button */}
          <a
            href="#contact"
            id="hire-me-nav-btn"
            className="inline-flex items-center gap-2 bg-[#4A90A4] text-white hover:bg-[#357A8A] text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-[#4A90A4]/25 transition-all duration-200"
          >
            <span>Let&apos;s Talk</span>
          </a>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center ml-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-btn"
              aria-label="Open navigation menu"
              className="p-2 rounded-full bg-[#4A90A4]/10 border border-[#4A90A4]/20 text-[#4A90A4]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#C8D9E6]" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-[#4A90A4]/20 p-5 shadow-2xl shadow-[#4A90A4]/10"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#4A6B7A] hover:text-[#2C4A5A] hover:bg-[#4A90A4]/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
