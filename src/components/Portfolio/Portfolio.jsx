
import arrow from "../../images/link_arrow.svg"

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul>
        <li>
          <a className="portfolio__link" href="https://github.com/teleothleo/how-to-learn" target="_blank" rel="noreferrer">
            Статичный сайт
            <img src={arrow} className="portfolio__link-icon" alt="Link arrow" />
          </a>
        </li>
        <li>
          <a className="portfolio__link" href="https://github.com/teleothleo/russian-travel" target="_blank" rel="noreferrer">
            Адаптивный сайт
            <img src={arrow} className="portfolio__link-icon" alt="Link arrow" />
          </a>
        </li>
        <li>
          <a className="portfolio__link portfolio__last-link" href="https://github.com/teleothleo/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
            Одностраничное приложение
            <img src={arrow} className="portfolio__link-icon" alt="Link arrow" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
