import { useEffect, useRef, useState } from "react";

export function useKeywordMatchFunction(keywordMatchScore, keywordMatchSpeed) {
  const [keywordMatchProgress, setKeywordMatchProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setKeywordMatchProgress(0);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setKeywordMatchProgress((prev) => {
        if (prev >= keywordMatchScore) {
          clearInterval(intervalRef.current);
          return keywordMatchScore;
        }
        return prev + 1;
      });
    }, keywordMatchSpeed);

    return () => clearInterval(intervalRef.current);
  }, [keywordMatchScore, keywordMatchSpeed]);

  const getKeywordProgressColor = () => {
    if (keywordMatchProgress < 40) return "#e74c3c";
    if (keywordMatchProgress < 80) return "#f39c12";
    return "#2ecc71";
  };

  return { keywordMatchProgress, getKeywordProgressColor };
}
