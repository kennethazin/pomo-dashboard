"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function ProgressCard() {
  const [yearProgress, setYearProgress] = useState(0);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  console.log("mouse entered", isMouseEntered);
  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const progress =
      ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) *
      100;
    setYearProgress(Math.round(progress));
  }, []);

  const daysLeft =
    365 -
    Math.floor(
      (new Date().getTime() -
        new Date(new Date().getFullYear(), 0, 1).getTime()) /
        (1000 * 60 * 60 * 24)
    );

  return (
    <div className="h-[250px] relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-lg dark:from-emerald-900/20 dark:to-emerald-800/20">
      <div className="absolute bottom-0 left-0 p-5 z-10 flex items-center gap-3 text-lg font-medium text-emerald-900 dark:text-emerald-100">
        <div className="relative h-6 w-6 ">
          <svg
            className="h-6 w-6 hover:scale-125 transition-all ease-in-out "
            viewBox="0 0 24 24"
          >
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
        <div
          className="text-black text-sm font-mono w-48 cursor-default"
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseLeave={() => setIsMouseEntered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMouseEntered ? "daysLeft" : "yearProgress"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full text-left bottom-0.5 h-10 font-mono "
            >
              {isMouseEntered
                ? `${daysLeft} days left`
                : `${yearProgress}% of ${new Date().getFullYear()} is done`}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute inset-0 japan-image bg-cover bg-center bg-gradient-to-tr from-transparent to-black" />
    </div>
  );
}
