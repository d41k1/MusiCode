import React from "react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  fontSize?: number;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, fontSize = 16 }) => {
  return (
    <div className="h-full w-full flex flex-col bg-[var(--content-bg)]">
      <textarea
        className="flex-1 w-full h-full p-8 font-mono bg-transparent text-[var(--text-primary)] focus:outline-none resize-none leading-relaxed placeholder-[var(--text-primary)]/50"
        style={{ fontSize: `${fontSize}px` }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ここにABC記法を入力してください..."
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
