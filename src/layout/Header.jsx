import "../styles/header.scss";
import bell from "../assets/bell.svg";
import avatar from "../assets/avatar.svg";

const Header = () => {
    return (
        <header className="header">
            <div className="header__right">
                <button className="header__notification">
                    < img src={bell} alt="Уведомления" />
                </button>
                <img className="header__avatar" src={avatar} alt="Профиль" />
            </div>
        </header>
    )
}

export default Header;