
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
            <p className="aboutMe__caption">Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.</p>

          </div>
          <button className="aboutMe__link_github">Github</button>
        </div>
        <img className="aboutMe__image" alt="Student" src={pic} />
      </div>

    </div>
  );
}

export default AboutMe;
