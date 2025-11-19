import { useState, useEffect } from "react";
import abcjs from "abcjs";

export const useAbcPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
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
    } catch (error) {
      console.error("Playback failed:", error);
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    handlePlay,
    setVisualObj,
  };
};
