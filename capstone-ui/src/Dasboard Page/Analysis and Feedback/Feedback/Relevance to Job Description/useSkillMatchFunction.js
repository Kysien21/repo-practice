import { useEffect, useRef, useState } from "react";

export function useSkillMatchFunction (target, speed) {
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
    if (progress < 40) return "#ff6b6b";
    if (progress < 80) return "#f1c40f";
    return "#27ae60";
  };

  return { progress, getProgressColor };
}
