import React, { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  //set users answers in array.
  /*  from user answers we can calculate the no. of questions asked in quiz
      quiz is completed when the asked question is equal to the Questions length.
   */

  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  // const [shuffledAnswers, setShuffledAnswers] = useState([]);

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

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
