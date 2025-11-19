import React from "react";

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferenceModal: React.FC<ReferenceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: "音階",
      description: "ドレミファソラシドは CDEFGABc で表します",
      examples: [
        { label: "基本", code: "C D E F G A B c" },
        { label: "高音", code: "c d e f g a b c'" },
        { label: "低音", code: "C, D, E, F, G, A, B," },
      ],
    },
    {
      title: "音符の長さ",
      description: "文字の後ろに数字をつけると長さが変わります",
      examples: [
        { label: "2分音符", code: "C2" },
        { label: "8分音符", code: "C/2" },
        { label: "付点音符", code: "C>D" },
        { label: "逆付点音符", code: "C<D" },
      ],
    },
    {
      title: "演奏記号",
      description: "シャープ、フラット、ナチュラルなど",
      examples: [
        { label: "シャープ", code: "^C" },
        { label: "フラット", code: "_D" },
        { label: "ナチュラル", code: "=E" },
        { label: "休符", code: "z" },
      ],
    },
    {
      title: "楽譜の情報",
      description: "楽譜の情報を設定します",
      examples: [
        { label: "タイトル", code: "T:曲のタイトル" },
        { label: "拍子", code: "M:4/4" },
        { label: "基本の音長", code: "L:1/4" },
        { label: "キー", code: "K:C" },
      ],
    },
    {
      title: "コードと連符",
      description: "和音や連符の書き方",
      examples: [
        { label: "和音", code: "[CEG]" },
        { label: "3連符", code: "(3CDE" },
      ],
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--surface-bg)] rounded-[16px] w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl text-[var(--text-primary)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-[var(--outline)]/20 bg-[var(--header-bg)]">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              ABC記法 表記ガイド
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-rounded text-[24px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar bg-[var(--surface-bg)]">
          <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 p-5 rounded-xl text-base mb-8">
            <p className="font-medium whitespace-pre-line">
              ABC記法はテキストで楽譜を書くための簡単な表記法です
              <br />
              様々な記号を組み合わせて、メロディやリズム、コード進行などを表現します
            </p>
          </div>

          {sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h3 className="font-bold text-xl text-[var(--primary)] border-l-4 border-[var(--primary)] pl-4">
                {section.title}
              </h3>
              <p className="text-[var(--text-primary)] opacity-80 text-sm font-medium">
                {section.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {section.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="bg-[var(--content-bg)] border border-[var(--outline)]/20 rounded-xl p-4 hover:border-[var(--primary)]/30 transition-all group shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                        {ex.label}
                      </span>
                      <button
                        onClick={() => copyToClipboard(ex.code)}
                        className="text-[var(--primary)] hover:text-[var(--primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[var(--primary)]/10 cursor-pointer"
                        title="コピー"
                      >
                        <span className="material-symbols-rounded text-[16px]">
                          content_copy
                        </span>
                      </button>
                    </div>
                    <code className="block bg-transparent p-0 rounded-lg font-mono text-sm text-[var(--text-primary)]">
                      {ex.code}
                    </code>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="pt-8 border-t border-[var(--outline)]/20">
            <p className="text-sm text-center opacity-70">
              より詳しい情報は{" "}
              <a
                href="https://abcnotation.com/wiki/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--primary)] hover:underline font-medium"
              >
                abcnotation.com
              </a>{" "}
              (英語) をご覧ください。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReferenceModal;
