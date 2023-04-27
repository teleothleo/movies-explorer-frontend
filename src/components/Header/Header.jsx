
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import authIcon from "../../images/profile.svg";
import { getToken } from "../../utils/functions";
import { useMenuState } from "../../utils/MenuContext";
import Menu from "../Menu/Menu";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isActive, setState } = useMenuState();
  const [authorized, setAuthorized] = useState(false);

  const [currentLocation, setCurrentLocation] = useState({
    main: false, movies: false, savedMovies: false, profile: false,
    signIn: false, signUp: false, badWay: false,
  })

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setCurrentLocation({
          main: true, movies: false, savedMovies: false, profile: false,
          signIn: false, signUp: false, badWay: false,
        })
        break;
      case "/movies":
        setCurrentLocation({
          main: false, movies: true, savedMovies: false, profile: false,
          signIn: false, signUp: false, badWay: false,
        })
        break;
      case "/saved-movies":
        setCurrentLocation({
          main: false, movies: false, savedMovies: true, profile: false,
          signIn: false, signUp: false, badWay: false,
        })
        break;
      case "/profile":
        setCurrentLocation({
          main: false, movies: false, savedMovies: false, profile: true,
          signIn: false, signUp: false, badWay: false,
        })
        break;
      case "/signin":
        setCurrentLocation({
          main: false, movies: false, savedMovies: false, profile: false,
          false: true, signUp: false, badWay: false,
        })
        break;
      case "/signup":
        setCurrentLocation({
          main: false, movies: false, savedMovies: false, profile: false,
          signIn: false, signUp: true, badWay: false,
        })
        break;
      default:
        setCurrentLocation({
          main: false, movies: false, savedMovies: false, profile: false,
          signIn: false, signUp: false, badWay: true,
        })
        break;
    }
  }, [location.pathname])

  useEffect(() => {
    const newJwt = getToken();
    console.log(newJwt)
    if (newJwt) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [location])

  return (
      currentLocation.main
      || currentLocation.movies
      || currentLocation.savedMovies
      || currentLocation.profile

      // Authorized and on "/" or "/movies" or "/saved-movies" or "/profile"
      ? authorized
        ? <header className="header">
          <nav className="header__nav-wrapper">
            <a href="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Logo" />
            </a>
            <a href="/movies" className={currentLocation.movies
              ? "header__link btn-link header__link_active"
              : "header__link btn-link"
            }>Фильмы</a>
            <a href="/saved-movies" className={currentLocation.savedMovies
              ? "header__link btn-link header__link_active"
              : "header__link btn-link"}>Сохранённые фильмы</a>
          </nav>

          <div onClick={() => navigate("/profile")} className="auth-btn btn-link">
            <p className="auth-btn__text">Аккаунт</p>
            <img src={authIcon} className="auth-btn__icon" alt="Auth" />
          </div>

          {isActive && <Menu />}
          <button onClick={() => setState(!isActive)}
            className={`${isActive
              ? "header__sandwich-btn header__sandwich-btn_active btn-link"
              : "header__sandwich-btn btn-link"}`} />
        </header>

        // Unauthorized and on "/" or "/movies" or "/saved-movies" or "/profile"
        : <header className="header">
          <nav className="header__nav-wrapper">
            <a href="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Logo" />
            </a>
          </nav>
          <div className="auth">
            <button onClick={() => navigate("/signup")} className="auth__signup-btn btn-link">Регистрация</button>
            <button onClick={() => navigate("/signin")} className="auth__signin-btn btn-black">Войти</button>
          </div>
        </header>

      // Unauthorized and Authorized on "/signup" or "/signin" or "*"
      : <></>

/*     <Routes>

      <Route path="/" element={
        <header className="header">
          <nav className="header__nav-wrapper">
            <a href="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Logo" />
            </a>
          </nav>
          <div className="auth">
            <button onClick={() => navigate("/signup")} className="auth__signup-btn btn-link">Регистрация</button>
            <button onClick={() => navigate("/signin")} className="auth__signin-btn btn-black">Войти</button>
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

          <div onClick={() => navigate("/profile")} className="auth-btn btn-link">
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

          <div onClick={() => navigate("/profile")} className="auth-btn btn-link">
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

          <div onClick={() => navigate("/profile")} className="auth-btn btn-link">
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
 */  )
}

export default Header;
