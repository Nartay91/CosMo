import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguageStore } from "/cosmo/my-app/src/store/useLanguageStore";
import { useQuizStore } from "/cosmo/my-app/src/store/useQuizStore";
import { useTranslation } from 'react-i18next';
import { questionsData } from "./Questions";
import ProgressBar from "./ProgressBar";
import "/cosmo/my-app/src/styles/Quiz.scss";

const Quiz = () => {
  const { subject } = useParams();
  const { language } = useLanguageStore();
  const {
    currentQuestion,
    score,
    answers,
    setQuestions,
    handleAnswer,
    restartQuiz,
  } = useQuizStore();

  // const { progress, loadProgress } = useProgressStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (questionsData[subject]?.[language]) {
      const limitedQuestions = questionsData[subject][language].slice(0, 20); // Макс. 20 вопросов
      restartQuiz(); // Сбрасываем тест перед загрузкой новых вопросов
      setQuestions(limitedQuestions);
    }
  }, [subject, language, setQuestions, restartQuiz]);
  
  const questions = useQuizStore((state) => state.questions);

  if (!questions.length) {
    return <p className="error-message"> Вопросы не найдены.</p>;
  }

  if (currentQuestion >= questions.length) {
    return (
      <div className="final-container">
        <p className="final-message">
          {t("Test completed! Your result:")} <strong>{score} / {questions.length}</strong>
        </p>
        <button className="restart-button" onClick={restartQuiz}>
          {t("Retake the test")}
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz">
      <button onClick={() => navigate(-1)} className="back-btn">{t("back")}</button>
    <div className="quiz-container">
      <h1 className="quiz-title">Тест: {subject}</h1>
      <ProgressBar />
      <div className="test-content">
        <h2 className="question">{question.question}</h2>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${answers[currentQuestion] === option ? "selected" : ""}`}
              onClick={() => handleAnswer(option, question.correct)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Quiz;