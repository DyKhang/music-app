import { useCallback, useEffect, useState } from "react";

type Size = { width: number; height: number };

export function useElementSize() {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const ref = useCallback((el: HTMLElement | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return [ref, size] as const;
}
