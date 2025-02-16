"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { WeatherCard } from "@/components/weather-card";
import { TimerCard } from "@/components/timer-card";
import { ProgressCard } from "@/components/progress-card";

export default function Home() {
  const [focusedCard, setFocusedCard] = useState<string | null>(null);

  const handleMouseEnter = (card: string) => {
    setFocusedCard(card);
  };

  const handleMouseLeave = () => {
    setFocusedCard(null);
  };

  return (
    <main className="min-h-screen bg-zinc-50 p-4 dark:bg-zinc-950 sm:p-8 flex items-center ">
      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          onMouseEnter={() => handleMouseEnter("weather")}
          onMouseLeave={handleMouseLeave}
          animate={{
            opacity: focusedCard && focusedCard !== "weather" ? 0.5 : 1,
            filter:
              focusedCard && focusedCard !== "weather" ? "blur(2px)" : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          <WeatherCard />
        </motion.div>
        <motion.div
          onMouseEnter={() => handleMouseEnter("timer")}
          onMouseLeave={handleMouseLeave}
          animate={{
            opacity: focusedCard && focusedCard !== "timer" ? 0.5 : 1,
            filter:
              focusedCard && focusedCard !== "timer" ? "blur(2px)" : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          <TimerCard />
        </motion.div>
        <motion.div
          onMouseEnter={() => handleMouseEnter("progress")}
          onMouseLeave={handleMouseLeave}
          animate={{
            opacity: focusedCard && focusedCard !== "progress" ? 0.5 : 1,
            filter:
              focusedCard && focusedCard !== "progress" ? "blur(2px)" : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          <ProgressCard />
        </motion.div>
      </div>
      <div className="text-foreground fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-2 font-mono text-sm tracking-tighter text-accent-foreground dark:text-accent-background">
        @2025 by Kenneth
      </div>
    </main>
  );
}
