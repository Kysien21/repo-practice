import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Upload from "./Dasboard Page/Upload/Upload";
import Analysis from "./Dasboard Page/Analysis and Feedback/Analysis/Analysis";
import Feedback from "./Dasboard Page/Analysis and Feedback/Feedback/Feedback";

import Result from "./Dasboard Page/Result/Result";
import Website from "./Landing Page/Website/Website";
import LogIn from "./Landing Page/LogIn and SignUp/LogIn/LogIn";
import SignUp from "./Landing Page/LogIn and SignUp/SignUp/SignUp";


function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route index element={<Website />} />

        <Route path="/website" element={<Website />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
        
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
