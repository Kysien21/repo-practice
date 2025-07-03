import DashboardHeader from "../../Header and Sidebar/DashboardHeader";
import DashboardSidebar from "../../Header and Sidebar/DashboardSidebar";

import LeftArrowIcon from "../../../assets/Arrow left-circle.png";
import RightArrowIcon from "../../../assets/Arrow right-circle.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import KeywordMatch from "./Relevance to Job Description/KeywordMatch";
import KeywordSkillMatch from "./Relevance to Job Description/KeywordSkillMatch";
import WorkHistory from "./Experience/WorkHistory";
import WorkHistorySkillMatch from "./Experience/WorkHistorySkillMatch";
import Qualification from "./Education/Qualification";
import Relevance from "./Education/Relevance";
import SpellingAndGrammar from "./Consistency & Accuracy/SpellingAndGrammar";
import Consistency from "./Consistency & Accuracy/Consistency";

function Feedback() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const views = [
    <>
      <KeywordMatch />
      <KeywordSkillMatch />
    </>,
    <>
      <WorkHistory />
      <WorkHistorySkillMatch />
    </>,
    <>
      <Qualification />
      <Relevance />
    </>,
    <>
      <SpellingAndGrammar />
      <Consistency />
    </>
  ];

  const handleNext = () => {
    if (step < views.length - 1) {
      setStep(prev => prev + 1);
    } else {
      navigate("/result");
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <main className="feedback-container">
      <DashboardHeader />
      <DashboardSidebar />
      
      <section className="feedback-content">{views[step]}</section>

      <div className="arrow-controls">
        {step > 0 && (
          <img
            className="left-arrow"
            src={LeftArrowIcon}
            alt="Previous"
            onClick={handlePrev}
          />
        )}
        <img
          className="right-arrow"
          src={RightArrowIcon}
          alt={step < views.length - 1 ? "Next" : "Go to Result"}
          onClick={handleNext}
        />
      </div>
    </main>
  );
}

export default Feedback;
