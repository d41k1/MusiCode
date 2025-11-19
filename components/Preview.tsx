import React, { useEffect, useRef } from "react";
import abcjs from "abcjs";

interface PreviewProps {
  abcString: string;
  id?: string;
  onRender?: (visualObj: any) => void;
}

const Preview: React.FC<PreviewProps> = ({
  abcString,
  id = "paper",
  onRender,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const visualObj = abcjs.renderAbc(id, abcString, {
        responsive: "resize",
        add_classes: true,
        scale: 0.6, // 小さいサイズに固定
        staffwidth: 800, // 幅を制限
        paddingtop: 0,
        paddingbottom: 0,
        paddingright: 0,
        paddingleft: 0,
      });

      if (onRender && visualObj && visualObj.length > 0) {
        onRender(visualObj[0]);
      }
    }
  }, [abcString, id, onRender]);

  return (
    <div className="w-full h-full overflow-hidden bg-(--content-bg) text-(--text-primary) rounded-lg shadow-inner p-8 flex justify-center items-center transition-colors duration-200">
      <div className="w-full h-full overflow-auto flex justify-center items-start">
        <div
          id={id}
          ref={containerRef}
          className="w-full max-w-full text-(--text-primary) origin-top"
        />
      </div>
    </div>
  );
};

export default Preview;
