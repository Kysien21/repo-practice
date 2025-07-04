import { useEffect, useRef, useState } from "react";

export function useWorkHistoryFunction(workHistoryTarget, workHistorySpeed) {
  const [workHistoryProgress, setWorkHistoryProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setWorkHistoryProgress(0);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setWorkHistoryProgress((prev) => {
        if (prev >= workHistoryTarget) {
          clearInterval(intervalRef.current);
          return workHistoryTarget;
        }
        return prev + 1;
      });
    }, workHistorySpeed);

    return () => clearInterval(intervalRef.current);
  }, [workHistoryTarget, workHistorySpeed]);

  const getWorkHistoryProgressColor = () => {
    if (workHistoryProgress < 40) return "#e74c3c";
    if (workHistoryProgress < 80) return "#f39c12";
    return "#2ecc71";
  };

  return { workHistoryProgress, getWorkHistoryProgressColor };
}
