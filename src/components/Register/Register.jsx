import logo from "../../images/logo.svg"

const Register = () => {
  return (
    <div className="register">
      <div>
        <a href="/" className="register__logo-link">
          <img className="register__logo" src={logo} alt="Logo" />
        </a>
        <h1 className="register__greeting">Добро пожаловать!</h1>
        <form className="register__form">
          <label className="register__label" htmlFor="reg-name">Имя</label>
          <input className="register__input" id="reg-name" type="text" placeholder=".." />
          <span className="register__error-span">Error message for name</span>
          <label className="register__label" htmlFor="reg-email">E-mail</label>
          <input className="register__input" id="reg-email" type="email" placeholder=".." />
          <span className="register__error-span">Error message for email</span>
          <label className="register__label" htmlFor="reg-psw">Пароль</label>
          <input className="register__input" id="reg-psw" type="password" placeholder=".." />
          <span className="register__error-span register__error-span_active">Error message for psw</span>
        </form>
      </div>
      <div>
        <button className="register__submit-btn btn-black">Зарегистрироваться</button>
        <div className="register__signin-wrapper">
          <p className="register__signin-question">Уже зарегистрированы?</p>
          <a className="register__signin-link btn-link" href="/signin">Войти</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
