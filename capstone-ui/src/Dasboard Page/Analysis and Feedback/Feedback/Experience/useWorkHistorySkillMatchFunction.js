import { useEffect, useRef, useState } from "react";

export function useWorkHistorySkillMatchFunction(workHistorySkillMatchTarget, workHistorySkillMatchSpeed) {
  const [workHistorySkillMatchProgress, setWorkHistorySkillMatchProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setWorkHistorySkillMatchProgress(0);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setWorkHistorySkillMatchProgress((prev) => {
        if (prev >= workHistorySkillMatchTarget) {
          clearInterval(intervalRef.current);
          return workHistorySkillMatchTarget;
        }
        return prev + 1;
      });
    }, workHistorySkillMatchSpeed);

    return () => clearInterval(intervalRef.current);
  }, [workHistorySkillMatchTarget, workHistorySkillMatchSpeed]);

  const getWorkHistorySkillMatchProgressColor = () => {
    if (workHistorySkillMatchProgress < 40) return "#e74c3c";
    if (workHistorySkillMatchProgress < 80) return "#f39c12";
    return "#2ecc71";
  };

  return { workHistorySkillMatchProgress, getWorkHistorySkillMatchProgressColor };
}
