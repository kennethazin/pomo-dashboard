"use client";

import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface TimerSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: {
    focusTime: number;
    shortBreak: number;
    longBreak: number;
    autoStartBreaks: boolean;
  };
  onSettingsChange: (settings: {
    focusTime: number;
    shortBreak: number;
    longBreak: number;
    autoStartBreaks: boolean;
  }) => void;
}

export function TimerSettings({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
}: TimerSettingsProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="h-full w-full p-6">
          <DrawerHeader className="p-0">
            <div className="flex items-center justify-between">
              <DrawerTitle className="font-mono text-xl">Settings</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="mt-6 space-y-6 ">
            <div className="space-y-4">
              <h3 className="font-mono text-zinc-600 dark:text-zinc-400">
                Focus
              </h3>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={settings.focusTime}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      focusTime:
                        Number.parseInt(e.target.value) || settings.focusTime,
                    })
                  }
                  className="w-20 bg-zinc-50 dark:bg-zinc-800"
                />
                <span className="font-mono text-zinc-400">min</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-zinc-600 dark:text-zinc-400">
                Short Break
              </h3>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={settings.shortBreak}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      shortBreak:
                        Number.parseInt(e.target.value) || settings.shortBreak,
                    })
                  }
                  className="w-20 bg-zinc-50 dark:bg-zinc-800"
                />
                <span className="font-mono text-zinc-400">min</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-zinc-600 dark:text-zinc-400">
                Long Break
              </h3>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={settings.longBreak}
                  onChange={(e) =>
                    onSettingsChange({
                      ...settings,
                      longBreak:
                        Number.parseInt(e.target.value) || settings.longBreak,
                    })
                  }
                  className="w-20 bg-zinc-50 dark:bg-zinc-800"
                />
                <span className="font-mono text-zinc-400">min</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Label className="font-mono text-zinc-600 dark:text-zinc-400">
                Auto-start breaks
              </Label>
              <Switch
                checked={settings.autoStartBreaks}
                onCheckedChange={(checked) =>
                  onSettingsChange({ ...settings, autoStartBreaks: checked })
                }
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
