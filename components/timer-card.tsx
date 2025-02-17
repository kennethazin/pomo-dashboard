"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TimerSettings } from "./timer-settings";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function TimerCard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState({
    focusTime: 30,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
  });
  const [time, setTime] = useState(settings.focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState("");
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            clearInterval(timerRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(settings.focusTime * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        className="relative rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900 flex flex-col justify-between h-[250px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center justify-between"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 0.5 }}
        >
          <Input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task"
            className="border-none bg-transparent  p-0 text-md outline-none  font-mono"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          className="my-4 font-mono text-4xl font-bold pt-16"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 0.5 }}
        >
          {formatTime(time)}
          <span className="text-sm font-normal text-zinc-400"> Focus</span>
        </motion.div>

        <motion.div
          className="flex items-center justify-between"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm text-zinc-600 dark:text-zinc-400 font-mono">
            Just do it
          </span>
          <div className="flex gap-2 h-fit">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleTimer}
            >
              {isRunning ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={resetTimer}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <TimerSettings
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        settings={settings}
        onSettingsChange={(newSettings) => {
          setSettings(newSettings);
          setTime(newSettings.focusTime * 60);
        }}
      />
    </>
  );
}
