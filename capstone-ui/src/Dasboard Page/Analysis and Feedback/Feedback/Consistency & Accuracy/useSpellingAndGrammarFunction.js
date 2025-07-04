import { useEffect, useRef, useState } from "react";

export function useSpellingAndGrammarFunction(spellingGrammarTarget, spellingGrammarSpeed) {
  const [spellingGrammarProgress, setSpellingGrammarProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSpellingGrammarProgress(0);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSpellingGrammarProgress((prev) => {
        if (prev >= spellingGrammarTarget) {
          clearInterval(intervalRef.current);
          return spellingGrammarTarget;
        }
        return prev + 1;
      });
    }, spellingGrammarSpeed);

    return () => clearInterval(intervalRef.current);
  }, [spellingGrammarTarget, spellingGrammarSpeed]);

  const getSpellingGrammarProgressColor = () => {
    if (spellingGrammarProgress < 40) return "#e74c3c";
    if (spellingGrammarProgress < 80) return "#f39c12";
    return "#2ecc71";
  };

  return { spellingGrammarProgress, getSpellingGrammarProgressColor };
}
