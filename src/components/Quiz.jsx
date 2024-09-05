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
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  //handle highlighted selected answers.
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      //this way is defined that we cannot lose the prevState and update the new state inside the array.
      setAnswerState("answered");
      // this method will guaratees you that it takes the new state snapshot. after changeing the previous state.
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      //set the timeout to check the possible answers
      setTimeout(() => {
        //correct answer chosen
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        //nested timout to select the answerState back to empty state.
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

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
        {/* key props will destroy the previous value and recreate the new value for the component. */}
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";

            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(null)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
