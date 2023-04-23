import { Route, Routes } from "react-router-dom";


const Footer = () => {
  return (
    <Routes>

      <Route path="/" element={
        <footer className="footer">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__wrapper">
            <p className="footer__c-year">© 2023</p>
            <div className="footer__links-wrapper">
              <a className="footer__link" href="practicum.yandex.ru">Яндекс.Практикум</a>
              <a className="footer__link" href="github.com/teleothleo/movies-explorer-frontend">Github</a>
            </div>
          </div>
        </footer>
      } />

      <Route path="/movies" element={
        <footer className="footer">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__wrapper">
            <p className="footer__c-year">© 2023</p>
            <div className="footer__links-wrapper">
              <a className="footer__link" href="practicum.yandex.ru">Яндекс.Практикум</a>
              <a className="footer__link" href="github.com/teleothleo/movies-explorer-frontend">Github</a>
            </div>
          </div>
        </footer>
      } />

      <Route path="/saved-movies" element={
        <footer className="footer">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__wrapper">
            <p className="footer__c-year">© 2023</p>
            <div className="footer__links-wrapper">
              <a className="footer__link" href="practicum.yandex.ru">Яндекс.Практикум</a>
              <a className="footer__link" href="github.com/teleothleo/movies-explorer-frontend">Github</a>
            </div>
          </div>
        </footer>
      } />
    </Routes>
  );
}

export default Footer;
