import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function Navbar({ darkMode, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${scrolled ? "pt-3 px-3 sm:pt-4 sm:px-4" : "pt-0 px-0"
        }`}
    >
      <div
        className={`w-full max-w-screen-xl mx-auto transition-all duration-500 overflow-hidden ${scrolled
            ? "bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl rounded-3xl"
            : "bg-transparent border border-transparent rounded-none"
          }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 transition-all duration-500">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                {/* Outer glow aura */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                {/* Inner container */}
                <div className="relative w-full h-full rounded-xl bg-white dark:bg-gray-900 border border-slate-300 dark:border-white/20 overflow-hidden flex items-center justify-center shadow-2xl">
                  {/* Dynamic background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 group-hover:scale-110 transition-transform duration-500" />
                  {/* SVG Icon */}
                  <svg className="relative w-6 h-6 md:w-7 md:h-7 text-slate-900 dark:text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" className="text-violet-400 fill-violet-500/10" />
                    <path d="M10 8.5l5.5 3.5-5.5 3.5v-7z" fill="currentColor" className="text-cyan-400" />
                    <circle cx="12" cy="12" r="1.5" className="fill-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                  </svg>
                </div>
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter">
                <span className="text-slate-900 dark:text-white drop-shadow-sm">Stream</span>
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                  yn
                </span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className="px-4 py-2 text-base font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200">
                Home
              </Link>
              <Link to="#" className="px-4 py-2 text-base font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200">
                Browse
              </Link>
              <Link to="#" className="px-4 py-2 text-base font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200">
                Schedule
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleDark}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white transition-all duration-200"
                title="Toggle theme"
              >
                {darkMode ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Sign In */}
              <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-900/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Sign In
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className={`px-4 pb-4 space-y-1 ${scrolled
              ? "border-t border-slate-200/50 dark:border-white/5 pt-2"
              : "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 pt-2"
            }`}>
            <Link
              to="/"
              className="block px-4 py-2.5 text-base font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#"
              className="block px-4 py-2.5 text-base font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="#"
              className="block px-4 py-2.5 text-base font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Schedule
            </Link>
            <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
