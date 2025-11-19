"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import Header from "@/components/Header";
import FloatingMenu from "@/components/FloatingMenu";
import ReferenceModal from "@/components/ReferenceModal";
import { useTheme } from "next-themes";
import { downloadImage } from "@/utils/export";
import abcjs from "abcjs";

const DEFAULT_ABC = `X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|
EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|
|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|
eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|`;

export default function Home() {
  const [abcString, setAbcString] = useState(DEFAULT_ABC);
  const [fontSize, setFontSize] = useState(16);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { theme, setTheme } = useTheme();
  const [synth, setSynth] = useState<any>(null);
  const [visualObj, setVisualObj] = useState<any>(null);

  // Initialize synth
  useEffect(() => {
    if (typeof window !== "undefined") {
      const synthInstance = new abcjs.synth.CreateSynth();
      setSynth(synthInstance);
    }
  }, []);

  const handlePlay = async () => {
    if (!synth || !visualObj) return;

    if (isPlaying) {
      synth.stop();
      setIsPlaying(false);
      return;
    }

    try {
      await synth.init({ visualObj: visualObj });
      await synth.prime();
      await synth.start();
      setIsPlaying(true);
      // 終了検知は難しいが、とりあえず再生開始はできる
      // abcjsのsynthは終了イベントを持ってるか？
      // synth.start() returns a promise that resolves when started.
      // There isn't a simple "onEnded" callback in the basic usage, but we can check documentation.
      // For now, simple toggle.
    } catch (error) {
      console.error("Playback failed:", error);
      setIsPlaying(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(abcString);
    alert("ABC記法のテキストをコピーしました！");
  };

  const handleDownloadPng = () => {
    downloadImage("paper", "music-score");
  };

  const handleFontSizeChange = (delta: number) => {
    setFontSize((prev) => Math.max(12, Math.min(32, prev + delta)));
  };

  // URLパラメータからの読み込み
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const abcParam = params.get("abc");
    if (abcParam) {
      setAbcString(decodeURIComponent(abcParam));
    }
  }, []);

  return (
    <main className="flex h-screen flex-col bg-[var(--app-bg)] transition-colors duration-300">
      <Header
        onPlay={handlePlay}
        onShare={handleShare}
        onDownloadPng={handleDownloadPng}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onOpenGuide={() => setIsGuideOpen(true)}
        onFontSizeChange={handleFontSizeChange}
        isPlaying={isPlaying}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 gap-4 pb-24 md:py-12 md:px-16 lg:px-32 md:gap-12">
        {/* Editor Area */}
        <div className="flex-1 bg-[var(--surface-bg)] rounded-2xl shadow-sm border border-[var(--outline)]/20 overflow-hidden flex flex-col transition-colors duration-300">
          <Editor
            value={abcString}
            onChange={setAbcString}
            fontSize={fontSize}
          />
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-[var(--surface-bg)] rounded-2xl shadow-sm border border-[var(--outline)]/20 overflow-hidden flex flex-col transition-colors duration-300">
          <Preview abcString={abcString} onRender={setVisualObj} />
        </div>
      </div>

      <FloatingMenu
        onPlay={handlePlay}
        onShare={handleShare}
        onDownloadPng={handleDownloadPng}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
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
