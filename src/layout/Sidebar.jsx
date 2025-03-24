import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import home from "../assets/home.svg";
import statistic from "../assets/statistic.svg";
import employ from "../assets/employ.svg";
import course from "../assets/course.svg";
import setting from "../assets/setting.svg";
import profile from "../assets/profile.svg";
import logout from "../assets/logout.svg";
import logo from "../assets/logo2.png";
import "../styles/sidebar.scss";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      {/* Логотип - управляет открытием/закрытием сайдбара */}
      <div className="logo1" onClick={() => setIsOpen(!isOpen)}>
        <img src={logo} alt="Лого" />
      </div>
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="menu">
          <li>
            <Link to="/">
              <img src={home} alt="Главная" /> {t("home")}
            </Link>
          </li>
          <li>
            <Link to="/statistics">
              <img src={statistic} alt="Статистика" className="icon hover-icon" />
              {t("statistics")}
            </Link>
          </li>
          <li>
            <Link to="/employers">
              <img src={employ} alt="Сотрудники" /> {t("employers")}
            </Link>
          </li>
          <li>
            <Link to="/courses">
              <img src={course} alt="Курсы" /> {t("course")}
            </Link>
          </li>
          <li>
            <Link to="/division">
              <img src={course} alt="Филиалы" /> {t("branch")}
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <img src={setting} alt="Настройки" /> {t("settings")}
            </Link>
          </li>
          <li className="footer-sidebar">
            <Link to="/profile">
              <img src={profile} alt="Профиль" /> {t("profile")}
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <img src={logout} alt="Выйти" /> {t("logout")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;