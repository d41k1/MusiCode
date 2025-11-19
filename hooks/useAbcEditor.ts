import { useState, useEffect } from "react";

const DEFAULT_ABC = `X: 1
T: Cooley's
M: 4/4
L: 1/8
K: Emin
|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|
EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|
|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|
eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|`;

export const useAbcEditor = () => {
  const [abcString, setAbcString] = useState(DEFAULT_ABC);
  const [fontSize, setFontSize] = useState(16);

  const handleFontSizeChange = (delta: number) => {
    setFontSize((prev) => Math.max(12, Math.min(32, prev + delta)));
  };

  // URLパラメータからの読み込み
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const abcParam = params.get("abc");
      if (abcParam) {
        setAbcString(decodeURIComponent(abcParam));
      }
    }
  }, []);

  return {
    abcString,
    setAbcString,
    fontSize,
    handleFontSizeChange,
  };
};
