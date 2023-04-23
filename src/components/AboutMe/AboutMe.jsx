
import pic from "../../images/profpic.jpg"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 id="about-me" className="content-heading">Студент</h2>

      <div className="about-me__wrapper">
        <div className="about-me__text-wrapper">
          <div>
            <h3 className="about-me__name">Амир</h3>
            <p className="about-me__about">Фронтенд-разработчик, 24 года</p>
            <p className="about-me__caption">Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.</p> 
          </div>
          <button className="about-me__link_github">Github</button>
        </div>
        <img className="about-me__image" alt="Student" src={pic} />
      </div>

    </section>
  );
}

export default AboutMe;
