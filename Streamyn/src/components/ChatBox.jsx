import { useState, useRef, useEffect } from "react";

const SEED_MESSAGES = [
  { id: 1, user: "CryptoKing", text: "This stream is absolutely 🔥🔥", time: "10:01", isSelf: false, avatar: "CK" },
  { id: 2, user: "NeonWave", text: "Can't believe I made it to the live stream!", time: "10:02", isSelf: false, avatar: "NW" },
  { id: 3, user: "DevMaster", text: "The audio quality is insane 🎧", time: "10:03", isSelf: false, avatar: "DM" },
  { id: 4, user: "StreamFan99", text: "Already sharing this with everyone I know", time: "10:04", isSelf: false, avatar: "SF" },
  { id: 5, user: "PulseLive", text: "Welcome to the stream! Join the chat 👋", time: "10:05", isSelf: false, avatar: "PL" },
];

const AVATAR_COLORS = [
  "from-violet-600 to-purple-700",
  "from-cyan-600 to-blue-700",
  "from-pink-600 to-rose-700",
  "from-green-600 to-emerald-700",
  "from-orange-600 to-amber-700",
];

export default function ChatBox() {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate incoming messages
  useEffect(() => {
    const bots = [
      "Just tuned in, this is epic!",
      "Love the production quality here",
      "Shoutout from Tokyo 🇯🇵",
      "The best stream I've watched all year 🙌",
      "pulse.live never disappoints",
    ];
    const botUsers = ["AlphaUser", "ZeroFox", "DataDrifter", "NightOwl", "StreamBot"];
    let i = 0;
    const interval = setInterval(() => {
      if (i < bots.length) {
        const userIdx = i % botUsers.length;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            user: botUsers[userIdx],
            text: bots[i],
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            isSelf: false,
            avatar: botUsers[userIdx].slice(0, 2).toUpperCase(),
          },
        ]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "You",
        text,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        isSelf: true,
        avatar: "YO",
      },
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/5 bg-slate-50/80 dark:bg-gray-900/80">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Live Chat</span>
          <span className="px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 text-xs border border-violet-500/20">
            {messages.length} messages
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i]} flex items-center justify-center text-xs font-bold text-white -ml-1`} style={{ zIndex: 3 - i }}>
              {["A","B","C"][i]}
            </div>
          ))}
          <span className="ml-2 text-xs text-slate-500 dark:text-gray-500">+{Math.floor(Math.random() * 200 + 50)}</span>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {messages.map((msg, idx) => {
          const colorIdx = msg.user.charCodeAt(0) % AVATAR_COLORS.length;
          return (
            <div
              key={msg.id}
              className={`flex gap-2 transition-all duration-300`}
              style={{ animation: "slideInMessage 0.25s ease both" }}
            >
              {/* Avatar */}
              {!msg.isSelf && (
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br ${AVATAR_COLORS[colorIdx]} flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white mt-0.5`}
                >
                  {msg.avatar}
                </div>
              )}

              <div className={`flex flex-col max-w-[80%] ${msg.isSelf ? "ml-auto items-end" : "items-start"}`}>
                {!msg.isSelf && (
                  <span className="text-xs text-slate-500 dark:text-gray-500 mb-0.5 ml-0.5">{msg.user}</span>
                )}
                <div
                  className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.isSelf
                      ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-br-sm"
                      : "bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-white/5 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-slate-400 dark:text-gray-600 mt-0.5 mx-1">{msg.time}</span>
              </div>

              {msg.isSelf && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                  YO
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="px-3 py-3 border-t border-slate-200 dark:border-white/5 bg-slate-50/90 dark:bg-gray-900/90">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-white/5 focus-within:border-violet-500/40 focus-within:ring-1 focus-within:ring-violet-500/20 transition-all duration-200">
          {/* Emoji button */}
          <button className="text-slate-500 dark:text-gray-500 hover:text-slate-600 dark:text-gray-300 transition-colors text-lg leading-none flex-shrink-0">
            😊
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Say something..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-gray-600 outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
              ${input.trim()
                ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 shadow-md"
                : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-600 cursor-not-allowed"
              }`}
          >
            <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-slate-400 dark:text-gray-600 mt-1.5 px-1">Press Enter to send · Be respectful</p>
      </div>
    </div>
  );
}
