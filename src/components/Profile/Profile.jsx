import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { emailRgx, ErrProfileBadQuery, ErrProfileConfilct, nameRgx } from "../../utils/constants";
import { deleteToken, deleteUserId, saveUserId } from "../../utils/cookieUtils";
import { saveCheckboxLS, saveSearchPromptLS } from "../../utils/localStorageUtils";
import { apiGetMe, apiSignOut, apiUpdateUser } from "../../utils/MainApi";
import { useUserContext } from "../../utils/UserContext";


const Profile = () => {
  const { updateUserContext } = useUserContext();
  const { setIsAuthenticated } = useAuth();
  const nav = useNavigate();

  const [nameInputUsed, setNameInputUsed] = useState(false);
  const [emailInputUsed, setEmailInputUsed] = useState(false);

  const [nameInputValid, setNameInputValid] = useState(false);
  const [emailInputValid, setEmailInputValid] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editEnabled, setEditEnabled] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const [errBadQuery, setErrBadQuery] = useState(false);
  const [errConflict, setErrConflict] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();

  const signOut = async () => {
    try {
      const res = await apiSignOut();
      console.log(res);
      deleteToken();
      deleteUserId();
      setIsAuthenticated(false);
      saveCheckboxLS(false, true); // for Saved Movies
      saveCheckboxLS(false, false); // for Movies
      saveSearchPromptLS("", true); // for Saved Movies
      saveSearchPromptLS("", false); // for Movies
      updateUserContext({
        _id: "",
        name: "",
        email: "",
      })
      nav("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  const editProfile = () => {
    setEditEnabled(true);
  }

  const handleAutocomplete = (val) => {
    val === "name" && setNameInputUsed(true);
    val === "email" && setEmailInputUsed(true);
  }

  const getUserInfo = async () => {
    const res = await (await apiGetMe()).json();
    console.log(res);
    setName(res.name);
    setEmail(res.email);
  }

  const submitForm = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (
      nameInputValid || emailInputValid
    ) {

      try {
        setEditEnabled(false);
        const res = await apiUpdateUser(
          nameRef.current.value,
          emailRef.current.value,
        );
        if (!res.ok) {
          throw res;
        }
        const resJson = await res.json();
        console.log(resJson);

        setName(resJson.name);
        setEmail(resJson.email);
        updateUserContext({
          _id: resJson._id,
          name: resJson.name,
          email: resJson.email,
        })
        saveUserId(resJson._id);
        setErrBadQuery(false);
        setErrConflict(false);
        setNameInputValid(false);
        setEmailInputValid(false);
      } catch (error) {
        if (error.status === 400) {
          setErrBadQuery(true);
          setErrConflict(false);
        } else if (error.status === 409) {
          setErrBadQuery(false);
          setErrConflict(true);
        }
        console.error(error);
        setEditEnabled(true);
      }
    }
  }

  const handleNameInputChange = () => {
    if (nameRgx.test(nameRef.current.value)
      && nameRef.current.value !== name) {
      setNameInputValid(true);
    } else {
      setNameInputValid(false);
    }
  }

  const handleEmailInputChange = () => {
    if (emailRgx.test(emailRef.current.value)
      && emailRef.current.value !== email) {
      setEmailInputValid(true)
    } else {
      setEmailInputValid(false)
    }
  }

  useEffect(() => {
    if (!name || !email) {
      getUserInfo();
    }
  }, [email, name])

  useEffect(() => {
    console.log(
      "used: ", nameInputUsed, emailInputUsed,
      "\nvalid: ", nameInputValid, emailInputValid
    )
    if ((nameInputUsed || emailInputUsed)
      && (nameInputValid || emailInputValid)
    ) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [emailInputUsed, emailInputValid, nameInputUsed, nameInputValid])

  return (
    <main className="profile">
      <div>
        {name && <h1 className="profile__greeting">{`Привет, ${name}!`}</h1>}
        <form className="profile__form" onSubmit={submitForm}>
          <div className="profile__input-group">
            <label className="profile__label" htmlFor="prof-name">Имя</label>
            {name
              && <input className="profile__input" ref={nameRef}
                disabled={editEnabled ? false : true}
                onInput={() => handleAutocomplete("name")}
                onChange={handleNameInputChange}
                defaultValue={name}
                id="prof-name" type="text" />}
          </div>
          <div className="profile__hr" />
          <div className="profile__input-group">
            <label className="profile__label" htmlFor="prof-email">E-mail</label>
            {email
              && <input className="profile__input" ref={emailRef}
                disabled={editEnabled ? false : true}
                onInput={() => handleAutocomplete("email")}
                onChange={handleEmailInputChange}
                defaultValue={email}
                id="prof-email" type="email" />}
          </div>
        </form>

      </div>

      <div className="profile__btns-wrapper">
        {errBadQuery
          && <span className="profile__error">
            {ErrProfileBadQuery}
          </span>}
        {errConflict
          && <span className="profile__error">
            {ErrProfileConfilct}
          </span>}

        {editEnabled && <button disabled={!submitEnabled}
          onClick={submitForm}
          className={submitEnabled
            ? "profile__submit-btn btn-black"
            : "profile__submit-btn profile__submit-btn_disabled"
          }>Сохранить</button>}
        {!editEnabled
          && <button onClick={editProfile}
            className={"profile__edit-btn btn-link"}>Редактировать</button>}
        {!editEnabled
          && <button onClick={signOut}
            className="profile__signout-btn btn-link">Выйти из аккаунта</button>}
      </div>

    </main>
  );
}

export default Profile;
