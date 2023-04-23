
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import authIcon from '../../images/profile.svg';
import { useMenuState } from "../../utils/MenuContext";

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isActive, setState } = useMenuState();

  return (
    <div className="menu">
      <div className="menu-cover" onClick={(e) => { setState(!isActive) }}/>
      <div className="menu-bar">

        <div className="menu__btns">
          <button onClick={(e) => { navigate('/'); setState(!isActive) }}
            className={`${location.pathname === "/"
              ? "menu__btn menu__btn_active"
              : "menu__btn"
              }`}>Главная</button>
          <button onClick={(e) => { navigate('/movies'); setState(!isActive) }}
            className={`${location.pathname === "/movies"
              ? "menu__btn menu__btn_active"
              : "menu__btn"
              }`}>Фильмы</button>
          <button onClick={(e) => { navigate('/saved-movies'); setState(!isActive) }}
            className={`${location.pathname === "/saved-movies"
              ? "menu__btn menu__btn_active"
              : "menu__btn"
              }`}>Сохранённые фильмы</button>
        </div>
        <div onClick={(e) => { navigate('/profile'); setState(!isActive) }}
          className="menu__auth-btn btn-link">
          <p className="auth-btn__text">Аккаунт</p>
          <img src={authIcon} className="auth-btn__icon" alt="Auth" />
        </div>

      </div>
    </div>
  );
}

export default Menu;
