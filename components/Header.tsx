import React, { useEffect, useState } from "react";
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

const Header: React.FC<HeaderProps> = ({
  onPlay,
  onShare,
  onDownloadPng,
  onToggleTheme,
  onOpenGuide,
  onFontSizeChange,
  isPlaying = false,
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 bg-[var(--header-bg)] border-b border-[var(--outline)]/20 flex items-center justify-between px-4 shadow-sm z-10 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center">
          <img
            src="/icon.svg"
            alt="MusiCode"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
          MusiCode
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={onPlay}
          className="h-10 flex items-center justify-center gap-2 px-4 bg-[var(--primary)] text-[var(--on-primary)] rounded-full hover:bg-[var(--primary)]/90 transition-all shadow-sm hover:shadow active:scale-95 font-medium cursor-pointer"
        >
          <span className="material-symbols-rounded text-[20px]">
            {isPlaying ? "stop" : "play_arrow"}
          </span>
          <span>{isPlaying ? "Stop" : "Play"}</span>
        </button>

        <button
          onClick={onShare}
          className="h-10 flex items-center justify-center gap-2 px-4 bg-[var(--primary)] text-[var(--on-primary)] rounded-full hover:bg-[var(--primary)]/90 transition-all shadow-sm hover:shadow active:scale-95 font-medium cursor-pointer"
        >
          <span className="material-symbols-rounded text-[20px]">share</span>
          <span>Share</span>
        </button>

        <button
          onClick={onDownloadPng}
          className="h-10 flex items-center justify-center gap-2 px-4 bg-[var(--primary)] text-[var(--on-primary)] rounded-full hover:bg-[var(--primary)]/90 transition-all shadow-sm hover:shadow active:scale-95 font-medium cursor-pointer"
        >
          <span className="material-symbols-rounded text-[20px]">download</span>
          <span>PNG</span>
        </button>

        <div className="h-10 flex items-center bg-[var(--primary)] text-[var(--on-primary)] rounded-full p-1 shadow-sm">
          <button
            onClick={() => onFontSizeChange(-2)}
            className="w-8 h-full flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-rounded text-[18px]">remove</span>
          </button>
          <div className="flex items-center justify-center px-1 h-full">
            <span className="material-symbols-rounded text-[20px]">
              format_size
            </span>
          </div>
          <button
            onClick={() => onFontSizeChange(2)}
            className="w-8 h-full flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-rounded text-[18px]">add</span>
          </button>
        </div>

        <button
          onClick={onToggleTheme}
          className="h-10 w-10 flex items-center justify-center bg-[var(--primary)] text-[var(--on-primary)] rounded-full hover:bg-[var(--primary)]/90 transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-rounded text-[20px]">
            {mounted && theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>

        <button
          onClick={onOpenGuide}
          className="h-10 w-10 flex items-center justify-center bg-[var(--primary)] text-[var(--on-primary)] rounded-full hover:bg-[var(--primary)]/90 transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-rounded text-[20px]">help</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
