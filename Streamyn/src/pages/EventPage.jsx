import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "../data/events";
import ChatBox from "../components/ChatBox";

const categoryColors = {
  Tech: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Music: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Sports: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeAnim, setLikeAnim] = useState(false);
  const [shared, setShared] = useState(false);
  const [following, setFollowing] = useState(false);

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🎬</div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Event Not Found</h2>
        <p className="text-slate-500 dark:text-gray-500 mb-6">The event you're looking for doesn't exist or was removed.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-slate-900 dark:text-white font-semibold"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const handleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 600);
  };

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const related = events.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-white">
      {/* Back Bar */}
      <div className="sticky top-16 z-40 bg-slate-50 dark:bg-gray-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-4 py-3">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <span className="text-slate-300 dark:text-gray-700">/</span>
          <span className="text-sm text-slate-500 dark:text-gray-500 truncate">{event.title}</span>
          {event.isLive && (
            <span className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold text-red-400">LIVE</span>
            </span>
          )}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* ─── MAIN LAYOUT: Video + Chat ───────────────────── */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* LEFT: Video + Info */}
          <div className="flex-1 min-w-0 space-y-5" style={{ animation: "fadeSlideUp 0.5s ease both" }}>
            {/* Video Player */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-200 dark:border-white/5">
              {/* Glow ring */}
              <div className={`absolute inset-0 rounded-2xl ${event.isLive ? "ring-1 ring-red-500/30" : "ring-1 ring-violet-500/20"} pointer-events-none z-10`} />
              <div className="aspect-video">
                <iframe
                  src={event.videoUrl}
                  title={event.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Event Info Card */}
            <div
              className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-white/5 p-5 space-y-4"
              style={{ animation: "fadeSlideUp 0.5s 0.1s ease both" }}
            >
              {/* Category + Viewers row */}
              <div className="flex items-center flex-wrap gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryColors[event.category] || "bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border-slate-300 dark:border-white/10"}`}>
                  {event.category}
                </span>
                {event.isLive && (
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 text-xs border border-slate-200 dark:border-white/5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" />
                    </svg>
                    {event.viewers} watching
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight">
                {event.title}
              </h1>

              {/* Date/Time */}
              <div className="flex items-center gap-2 text-slate-500 dark:text-gray-500 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(event.date)} · {event.time}
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{event.description}</p>

              {/* Action Row */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-white/5 flex-wrap">
                {/* Like */}
                <button
                  onClick={handleLike}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                    ${liked
                      ? "bg-pink-500/15 text-pink-400 border-pink-500/30"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:text-white"
                    }`}
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${likeAnim ? "scale-125" : ""}`}
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {event.likes + likeCount >= 1000
                    ? ((event.likes + likeCount) / 1000).toFixed(1) + "K"
                    : event.likes + likeCount}{" "}
                  Likes
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                    ${shared
                      ? "bg-green-500/15 text-green-400 border-green-500/30"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:text-white"
                    }`}
                >
                  {shared ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </>
                  )}
                </button>

                {/* Follow */}
                <button
                  onClick={() => setFollowing((f) => !f)}
                  className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                    ${following
                      ? "bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400 border border-slate-300 dark:border-white/10"
                      : "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-900/30 hover:from-violet-500 hover:to-cyan-500"
                    }`}
                >
                  {following ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Following
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Follow Event
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Related Events */}
            {related.length > 0 && (
              <div style={{ animation: "fadeSlideUp 0.5s 0.2s ease both" }}>
                <h3 className="text-sm font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-widest mb-3">
                  More in {event.category}
                </h3>
                <div className="space-y-3">
                  {related.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => navigate(`/event/${r.id}`)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/5 cursor-pointer hover:border-violet-500/20 hover:bg-slate-100 dark:bg-gray-800/50 transition-all duration-200 group"
                    >
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-violet-300 truncate transition-colors">
                          {r.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-gray-500 mt-0.5">{r.time}</p>
                      </div>
                      {r.isLive && (
                        <span className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/20">
                          <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-xs text-red-400 font-semibold">LIVE</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Chat */}
          <div
            className="w-full lg:w-80 xl:w-96 flex-shrink-0"
            style={{ animation: "fadeSlideUp 0.5s 0.15s ease both" }}
          >
            <div className="lg:sticky lg:top-28 h-[560px] lg:h-[calc(100vh-9rem)]">
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
