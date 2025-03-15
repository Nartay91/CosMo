import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from "/cosmo/my-app/src/store/useLanguageStore";
import "../styles/languageSelection.scss";

const LanguageSelection = () => {
  const { subject } = useParams();
  const { setLanguage } = useLanguageStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    navigate(`/courses/${subject}`); // Переход к тесту
  };

  return (
    <div className="language-selection-container">
      <button onClick={() => navigate(-1)} className="back-btn">{t("back")}</button>
      <h2 className="title">{t("Select a language to take the test")}</h2>
      <div className="language-buttons">
        <button onClick={() => handleSelectLanguage("kk")} className="language-btn">Қазақша</button>
        <button onClick={() => handleSelectLanguage("ru")} className="language-btn">Русский</button>
        <button disabled onClick={() => handleSelectLanguage("en")} className="language-btn">English</button>
      </div>
      
    </div>
  );
};

export default LanguageSelection;
