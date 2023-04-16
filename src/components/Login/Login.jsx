
import logo from "../../images/logo.svg"

const Login = () => {
  return (
    <div className="login">
      <div>
        <a href="/" className="login__logo-link">
          <img className="login__logo" src={logo} alt="Logo" />
        </a>
        <h1 className="login__greeting">Рады видеть!</h1>
        <form className="login__form">
          <label className="login__label" htmlFor="login-email">E-mail</label>
          <input className="login__input" id="login-email" type="email" placeholder=".." />
          <span className="login__error-span login__error-span_active">Error message for email</span>
          <label className="login__label" htmlFor="login-psw">Пароль</label>
          <input className="login__input" id="login-psw" type="password" placeholder=".." />
          <span className="login__error-span login__error-span_active">Error message for psw</span>
        </form>
      </div>
      <div>
        <button className="login__submit-btn btn-black">Войти</button>
        <div className="login__signup-wrapper">
          <p className="login__signup-question">Ещё не зарегистрированы?</p>
          <a className="login__signup-link btn-link" href="/signup">Регистрация</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
