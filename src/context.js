import React, { useState, useEffect, createContext } from "react";
import { quiz as quizData } from "./data";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(quizData);
  return (
    <QuizContext.Provider value={{ quiz }}>{children}</QuizContext.Provider>
  );
};

export { QuizProvider, QuizContext };
