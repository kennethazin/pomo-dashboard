"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Hash } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { MapPin } from "lucide-react";

export function WeatherCard() {
  const [location, setLocation] = useState("Loading...");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
          );
          const data = await response.json();
          setLocation(data.city || "Unknown Location");
        } catch (error) {
          setLocation("Location Error");
        }
      });
    }

    // Update time every second
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.valueOf() - startOfYear.valueOf()) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);

  const renderTimeSegments = () => {
    const segments = [];
    const totalSegments = 48; // 24 hours * 2 (30-minute segments)
    const activeSegments = Math.floor((hours * 60 + minutes) / 30);

    for (let i = 0; i < totalSegments; i++) {
      segments.push(
        <div
          key={i}
          className={`h-5 w-1 ${
            i < activeSegments
              ? "bg-orange-400 dark:bg-orange-500 "
              : "bg-zinc-100 dark:bg-zinc-800"
          }`}
        />
      );
    }
    return segments;
  };

  return (
    <div className="relative rounded-xl bg-white p-6 shadow-lg font-mono dark:bg-zinc-900 h-[250px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-600 dark:text-zinc-400 flex gap-2 items-center">
            <MapPin size={16} />
            {location}
            <div className="h-1 w-1 bg-green-500 dark:bg-green-500 rounded-full animate-pulse" />
          </span>
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          {theme === "dark" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="my-4 flex h-10 w-full gap-[3px] lg:gap-[2.5px] overflow-hidden ">
        {renderTimeSegments()}
      </div>

      <div className="mb-4 font-mono text-4xl font-bold">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}
        <span className="text-sm font-normal text-zinc-400">
          {hours >= 12 ? " PM" : " AM"}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400 ">
        <span className="flex items-center gap-2">
          <CalendarDays size={16} />
          {date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span className="flex items-center gap-2">
          <Hash size={16} />
          Week {weekNumber}
        </span>
      </div>
    </div>
  );
}
