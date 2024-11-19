import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!value.trim()) return;
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, setDebounce, delay]);

  return debounce;
};
