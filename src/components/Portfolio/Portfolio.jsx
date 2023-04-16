
import arrow from "../../images/link_arrow.svg"

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <button className="portfolio__link">
        <p className="portfolio__link-text">Статичный сайт</p>
        <img src={arrow} className="portfolio__link-icon" alt="Link arrow"/>
      </button>
      <div className="portfolio__hr" />
      <button className="portfolio__link">
        <p className="portfolio__link-text">Адаптивный сайт</p>
        <img src={arrow} className="portfolio__link-icon" alt="Link arrow"/>
      </button>
      <div className="portfolio__hr" />
      <button className="portfolio__link">
        <p className="portfolio__link-text">Одностраничное приложение</p>
        <img src={arrow} className="portfolio__link-icon" alt="Link arrow"/>
      </button>

    </div>
  );
}

export default Portfolio;
