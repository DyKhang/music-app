import React, { useMemo } from "react";
import { useElementSize } from "../hooks/useElementSize";

type Props = { children: string; gap?: number };

export const Divider: React.FC<Props> = ({ children, gap = 8 }) => {
  const [wrapRef, wrapSize] = useElementSize(); // W
  const [textRef, textSize] = useElementSize(); // T

  const width = useMemo(() => {
    const W = wrapSize.width;
    const T = textSize.width;
    return Math.max(0, (W - T - 2 * gap) / 2);
  }, [wrapSize.width, textSize.width, gap]);

  return (
    <div ref={wrapRef} className="relative mt-[20px] h-[0.5px]">
      <div
        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#afafaf]"
        style={{ width }}
      />

      <div
        className="absolute right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#afafaf]"
        style={{ width }}
      />

      <span
        ref={textRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-[1.4rem]"
      >
        {children}
      </span>
    </div>
  );
};
