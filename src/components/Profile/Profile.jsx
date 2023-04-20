import { useNavigate } from "react-router-dom";


const Profile = () => {

  const navigate = useNavigate();

  return (
    <main className="profile">
      <div>
        <h1 className="profile__greeting">{`Привет, %username%!`}</h1>
        <form className="profile__form">
          <div className="profile__input-group">
            <label className="profile__label" htmlFor="prof-name">Имя</label>
            <input className="profile__input" id="prof-name" type="text" placeholder="%username%" />
          </div>
          <div className="profile__hr" />
          <div className="profile__input-group">
            <label className="profile__label" htmlFor="prof-email">E-mail</label>
            <input className="profile__input" id="prof-email" type="email" placeholder="%email%" />
          </div>
        </form>

      </div>

      <div className="profile__btns-wrapper">
        <button className="profile__edit-btn btn-link">Редактировать</button>
        <button onClick={() => navigate("/signup")} className="profile__signout-btn btn-link">Выйти из аккаунта</button>
      </div>

    </main>
  );
}

export default Profile;
