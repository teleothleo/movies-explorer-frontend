
import { Route, Routes } from "react-router-dom";
import logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();


  return (
    <div className="header">
      <Routes>

        <Route path="/" element={
          <>
            <a href="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Logo" />
            </a>
            <div className="header__auth-wrapper">
              <button onClick={() => navigate('/signup')} className="header__signup-btn btn-link">Регистрация</button>
              <button onClick={() => navigate('/signin')} className="header__signin-btn btn-black">Войти</button>
            </div>
          </>
        } />

        <Route path="/movies" element={
          <>
            <nav className="header__nav-wrapper">
              <a href="/" className="header__logo-link">
                <img className="header__logo" src={logo} alt="Logo" />
              </a>
              <a href="/movies" className="header__link btn-link header__link_active">Фильмы</a>
              <a href="/saved-movies" className="header__link btn-link">Сохранённые фильмы</a>
            </nav>

            <div className="header__auth-wrapper">
              <button onClick={() => navigate('/profile')} className="header__account-text-btn btn-link">Аккаунт</button>
              <button onClick={() => navigate('/profile')} className="header__account-btn btn-white" />
            </div>
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <nav className="header__nav-wrapper">
              <a href="/" className="header__logo-link">
                <img className="header__logo" src={logo} alt="Logo" />
              </a>
              <a href="/movies" className="header__link btn-link">Фильмы</a>
              <a href="/saved-movies" className="header__link btn-link header__link_active">Сохранённые фильмы</a>
            </nav>

            <div className="header__auth-wrapper">
              <button onClick={() => navigate('/profile')} className="header__account-text-btn btn-link">Аккаунт</button>
              <button onClick={() => navigate('/profile')} className="header__account-btn btn-white" />
            </div>
          </>
        } />

        <Route path="/profile" element={
          <>
            <nav className="header__nav-wrapper">
              <a href="/" className="header__logo-link">
                <img className="header__logo" src={logo} alt="Logo" />
              </a>
              <a href="/movies" className="header__link btn-link">Фильмы</a>
              <a href="/saved-movies" className="header__link btn-link">Сохранённые фильмы</a>
            </nav>

            <div className="header__auth-wrapper">
              <button onClick={() => navigate('/profile')} className="header__account-text-btn btn-link">Аккаунт</button>
              <button onClick={() => navigate('/profile')} className="header__account-btn btn-white" />
            </div>
          </>
        } />
      </Routes>

    </div>
  );
}

export default Header;
