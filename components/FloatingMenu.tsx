import React, { useState } from "react";
import { useTheme } from "next-themes";

interface HeaderProps {
  onPlay: () => void;
  onShare: () => void;
  onDownloadPng: () => void;
  onToggleTheme: () => void;
  onOpenGuide: () => void;
  onFontSizeChange: (delta: number) => void;
  isPlaying?: boolean;
}

const FloatingMenu: React.FC<HeaderProps> = ({
  onPlay,
  onShare,
  onDownloadPng,
  onToggleTheme,
  onOpenGuide,
  onFontSizeChange,
  isPlaying = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 md:hidden flex flex-col items-end gap-3 z-50">
      {isOpen && (
        <div className="flex flex-col items-end gap-3">
          <button
            onClick={onPlay}
            className="flex items-center gap-2 px-4 py-2 bg-(--primary) text-(--on-primary) rounded-full shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-forwards delay-300"
          >
            <span className="text-sm font-medium">
              {isPlaying ? "Stop" : "Play"}
            </span>
            <span className="material-symbols-rounded text-[20px]">
              {isPlaying ? "stop" : "play_arrow"}
            </span>
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 bg-(--primary) text-(--on-primary) rounded-full shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-forwards delay-200"
          >
            <span className="text-sm font-medium">Share</span>
            <span className="material-symbols-rounded text-[20px]">share</span>
          </button>

          <button
            onClick={onDownloadPng}
            className="flex items-center gap-2 px-4 py-2 bg-(--primary) text-(--on-primary) rounded-full shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-forwards delay-150"
          >
            <span className="text-sm font-medium">PNG</span>
            <span className="material-symbols-rounded text-[20px]">
              download
            </span>
          </button>

          <div className="flex items-center gap-2 px-2 py-1 bg-(--primary) text-(--on-primary) rounded-full shadow-lg hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-forwards delay-100">
            <button
              onClick={() => onFontSizeChange(-2)}
              className="p-2 hover:bg-black/10 rounded-full cursor-pointer flex items-center justify-center"
            >
              <span className="material-symbols-rounded text-[16px]">
                remove
              </span>
            </button>
            <span className="material-symbols-rounded text-[18px]">
              format_size
            </span>
            <button
              onClick={() => onFontSizeChange(2)}
              className="p-2 hover:bg-black/10 rounded-full cursor-pointer flex items-center justify-center"
            >
              <span className="material-symbols-rounded text-[16px]">add</span>
            </button>
          </div>

          <button
            onClick={onToggleTheme}
            className="flex items-center gap-2 px-4 py-2 bg-(--primary) text-(--on-primary) rounded-full shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-forwards delay-75"
          >
            <span className="text-sm font-medium">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
            <span className="material-symbols-rounded text-[20px]">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <button
            onClick={onOpenGuide}
            className="flex items-center gap-2 px-4 py-2 bg-(--primary) text-(--on-primary) rounded-full shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-2 fade-in fill-mode-forwards delay-0"
          >
            <span className="text-sm font-medium">Guide</span>
            <span className="material-symbols-rounded text-[20px]">help</span>
          </button>
        </div>
      )}

      <button
        onClick={toggleMenu}
        className="w-14 h-14 bg-(--primary) text-(--on-primary) rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform active:scale-95 cursor-pointer"
      >
        <span className="material-symbols-rounded text-[28px]">
          {isOpen ? "close" : "menu"}
        </span>
      </button>
    </div>
  );
};

export default FloatingMenu;
