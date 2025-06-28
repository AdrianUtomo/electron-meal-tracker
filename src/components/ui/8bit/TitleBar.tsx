import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Slider } from "./slider";

interface TitleBarProps {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

export function TitleBar({ volume, setVolume }: TitleBarProps) {
  const [isPinned, setIsPinned] = useState(false);

  // Function to determine volume icon based on volume level
  const getVolumeIcon = (vol: number): string => {
    if (vol === 0) return "pixelarticons:volume-x";
    if (vol > 0 && vol < 33) return "pixelarticons:volume-1";
    if (vol >= 33 && vol < 66) return "pixelarticons:volume-2";
    if (vol >= 66) return "pixelarticons:volume-3";
    return "pixelarticons:volume-2"; // fallback
  };

  // Get initial pin status when component mounts
  useEffect(() => {
    const getPinStatus = async () => {
      try {
        const status = await window.electron.ipcRenderer.invoke(
          "window-get-pin-status"
        );
        setIsPinned(status);
      } catch (error) {
        console.error("Failed to get pin status:", error);
      }
    };
    getPinStatus();
  }, []);

  const handleMinimize = () => {
    window.electron.ipcRenderer.send("window-minimize");
  };

  const handleClose = () => {
    window.electron.ipcRenderer.send("window-close");
  };

  const handlePinToggle = () => {
    if (isPinned) {
      window.electron.ipcRenderer.send("window-unpin");
      setIsPinned(false);
    } else {
      window.electron.ipcRenderer.send("window-pin");
      setIsPinned(true);
    }
  };

  return (
    <div
      className="flex items-center justify-between w-full h-12 bg-[#fec7cd] border-b-4 border-[#c45363] px-2"
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      <div
        className="flex items-center gap-3"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        <Popover>
          <PopoverTrigger>
            <div className="border-3 border-[#d6697b] p-[2px] cursor-pointer">
              <Icon icon={(getVolumeIcon(volume))} width={20} height={20} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-[#fec7cd] text-[#8c303f]">
            <Slider
              className="bg-[#fec7cd] text-[#8c303f]"
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
            />
          </PopoverContent>
        </Popover>
        <button
          onClick={handlePinToggle}
          className={`border-3 border-[#d6697b] p-[2px] cursor-pointer`}
          title={isPinned ? "Unpin window" : "Pin window to top"}
        >
          <Icon
            icon={isPinned ? "pixel:location-pin-solid" : "pixel:location-pin"}
            width="20"
            height="20"
          />
        </button>
      </div>
      <div
        className="flex items-center gap-2"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        <button
          onClick={handleMinimize}
          className="border-3 border-[#d6697b] p-[2px] cursor-pointer"
        >
          <Icon icon="pixelarticons:minus" width="20" height="20" />
        </button>
        <button onClick={handleClose} className="cursor-pointer">
          <Icon icon="pixelarticons:close-box" width="40" height="40" />
        </button>
      </div>
    </div>
  );
}
