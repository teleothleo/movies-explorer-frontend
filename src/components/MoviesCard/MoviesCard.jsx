
import dummy from "../../images/movies-card-dummy0.png";

const MoviesCard= () => {
  return (
    <div className="movies-card">
      <img src={dummy} className="movies-card__image" alt="Movie screenshot"/>
      <div className="movies-card__title-wrapper">
        <h2 className="movies-card__title">33 слова о дизайндизайнедизайнедизайнедизайндизайнедизайнедизайнеее</h2>
        <button className="movies-card__heart" />
      </div>
      <p className="movies-card__duration">1ч 56м</p>
    </div>
  );
}

export default MoviesCard;
