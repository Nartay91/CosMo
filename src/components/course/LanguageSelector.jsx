import { useLanguageStore } from "/cosmo/my-app/src/store/useLanguageStore";
import { useNavigate } from "react-router-dom";

const LanguageSelector = ({ subjectPath }) => {
  const { setLanguage } = useLanguageStore();
  const navigate = useNavigate();

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    navigate(subjectPath); // Переход к вопросам
  };

  return (
    <div className="language-selector">
      <h2>Выберите язык</h2>
      <button onClick={() => handleLanguageSelect("kk")} className="btn">Қазақша 🇰🇿</button>
      <button onClick={() => handleLanguageSelect("ru")} className="btn">Русский 🇷🇺</button>
    </div>
  );
};

export default LanguageSelector;
