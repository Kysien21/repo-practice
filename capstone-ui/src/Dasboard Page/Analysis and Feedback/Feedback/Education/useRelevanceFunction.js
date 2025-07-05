import { useEffect, useRef, useState } from "react";

export function useRelevanceFunction(relevanceTarget, relevanceSpeed) {
  const [relevanceProgress, setRelevanceProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRelevanceProgress(0);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setRelevanceProgress((prev) => {
        if (prev >= relevanceTarget) {
          clearInterval(intervalRef.current);
          return relevanceTarget;
        }
        return prev + 1;
      });
    }, relevanceSpeed);

    return () => clearInterval(intervalRef.current);
  }, [relevanceTarget, relevanceSpeed]);

  const getRelevanceProgressColor = () => {
    if (relevanceProgress < 40) return "#e74c3c";
    if (relevanceProgress < 80) return "#f39c12";
    return "#2ecc71";
  };

  return { relevanceProgress, getRelevanceProgressColor };
}
