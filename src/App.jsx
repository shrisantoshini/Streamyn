import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import React from "react";

// Page transition wrapper
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <div
      key={location.pathname}
      style={{ animation: "fadeIn 0.3s ease both" }}
    >
      {children}
    </div>
  );
}

function AppInner() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`${darkMode ? "dark bg-gray-950" : "bg-slate-50"} min-h-screen transition-colors duration-300`}>
      <Navbar darkMode={darkMode} toggleDark={() => setDarkMode((d) => !d)} />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </PageTransition>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  );
}
