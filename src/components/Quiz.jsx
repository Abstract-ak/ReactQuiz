import React, { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  //set users answers in array.
  /*  from user answers we can calculate the no. of questions asked in quiz
      quiz is completed when the asked question is equal to the Questions length.
   */
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    //this way is defined that we cannot lose the prevState and update the new state inside the array.
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  //Quiz is completed renders--
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Img" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  //make shallow copy for not alter the question.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  //Shuffle the array answers with random numbers
  /* Math.random() - 0.5 : probability 50/100 that is +ve/-ve
   */
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(null)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
