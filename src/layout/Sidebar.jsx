import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
    <>
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo1">
          <img src={logo} alt="Лого" />
        </div>
        <ul className="menu">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src={home} alt="Главная" /> {t('home')}
            </Link>
          </li>
          <li>
            <Link to="/statistics" onClick={() => setIsOpen(false)}>
              <img src={statistic} alt="Статистика" className="icon hover-icon" />
              {t('statistics')}
            </Link>
          </li>
          <li>
            <Link to="/employers" onClick={() => setIsOpen(false)}>
              <img src={employ} alt="Сотрудники" /> {t('employers')}
            </Link>
          </li>
          <li>
            <Link to="/courses" onClick={() => setIsOpen(false)}>
              <img src={course} alt="Курсы" />{t('course')}
            </Link>
          </li>
          <li>
            <Link to="/division" onClick={() => setIsOpen(false)}>
              <img src={course} alt="Курсы" /> {t('branch')}
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setIsOpen(false)}>
              <img src={setting} alt="Настройки" /> {t('settings')}
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <img src={profile} alt="Профиль" /> {t('profile')}
          </Link>
          <Link to="/logout" onClick={() => setIsOpen(false)}>
            <img src={logout} alt="Выйти" />{t('logout')}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;