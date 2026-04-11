import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import SkeletonCard from "../components/SkeletonCard";
import { events, categories } from "../data/events";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === "All"
        ? true
        : activeCategory === "Trending"
        ? e.likes > 2000
        : e.category === activeCategory;
    return matchSearch && matchCat;
  });

  const liveCount = events.filter((e) => e.isLive).length;
  const topLiveStreams = events
    .filter((e) => e.isLive)
    .sort((a, b) => {
      const parse = (v) => parseFloat(v.toString()) * (v.toString().includes("K") ? 1000 : v.toString().includes("M") ? 1000000 : 1);
      return parse(b.viewers) - parse(a.viewers);
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-white">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-24 left-1/2 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Elegant Abstract Vectors */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Left half circles */}
          <svg className="absolute top-10 -left-64 sm:-left-32 w-[32rem] h-[32rem] opacity-40 dark:opacity-30 text-slate-500 dark:text-slate-400" viewBox="0 0 100 100" fill="none">
            <circle cx="0" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="0" cy="50" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 2" />
            <circle cx="0" cy="50" r="70" stroke="currentColor" strokeWidth="0.2" />
            <circle cx="0" cy="50" r="90" stroke="currentColor" strokeWidth="0.1" />
          </svg>

          {/* Right half circles */}
          <svg className="absolute top-32 -right-64 sm:-right-32 w-[32rem] h-[32rem] opacity-40 dark:opacity-30 text-slate-500 dark:text-slate-400" viewBox="0 0 100 100" fill="none">
            <circle cx="100" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="50" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
            <circle cx="100" cy="50" r="70" stroke="currentColor" strokeWidth="0.2" />
            <circle cx="100" cy="50" r="90" stroke="currentColor" strokeWidth="0.1" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto text-center" style={{ animation: "fadeSlideUp 0.6s ease both" }}>
          {/* Live pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-red-400">{liveCount} Events Live Now</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
            {"Stream the Moments ".split("").map((char, index) => (
              <span 
                key={index} 
                className="inline-block" 
                style={{ 
                  animationName: 'fadeSlideRight',
                  animationDuration: '0.4s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'both',
                  animationDelay: `${index * 0.04}s` 
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <span className="whitespace-nowrap">
              {"That Matter".split("").map((char, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent pb-1" 
                  style={{ 
                    animationName: 'fadeSlideRight',
                    animationDuration: '0.4s',
                    animationTimingFunction: 'ease-out',
                    animationFillMode: 'both',
                    animationDelay: `${("Stream the Moments ".length + index) * 0.04}s` 
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>
          <p className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Discover live events, concerts, sports, and tech talks.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mb-10">
            {[
              { label: "Events", value: events.length },
              { label: "Categories", value: categories.length - 1 },
              { label: "Viewers", value: "500K+" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
                <div className="text-xs text-slate-500 dark:text-gray-500 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div
            className="relative max-w-xl mx-auto"
            style={{ animation: "fadeSlideUp 0.6s 0.15s ease both" }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/30 to-cyan-600/30 blur-md" />
            <div className="relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-slate-300 dark:border-white/10 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/20 transition-all duration-200">
              <svg className="w-5 h-5 text-slate-500 dark:text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search events, artists, topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-gray-600 outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-sm font-semibold text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOP 3 STREAMS ────────────────────────────────── */}
      <section className="px-4 pb-12 max-w-screen-xl mx-auto" style={{ animation: "fadeSlideUp 0.6s 0.2s ease both" }}>
        <h2 className="text-xl sm:text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-2">
          Top 3 Streams Right Now <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {topLiveStreams.map((event, i) => (
            <div key={event.id} className="flex flex-row items-center gap-3 sm:gap-4">
              {/* Giant Number Properly Spaced */}
              <div 
                className="text-[6rem] sm:text-[7.5rem] font-black leading-none select-none tracking-tighter shrink-0 text-transparent [-webkit-text-stroke:3px_#8b5cf6] dark:[-webkit-text-stroke:2px_rgba(167,139,250,0.8)]"
              >
                {i + 1}
              </div>
              
              {/* Card Container Beside String */}
              <div className="w-full flex-1 min-w-0">
                <EventCard event={event} index={i} compact={true} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FILTER CHIPS ─────────────────────────────────── */}
      <section
        className="px-4 pb-6 max-w-screen-xl mx-auto"
        style={{ animation: "fadeSlideUp 0.6s 0.25s ease both" }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-slate-900 dark:text-white border-transparent shadow-lg shadow-violet-900/30"
                  : "bg-white dark:bg-gray-900 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:border-white/20 hover:text-slate-900 dark:text-white"
              }`}
            >
              {cat === "Trending" && "🔥 "}
              {cat}
            </button>
          ))}

          <span className="ml-auto text-sm text-slate-400 dark:text-gray-600">
            {filtered.length} event{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* ─── EVENT GRID ───────────────────────────────────── */}
      <section className="px-4 pb-20 max-w-screen-xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/5 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-600 dark:text-gray-400 font-medium mb-1">No events found</p>
            <p className="text-slate-400 dark:text-gray-600 text-sm">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-slate-300 dark:border-white/10 text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.slice(0, visibleCount).map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((v) => v + 8)}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white dark:bg-gray-900 border border-slate-300 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white hover:border-violet-500/40 transition-all duration-200"
                >
                  Load More Events
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}