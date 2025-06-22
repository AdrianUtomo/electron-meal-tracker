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
            <div className="flex gap-2" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                <button onClick={handleMinimize}>
                    <Icon
                        icon="pixelarticons:minus"
                        width="24"
                        height="24"
                    />
                </button>
                <button onClick={handleClose}>
                    <Icon
                        icon="pixelarticons:close-box"
                        width="24"
                        height="24"
                    />
                </button>
            </div>
        </div>
    );
}
