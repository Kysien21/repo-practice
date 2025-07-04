import { useEffect, useRef, useState } from "react";

export function useQualificationFunction(qualificationTarget, qualificationSpeed) {
  const [qualificationProgress, setQualificationProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setQualificationProgress(0);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setQualificationProgress((prev) => {
        if (prev >= qualificationTarget) {
          clearInterval(intervalRef.current);
          return qualificationTarget;
        }
        return prev + 1;
      });
    }, qualificationSpeed);

    return () => clearInterval(intervalRef.current);
  }, [qualificationTarget, qualificationSpeed]);

  const getQualificationProgressColor = () => {
    if (qualificationProgress < 40) return "#e74c3c";
    if (qualificationProgress < 80) return "#f39c12";
    return "#2ecc71";
  };

  return { qualificationProgress, getQualificationProgressColor };
}
