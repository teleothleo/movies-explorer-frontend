
import { Route, Routes } from "react-router-dom";
import logo from '../../images/logo.svg';

const Header = () => {
  return (
    <div className="header">
      <Routes>

        <Route path="/" element={
          <>
            <a href="/">
              <img className="header__logo" src={logo} alt="Logo" />
            </a>
            <div className="header__auth-wrapper">
              <button className="header__signup-btn btn-text">Регистрация</button>
              <button className="header__signin-btn btn-black">Войти</button>
            </div>
          </>
        } />

        <Route path="/movies" element={
          <>
            <nav className="header__nav-wrapper">
              <a href="/">
                <img className="header__logo" src={logo} alt="Logo" />
              </a>
              <a href="/movies" className="header__link btn-text header__link_active">Фильмы</a>
              <a href="/saved-movies" className="header__link btn-text">Сохранённые фильмы</a>
            </nav>

            <div className="header__auth-wrapper">
              <button className="header__account-text-btn btn-text">Аккаунт</button>
              <button className="header__account-btn btn-white" />
            </div>
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <nav className="header__nav-wrapper">
              <a href="/">
                <img className="header__logo" src={logo} alt="Logo" />
              </a>
              <a href="/movies" className="header__link btn-text">Фильмы</a>
              <a href="/saved-movies" className="header__link btn-text header__link_active">Сохранённые фильмы</a>
            </nav>

            <div className="header__auth-wrapper">
              <button className="header__account-text-btn btn-text">Аккаунт</button>
              <button className="header__account-btn btn-white" />
            </div>
          </>
        } />

        <Route path="/profile" element={
          <>
            <nav className="header__nav-wrapper">
              <a href="/">
                <img className="header__logo" src={logo} alt="Logo" />
              </a>
              <a href="/movies" className="header__link btn-text">Фильмы</a>
              <a href="/saved-movies" className="header__link btn-text">Сохранённые фильмы</a>
            </nav>

            <div className="header__auth-wrapper">
              <button className="header__account-text-btn btn-text">Аккаунт</button>
              <button className="header__account-btn btn-white" />
            </div>
          </>
        } />

        <Route path={"/signin", "/signup", "/*"} element={
          <></>
        } />

      </Routes>

    </div>
  );
}

export default Header;
