import { useEffect, useRef, useState } from "react";

export function useRelevanceFunction(target, speed) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= target) {
          clearInterval(intervalRef.current);
          return target;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [target, speed]);

  const getProgressColor = () => {
    if (progress < 40) return "#e74c3c";
    if (progress < 80) return "#f39c12";
    return "#2ecc71";
  };

  return { progress, getProgressColor };
}
