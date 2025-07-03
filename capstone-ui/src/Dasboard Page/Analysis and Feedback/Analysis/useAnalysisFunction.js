import { useState, useEffect } from "react";

export function useAnalysisFunction(target, speed) {
  const [bluePercent, setBluePercent] = useState(0);
  const [redPercent, setRedPercent] = useState(0);
  const [showRed, setShowRed] = useState(false);

  useEffect(() => {
    setBluePercent(0);
    setRedPercent(0);
    setShowRed(false);

    let blueTimer = setInterval(() => {
      setBluePercent((current) => {
        if (current >= target) {
          clearInterval(blueTimer);
          return target;
        }
        return current + 1;
      });
    }, speed);

    return () => clearInterval(blueTimer);
  }, [target, speed]);

  useEffect(() => {
    if (bluePercent === target) {
      const delay = setTimeout(() => {
        setShowRed(true);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [bluePercent, target]);

  useEffect(() => {
    if (!showRed) return;

    const redTarget = 100 - target;
    const redTimer = setInterval(() => {
      setRedPercent((current) => {
        if (current >= redTarget) {
          clearInterval(redTimer);
          return redTarget;
        }
        return current + 1;
      });
    }, speed);

    return () => clearInterval(redTimer);
  }, [showRed, target, speed]);

  return { bluePercent, redPercent, showRed };
}
