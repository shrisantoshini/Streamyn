import React from "react";
export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/5 animate-pulse">
      {/* Image skeleton */}
      <div className="h-44 bg-slate-100 dark:bg-gray-800" />
      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-100 dark:bg-gray-800 rounded-lg w-3/4" />
        <div className="h-3 bg-slate-100 dark:bg-gray-800 rounded-lg w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="h-7 bg-slate-100 dark:bg-gray-800 rounded-lg w-16" />
          <div className="h-7 bg-slate-100 dark:bg-gray-800 rounded-lg w-16" />
          <div className="h-7 bg-slate-100 dark:bg-gray-800 rounded-lg w-16 ml-auto" />
        </div>
      </div>
    </div>
  );
}