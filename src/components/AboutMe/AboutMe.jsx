
import pic from "../../images/profpic.jpg"

function AboutMe() {
  return (
    <div className="aboutMe">
      <h2 className="main__heading">Студент</h2>

      <div className="aboutMe__wrapper">
        <div className="aboutMe__text-wrapper">
          <div>
            <h3 className="aboutMe__name">Амир</h3>
            <p className="aboutMe__about">Фронтенд-разработчик, 24 года</p>
            <p className="aboutMe__caption">"Мои похождения здесь"</p>

          </div>
          <button className="aboutMe__link_github">Github</button>
        </div>
        <img className="aboutMe__image" alt="Student" src={pic} />
      </div>

    </div>
  );
}

export default AboutMe;
