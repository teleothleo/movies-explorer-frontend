
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg"
import { useAuth } from "../../utils/AuthContext";
import { emailRgx, ErrBadEmail, ErrBadPsw, ErrLoginBadNameOrPsw, ErrLoginWrongToken, pswRgx } from "../../utils/constants";
import { deleteToken, saveToken } from "../../utils/cookieUtils";
import { apiSignIn } from "../../utils/MainApi";
import { useUserContext } from "../../utils/UserContext";

const Login = () => {
  const nav = useNavigate();
  const { updateUserContext } = useUserContext();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const [emailInputUsed, setEmailInputUsed] = useState(false);
  const [pswInputUsed, setPswInputUsed] = useState(false);

  const [emailInputValid, setEmailInputValid] = useState(true);
  const [pswInputValid, setPswInputValid] = useState(true);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [badLogin, setBadLogin] = useState(false);
  const [badToken, setBadToken] = useState(false);

  const emailRef = useRef(null);
  const pswRef = useRef(null);

  const handleAutocomplete = (val) => {
    val === "email" && setEmailInputUsed(true);
    val === "psw" && setPswInputUsed(true);
  }

  const handleEmailInputChange = () => {
    setEmailInputValid(emailRgx.test(emailRef.current.value));
    setEmailInputUsed(true);
  }

  const handlePswInputChange = () => {
    setPswInputValid(pswRgx.test(pswRef.current.value));
    setPswInputUsed(true);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    handleEmailInputChange();
    handlePswInputChange();
    if (validateForm()) {
      await signIn();
    }
  }

  const signIn = async () => {
    try {
      const res = await apiSignIn(
        emailRef.current.value,
        pswRef.current.value
      )
      if (!res.ok) {
        throw res;
      }
      const resJson = await res.json();
      console.log(resJson);

      saveToken(resJson.token);
      setIsAuthenticated(true);
      updateUserContext({
        _id: resJson.user._id,
        name: resJson.user.name,
        email: resJson.user.email,
      })
      nav("/movies", { replace: true });

    } catch (error) {
      console.error(error);
      console.error(error.status);
      setIsAuthenticated(false);
      updateUserContext({
        _id: "",
        name: "",
        email: "",
      })
      deleteToken();

      if (error.status === 401) {
        setBadLogin(true);
        setBadToken(false);
      } else {
        setBadLogin(false);
        setBadToken(true);
      }
    }
  }

  const validateForm = useCallback(() => {
    if (emailInputValid && pswInputValid) {
      return true;
    } else {
      return false;
    }
  }, [emailInputValid, pswInputValid])

  useEffect(() => {
    if (validateForm()
      && emailInputUsed
      && pswInputUsed) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [emailInputUsed, emailInputValid, pswInputUsed, pswInputValid, validateForm])

  return (
    <main className="login">
      <div>
        <a href="/" className="login__logo-link">
          <img className="login__logo" src={logo} alt="Logo" />
        </a>
        <h1 className="login__greeting">Рады видеть!</h1>
        <form className="login__form" onSubmit={submitForm}>

          <label className="login__label" htmlFor="login-email">E-mail</label>
          <input onInput={() => handleAutocomplete("email")} className="login__input" ref={emailRef}
            onChange={handleEmailInputChange} id="login-email"
            type="email" placeholder=".." required />
          <span className={emailInputValid
            ? "login__error-span"
            : "login__error-span login__error-span_active"
          }>{ErrBadEmail}</span>

          <label className="login__label" htmlFor="login-psw">Пароль</label>
          <input onInput={() => handleAutocomplete("psw")} className="login__input" ref={pswRef}
            onChange={handlePswInputChange} id="login-psw"
            type="password" placeholder=".." required />
          <span className={pswInputValid
            ? "login__error-span"
            : "login__error-span login__error-span_active"
          }>{ErrBadPsw}</span>

        </form>
      </div>
      <div>
        <span className={badToken
          ? "register__error register__error_active"
          : "register__error"}>{ErrLoginWrongToken}</span>
        <span className={badLogin
          ? "register__error register__error_active"
          : "register__error"}>{ErrLoginBadNameOrPsw}</span>
        <button onClick={submitForm} className={submitEnabled
          ? "login__submit-btn btn-black"
          : "login__submit-btn login__submit-btn_disabled"
        } disabled={!submitEnabled}>Войти</button>
        <div className="login__signup-wrapper">
          <p className="login__signup-question">Ещё не зарегистрированы?</p>
          <a className="login__signup-link btn-link" href="/signup">Регистрация</a>
        </div>
      </div>
    </main>
  );
}

export default Login;
