
import pic from "../../images/profpic.jpg"

function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="main__heading">Студент</h2>

      <div className="about-me__wrapper">
        <div className="about-me__text-wrapper">
          <div>
            <h3 className="about-me__name">Амир</h3>
            <p className="about-me__about">Фронтенд-разработчик, 24 года</p>
            <p className="about-me__caption">Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.</p>

          </div>
          <button className="about-me__link_github">Github</button>
        </div>
        <img className="about-me__image" alt="Student" src={pic} />
      </div>

    </div>
  );
}

export default AboutMe;
