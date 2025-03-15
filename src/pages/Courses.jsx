import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "../styles/Courses.scss";

function Courses() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const subjects = [
    { name: t("geography"), path: "geography" },
    { name: t("math"), path: "math" },
    { name: t("physics"), path: "physics" },
    { name: t("history"), path: "history" },
    { name: t("biology"), path: "biology" },
    { name: t("chemistry"), path: "chemistry" },
    { name: t("literature"), path: "literature" },
    { name: t("english"), path: "english" },
    { name: t("informatics"), path: "informatics" },
  ];

  const handleSelectSubject = (subject) => {
    navigate(`/select-language/${subject}`);
  };

  return (
    <div className="courses-container">
      <h1 className="title">{t("select_subject")}</h1>
      <div className="grid-container">
        {subjects.map((subject) => (
          <button key={subject.path} className="subject-card" onClick={() => handleSelectSubject(subject.path)}>
            {subject.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Courses;