"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { WeatherCard } from "@/components/weather-card";
import { TimerCard } from "@/components/timer-card";
import { ProgressCard } from "@/components/progress-card";
import { Magnetic } from "@/components/magnetic";
import { Magnet } from "lucide-react";

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
          <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
            <WeatherCard />
          </Magnetic>
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
          <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
            <TimerCard />
          </Magnetic>
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
          <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
            <ProgressCard />
          </Magnetic>
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <a
          href="https://github.com/kennethazin/pomo-dashboard"
          target="_blank"
          className="font-mono group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          <div className="mr-2 text-sm">Github</div>

          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
          >
            <path
              d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </main>
  );
}
