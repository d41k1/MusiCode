"use client";

import { useState } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import Header from "@/components/Header";
import FloatingMenu from "@/components/FloatingMenu";
import ReferenceModal from "@/components/ReferenceModal";
import { useTheme } from "next-themes";
import { downloadImage } from "@/utils/export";
import { useAbcEditor } from "@/hooks/useAbcEditor";
import { useAbcPlayer } from "@/hooks/useAbcPlayer";

export default function Home() {
  const { abcString, setAbcString, fontSize, handleFontSizeChange } =
    useAbcEditor();
  const { isPlaying, handlePlay, setVisualObj } = useAbcPlayer();
  const { theme, setTheme } = useTheme();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(abcString);
    alert("ABC記法のテキストをコピーしました！");
  };

  const handleDownloadPng = () => {
    downloadImage("paper", "music-score");
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <main className="flex h-screen flex-col bg-(--app-bg) transition-colors duration-300">
      <Header
        onPlay={handlePlay}
        onShare={handleShare}
        onDownloadPng={handleDownloadPng}
        onToggleTheme={toggleTheme}
        onOpenGuide={() => setIsGuideOpen(true)}
        onFontSizeChange={handleFontSizeChange}
        isPlaying={isPlaying}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 gap-4 pb-24 md:py-12 md:px-16 lg:px-32 md:gap-12">
        {/* Editor Area */}
        <div className="flex-1 bg-(--surface-bg) rounded-2xl shadow-sm border border-(--outline)/20 overflow-hidden flex flex-col transition-colors duration-300">
          <Editor
            value={abcString}
            onChange={setAbcString}
            fontSize={fontSize}
          />
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-(--surface-bg) rounded-2xl shadow-sm border border-(--outline)/20 overflow-hidden flex flex-col transition-colors duration-300">
          <Preview abcString={abcString} onRender={setVisualObj} />
        </div>
      </div>

      <FloatingMenu
        onPlay={handlePlay}
        onShare={handleShare}
        onDownloadPng={handleDownloadPng}
        onToggleTheme={toggleTheme}
        onOpenGuide={() => setIsGuideOpen(true)}
        onFontSizeChange={handleFontSizeChange}
        isPlaying={isPlaying}
      />

      <ReferenceModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </main>
  );
}
