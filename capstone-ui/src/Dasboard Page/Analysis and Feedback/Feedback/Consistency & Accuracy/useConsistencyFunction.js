import { useEffect, useRef, useState } from "react";

export function useConsistencyFunction(consistencyTarget, consistencySpeed) {
  const [consistencyProgress, setConsistencyProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setConsistencyProgress(0);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setConsistencyProgress((prev) => {
        if (prev >= consistencyTarget) {
          clearInterval(intervalRef.current);
          return consistencyTarget;
        }
        return prev + 1;
      });
    }, consistencySpeed);

    return () => clearInterval(intervalRef.current);
  }, [consistencyTarget, consistencySpeed]);

  const getConsistencyProgressColor = () => {
    if (consistencyProgress < 40) return "#e74c3c";
    if (consistencyProgress < 80) return "#f39c12";
    return "#2ecc71";
  };

  return { consistencyProgress, getConsistencyProgressColor };
}
