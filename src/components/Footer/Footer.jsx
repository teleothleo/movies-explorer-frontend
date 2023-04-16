import { Route, Routes } from "react-router-dom";


const Footer = () => {
  return (
    <div className="footer">
      <Routes>

        <Route path="/" element={
          <>
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__wrapper">
              <p className="footer_c-year">© 2023</p>
              <div className="footer__links-wrapper">
                <a className="footer__link" href="practicum.yandex.ru">Яндекс.Практикум</a>
                <a className="footer__link" href="github.com/teleothleo/movies-explorer-frontend">Github</a>
              </div>
            </div>
          </>
        } />

        <Route path="/movies" element={
          <>
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__wrapper">
              <p className="footer_c-year">© 2023</p>
              <div className="footer__links-wrapper">
                <a className="footer__link" href="practicum.yandex.ru">Яндекс.Практикум</a>
                <a className="footer__link" href="github.com/teleothleo/movies-explorer-frontend">Github</a>
              </div>
            </div>
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__wrapper">
              <p className="footer_c-year">© 2023</p>
              <div className="footer__links-wrapper">
                <a className="footer__link" href="practicum.yandex.ru">Яндекс.Практикум</a>
                <a className="footer__link" href="github.com/teleothleo/movies-explorer-frontend">Github</a>
              </div>
            </div>
          </>
        } />
      </Routes>
    </div>
  );
}

export default Footer;
