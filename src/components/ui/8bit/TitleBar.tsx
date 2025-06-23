import { Icon } from "@iconify/react";
import React from "react";

interface TitleBarProps {
  title: string;
}

export function TitleBar({ title }: TitleBarProps) {
  const handleMinimize = () => {
    window.electron.ipcRenderer.send("window-minimize");
  };

  const handleClose = () => {
    window.electron.ipcRenderer.send("window-close");
  };

  return (
    <div
      onClick={() => console.log("you pressed the title bar")}
      className="flex items-center justify-end w-full h-12 bg-[#fec7cd] border-b-4 border-[#c45363] px-2"
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      <div
        className="flex items-center gap-2"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        <button onClick={handleMinimize} className="border-3 border-[#d6697b] p-[2px] cursor-pointer">
          <Icon icon="pixelarticons:minus" width="20" height="20" />
        </button>
				<button onClick={handleClose} className="cursor-pointer">
          <Icon icon="pixelarticons:close-box" width="40" height="40" />
        </button>
      </div>
    </div>
  );
}
