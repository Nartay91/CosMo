import { Link } from "react-router-dom";
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
  return (
    <nav className="sidebar">
      <div className="logo1">
        <img src={logo} alt="" />
      </div>
      <ul className="menu">
        <li>
          <Link to="/" >
            <img src={home} alt="Главная" /> Главная
          </Link>
        </li>
        <li>
          <Link to="/statistics">
            {/* <img src={statistic} alt="Статистика" className="icon default-icon" /> */}
            <img src={statistic} alt="Статистика" className="icon hover-icon" /> 
            Статистика
          </Link>
        </li>
        <li>
          <Link to="/employers">
            <img src={employ} alt="Сотрудники" /> Сотрудники
          </Link>
        </li>
        <li>
          <Link to="/courses">
            <img src={course} alt="Курсы" /> Курсы
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <img src={setting} alt="Настройки" /> Настройки
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link to="/profile">
          <img src={profile} alt="Профиль" /> Профиль
        </Link>
        <Link to="/logout">
          <img src={logout} alt="Выйти" /> Выйти
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;

