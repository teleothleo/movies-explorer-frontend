
import { Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import authIcon from '../../images/profile.svg';
import { useMenuState } from "../../utils/MenuContext";
import Menu from "../Menu/Menu";

const Header = () => {
  const navigate = useNavigate();
  const { isActive, setState } = useMenuState();

  return (
    <Routes>

      <Route path="/" element={
        <header className="header">
          <nav className="header__nav-wrapper">
            <a href="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Logo" />
            </a>
          </nav>
          <div className="auth">
            <button onClick={() => navigate('/signup')} className="auth__signup-btn btn-link">Регистрация</button>
            <button onClick={() => navigate('/signin')} className="auth__signin-btn btn-black">Войти</button>
          </div>
        </header>
      } />

      <Route path="/movies" element={
        <header className="header">
          <nav className="header__nav-wrapper">
            <a href="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Logo" />
            </a>
            <a href="/movies" className="header__link btn-link header__link_active">Фильмы</a>
            <a href="/saved-movies" className="header__link btn-link">Сохранённые фильмы</a>
          </nav>

          <div onClick={() => navigate('/profile')} className="auth-btn btn-link">
            <p className="auth-btn__text">Аккаунт</p>
            <img src={authIcon} className="auth-btn__icon" alt="Auth" />
          </div>

          {isActive && <Menu />}
          <button onClick={() => setState(!isActive)} 
            className={`${isActive
            ? "header__sandwich-btn header__sandwich-btn_active btn-link"
            : "header__sandwich-btn btn-link"}`} />
        </header>
      } />

      <Route path="/saved-movies" element={
        <header className="header">
          <nav className="header__nav-wrapper">
            <a href="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Logo" />
            </a>
            <a href="/movies" className="header__link btn-link">Фильмы</a>
            <a href="/saved-movies" className="header__link btn-link header__link_active">Сохранённые фильмы</a>
          </nav>

          <div onClick={() => navigate('/profile')} className="auth-btn btn-link">
            <p className="auth-btn__text">Аккаунт</p>
            <img src={authIcon} className="auth-btn__icon" alt="Auth" />
          </div>

          {isActive && <Menu />}
          <button onClick={() => setState(!isActive)} 
            className={`${isActive
            ? "header__sandwich-btn header__sandwich-btn_active btn-link"
            : "header__sandwich-btn btn-link"}`} />
        </header>

      } />

      <Route path="/profile" element={
        <header className="header">
          <nav className="header__nav-wrapper">
            <a href="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Logo" />
            </a>
            <a href="/movies" className="header__link btn-link">Фильмы</a>
            <a href="/saved-movies" className="header__link btn-link">Сохранённые фильмы</a>
          </nav>

          <div onClick={() => navigate('/profile')} className="auth-btn btn-link">
            <p className="auth-btn__text">Аккаунт</p>
            <img src={authIcon} className="auth-btn__icon" alt="Auth" />
          </div>

          {isActive && <Menu />}
          <button onClick={() => setState(!isActive)} 
            className={`${isActive
            ? "header__sandwich-btn header__sandwich-btn_active btn-link"
            : "header__sandwich-btn btn-link"}`} />
        </header>
      } />

    </Routes>
  );
}

export default Header;
