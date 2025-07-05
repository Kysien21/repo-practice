import { useEffect, useRef, useState } from "react";

export function useKeywordSkillMatchFunction(keywordSkillMatchTarget, keywordSkillMatchSpeed) {
  const [keywordSkillMatchProgress, setKeywordSkillMatchProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setKeywordSkillMatchProgress(0);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setKeywordSkillMatchProgress((prev) => {
        if (prev >= keywordSkillMatchTarget) {
          clearInterval(intervalRef.current);
          return keywordSkillMatchTarget;
        }
        return prev + 1;
      });
    }, keywordSkillMatchSpeed);

    return () => clearInterval(intervalRef.current);
  }, [keywordSkillMatchTarget, keywordSkillMatchSpeed]);

  const getKeywordSkillMatchProgressColor = () => {
    if (keywordSkillMatchProgress < 40) return "#ff6b6b";
    if (keywordSkillMatchProgress < 80) return "#f1c40f";
    return "#27ae60";
  };

  return { keywordSkillMatchProgress, getKeywordSkillMatchProgressColor };
}
