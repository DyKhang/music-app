import { useEffect, useRef } from "react";

export function useCalRange() {
  const rangeInputRef = useRef<HTMLInputElement>(null);
  const handleChangeBgRange = () => {
    const x = rangeInputRef.current?.value;
    const color = `linear-gradient(90deg, #614646 ${x}%, #c6c4bc ${x}%)`;
    if (rangeInputRef.current) {
      rangeInputRef.current.style.background = color;
    }
  };

  useEffect(() => {
    const inputElement = rangeInputRef.current;

    if (inputElement) {
      inputElement.addEventListener("input", handleChangeBgRange);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", handleChangeBgRange);
      }
    };
  }, []);

  return { rangeInputRef, handleChangeBgRange };
}
