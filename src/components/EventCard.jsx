import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const categoryColors = {
  Tech: "from-cyan-500 to-blue-600",
  Music: "from-pink-500 to-rose-600",
  Sports: "from-green-500 to-emerald-600",
  Trending: "from-orange-500 to-amber-600",
};

const categoryBg = {
  Tech: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Music: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Sports: "bg-green-500/10 text-green-400 border-green-500/20",
  Trending: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function EventCard({ event, index, compact = false }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(event.likes);
  const [likeAnim, setLikeAnim] = useState(false);
  const [shared, setShared] = useState(false);
  const navigate = useNavigate();

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 600);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const formatViewers = (v) => v;

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer
        bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/5
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-900/20 hover:border-violet-500/20"
      style={{
        animationDelay: `${index * 60}ms`,
        animation: "fadeSlideUp 0.5s ease both",
      }}
      onClick={() => navigate(`/event/${event.id}`)}
    >
      {/* Image Container */}
      <div className={`relative ${compact ? "h-32" : "h-44"} overflow-hidden`}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />

        {/* LIVE Badge */}
        {event.isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 text-white shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-bold tracking-wider">LIVE</span>
          </div>
        )}

        {/* Viewers */}
        {event.isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm shadow-sm transition-colors duration-300">
            <svg className="w-3 h-3 text-slate-800 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span className="text-xs text-slate-800 dark:text-gray-300 font-bold">{formatViewers(event.viewers)}</span>
          </div>
        )}

        {/* Category */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryBg[event.category] || "bg-white/10 text-slate-900 dark:text-white border-slate-300 dark:border-white/10"
              }`}
          >
            {event.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-slate-900 dark:text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors duration-200">
          {event.title}
        </h3>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-slate-500 dark:text-gray-500 text-xs">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.date)} · {event.time}</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions Row */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
          {/* Like + Share */}
          <div className="flex items-center gap-2">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                ${liked
                  ? "bg-pink-500/15 text-pink-400 border border-pink-500/20"
                  : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-600 dark:text-gray-300"
                }`}
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${likeAnim ? "scale-150" : "scale-100"}`}
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{(likeCount / 1000).toFixed(likeCount >= 1000 ? 1 : 0)}{likeCount >= 1000 ? "K" : ""}</span>
              {/* Floating heart animation */}
              {likeAnim && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-pink-400 text-base animate-bounce pointer-events-none select-none">
                  ♥
                </span>
              )}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200
                ${shared
                  ? "bg-green-500/15 text-green-400 border-green-500/20"
                  : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-500 border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-600 dark:text-gray-300"
                }`}
            >
              {shared ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          {/* View Button */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/event/${event.id}`); }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold
              bg-gradient-to-r from-violet-600 to-cyan-600
              hover:from-violet-500 hover:to-cyan-500
              text-white transition-all duration-200 shadow-lg shadow-violet-900/20"
          >
            Watch
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
