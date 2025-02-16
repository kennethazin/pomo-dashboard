"use client";

import { useEffect, useState } from "react";

export function ProgressCard() {
  const [yearProgress, setYearProgress] = useState(0);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const progress =
      ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) *
      100;
    setYearProgress(Math.round(progress));
  }, []);

  return (
    <div className="h-[250px] relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-lg dark:from-emerald-900/20 dark:to-emerald-800/20">
      <div className="relative z-10 flex items-center gap-3 text-lg font-medium text-emerald-900 dark:text-emerald-100">
        <div className="relative h-6 w-6 ">
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <circle
              className="stroke-emerald-200 dark:stroke-emerald-700"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="2"
              fill="none"
            />
            <circle
              className="stroke-emerald-500 dark:stroke-emerald-400"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${yearProgress * 0.628} 62.8`}
              strokeDashoffset="15.7"
              transform="rotate(-90 12 12)"
            />
          </svg>
        </div>
        <div>
          {yearProgress}% of {new Date().getFullYear()} is done
        </div>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-transparent "
        style={{
          clipPath: `polygon(0 0, ${yearProgress}% 0, ${yearProgress}% 100%, 0 100%)`,
        }}
      />
    </div>
  );
}
