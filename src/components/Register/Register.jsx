import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg"
import { useAuth } from "../../utils/AuthContext";
import { emailRgx, ErrBadEmail, ErrBadName, ErrBadPsw, ErrBadReg, ErrRegConfilct, nameRgx, pswRgx } from "../../utils/constants";
import { deleteToken, saveToken, } from "../../utils/cookieUtils";
import { apiSignIn, apiSignUp } from "../../utils/MainApi";
import { useUserContext } from "../../utils/UserContext";

const Register = ({ isAuthenticated }) => {
  const nav = useNavigate();
  const { updateUserContext } = useUserContext();
  const { setIsAuthenticated } = useAuth();

  const [nameInputUsed, setNameInputUsed] = useState(false);
  const [emailInputUsed, setEmailInputUsed] = useState(false);
  const [pswInputUsed, setPswInputUsed] = useState(false);
  const [querying, setQuerying] = useState(false);

  const [nameInputValid, setNameInputValid] = useState(true);
  const [emailInputValid, setEmailInputValid] = useState(true);
  const [pswInputValid, setPswInputValid] = useState(true);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [badReg, setBadReg] = useState(false);
  const [badRegConflict, setBadRegConflict] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const pswRef = useRef(null);

  const handleAutocomplete = (val) => {
    switch (val) {
      case "name":
        setNameInputUsed(true);
        break;
      case "email":
        setEmailInputUsed(true);
        break;
      case "psw":
        setPswInputUsed(true);
        break;
      default: break;
    }
  }

  const handleNameInputChange = () => {
    setNameInputValid(nameRgx.test(nameRef.current.value));
  }

  const handleEmailInputChange = () => {
    setEmailInputValid(emailRgx.test(emailRef.current.value));
  }

  const handlePswInputChange = () => {
    setPswInputValid(pswRgx.test(pswRef.current.value));
  }

  const submitForm = async (e) => {
    e.preventDefault();
    handleNameInputChange();
    handleEmailInputChange();
    handlePswInputChange();

    if (validateForm()) {
      await signUp();
    }
  }

  const signUp = async () => {
    try {
      setQuerying(true);
      const res = await apiSignUp(
        nameRef.current.value,
        emailRef.current.value,
        pswRef.current.value
      )
      if (!res.ok) {
        throw res;
      }
      const resJson = await res.json();
      console.log(resJson);

      await signIn(
        emailRef.current.value,
        pswRef.current.value
      )

    } catch (error) {
      console.error(error);
      console.error(error.status);
      if (error.status === 409) {
        setBadReg(false);
        setBadRegConflict(true);
      } else {
        setBadReg(true);
        setBadRegConflict(false);
      }
      setQuerying(false);
    }
  }

  const signIn = async (email, password) => {
    try {
      const res = await apiSignIn(email, password)
      if (!res.ok) {
        throw res;
      }
      const resJson = await res.json();
      console.log(resJson);
      saveToken(resJson.token);

      updateUserContext({
        _id: resJson.user._id,
        name: resJson.user.name,
        email: resJson.user.email,
      })
      setIsAuthenticated(true);
      setQuerying(false);
      nav("/movies", { replace: true });
    } catch (error) {
      console.error(error);
      updateUserContext({
        _id: "",
        name: "",
        email: "",
      })
      setIsAuthenticated(false);
      deleteToken();
      setBadReg(true);
    }
  }

  const validateForm = useCallback(() => {
    if (nameInputValid && emailInputValid && pswInputValid) {
      return true;
    } else {
      return false;
    }
  }, [emailInputValid, nameInputValid, pswInputValid])

  useEffect(() => {
    if (validateForm()
      && nameInputUsed
      && emailInputUsed
      && pswInputUsed) {
      setSubmitEnabled(true);

    } else {
      setSubmitEnabled(false);
    }
  }, [emailInputUsed, nameInputUsed, pswInputUsed, validateForm])

  useEffect(() => {
    if (isAuthenticated) {
      nav("/", { replace: true })
    }
  }, [isAuthenticated, nav])

  return (
    <main className="register">
      <div>
        <a href="/" className="register__logo-link">
          <img className="register__logo" src={logo} alt="Logo" />
        </a>
        <h1 className="register__greeting">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={submitForm} >
          <label className="register__label" htmlFor="reg-name">Имя</label>
          <input onInput={() => handleAutocomplete("name")} ref={nameRef}
            className={`${querying
              ? "register__input register__input_disabled"
              : "register__input"}`}
            disabled={querying ? true : false}
            onChange={handleNameInputChange} id="reg-name"
            type="text" placeholder=".." required />
          <span className={nameInputValid
            ? "register__error-input"
            : "register__error-input register__error-input_active"}>{ErrBadName}</span>
          <label className="register__label" htmlFor="reg-email">E-mail</label>
          <input onInput={() => handleAutocomplete("email")} ref={emailRef}
            className={`${querying
              ? "register__input register__input_disabled"
              : "register__input"}`}
            disabled={querying ? true : false}
            onChange={handleEmailInputChange} id="reg-email"
            type="email" placeholder=".." required />
          <span className={emailInputValid
            ? "register__error-input"
            : "register__error-input register__error-input_active"}>{ErrBadEmail}</span>
          <label className="register__label" htmlFor="reg-psw">Пароль</label>
          <input onInput={() => handleAutocomplete("psw")} ref={pswRef}
            className={`${querying
              ? "register__input register__input_disabled"
              : "register__input"}`}
            disabled={querying ? true : false}
            onChange={handlePswInputChange} id="reg-psw"
            type="password" placeholder=".." required />
          <span className={pswInputValid
            ? "register__error-input"
            : "register__error-input register__error-input_active"}>{ErrBadPsw}</span>
        </form>
      </div>
      <div>
        <span className={badReg
          ? "register__error register__error_active"
          : "register__error"}>{ErrBadReg}</span>
        <span className={badRegConflict
          ? "register__error register__error_active"
          : "register__error"}>{ErrRegConfilct}</span>
        <button onClick={submitForm} className={submitEnabled
          ? "register__submit-btn btn-black"
          : "register__submit-btn register__submit-btn_disabled"} disabled={!submitEnabled}>Зарегистрироваться</button>
        <div className="register__signin-wrapper">
          <p className="register__signin-question">Уже зарегистрированы?</p>
          <a className="register__signin-link btn-link" href="/signin">Войти</a>
        </div>
      </div>
    </main>
  );
}

export default Register;
